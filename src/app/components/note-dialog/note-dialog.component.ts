import { Component, EventEmitter, Inject, Input, Output } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { FormActions } from 'src/app/shared/helpers/global.helper'
import { NoteModel } from 'src/app/shared/models/notes.model'

import { NoteFormComponent } from '../../shared/components/note-form/note-form.component'

interface DialogData {
  note: NoteModel,
  type: FormActions
}

@Component({
  standalone: true,
  imports: [NoteFormComponent],
  selector: 'note-dialog',
  templateUrl: 'note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent {
  @Output() public reloadDataEmitter = new EventEmitter<void>();

  public actionType: FormActions = FormActions.add;

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.actionType = this.data.type;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
