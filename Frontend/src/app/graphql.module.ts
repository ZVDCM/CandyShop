import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import extractFiles from 'extract-files/extractFiles.mjs';
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const host = 'localhost:5178';
export const URI = `http://${host}/`;

@NgModule({
	exports: [ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
				const http = httpLink.create({
					uri: `${URI}graphql`,
					extractFiles: (body) => extractFiles(body, isExtractableFile),
				});

				const ws = new WebSocketLink({
					uri: `ws://${host}/graphql`,
					options: {
						reconnect: true,
					},
				});

				const link = split(
					({ query }) => {
						let definition = getMainDefinition(query);
						return (
							definition.kind === 'OperationDefinition' &&
							definition.operation === 'subscription'
						);
					},
					ws,
					http
				);

				return {
					link,
					cache: new InMemoryCache(),
				};
			},
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
