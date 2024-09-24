import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  public player1Wins = 0;
  public player2Wins = 0;
  constructor(private _gameStateService: GameStateService) {}
  ngOnInit(): void {
    this.player1Wins = this._gameStateService.player1wins;
    this.player2Wins = this._gameStateService.player2wins;
    this._gameStateService.gameStateChange.subscribe((bool) => {
      if (bool) {
        this.player1Wins = this._gameStateService.player1wins;
        this.player2Wins = this._gameStateService.player2wins;
      }
    });
  }
  ngOnDestroy(): void {
    this._gameStateService.gameStateChange.unsubscribe();
  }
}
