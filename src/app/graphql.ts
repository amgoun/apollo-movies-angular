import { gql } from "apollo-angular";
import { CreateUserInput  } from '../app/generated/graphql'

export const GET_MOVIES = gql`
query Movies($take: Int, $skip: Int, $orderBy: MovieOrderByUpdatedAtInput) {
  movies(take: $take, skip: $skip, orderBy: $orderBy) {
    id
    title
    thumbnailUrl
    description
    genre
    relaseDate
    createdAt
    comments {
      id
    }
    author {
      username
    }
    likes {
      id
    }
  }
}
`;

export const GET_MOVIE = gql`
  query Query($movieId: ID!) {
    movie(id: $movieId) {
      id
      createdAt
      updatedAt
      title
      thumbnailUrl
      description
      relaseDate
      genre
      author {
        id
        username
      }
      comments {
        content
        createdAt
        author {
          username
          id
        }
      }
      likes {
        id
      }
  }
}
`;

export const MY_MOVIES = gql`
query MyMovies {
  myMovies {
    id
    title
    genre
    createdAt
  }
}
`;

export const DELET_MOVIE = gql`
mutation DeleteMovie($deleteMovieId: ID!) {
  deleteMovie(id: $deleteMovieId) {
    id
  }
}
`;
export const UPDATE_MOVIE_MUTATION = gql`
mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {
  updateMovie(id: $updateMovieId, data: $data) {
    title
  }
}
`;

export const ADD_MOVIE_MUTATION = gql`
mutation CreateMovie($data: CreateMovieInput) {
  createMovie(data: $data) {
    id
  }
}
`;


export const LIKE_MOVIE = gql`
mutation Like($movieId: ID!) {
  like(movieId: $movieId) {
    id
  }
}
`;

export const SIGNUP_MUTATION = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      } 
    }
}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginUserInput!) {
  login(data: $data) {
    token
    user {
      username
      id
      role
    }
  }
}
`;

export const GET_USER = gql`
 query User {
  user {
    id
    username
    name
    email
    createdAt
    role
  }
}
`
export const MY_COMMENTS = gql`
  query MyComments {
    myComments {
      id
      content
      movie {
        title
        genre
      }
      author {
        name
      }
      createdAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CreateCommentInput) {
    createComment(data: $data) {
      content
      createdAt
    }
}
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($updateCommentId: ID!, $data: UpdateCommentInput) {
    updateComment(id: $updateCommentId, data: $data) {
      id
      content
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment($deleteCommentId: ID!) {
  deleteComment(id: $deleteCommentId) {
    id
  }
}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput) {
    updateUser(data: $data) {
      id
      name
      username
      createdAt
      email
    }
}
`; 

export const GET_COMMENT = gql`
query Comment($commentId: ID!) {
  comment(id: $commentId) {
    content
    id
    author {
      username
    }
    createdAt
  }
}
`; 

export const MOVIE_CREATED_SUBSCRIPTION = gql`
subscription Subscription {
  movieCreated {
    id
    title
  }
}
`; 









