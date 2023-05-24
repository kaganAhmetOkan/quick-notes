import style from "./Note.module.css";
import Image from "next/image";
import iconPlus from "@/public/plus-dark.png";
import Link from "next/link";

export default function Note({ note }) {
  
  const defaultNote = (
    <div className={style.main}>
        <h4>{note.title}</h4>
        <p>{note.content}</p>
        <Link href={`/note/${note.id}`}>View</Link>
    </div>
  );

  const createNewNote = (
    <div className={style.main}>
      <h4>{note.title}</h4>
      <Link className={style.image} href="/new">
        <Image
          alt="plus"
          src={iconPlus}
          height={48} width={48}
        />
      </Link>
    </div>
  );

  return (note.createNew ? createNewNote : defaultNote);
};