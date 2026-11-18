import { Injectable } from '@angular/core';
import { DevelopmentPlan } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class PlansService extends FirestoreCollection<DevelopmentPlan> {
	constructor() {
		super('plans', false, true);
	}
}
