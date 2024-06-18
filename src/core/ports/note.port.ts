interface NotePort {
  createNote(note: NoteModel): Promise<NoteModel>;
  getAllNotes(): Promise<NoteModel[]>;
  getNoteById(id: string): Promise<NoteModel>;
  deleteNoteById(id: string): Promise<void>;
}
