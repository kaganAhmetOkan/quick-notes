export function getNote(noteID, notes) {
  return notes.find(note => note.id.toString() === noteID.toString());
};

export function updateNotes(newNote, notes) {
  const index = notes.findIndex(note => note.id.toString() === newNote.id.toString());
  notes.splice(index, 1, newNote);
  return notes;
};

export function removeNote(noteID, notes) {
  const index = notes.findIndex(note => note.id.toString() === noteID.toString());
  notes.splice(index, 1);
  return notes;
}