export class NoteService implements NotePort {
    
  constructor(private readonly noteAdapter: NotePort) {}

  createNote(note: NoteModel): Promise<NoteModel> {
    return this.noteAdapter.createNote(note);
  }

  getAllNotes(): Promise<NoteModel[]> {
    return this.noteAdapter.getAllNotes();
  }

  getNoteById(id: string): Promise<NoteModel> {
    return this.noteAdapter.getNoteById(id);
  }

  deleteNoteById(id: string): Promise<void> {
    return this.noteAdapter.deleteNoteById(id);
  }
}
