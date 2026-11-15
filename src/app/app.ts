import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './counter.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe], // Ye bhi jodo
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ngrx-demo');
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    // Godown se maal nikal rahe hai
    this.count$ = this.store.select('count');
  }

  onIncrement() {
    // Parchee bhej rahe hai
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
