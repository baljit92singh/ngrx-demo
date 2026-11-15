import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      // Sirf loadProducts wali parchee suno
      ofType(loadProducts),
      mergeMap(() =>
        // API call karo
        this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5').pipe(
          // Data aaya toh Success bhejo
          map((data) => loadProductsSuccess({ products: data })),
          // Error aaya toh Failure bhejo
          catchError((err) => of(loadProductsFailure({ error: err.message })))
        )
      )
    )
  );
}