import {Component, inject} from '@angular/core';
import {MatAnchor} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {NewGameDialog} from './pages/new-game/new-game.dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatAnchor, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly #dialog = inject(MatDialog);
  readonly #domSanitizer = inject(DomSanitizer);
  readonly #matIconRegistry = inject(MatIconRegistry);
  readonly #router = inject(Router);

  title = 'angular-practice';

  constructor() {
    this.#addSVG('o');
    this.#addSVG('x');
  }

  async openNewGameDialog() {
    try {
      const size = await firstValueFrom(this.#dialog.open(NewGameDialog).afterClosed());

      if (size) {
        this.#router.navigate(['/board/new'], {queryParams: {size}});
      }
    } catch {
    }
  }

  #addSVG(path: string) {
    this.#matIconRegistry.addSvgIcon(path, this.#domSanitizer.bypassSecurityTrustResourceUrl(`public/${path}.svg`));
  }
}
