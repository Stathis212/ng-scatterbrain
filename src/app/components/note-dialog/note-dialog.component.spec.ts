import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NotesService } from 'src/app/shared/services/notes.service'
import { NotesServiceStub } from 'src/app/shared/testing/stubs/notes.service.stub'

import { NoteDialogComponent } from './note-dialog.component'

describe('NoteDialogComponent', () => {
  let component: NoteDialogComponent;
  let fixture: ComponentFixture<NoteDialogComponent>;

  const model = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        HttpClientModule,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: model
        },
        {
          provide: NotesService,
          useClass: NotesServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    const closeSpy = spyOn<any>(component.dialogRef, 'close');

    component.closeDialog();

    expect(closeSpy).toHaveBeenCalled();
  });
});
