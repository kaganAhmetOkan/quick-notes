"use client";
import style from "./Editor.module.css";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";
import { useRouter } from "next/navigation";
import { updateNotes, getNote } from "@/utils/notes";
import { pushLocal, pullLocal } from "@/utils/localStorage";
import Link from "next/link";

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
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");

    if (noteID) {
      let note = getNote(noteID, notes);
      
      // Handle refresh
      if (!note) {
        if (!localStorage.getItem("notes")) {
          router.push("/");
          return;
        };

        note = getNote(noteID, pullLocal("notes"));
      };

      setTitle(note.title);
      setContent(note.content);
      setDate(note.date);
      setID(note.id);
    };
  }, []);

  useEffect(() => {
    function updateTheme(event) {
      setTheme(event.matches ? "dark" : "light");
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);

    function removeListeners() {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateTheme);
    };

    return removeListeners;
  }, []);

  return (
    <form className={style.main} onSubmit={handleSubmit}>
      <div className={style.row}>
        <Link
          type="button"
          className={style.button}
          href="/"
          data-bg-color="alternative"
        >Discard</Link>
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
        placeholder="Notes go here..."
      />
      <h4 className={style.date}>{`LAST EDIT: ${date}`}</h4>
    </form>
  )
};