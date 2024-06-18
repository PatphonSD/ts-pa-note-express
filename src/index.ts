import express, { Request, Response, NextFunction } from "express";
import { DBLocalNoteAdapter } from "./adapters/db-local.note.adapter";
import { NoteService } from "./core/services/note.service";

const app = express();
const port = 3250;

app.use(express.json());

const noteAdapter = new DBLocalNoteAdapter();
const noteService = new NoteService(noteAdapter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/notes", (req: Request, res: Response, next: NextFunction) => {
  try {
    const allNotes = noteService.getAllNotes();
    res.send(allNotes);
  } catch (error) {
    next(error);
  }
});

app.post("/notes", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send({ error: "Title and content are required" });
    }
    const newNote = noteService.createNote({
      title,
      content,
      id: Date.now().toString(),
    });
    res.status(201).send(newNote);
  } catch (error) {
    next(error);
  }
});

app.delete("/notes/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedNote = noteService.deleteNoteById(id);
    if (deletedNote) {
      res.send(deletedNote);
    } else {
      res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
