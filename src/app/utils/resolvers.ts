import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';

export function boardResolver(route: ActivatedRouteSnapshot) {
  const id = route.paramMap.get('id');

  if (id === 'new') {
    return {
      board: '000000000',
      name: ''
    };
  }

  return inject(HttpClient).get(`http://localhost:5000/boards/${id}`);
}
