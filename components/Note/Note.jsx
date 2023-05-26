"use client";
import style from "./Note.module.css";
import Image from "next/image";
import iconPlus from "@/public/plus-dark.png";
import Link from "next/link";
import { useState } from "react";
import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";

export default function Note({ note, theme }) {
  const [content] = useState(note?.content);
  const [id] = useState(`preview-only-${note.id}`);

  const defaultNote = (
    <div className={style.main} id={note.id}>
        <h4>{note.title}</h4>
        <MdPreview
          className={style.preview}
          theme={theme}
          editorId={id}
          modelValue={content}
          
        />
        <div className={style.row}>
          <Link className={style.clickable} href={`/note/${note.id}`}>Edit</Link>
          <div className={style.clickable}>Delete</div>
        </div>
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