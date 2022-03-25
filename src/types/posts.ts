export interface IPost {
  id: string;
  title: string;
  content: string;
  date: string;
  user: string;
  reactions: IPostReaction;
}

export interface IUser {
  id: string;
  name: string;
}

export type Reactionkeys = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export interface IPostReaction {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface IReaction {
  reaction: Reactionkeys;
  postId: string;
}

export interface IPostSaved {
  id: string | undefined;
  title: string;
  content: string;
}

export interface IPostState {
  posts: IPost[];
  status: string;
  error: null | string | undefined;
}
