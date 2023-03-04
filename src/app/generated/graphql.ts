export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  movie: Movie;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  movie: Scalars['ID'];
};

export type CreateMovieInput = {
  description?: InputMaybe<Scalars['String']>;
  genre: MovieGenre;
  relaseDate: Scalars['Int'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  movie: Movie;
  user: User;
};

export type LoginUserInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  author: User;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  genre: MovieGenre;
  id: Scalars['ID'];
  likes: Array<Like>;
  relaseDate: Scalars['Int'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum MovieGenre {
  Action = 'ACTION',
  Comedy = 'COMEDY',
  Drama = 'DRAMA',
  Horror = 'HORROR',
  Mystery = 'MYSTERY',
  Other = 'OTHER',
  Romance = 'ROMANCE'
}

export type MovieOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createMovie?: Maybe<Movie>;
  createUser: AuthPayload;
  deleteComment?: Maybe<Comment>;
  deleteMovie?: Maybe<Movie>;
  deleteUser?: Maybe<User>;
  like?: Maybe<Like>;
  login: AuthPayload;
  updateComment?: Maybe<Comment>;
  updateMovie?: Maybe<Movie>;
  updateUser?: Maybe<User>;
};


export type MutationCreateCommentArgs = {
  data?: InputMaybe<CreateCommentInput>;
};


export type MutationCreateMovieArgs = {
  data?: InputMaybe<CreateMovieInput>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['ID'];
};


export type MutationLikeArgs = {
  movieId: Scalars['ID'];
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationUpdateCommentArgs = {
  data?: InputMaybe<UpdateCommentInput>;
  id: Scalars['ID'];
};


export type MutationUpdateMovieArgs = {
  data?: InputMaybe<UpdateMovieInput>;
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UpdateUserInput>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  movie?: Maybe<Movie>;
  movies: Array<Movie>;
  user?: Maybe<User>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
};


export type QueryMovieArgs = {
  id: Scalars['ID'];
};


export type QueryMoviesArgs = {
  genre?: InputMaybe<MovieGenre>;
  orderBy?: InputMaybe<MovieOrderByUpdatedAtInput>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  movieCreated?: Maybe<Movie>;
};

export type UpdateCommentInput = {
  content: Scalars['String'];
};

export type UpdateMovieInput = {
  description?: InputMaybe<Scalars['String']>;
  genre: MovieGenre;
  relaseDate: Scalars['Int'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  movies: Array<Movie>;
  name: Scalars['String'];
  role: UserRole;
  username: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER'
}
