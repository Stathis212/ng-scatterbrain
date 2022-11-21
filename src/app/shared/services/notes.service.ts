import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable, take } from 'rxjs'
import { NoteFormPayload } from 'src/app/shared/components/note-form/note-form.component'

import { environment } from '../../../environments/environment'
import { NoteModel } from '../models/notes.model'
import { formatDate } from '../utils/date-format.util'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // observable for notes list
  public readonly notesSubject: BehaviorSubject<NoteModel[]> = new BehaviorSubject<NoteModel[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  // to filter add in url ?property_name=value
  // to sort add in url ?_sort=property_name,property_name&order=desc
  // to paginate add in url ?_page=1&_limit=10
  // operators for example less/greater ?_price_gte=2000&price_lte=6000
  // operators for example note-equal ?_id_ne=1
  // operators for example like ?_category_like=^f (starts with f)

  getNotes(): void {
    this.http.get<NoteModel[]>(`${environment.apiUrl}/notes`)
      .pipe(take(1))
      .subscribe((notes: NoteModel[]) => this.notesSubject.next(notes))
  }

  getNote(id: number): Observable<NoteModel> {
    return this.http.get<NoteModel>(`${environment.apiUrl}/notes/${id}`)
  }

  createNote(formData: NoteFormPayload): void {
    const newNote: NoteModel = {
      id: this.notesSubject.getValue().length + 1,
      title: formData.title,
      description: formData.description,
      create_date: formatDate(new Date()),
      reminder_date: formData.date
    };
    this.http.post<any>(`${environment.apiUrl}/notes`, newNote)
      .pipe(take(1))
      .subscribe(() => this.getNotes())
  }

  editNote(id: number, formData: NoteFormPayload): void {
    const noteToUpdate = this.notesSubject.getValue().find(note => note.id === id);
    if (noteToUpdate) {
      const updatedData: NoteModel = {
        id,
        title: formData.title,
        description: formData.description,
        create_date: noteToUpdate.create_date,
        reminder_date: formData.date
      };
      this.http.put<any>(`${environment.apiUrl}/notes/${id}`, updatedData)
      .pipe(take(1))
      .subscribe(() => this.getNotes())
    } else {
      console.error('Note id not valid.')
      return;
    }
  }

  deleteNote(id: number): void {
    this.http.delete(`${environment.apiUrl}/notes/${id}`)
      .pipe(take(1))
      .subscribe(() => this.getNotes());
  }

}
