// game-data.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GitLabUtil {
  private githubRepo = 'mattpezzuto/endlessmud'; 
  private filePath = 'game-data.json'; // Replace with your file path

  private githubApiUrl = 'https://api.github.com';
  private headers = {
    Authorization: 'Bearer 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', 
  };

  getGameData(): Promise<any> {
    return axios
      .get(`${this.githubApiUrl}/repos/${this.githubRepo}/contents/${this.filePath}`, { headers: this.headers })
      .then(response => JSON.parse(atob(response.data.content)))
      .catch(error => {
        console.error('Error getting game data from GitHub:', error);
        throw error;
      });
  }

  saveGameData(data: any): Promise<void> {
    const encodedData = btoa(JSON.stringify(data));

    return axios
      .put(
        `${this.githubApiUrl}/repos/${this.githubRepo}/contents/${this.filePath}`,
        {
          message: 'Update game data',
          content: encodedData,
        },
        { headers: this.headers }
      )
      .then(() => {})
      .catch(error => {
        console.error('Error saving game data to GitHub:', error);
        throw error;
      });
  }
}