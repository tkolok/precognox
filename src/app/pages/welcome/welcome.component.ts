import {Component} from '@angular/core';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export default class WelcomeComponent {
}
