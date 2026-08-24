"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin, Sparkles, UserRound } from "lucide-react";
import { API_ENDPOINTS, apiRequest } from "@/lib/api";
import styles from "./DashboardMatchCarousel.module.css";

function scoreTone(score) {
  if (score >= 80) return "high";
  if (score >= 55) return "medium";
  return "low";
}

function MatchCircle({ match }) {
  const profile = match.profile || {};
  const score = Math.round(match.finalScore || 0);
  const interests = (match.interests || [])
    .map((item) => item.customInterest || item.interest?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <article className={styles.match}>
      <div className={`${styles.avatarRing} ${styles[scoreTone(score)]}`}>
        <div className={styles.avatar}>
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={`${match.name}'s profile`} />
          ) : (
            <UserRound aria-label={`${match.name}'s profile`} />
          )}
        </div>
        <span className={styles.score}><Sparkles aria-hidden="true" />{score}%</span>
      </div>
      {/* <h3>{match.name}{profile.age ? <span>{profile.age}</span> : null}</h3> */}
      {profile.location && <p className={styles.location}><MapPin aria-hidden="true" />{profile.location}</p>}
      {interests.length > 0 && <div className={styles.interests}>{interests.map((interest) => <span key={interest}>{interest}</span>)}</div>}
    </article>
  );
}

export default function DashboardMatchCarousel() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(API_ENDPOINTS.matches)
      .then((data) => setMatches(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className={styles.section}><div className={styles.loadingTitle} /><div className={styles.viewport}>{[1, 2, 3, 4].map((item) => <div className={styles.skeleton} key={item} />)}</div></section>;
  }
  if (!matches.length) return null;

  return (
    <section className={styles.section} aria-labelledby="ai-matches-heading">
      <div className={styles.header}>
        <div>
          <p><Sparkles aria-hidden="true" /> Ranked for you</p>
        <h2 id="ai-matches-heading">Top matches</h2>
        </div>
        <span><Heart aria-hidden="true" /> Top {matches.length}</span>
      </div>
      <div className={styles.viewport}>{matches.map((match) => <MatchCircle key={match.id} match={match} />)}</div>
    </section>
  );
}
