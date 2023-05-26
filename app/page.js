import style from "./page.module.css";
import Notes from "@/components/Notes/Notes.jsx";

export default function Home() {
  return (
    <main className={style.main}>
      <h1>Quick Notes</h1>
      <Notes />
    </main>
  );
};

// TODO
// add theme switch event listener to md-editors
// stlying changes to all the md-editors
// add last-written date to md-editor

// BUGS
// md-previews will not load custom css values when page fast reloads. May be related to prefetching