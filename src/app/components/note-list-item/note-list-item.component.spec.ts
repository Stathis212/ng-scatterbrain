import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoteListItemComponent } from './note-list-item.component'

describe('NoteListItemComponent', () => {
  let component: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when delete note', () => {
    const emitSpy = spyOn<any>(component['deleteListItemEmitter'], 'emit');
    component.deleteNote();
    expect(emitSpy).toHaveBeenCalled();
  });
});
