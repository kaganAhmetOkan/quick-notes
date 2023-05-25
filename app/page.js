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
// store notes in localstorage
// too many useStates in editor, clean up then into a single useState