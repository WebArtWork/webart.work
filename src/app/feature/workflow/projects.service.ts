import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends FirestoreCollection<Project> {
	constructor() {
		super('projects', false);
	}
}
