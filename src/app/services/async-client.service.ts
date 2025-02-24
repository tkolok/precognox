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

  createGame(body: BoardDTO): Promise<BoardDTO> {
    return firstValueFrom(this.#httpClient.post<BoardDTO>(`${root}/boards`, body));
  }

  getSavedGames(): Promise<BoardDTO[]> {
    return firstValueFrom(this.#httpClient.get<BoardDTO[]>(`${root}/boards`));
  }

  removeGame(id: number) {
    return firstValueFrom(this.#httpClient.delete(`${root}/boards/${id}`));
  }

  updateGame(id: number, body: Omit<BoardDTO, 'id'>) {
    return firstValueFrom(this.#httpClient.patch(`${root}/boards/${id}`, body));
  }
}
