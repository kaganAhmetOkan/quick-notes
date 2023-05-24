import style from "./Note.module.css";
import Image from "next/image";
import iconPlus from "@/public/plus-dark.png";
import Link from "next/link";

export default function Note({ note }) {
  
  const defaultNote = (
    <div className={style.container}>
      <Link className={style.main} href={`/note/${note.id}`}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <div className={style.date}>{note.date}</div>
      </Link>
    </div>
  );

  const createNewNote = (
    <div className={style.container}>
      <Link className={style.main} href={"/new"}>
        <h4>{note.title}</h4>
        <div className={style.image}>
          <Image
            alt="plus"
            src={iconPlus}
            height={48} width={48}
          />
        </div>
      </Link>
    </div>
  );

  return (note.createNew ? createNewNote : defaultNote);
};