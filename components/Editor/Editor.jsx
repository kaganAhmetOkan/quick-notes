"use client";
import style from "./Editor.module.css";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";
import { useRouter } from "next/navigation";
import { updateNotes, getNote } from "@/utils/notes";
import { pushLocal } from "@/utils/localStorage";

export default function Editor({ noteID }) {
  const [notes, setNotes] = useAtom(atomNotes);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("New Note");
  const [theme, setTheme] = useState("light");
  const [date, setDate] = useState("");
  const [id, setID] = useState();
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    const date = new Date();
    const newNote = {
      id: id ?? date.getTime(),
      title: title,
      content: content,
      date: date.toLocaleString("en-US"),
    };

    if (noteID) {
      const newNotes = updateNotes(newNote, notes);
      setNotes(newNotes);
      pushLocal("notes", newNotes);      
    }
    else {
      const newNotes = notes.concat(newNote);
      setNotes(newNotes);
      pushLocal("notes", newNotes);
    };

    router.push("/");
  };

  useEffect(() => {
    if (window) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
    };

    if (noteID) {
      const note = getNote(noteID, notes);
      setTitle(note.title);
      setContent(note.content);
      setDate(note.date);
      setID(note.id);
    };
  }, []);

  return (
    <form className={style.main} onSubmit={handleSubmit}>
      <div className={style.row}>
        <button
          type="button"
          className={style.button}
          onClick={() => router.push("/")}
          data-bg-color="alternative"
        >Discard</button>
        <label htmlFor="new-title" hidden>Title</label>
        <input
          id="new-title"
          name="new-title"
          className={style.title}
          placeholder="TITLE"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoComplete="off"
        ></input>
        <button type="submit" className={style.button}>Save</button>
      </div>
      <label htmlFor="md-editor" hidden>Content</label>
      <MdEditor
        modelValue={content}
        onChange={setContent}
        language="en-US"
        theme={theme}
        id="md-editor"
      />
      <h4 className={style.date}>{date}</h4>
    </form>
  )
};