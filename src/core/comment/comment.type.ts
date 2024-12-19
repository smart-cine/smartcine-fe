export type TComment = {
  id: string;
  account: {
    id: string;
    name: string;
    avatar_url: string;
  };
  body: string;
  rating: {
    score: number;
    count: number;
  };
  children: Array<{
    id: string;
    account_id: string;
    body: string;
  }>;
};

export enum CommentType {
  FILM = 'FILM',
  CINEMA_PROVIDER = 'CINEMA_PROVIDER',
  COMMENT = 'COMMENT',
}
