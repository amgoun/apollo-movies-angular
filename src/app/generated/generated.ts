import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Comment = {
createdAt: any;
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
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
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  movie: Movie;
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  data?: InputMaybe<CreateUserInput>;
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
  data?: InputMaybe<LoginUserInput>;
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
  comments?: Maybe<Array<Maybe<Comment>>>;
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

export type LoginMutationVariables = Exact<{
  data?: InputMaybe<LoginUserInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', user?: { __typename?: 'User', id: string, name: string, role: UserRole } | null } };

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, createdAt: any, updatedAt: any, thumbnailUrl: string, title: string, description?: string | null, relaseDate: number, genre: MovieGenre, author: { __typename?: 'User', username: string } }> };

export type MutationMutationVariables = Exact<{
  data?: InputMaybe<CreateMovieInput>;
}>;


export type MutationMutation = { __typename?: 'Mutation', createMovie?: { __typename?: 'Movie', id: string, title: string, thumbnailUrl: string, description?: string | null, relaseDate: number, genre: MovieGenre, author: { __typename?: 'User', name: string } } | null };

export const LoginDocument = gql`
    mutation Login($data: LoginUserInput) {
  login(data: $data) {
    user {
      id
      name
      role
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MoviesDocument = gql`
    query Movies {
  movies {
    id
    createdAt
    updatedAt
    thumbnailUrl
    title
    description
    relaseDate
    genre
    author {
      username
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MoviesGQL extends Apollo.Query<MoviesQuery, MoviesQueryVariables> {
    document = MoviesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MutationDocument = gql`
    mutation Mutation($data: CreateMovieInput) {
  createMovie(data: $data) {
    id
    title
    thumbnailUrl
    description
    relaseDate
    genre
    author {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MutationGQL extends Apollo.Mutation<MutationMutation, MutationMutationVariables> {
    document = MutationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }