"use client";
import style from "./Editor.module.css";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useState, useEffect } from "react";

export default function Editor() {
  const [content, setContent] = useState("# Take your notes here");
  const [theme, setTheme] = useState("light");
  
  useEffect(() => {
    if (window) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
    };
  }, []);

  return (
    <form className={style.main}>
      <div className={style.row}>
        <label htmlFor="new-title" hidden>Title</label>
        <input
          id="new-title"
          name="new-title"
          className={style.title}
          placeholder="TITLE"
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
    </form>
  )
};