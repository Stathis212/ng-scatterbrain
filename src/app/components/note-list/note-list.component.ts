import { Component, OnInit } from '@angular/core'

import { NgFor, NgIf } from '@angular/common'

import { Subscription } from 'rxjs'
import { NoteModel } from 'src/app/shared/models/notes.model'
import { NotesService } from 'src/app/shared/services/notes.service'

import { NoteListItemAddComponent } from '../note-list-item-add/note-list-item-add.component'
import { NoteListItemComponent } from '../note-list-item/note-list-item.component'

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NoteListItemAddComponent,
    NoteListItemComponent
  ],
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public notes: NoteModel[] = [];

  private subscription = new Subscription();

  constructor( private notesService: NotesService ) { }

  public ngOnInit(): void {
    this.subscription.add(
      this.notesService.notesSubject.subscribe((notes: NoteModel[]) => {
        this.notes = notes
      })
    );
    this.notesService.getNotes();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deleteNote(id: number) {
    this.notesService.deleteNote(id);
  }

}
