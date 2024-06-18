const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });

const Notes = Schema("Notes", {
  _id: { type: String, required: true },
  title: { type: String, default: "ไม่มีชื่อ" },
  content: { type: String, default: "ไม่มีเนื้อหา" },
});

export class DBLocalNoteAdapter implements NotePort {
  createNote(note: NoteModel): Promise<NoteModel> {
    Notes.create({
      _id: note.id,
      title: note.title,
      content: note.content,
    }).save();
    return Notes.findOne(note.id);
  }
  getAllNotes(): Promise<NoteModel[]> {
    return Notes.find();
  }
  deleteNoteById(_id: string): Promise<void> {
    return Notes.remove({ _id });
  }
  getNoteById(_id: string): Promise<NoteModel> {
    return Notes.find({ _id });
  }
}
