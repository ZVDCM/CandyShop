import { Injectable } from '@angular/core';
import { URI } from 'src/app/graphql.module';

@Injectable({
	providedIn: 'root',
})
export class ServerService {
	public readonly URI = URI;
}
