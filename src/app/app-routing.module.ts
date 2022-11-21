import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/welcome/welcome.component')
      .then(m => m.WelcomeComponent)
  },
  {
    path: 'notes',
    loadComponent: () => import('./components/note-list/note-list.component')
      .then(m => m.NoteListComponent)
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
