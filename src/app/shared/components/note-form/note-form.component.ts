import { Component, EventEmitter, Input, Output } from '@angular/core'

import {
  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { NotesService } from 'src/app/shared/services/notes.service'
import { formatDate } from 'src/app/shared/utils/date-format.util'

export interface NoteForm {
  title: FormControl<string>;
  description: FormControl<string>;
  date: FormControl<Date>;
}

export interface NoteFormPayload {
  title: string;
  description: string;
  date: string;
}

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {

  @Input() itemId: number = 0;
  @Output() public closeNoteFormEmitter = new EventEmitter<void>();

  public noteForm: FormGroup<NoteForm>;
  public startDate: Date = new Date();
  public filterOutWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService
  ) {
    this.noteForm = this.fb.nonNullable.group<NoteForm>({
      title: new FormControl('', {nonNullable: true}),
      description: new FormControl('', {nonNullable: true}),
      date: new FormControl(this.startDate, {nonNullable: true})
    })
   }

  public onSubmit(): void  {
    const date = formatDate(this.noteForm.value.date || new Date());
    const { title, description } = this.noteForm.value;
    const payload: NoteFormPayload = {
      title,
      description,
      date
    } as NoteFormPayload;
    this.notesService.createNote(this.itemId, payload);
    this.closeNoteFormEmitter.emit();
  }

  public onCancel(): void  {
    this.closeNoteFormEmitter.emit();
  }

}
