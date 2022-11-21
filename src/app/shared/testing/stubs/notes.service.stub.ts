import { BehaviorSubject, Observable, of } from 'rxjs'

import { NoteFormPayload } from '../../components/note-form/note-form.component'
import { NoteModel } from '../../models/notes.model'
import { formatDate } from '../../utils/date-format.util'

export class NotesServiceStub {

  notesData: NoteModel[] = [
    {
      "id": 1,
      "title": "Do one hundred pushups",
      "description": "Secret of One Punch man",
      "create_date": "2022-11-20",
      "reminder_date": "2022-11-23"
    },
    {
      "id": 2,
      "title": "Do one hundred sit-ups",
      "description": "Secret of One Punch man",
      "create_date": "2022-11-20",
      "reminder_date": "2022-11-23"
    },
    {
      "id": 3,
      "title": "Do one hundred squats",
      "description": "Secret of One Punch man",
      "create_date": "2022-11-20",
      "reminder_date": "2022-11-23"
    },
    {
      "id": 4,
      "title": "Run 10km",
      "description": "Secret of One Punch man",
      "create_date": "2022-11-20",
      "reminder_date": "2022-11-23"
    }
  ]

  public readonly notesSubject: BehaviorSubject<NoteModel[]> = new BehaviorSubject<NoteModel[]>([]);

  getNotes(): void {
    this.notesSubject.next(this.notesData);
  }

  getNote(id: number): Observable<NoteModel> {
    const note: NoteModel = this.notesData.find(note => note.id === id) || this.notesData[0];
    return of(note);
  }

  createNote(id: number, formData: NoteFormPayload): void {
    const newNote: NoteModel = {
      id,
      title: formData.title,
      description: formData.description,
      create_date: formatDate(new Date()),
      reminder_date: formData.date
    };
    this.notesData.push(newNote);
    this.getNotes();
  }

  editNote(id: number, formData: NoteFormPayload): void {
    const editedNote: NoteModel = {
      id,
      title: formData.title,
      description: formData.description,
      create_date: formatDate(new Date()),
      reminder_date: formData.date
    };
    const updatedNotes = this.notesData.map(note => note.id === id
      ? { ...editedNote }
      : note
      );

    this.notesData = updatedNotes;
    this.getNotes();
  }

  deleteNote(id: number): void {
    this.notesData = this.removeObjectWithId(this.notesData, id);
    this.getNotes();
  }

  private removeObjectWithId(arr: NoteModel[], id: number) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);

    return arr;
  }

}
