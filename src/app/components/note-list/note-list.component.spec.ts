import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'

import { NoteModel } from 'src/app/shared/models/notes.model'
import { NotesService } from 'src/app/shared/services/notes.service'
import { NotesServiceStub } from 'src/app/shared/testing/stubs/notes.service.stub'

import { NoteListComponent } from './note-list.component'

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClientModule,
        { provide: NotesService, useClass: NotesServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    const unsubscribeSpy = spyOn<any>(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should edit note', () => {
    const openDialogSpy = spyOn<any>(component, 'openDialog');
    const noteData: NoteModel = {
      "id": 1,
      "title": "Do one hundred pushups",
      "description": "Secret of One Punch man",
      "create_date": "2022-11-20 15:20:06",
      "reminder_date": "2022-11-23 15:20:06"
    };

    component.editNote(noteData);

    expect(openDialogSpy).toHaveBeenCalledWith('100ms', '100ms', noteData);
  });

  it('should delete note', () => {
    const initialNotesValue = [...component['notesService'].notesSubject.getValue()];
    expect(component.notes).toEqual(initialNotesValue);
    expect(component.notes.length).toEqual(4);

    component.deleteNote(1);
    console.log(component['notesService'].notesSubject.getValue())
    const expectedUpdatedNotes = initialNotesValue.filter(note => note.id !== 1);
    expect(component.notes).toEqual(expectedUpdatedNotes);
    expect(component.notes.length).toEqual(3);
  });
});
