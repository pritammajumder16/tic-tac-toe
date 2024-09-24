import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public player1wins: number = 0;
  public player2wins: number = 0;
  public gameStateChange = new Subject<boolean>();
  constructor() {}
}
