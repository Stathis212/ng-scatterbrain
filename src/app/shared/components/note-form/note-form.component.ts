import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

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

import { FormActions } from '../../helpers/global.helper'
import { NoteModel } from '../../models/notes.model'

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
export class NoteFormComponent implements OnInit {

  @Input() itemData: NoteModel | null = null;
  @Input() formType: FormActions = FormActions.add;
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

   public ngOnInit(): void {
    if (this.itemData) {
      const existingData = {
        title: this.itemData.title,
        description: this.itemData.description,
        date: new Date(this.itemData.reminder_date)
      }

      this.noteForm.patchValue(existingData);
    }
   }

  public onSubmit(): void  {
    const date = formatDate(this.noteForm.value.date || new Date());
    const { title, description } = this.noteForm.value;
    const payload: NoteFormPayload = {
      title,
      description,
      date
    } as NoteFormPayload;
    if (this.formType === FormActions.add) {
      this.notesService.createNote(payload);
    }
    if (this.formType === FormActions.edit && this.itemData) {
      this.notesService.editNote(this.itemData.id, payload);
    }
    this.closeForm();
  }

  public onCancel(): void  {
    this.closeForm();
  }

  private closeForm(): void {
    this.closeNoteFormEmitter.emit();
  }

}
