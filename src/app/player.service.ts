// player.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersSubject = new BehaviorSubject<Player[]>([]);

  setPlayers(players: Player[]) {
    this.playersSubject.next(players);
    console.log('In PlayerService: ');
    console.log(this.playersSubject);
  }

  getPlayers() {
    return this.playersSubject.asObservable();
  }
}
