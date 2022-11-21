import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NotesService } from '../../services/notes.service'
import { NotesServiceStub } from '../../testing/stubs/notes.service.stub'
import { formatDate } from '../../utils/date-format.util'
import { NoteFormComponent, NoteFormPayload } from './note-form.component'

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        HttpClientModule,
        { provide: NotesService, useClass: NotesServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const expectedInitialFormValue = {
      title: '',
      description: '',
      date: formatDate(new Date())
    } as any;

    expect({...component.noteForm.value, date: formatDate(component.noteForm.value.date) }).toEqual(expectedInitialFormValue);
  });

  it('should submit form', () => {
    const emitSpy = spyOn<any>(component['closeNoteFormEmitter'], 'emit');
    const serviceSpy = spyOn<any>(component['notesService'], 'createNote').and.callFake(() => {
      return;
    });

    component.onSubmit();

    const date = formatDate(component.noteForm.value.date || new Date());
    const { title, description } = component.noteForm.value;
    const expectedPayload: NoteFormPayload = {
      title,
      description,
      date
    } as NoteFormPayload;

    expect(emitSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledWith(component.itemId, expectedPayload);
  });

});
