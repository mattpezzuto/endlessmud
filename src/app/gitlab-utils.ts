// gitlab-utils.ts

import axios from 'axios';

const GITLAB_API_BASE_URL = 'https://gitlab.com/mattpezzuto/endulessmud';
const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your GitLab project ID
const PLAYER_FILE_PATH = 'players.json'; // Path to the player data file in your GitLab repository

export async function getPlayerFromGitLab(playerId: string): Promise<any> {
  try {
    const response = await axios.get(`${GITLAB_API_BASE_URL}/projects/${PROJECT_ID}/repository/files/${PLAYER_FILE_PATH}`, {
      params: {
        ref: 'master', // Replace with your branch name
      },
    });

    const playerData = JSON.parse(atob(response.data.content));

    return playerData.find((player: any) => player.id === playerId);
  } catch (error) {
    console.error('Error getting player from GitLab:', error);
    throw error;
  }
}

export async function savePlayerToGitLab(player: any): Promise<void> {
  try {
    const response = await axios.get(`${GITLAB_API_BASE_URL}/projects/${PROJECT_ID}/repository/files/${PLAYER_FILE_PATH}`, {
      params: {
        ref: 'master', // Replace with your branch name
      },
    });

    const playerData = JSON.parse(atob(response.data.content));
    const existingPlayerIndex = playerData.findIndex((p: any) => p.id === player.id);

    if (existingPlayerIndex !== -1) {
      // Update existing player
      playerData[existingPlayerIndex] = player;
    } else {
      // Add new player
      playerData.push(player);
    }

    // Encode player data to base64
    const encodedPlayerData = btoa(JSON.stringify(playerData));

    // Save player data back to GitLab
    await axios.put(
      `${GITLAB_API_BASE_URL}/projects/${PROJECT_ID}/repository/files/${PLAYER_FILE_PATH}`,
      {
        branch: 'master', // Replace with your branch name
        content: encodedPlayerData,
        commit_message: 'Update player data',
      }
    );
  } catch (error) {
    console.error('Error saving player to GitLab:', error);
    throw error;
  }
}
