import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {firstValueFrom} from 'rxjs';

export function boardResolver(snapshot: ActivatedRouteSnapshot) {
  const id = snapshot.paramMap.get('id');

  if (id === 'new') {
    const size = snapshot.queryParams['size'] ?? 3;

    return {
      board: Array(size * size).fill('0').join(''),
      name: ''
    };
  }

  return inject(HttpClient).get(`http://localhost:5000/boards/${id}`);
}

export function savedGamesResolver() {
  return firstValueFrom(inject(HttpClient).get('http://localhost:5000/boards'));
}
