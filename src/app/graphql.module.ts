import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { getMainDefinition } from '@apollo/client/utilities';

import {
  InMemoryCache,
  split,
  ApolloLink,
  ApolloClientOptions,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const uri = 'https://gql-express-movies.onrender.com/';

const token = localStorage.getItem('token');

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
        const basic = setContext((operation, context) => ({
          
          headers: {
            'Content-Type': 'application/json', 
          },     
        }));

        const auth = setContext((operation, context) => {
          const token = localStorage.getItem('token');
          if (token === null) {
            return {};
          } else {
            return {
              headers: {
                Authorization: `Bearer ${token}`,
                
              },
            };
          }
        });

        // Create an http link:
        const link_http = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

        // Create a websocket link:

        const ws = new GraphQLWsLink(
          createClient({
            url: 'wss://gql-express-movies.onrender.com/ ',

            connectionParams: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          ({ query }) => {
            const call = getMainDefinition(query);
            // console.log('GraphQL call > ', call);
            return (
              call.kind === 'OperationDefinition' &&
              call.operation === 'subscription'
            );
          },
          ws,
          link_http
        );

        return { link, cache: new InMemoryCache() };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
