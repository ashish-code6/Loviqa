import { ChevronRight, Circle } from "lucide-react";
import styles from "../DashboardLayout.module.css";

const clubs = [
  { name: "Music After Dark", members: "1.2k online", icon: "♫", color: "violet" },
  { name: "Coding Circle", members: "846 online", icon: "</>", color: "cyan" },
  { name: "Travel Stories", members: "623 online", icon: "✦", color: "orange" },
  { name: "Late Night Gamers", members: "1.8k online", icon: "◈", color: "pink" },
  { name: "Book & Coffee", members: "412 online", icon: "◌", color: "gold" },
];

export default function ActiveClubs() {
  return (
    <aside className={styles.clubs}>
      <div className={styles.panelTitle}><div><p>Live now</p><h2>Active clubs</h2></div><button type="button" aria-label="See all clubs"><ChevronRight /></button></div>
      <div className={styles.clubList}>
        {clubs.map((club) => <button type="button" className={styles.club} key={club.name}>
          <span className={`${styles.clubIcon} ${styles[club.color]}`}>{club.icon}</span>
          <span><b>{club.name}</b><small><Circle /> {club.members}</small></span>
          <ChevronRight />
        </button>)}
      </div>
    </aside>
  );
}
