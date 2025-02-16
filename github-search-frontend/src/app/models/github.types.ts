export interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
  }
  
  export interface SearchRecord {
    query: string;
    timestamp: Date;
    success: boolean;
    result?: {
      login: string;
      avatar_url: string;
      html_url: string;
      name: string;
      bio: string;
      public_repos: number;
      followers: number;
      following: number;
    } | null;
  }