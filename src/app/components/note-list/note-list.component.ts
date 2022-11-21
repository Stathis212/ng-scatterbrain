import { Component, OnInit } from '@angular/core'

import { NgFor, NgIf } from '@angular/common'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { Subscription } from 'rxjs'
import { NoteFormPayload } from 'src/app/shared/components/note-form/note-form.component'
import { FormActions } from 'src/app/shared/helpers/global.helper'
import { NoteModel } from 'src/app/shared/models/notes.model'
import { NotesService } from 'src/app/shared/services/notes.service'

import { NoteDialogComponent } from '../note-dialog/note-dialog.component'
import { NoteListItemAddComponent } from '../note-list-item-add/note-list-item-add.component'
import { NoteListItemComponent } from '../note-list-item/note-list-item.component'

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NoteListItemAddComponent,
    NoteListItemComponent,
    MatDialogModule
  ],
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public notes: NoteModel[] = [];

  private subscription = new Subscription();

  constructor( private notesService: NotesService, private dialog: MatDialog ) { }

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

  public editNote(note: NoteModel) {
    this.openDialog('100ms', '100ms', note);
  }

  public deleteNote(id: number) {
    this.notesService.deleteNote(id);
  }

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string, note: NoteModel): void {
    this.dialog.open(NoteDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        note,
        type: FormActions.edit
      },
    });
  }

}
