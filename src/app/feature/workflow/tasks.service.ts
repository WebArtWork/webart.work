import { Injectable } from '@angular/core';
import { WorkflowTask } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class TasksService extends FirestoreCollection<WorkflowTask> {
	constructor() {
		super('tasks', true);
	}
}
