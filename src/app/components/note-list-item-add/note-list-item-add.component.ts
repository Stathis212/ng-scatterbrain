import { Component, EventEmitter, Output } from '@angular/core'

import { NgIf } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { FormActions } from 'src/app/shared/helpers/global.helper'

import { NoteDialogComponent } from '../note-dialog/note-dialog.component'

@Component({
  standalone: true,
  imports: [
    NgIf,
    NoteDialogComponent,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  selector: '[app-note-add]',
  templateUrl: './note-list-item-add.component.html',
  styleUrls: ['./note-list-item-add.component.scss']
})
export class NoteListItemAddComponent {

  @Output() public addNewNoteEmitter = new EventEmitter<void>();

  public newItemIsActive: boolean = false;

  constructor(public dialog: MatDialog) {}

  public addNewNote(): void {
    this.addNewNoteEmitter.emit();
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NoteDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        type: FormActions.add
      }
    });
  }

}
