import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameStateService } from '../game-state.service';

type TPlayer = 'P1' | 'P2' | null;
interface IGridBox {
  id: number;
  value: TPlayer;
}
@Component({
  selector: 'app-grid-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-game.component.html',
  styleUrl: './grid-game.component.scss',
})
export class GridGameComponent {
  constructor(private _gameStateService: GameStateService) {}
  private winValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  public gridBoxes: IGridBox[] = [
    {
      id: 1,
      value: null,
    },
    {
      id: 2,
      value: null,
    },
    {
      id: 3,
      value: null,
    },
    {
      id: 4,
      value: null,
    },
    {
      id: 5,
      value: null,
    },
    {
      id: 6,
      value: null,
    },
    {
      id: 7,
      value: null,
    },
    {
      id: 8,
      value: null,
    },
    {
      id: 9,
      value: null,
    },
  ];
  public currentPlayer: TPlayer = 'P1';
  public winningPlayer: TPlayer = null;
  public matchDraw: boolean = false;
  playTurn(item: IGridBox) {
    if (this.winningPlayer) {
      return;
    }
    const indx = this.gridBoxes.findIndex((grid) => grid.id == item.id);
    if (this.gridBoxes[indx].value) {
      return;
    }
    if (indx >= 0) {
      this.gridBoxes[indx].value = this.currentPlayer;
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
    this.gridBoxes.forEach((item) => {
      if (!item.value) {
        notDraw = true;
      }
    });
    if (!notDraw) {
      this.matchDraw = true;
    }
  }
  detectWin(player: 'P1' | 'P2') {
    console.log(this.gridBoxes[0].value, player);
    this.winValues.forEach((values) => {
      let matchCount = 0;
      values.forEach((val) => {
        if (this.gridBoxes[val - 1].value == player) {
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
    this.gridBoxes.forEach((grid) => {
      grid.value = null;
    });
    this.matchDraw = false;
    this.currentPlayer = 'P1';
  }
}
