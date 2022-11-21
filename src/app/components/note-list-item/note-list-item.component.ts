import { Component, EventEmitter, Input, Output } from '@angular/core'

import { DatePipe } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { NoteModel } from 'src/app/shared/models/notes.model'

@Component({
  standalone: true,
  imports: [MatCardModule, DatePipe],
  selector: '[app-note-list-item]',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss']
})
export class NoteListItemComponent {

  @Input() public note: NoteModel | null = null;
  @Output() public editListItemEmitter: EventEmitter<void> = new EventEmitter();
  @Output() public deleteListItemEmitter: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public editNote() {
    this.editListItemEmitter.emit();
  }

  public deleteNote() {
    this.deleteListItemEmitter.emit();
  }

}
