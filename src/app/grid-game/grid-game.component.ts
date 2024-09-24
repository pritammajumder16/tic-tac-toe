import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameStateService } from '../game-state.service';
import { IGridBox } from '../../../constants/interfaces';
import { TPlayer } from '../../../constants/types';
import { gridBoxes, winValues } from '../../../constants/game-logic';
@Component({
  selector: 'app-grid-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-game.component.html',
  styleUrl: './grid-game.component.scss',
})
export class GridGameComponent {
  public gameGridBoxes;
  private winningVals;
  constructor(private _gameStateService: GameStateService) {
    this.gameGridBoxes = gridBoxes;
    this.winningVals = winValues;
  }
  public currentPlayer: TPlayer = 'P1';
  public winningPlayer: TPlayer = null;
  public matchDraw: boolean = false;
  playTurn(item: IGridBox) {
    if (this.winningPlayer) {
      return;
    }
    const indx = this.gameGridBoxes.findIndex((grid) => grid.id == item.id);
    if (this.gameGridBoxes[indx].value) {
      return;
    }
    if (indx >= 0) {
      this.gameGridBoxes[indx].value = this.currentPlayer;
    }
    this.detectWin(this.currentPlayer!);
    this.detectDraw();
    if (this.currentPlayer == 'P1') {
      this.currentPlayer = 'P2';
    } else {
      this.currentPlayer = 'P1';
    }
  }
  detectDraw() {
    if (this.winningPlayer) return;
    let notDraw = false;
    this.gameGridBoxes.forEach((item) => {
      if (!item.value) {
        notDraw = true;
      }
    });
    if (!notDraw) {
      this.matchDraw = true;
    }
  }
  detectWin(player: 'P1' | 'P2') {
    console.log(this.gameGridBoxes[0].value, player);
    this.winningVals.forEach((values) => {
      let matchCount = 0;
      values.forEach((val) => {
        if (this.gameGridBoxes[val - 1].value == player) {
          matchCount++;
        }
      });
      if (matchCount == 3) {
        if (player == 'P1') this._gameStateService.player1wins++;
        else this._gameStateService.player2wins++;
        this._gameStateService.gameStateChange.next(true);
        this.winningPlayer = player;
        return;
      }
    });
  }
  resetGame() {
    this.winningPlayer = null;
    this.gameGridBoxes.forEach((grid) => {
      grid.value = null;
    });
    this.matchDraw = false;
    this.currentPlayer = 'P1';
  }
}
