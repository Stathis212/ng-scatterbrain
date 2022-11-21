import { Component } from '@angular/core'

import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public title: string = 'Welcome to ScatterBrain App';
  public subtitle: string = 'If you remember when it\'s too late, this app is for you!';
  public description:string = 'This is an example app for adding notes & reminders to yourself, using Angular v14 & Json-Server for local data saving.';
}
