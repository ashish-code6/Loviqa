import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineMusicalNote,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Interest Clubs", href: "#clubs" },
  { label: "AI-Powered", href: "#ai" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
];

export const stats = [
  { value: "10K+", label: "Happy Users", icon: HiOutlineUserGroup },
  { value: "100%", label: "Safe & Secure", icon: HiOutlineShieldCheck },
  { value: "AI Match", label: "Smart & Accurate", icon: HiOutlineSparkles },
  { value: "Real", label: "Meaningful Connections", icon: HiOutlineChatBubbleLeftRight },
];

export const featureCards = [
  {
    title: "AI Matchmaking",
    description: "Smart algorithm that finds your most compatible connections.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Interest Clubs",
    description: "Join or create 5-minute clubs around your favorite interests.",
    icon: HiOutlineMusicalNote,
  },
  {
    title: "Meaningful Chats",
    description: "AI helps you break the ice and keep conversations meaningful.",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    title: "Trust & Safety",
    description: "Verified profiles, fake detection and 24/7 community protection.",
    icon: HiOutlineShieldCheck,
  },
];

export const matchCards = [
  {
    name: "Ananya",
    interest: "Book Lover",
    match: "82% Match",
    position: "left-[22%] top-[3%] rotate-[-8deg]",
    avatar: "from-amber-200 via-rose-300 to-violet-500",
  },
  {
    name: "Rohan",
    interest: "Music Enthusiast",
    match: "89% Match",
    position: "right-[7%] top-[10%] rotate-[12deg]",
    avatar: "from-orange-200 via-pink-300 to-purple-600",
  },
  {
    name: "Arjun",
    interest: "Traveler",
    match: "93% Match",
    position: "left-[22%] bottom-[4%] rotate-[-12deg]",
    avatar: "from-sky-200 via-purple-300 to-fuchsia-600",
  },
  {
    name: "Meera",
    interest: "Dog Lover",
    match: "94% Match",
    position: "right-[16%] bottom-[3%] rotate-[10deg]",
    avatar: "from-rose-200 via-fuchsia-300 to-indigo-600",
  },
];
