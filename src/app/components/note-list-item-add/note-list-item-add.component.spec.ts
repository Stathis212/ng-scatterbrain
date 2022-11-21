import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoteListItemAddComponent } from './note-list-item-add.component'

describe('NoteListItemAddComponent', () => {
  let component: NoteListItemAddComponent;
  let fixture: ComponentFixture<NoteListItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when add new note', () => {
    const emitSpy = spyOn<any>(component['addNewNoteEmitter'], 'emit');
    component.addNewNote();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should open dialog', () => {
    const emitSpy = spyOn<any>(component['dialog'], 'open');
    component.openDialog('', '');
    expect(emitSpy).toHaveBeenCalled();
  });
});
