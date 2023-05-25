"use client";
import style from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";
import { getNote } from "@/utils/notes";

export default function Note({ params }) {
  const { noteID } = params;
  const [notes, setNotes] = useAtom(atomNotes);
  const note = getNote(noteID, notes);

  return (
    <main className={style.main}>
      <Editor note={note} />
    </main>
  );
};