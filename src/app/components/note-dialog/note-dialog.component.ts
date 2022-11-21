import { Component, EventEmitter, Output } from '@angular/core'

import { MatDialogRef } from '@angular/material/dialog'

import { NoteFormComponent } from '../../shared/components/note-form/note-form.component'

@Component({
  standalone: true,
  imports: [NoteFormComponent],
  selector: 'note-dialog',
  templateUrl: 'note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent {
  @Output() public reloadDataEmitter = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
