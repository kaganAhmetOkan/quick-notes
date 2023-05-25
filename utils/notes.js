export function getNote(noteID, notes) {
  return notes.find(note => note.id.toString() === noteID);
};

export function updateNotes(newNote, notes) {
  const index = notes.findIndex(note => note.id.toString() === newNote.id.toString());
  notes.splice(index, 1, newNote);
  return notes;
};