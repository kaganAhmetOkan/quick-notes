"use client";
import style from "./Notes.module.css";
import Note from "@/components/Note/Note.jsx";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";
import { removeNote } from "@/utils/notes";
import { useRouter } from "next/navigation";
import { pushLocal, pullLocal } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useAtom(atomNotes);
  const [theme, setTheme] = useState("light");

  const createNote = {
    title: "Create New Note",
    createNew: true,
  };

  function handleDelete(event) {
    if (event.target.innerText === "DELETE") {
      const id = event.target.parentElement.parentElement.id;
      const newNotes = removeNote(id, notes);
      setNotes(newNotes);
      pushLocal("notes", newNotes);
      router.refresh();
    };
  };

  useEffect(() => {
    if (localStorage.getItem("notes")) setNotes(pullLocal("notes"));

    function updateTheme(event) {
      setTheme(event.matches ? "dark" : "light");
    };

    setTheme(window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light");

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);

    return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
  }, []);

  return (
    <div className={style.main} onClick={event => handleDelete(event)}>
      {notes.map((note) => <Note note={note} key={note.id} theme={theme} />)}
      <Note note={createNote} theme={theme} />
    </div>
  );
};