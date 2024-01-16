import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Player } from '../player.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EndlessMud';
  players: Player[] = [];

  constructor(private router: Router, private playerService: PlayerService) {
      // Create sample players
    const player1 = new Player('Marcus', 'Warrior', 100, 50);
    const player2 = new Player('El Cid', 'Bard', 80, 100);
    const player3 = new Player('Gandalf', 'Wizard', 80, 100);

    // Add players to the list
    this.players.push(player1, player2, player3);

  }
  
  navigateToMain() {
    this.playerService.setPlayers(this.players);
    this.router.navigate(['/mainScreen']);
  }
  navigateToCharacterSelection() {
    this.router.navigate(['/characterScreen']);
  }


}
