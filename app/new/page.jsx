import style from "./page.module.css";
import Editor from "@/components/Editor/Editor";

export default function New() {  
  return (
    <main className={style.main}>
      <Editor />
    </main>
  );
};