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