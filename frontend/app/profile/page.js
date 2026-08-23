"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Check, ImagePlus, LoaderCircle, MapPin, Pencil, Save, Trash2, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AccountMenu from "@/features/account/components/AccountMenu";
import { API_ENDPOINTS, apiRequest, clearSession, getStoredUser, saveSession } from "@/lib/api";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBio, setEditingBio] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [selectedInterestIds, setSelectedInterestIds] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);
  const [savingInterests, setSavingInterests] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  function applyUser(nextUser) {
    setUser(nextUser);
    setBio(nextUser.bio || "");
    setLocation(nextUser.location || "");
    setSelectedInterestIds(nextUser.interests?.filter((item) => !item.customInterest && item.interest?.name !== "Other").map((item) => item.interestId || item.interest?.id).filter(Boolean) || []);
    setCustomInterest(nextUser.interests?.find((item) => item.customInterest)?.customInterest || "");
    saveSession({ user: nextUser });
  }

  async function refreshProfile() {
    const data = await apiRequest(API_ENDPOINTS.auth.profile);
    applyUser({ ...(getStoredUser() || {}), ...data.user, ...(data.user?.profile || {}) });
  }

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/?auth=login");
      return;
    }
    Promise.all([apiRequest(API_ENDPOINTS.auth.profile), apiRequest(API_ENDPOINTS.interests)])
      .then(([profileData, interestData]) => {
        applyUser({ ...storedUser, ...profileData.user, ...(profileData.user?.profile || {}) });
        setCatalog(interestData);
      })
      .catch((error) => {
        if (error.status === 401) {
          clearSession();
          router.replace("/?auth=login");
        } else {
          applyUser(storedUser);
          toast.error(error.message || "Unable to load your profile.");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function discardPhotoSelection() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);
  }

  function choosePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return toast.error("Choose a JPG, PNG, or WebP image.");
    if (file.size > MAX_FILE_SIZE) return toast.error("Your image must be 5 MB or smaller.");
    if (preview) URL.revokeObjectURL(preview);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function savePhoto() {
    if (!selectedFile) return;
    setSavingPhoto(true);
    try {
      const data = new FormData();
      data.append("image", selectedFile);
      await apiRequest(API_ENDPOINTS.users.profileImage, { method: "POST", body: data });
      await refreshProfile();
      discardPhotoSelection();
      toast.success("Profile photo updated.");
    } catch (error) { toast.error(error.message || "We couldn't upload that photo. Try again."); }
    finally { setSavingPhoto(false); }
  }

  async function removePhoto() {
    setRemovingPhoto(true);
    try {
      await apiRequest(API_ENDPOINTS.users.profileImage, { method: "DELETE" });
      await refreshProfile();
      toast.success("Profile photo removed.");
    } catch (error) { toast.error(error.message || "We couldn't remove your photo. Try again."); }
    finally { setRemovingPhoto(false); }
  }

  async function saveDetails() {
    setSavingDetails(true);
    try {
      await apiRequest(API_ENDPOINTS.users.profile, { method: "PATCH", body: JSON.stringify({ bio: bio.trim(), location: location.trim() }) });
      await refreshProfile();
      setEditingBio(false);
      toast.success("About me updated.");
    } catch (error) { toast.error(error.message || "We couldn't save those details. Try again."); }
    finally { setSavingDetails(false); }
  }

  function toggleInterest(id) {
    setSelectedInterestIds((current) => current.includes(id) ? current.filter((interestId) => interestId !== id) : current.length < (customInterest.trim() ? 7 : 8) ? [...current, id] : current);
  }

  async function saveInterests() {
    const totalInterests = selectedInterestIds.length + (customInterest.trim() ? 1 : 0);
    if (!totalInterests) return toast.error("Choose at least one interest.");
    if (totalInterests > 8) return toast.error("Choose up to 8 interests.");
    setSavingInterests(true);
    try {
      await apiRequest(API_ENDPOINTS.users.profile, { method: "PATCH", body: JSON.stringify({ interestIds: selectedInterestIds, customInterest: customInterest.trim() }) });
      await refreshProfile();
      setEditingInterests(false);
      toast.success("Interests updated.");
    } catch (error) { toast.error(error.message || "We couldn't save your interests. Try again."); }
    finally { setSavingInterests(false); }
  }

  if (loading) return <main className="min-h-screen bg-[#0b0a15]" />;
  if (!user) return null;
  const avatar = preview || user.profileImage;
  const interests = user.interests?.map(({ interest, customInterest }) => customInterest || interest?.name).filter(Boolean) || [];
  const hasCustomImage = Boolean(user.profileImage);
  const originalInterestIds = user.interests?.filter((item) => !item.customInterest && item.interest?.name !== "Other").map((item) => item.interestId || item.interest?.id).filter(Boolean) || [];
  const originalCustomInterest = user.interests?.find((item) => item.customInterest)?.customInterest || "";

  return <main className="min-h-screen bg-[#0d0914] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-10">
    <header className="mx-auto flex max-w-3xl items-center justify-between rounded-xl border border-[#a37ab8]/25 bg-[#171322] px-2 py-1.5 shadow-[0_16px_45px_rgba(0,0,0,.24)] sm:px-3">
      <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/[0.06] hover:text-white"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Dashboard</span></Link>
      <p className="text-sm font-black tracking-[0.2em] text-white sm:text-base">LOVIQA</p>
      <AccountMenu user={user} viewProfileHref="/profile" />
    </header>
    <section className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-[#a37ab8]/30 bg-[#191527] shadow-[0_24px_70px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.05)] sm:mt-8">
      <div className="relative h-28 border-b border-white/[0.08] bg-[linear-gradient(110deg,#24102f_0%,#541d5b_48%,#1c244d_100%)] sm:h-36"><span className="absolute left-0 top-0 h-1 w-full bg-[#e785c8]" /><span className="absolute bottom-0 left-0 h-16 w-[42%] bg-black/10 [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" /></div>
      <div className="px-5 pb-8 sm:px-8 sm:pb-10">
      <div className="-mt-12 flex items-center gap-5 sm:-mt-16 sm:gap-8">
        <div className="relative shrink-0"><div className="rounded-full bg-gradient-to-br from-[#f3acd9] via-[#db73e6] to-[#8270ea] p-[3px] shadow-[0_0_32px_rgba(218,115,230,.34)]">{avatar ? <img src={avatar} alt={`${user.name}'s profile`} className="h-24 w-24 rounded-full border-4 border-[#191527] object-cover sm:h-36 sm:w-36" /> : <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-[#191527] bg-[#2b213b] text-[#e7d7eb] sm:h-36 sm:w-36"><UserRound className="h-10 w-10 sm:h-14 sm:w-14" /></div>}</div><button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Change profile photo" className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-2 border-[#191527] bg-[#d15add] text-white shadow-[0_8px_20px_rgba(209,90,221,.35)] transition hover:bg-[#e16ce9]"><Camera className="h-4 w-4" /></button><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="hidden" /></div>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-4 gap-y-2"><h1 className="truncate text-xl font-bold sm:text-2xl">{user.name}</h1><button type="button" onClick={() => setEditingBio(true)} className="inline-flex items-center gap-2 rounded-lg border border-[#b894ca]/35 bg-white/[0.035] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/[0.09]"><Pencil className="h-3.5 w-3.5" /> Edit profile</button></div><p className="mt-2 text-sm text-[#c7bdcf]/65">{user.email}</p><div className="mt-3 flex gap-5 text-sm"><span><b className="text-white">{interests.length}</b> <span className="text-[#c7bdcf]/70">interests</span></span><span><b className="text-white">{user.location ? "1" : "0"}</b> <span className="text-[#c7bdcf]/70">places</span></span></div></div>
      </div>
      {selectedFile && <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-[#ce84d8]/30 bg-[#48214f]/45 p-3"><span className="mr-auto text-sm font-medium text-fuchsia-50">New profile photo selected</span><button type="button" onClick={savePhoto} disabled={savingPhoto} className="inline-flex items-center gap-2 rounded-lg bg-[#c54bd8] px-3 py-2 text-sm font-bold hover:bg-[#d35be1] disabled:opacity-60">{savingPhoto ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Save</button><button type="button" onClick={discardPhotoSelection} disabled={savingPhoto} className="grid h-9 w-9 place-items-center rounded-lg text-white/65 hover:bg-white/10 hover:text-white" aria-label="Cancel photo change"><X className="h-4 w-4" /></button></div>}
      {!selectedFile && hasCustomImage && <button type="button" onClick={removePhoto} disabled={removingPhoto} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-rose-200 transition hover:text-rose-100 disabled:opacity-60">{removingPhoto ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Remove current photo</button>}
      <div className="mt-9 border-t border-[#9272a8]/20 pt-6"><div className="flex items-center justify-between gap-4"><h2 className="text-base font-bold">About me</h2>{!editingBio && <button type="button" onClick={() => setEditingBio(true)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#edabdf] hover:text-white"><Pencil className="h-3.5 w-3.5" /> Edit</button>}</div>{editingBio ? <div className="mt-4"><textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={500} rows={5} className="w-full resize-none rounded-lg border border-[#9272a8]/30 bg-[#11101b] p-3 text-sm leading-6 outline-none focus:border-[#e492dc]/70" placeholder="Tell people a little about yourself." /><div className="mt-3 flex flex-wrap items-center gap-2"><MapPin className="h-4 w-4 text-[#edabdf]" /><input value={location} onChange={(event) => setLocation(event.target.value)} maxLength={80} className="h-10 flex-1 rounded-lg border border-[#9272a8]/30 bg-[#11101b] px-3 text-sm outline-none focus:border-[#e492dc]/70" placeholder="City, Country" /><button type="button" onClick={saveDetails} disabled={savingDetails} className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#c54bd8] px-3 text-sm font-bold hover:bg-[#d35be1] disabled:opacity-60">{savingDetails ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save</button><button type="button" onClick={() => { setBio(user.bio || ""); setLocation(user.location || ""); setEditingBio(false); }} disabled={savingDetails} className="h-10 px-2 text-sm font-semibold text-white/60 hover:text-white">Cancel</button></div></div> : <><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#ded6e3]/80">{user.bio || "Add a short introduction so people can get to know you."}</p>{user.location && <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#d6c9db]/75"><MapPin className="h-4 w-4 text-[#e58ab9]" /> {user.location}</p>}</>}</div>
      <div className="mt-8 border-t border-[#9272a8]/20 pt-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-base font-bold">Interests</h2><p className="mt-1 text-sm text-[#c7bdcf]/60">Choose up to 8 things you enjoy.</p></div>{!editingInterests && <button type="button" onClick={() => setEditingInterests(true)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#edabdf] hover:text-white"><Pencil className="h-3.5 w-3.5" /> Edit</button>}</div>{editingInterests ? <div className="mt-4"><div className="flex flex-wrap gap-2">{catalog.filter((interest) => interest.name !== "Other").map((interest) => { const active = selectedInterestIds.includes(interest.id); return <button key={interest.id} type="button" onClick={() => toggleInterest(interest.id)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${active ? "border-[#e492dc]/65 bg-[#642a68]/45 text-white" : "border-[#9272a8]/30 bg-[#11101b]/40 text-[#d6c9db]/75 hover:border-[#c7a3d0]/60 hover:text-white"}`}>{active && <Check className="mr-1 inline h-3.5 w-3.5" />}{interest.name}</button>; })}</div><label className="mt-4 grid gap-2 text-sm font-semibold text-[#d6c9db]/80">Other interest<input value={customInterest} onChange={(event) => setCustomInterest(event.target.value)} maxLength={40} className="h-10 rounded-lg border border-[#9272a8]/30 bg-[#11101b] px-3 text-sm font-normal text-white outline-none focus:border-[#e492dc]/70" placeholder="Add something not listed" /></label><div className="mt-4 flex items-center gap-3"><button type="button" onClick={saveInterests} disabled={savingInterests} className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#c54bd8] px-3 text-sm font-bold hover:bg-[#d35be1] disabled:opacity-60">{savingInterests ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save interests</button><button type="button" onClick={() => { setSelectedInterestIds(originalInterestIds); setCustomInterest(originalCustomInterest); setEditingInterests(false); }} disabled={savingInterests} className="h-10 text-sm font-semibold text-white/60 hover:text-white">Cancel</button><span className="ml-auto text-xs text-[#c7bdcf]/55">{selectedInterestIds.length + (customInterest.trim() ? 1 : 0)}/8</span></div></div> : <div className="mt-4 flex flex-wrap gap-2">{interests.length ? interests.map((interest) => <span key={interest} className="rounded-full border border-[#d697d6]/25 bg-[#58265c]/40 px-3 py-1.5 text-sm font-semibold text-[#fae7f5]">{interest}</span>) : <p className="text-sm text-[#c7bdcf]/65">Add the interests that make you, you.</p>}</div>}</div>
      </div>
    </section>
  </main>;
}
