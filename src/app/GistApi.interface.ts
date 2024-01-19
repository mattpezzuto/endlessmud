interface PlayerInterface {
    name: string;
    class: string;
    life: number;
    lifeMax: number;
    spellPoints: number;
    spellPointsMax: number;
  }

  interface GistFile {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
  }
  
  interface Gist {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: {
      [key: string]: GistFile;
    };
  }
  
  interface GistFileWithContent extends GistFile {
    truncated: false;
    content: string;
  }
  
  interface GistWithContent extends Gist {
    files: {
      "Players.json": GistFileWithContent;
    };
  }