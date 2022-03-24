export interface IPost {
  id: number;
  title: string;
  content: string;
  date: string;
  user: string;
  reactions: IPostReaction;
}

export type IPostkeys = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export interface IPostReaction {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}
