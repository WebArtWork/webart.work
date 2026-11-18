import { Injectable } from '@angular/core';
import { Roadmap } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class RoadmapsService extends FirestoreCollection<Roadmap> {
	constructor() {
		super('roadmaps', false, true);
	}
}
