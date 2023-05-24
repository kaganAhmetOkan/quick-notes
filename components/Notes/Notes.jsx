"use client";
import style from "./Notes.module.css";
import Note from "@/components/Note/Note.jsx";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";

export default function Notes() {
  const [notes, setNotes] = useAtom(atomNotes);
  
  const createNote = {
    title: "Create New Note",
    createNew: true,
  };

  return (
    <div className={style.main}>
      {notes.map((note) => <Note note={note} key={note.id} />)}
      <Note note={createNote} />
    </div>
  );
};