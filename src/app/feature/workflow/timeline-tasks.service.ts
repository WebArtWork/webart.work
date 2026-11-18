import { Injectable } from '@angular/core';
import { WorkflowTask } from '../../interfaces/workflow.interface';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** Every allowed user's tasks, read-only, for the shared timeline. */
@Injectable({ providedIn: 'root' })
export class TimelineTasksService extends FirestoreCollection<WorkflowTask> {
	constructor() {
		super('tasks', false);
	}
}
