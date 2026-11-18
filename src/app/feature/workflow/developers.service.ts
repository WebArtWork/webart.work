import { Injectable } from '@angular/core';
import { Developer } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** The public side of every profile: name, avatar and the profile links. */
@Injectable({ providedIn: 'root' })
export class DevelopersService extends FirestoreCollection<Developer> {
	constructor() {
		super('developers', false, true);
	}
}
