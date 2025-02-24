import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {BoardDTO} from '../../types/board';

const root = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class AsyncClientService {
  readonly #httpClient = inject(HttpClient);

  getSavedGames(): Promise<BoardDTO[]> {
    return firstValueFrom(this.#httpClient.get<BoardDTO[]>(`${root}/boards`));
  }
}
