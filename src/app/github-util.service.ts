// github-util.service.ts

import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError, from, throwError } from 'rxjs';

interface GistUpdateData {
  files: {
    [filename: string]: {
      content: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class GitHubUtilService {
  private readonly apiUrl = 'https://api.github.com/gists';
  private readonly gistId = 'eff85be2a54de95aaa8539e93846b764'; // Replace with your Gist ID
  private readonly accessToken = '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'; // Replace with your GitHub Access Token


  getGistData(): Promise<any> {
    return axios
      .get(`${this.apiUrl}/${this.gistId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error getting Gist data from GitHub:', error);
        throw error;
      });
  }

  async updateGistFile(filenameToUpdate: string, updatedContent: string): Promise<any> {
    const url = `${this.apiUrl}/${this.gistId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
    };
    console.log(updatedContent);
    const gistUpdateData: GistUpdateData = {
      files: {
        [filenameToUpdate]: {
          content: updatedContent,
        },
      },
    };

    // Making sure gistId is correct
    // const gistUrl = `${this.apiUrl}/${this.gistId}`;
    
    const gistResponse = await axios.get(url, { headers });
    console.log('Gist Content:', gistResponse.data);
    

    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: url,
      headers: headers,
      data: gistUpdateData,
    };
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (error:any) {
      console.error('Error updating Gist:', error.message);
      throw error;
    }
      
  }

  async updateGistData(filename: string, jsonString: string): Promise<AxiosResponse> {
    const url = `${this.apiUrl}/${this.gistId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
    };

    const data = {
      description: "test description",
      files: {
        [filename]: {
          content: jsonString,
        },
      },
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: url,
      headers: headers,
      data: data,
    };
    
    console.log('in updateGistData()' + filename);

    console.log('in updateGistData()' + jsonString);
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
