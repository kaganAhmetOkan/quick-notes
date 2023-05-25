"use client";
import style from "./Editor.module.css";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { atomNotes } from "@/atoms/notes";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/utils/notes";

export default function Editor({ note }) {
  const [content, setContent] = useState(note?.content ?? "# Take your notes here");
  const [theme, setTheme] = useState("light");
  const [notes, setNotes] = useAtom(atomNotes);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    const date = new Date();
    const title = event.target[0].value;

    const newNote = {
      id: note?.id ?? date.getTime(),
      title: title,
      content: content,
      date: date.toLocaleString("en-US"),
    };

    if (note) setNotes(updateNotes(newNote, notes));
    else setNotes(notes.concat(newNote));

    router.push("/");
  };

  useEffect(() => {
    if (window) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
    };
  }, []);

  return (
    <form className={style.main} onSubmit={handleSubmit}>
      <div className={style.row}>
        <label htmlFor="new-title" hidden>Title</label>
        <input
          id="new-title"
          name="new-title"
          className={style.title}
          placeholder="TITLE"
          required
          defaultValue={note?.title ?? ""}
        ></input>
        <button type="submit" className={style.submit}>Save</button>
      </div>
      <label htmlFor="new-content" hidden>Content</label>
      <MdEditor
        modelValue={content}
        onChange={setContent}
        language="en-US"
        theme={theme}
        id="new-content"
      />
      <h4 className={style.date}>{note?.date ?? ""}</h4>
    </form>
  )
};