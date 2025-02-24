import {Component, inject} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly #domSanitizer = inject(DomSanitizer);
  readonly #matIconRegistry = inject(MatIconRegistry);

  title = 'angular-practice';

  constructor() {
    this.#addSVG('o');
    this.#addSVG('x');
  }

  #addSVG(path: string) {
    this.#matIconRegistry.addSvgIcon(path, this.#domSanitizer.bypassSecurityTrustResourceUrl(`public/${path}.svg`));
  }
}
