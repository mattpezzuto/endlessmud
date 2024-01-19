import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Player } from '../player.model';
import { PlayerService } from './player.service';
import { GitHubUtilService } from './github-util.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'EndlessMud';
  players: any;

  constructor(private router: Router, private playerService: PlayerService, private githubUtilService: GitHubUtilService) {
  }

  gistData: any;

  ngOnInit() {
    // Load initial Gist data
    this.getGistData();
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



    });
  }
  
  navigateToMain() {
    this.router.navigate(['/mainScreen']);
  }
  navigateToCharacterSelection() {
    this.router.navigate(['/characterScreen']);
  }

  // savePlayers() {
  //   console.log( this.gitLabUtil.getGameData() );
  // }

}



