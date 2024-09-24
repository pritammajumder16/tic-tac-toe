import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GridGameComponent } from './grid-game/grid-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeaderboardComponent, GridGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tic-tac-toe';
}
