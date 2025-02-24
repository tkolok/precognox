import {inject, signal} from '@angular/core';
import {Router} from '@angular/router';

export function initialSignal<T>(key: string) {
  const router = inject(Router);
  let activatedRoute = router.routerState.snapshot.root;

  while (activatedRoute.firstChild) {
    activatedRoute = activatedRoute.firstChild;
  }

  return signal<T>(activatedRoute.data[key] as T);
}
