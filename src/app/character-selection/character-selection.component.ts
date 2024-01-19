import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../player.model';
import { PlayerService } from '../player.service';
import { GitHubUtilService } from '../github-util.service';
import { Router } from '@angular/router';
// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [CommonModule,CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.css'
})
export class CharacterSelectionComponent {
  constructor(private router: Router, private playerService: PlayerService, private githubUtilService: GitHubUtilService) {
  }

  gistData: any;
  players: Player[] = [];
  teamA: Player[] = [];
  teamB: Player[] = [];
  gold: number = 0;

  ngOnInit() {
    // Load initial Gist data
    this.getGistData();
    this.gold = 300;
  }

  getGistData() {
    this.githubUtilService.getGistData().then((data: any) => {
      this.gistData = data;

      // const filenameToExtract = 'Players.json'; // Replace with the desired filename
      // const fileContent = extractFileContent(data, filenameToExtract);

      // console.log(fileContent);
      console.log(data.files["Players.json"].content);
      const fileContent = data.files["Players.json"].content;
      this.players = JSON.parse(fileContent);
      this.teamA = this.players;

      this.playerService.setPlayers(this.players);


    });
  }

  updateLifeTeamB() {
    for (let player of this.teamB) {
      player.life++;
      player.lifeMax++;
    }

    const jsonString: string = JSON.stringify(this.teamB);
    console.log(this.teamB);
  }

  saveToCloud() {
    const updatedContent: string = JSON.stringify(this.teamA);
    this.githubUtilService.updateGistFile('Players.json', updatedContent)
    .then(response => {
      console.log('File updated successfully:', response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log('Server responded with status code:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error creating request:', error.message);
      }
    });
  }


  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      console.log(event.previousContainer.id);
      console.log(event.container.id);

      if (event.container.id === 'cdk-drolist-1') {
        this.gold -=100;
      } else {
        this.gold +=100;
      }

  
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

function extractFileContent(gistExample: any, filenameToExtract: any) {
  throw new Error('Function not implemented.');
}

