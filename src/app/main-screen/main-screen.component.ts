import { Component, Input } from '@angular/core';
import { Player } from '../../player.model';
import { PlayerService } from '../player.service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css'
})

export class MainScreenComponent {
  data$: Observable<Player[]> | undefined ;

    constructor(private playerService: PlayerService) {}

  // players: Player[] = [];

  // constructor(private playerService: PlayerService) {
  //   const player1 = new Player('Marcus', 'Warrior', 100, 50);
  //   const player2 = new Player('El Cid', 'Bard', 80, 100);
  //   const player3 = new Player('Gandalf', 'Wizard', 80, 100);

  //   // Add players to the list
  //   this.players.push(player1, player2, player3);
  // }

  ngOnInit() {
    this.data$ = this.playerService.getPlayers();
  }

}
