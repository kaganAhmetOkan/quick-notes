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
// stlying changes to all the md-editors
// add last-written date to md-editor
// confirm to delete popup

// BUGS
// md-previews will not load custom css values when page fast loads. May be related to prefetching
// some colors don't seem to work in google chrome (confirm this on Windows 10)