import { Injectable } from '@angular/core';
import { Package } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class PackagesService extends FirestoreCollection<Package> {
	constructor() {
		super('packages', false, true);
	}
}
