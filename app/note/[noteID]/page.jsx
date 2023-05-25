import style from "./page.module.css";
import Editor from "@/components/Editor/Editor";

export default function Note({ params }) {
  const { noteID } = params;

  return (
    <main className={style.main}>
      <Editor noteID={noteID} />
    </main>
  );
};