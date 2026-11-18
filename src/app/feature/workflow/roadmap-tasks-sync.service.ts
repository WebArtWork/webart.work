import { Injectable, effect, inject, untracked } from '@angular/core';
import { RoadmapTask } from '../../interfaces/workflow.interface';
import { RoadmapsService } from './roadmaps.service';
import { TimelineTasksService } from './timeline-tasks.service';
import { taskStatus } from './workflow.helpers';

/**
 * Visitors may not read tasks (they carry the owner's email), so each roadmap keeps a small public
 * snapshot of its tasks. While a developer has the workflow open, this keeps the snapshots current.
 */
@Injectable({ providedIn: 'root' })
export class RoadmapTasksSyncService {
	private readonly _roadmapsService = inject(RoadmapsService);
	private readonly _tasksService = inject(TimelineTasksService);
	private _users = 0;

	constructor() {
		effect(() => {
			const roadmaps = this._roadmapsService.items();
			const tasks = this._tasksService.items();

			// Without the full task list a snapshot would lose tasks.
			if (
				!this._users ||
				this._roadmapsService.loading() ||
				this._tasksService.loading() ||
				this._roadmapsService.error() ||
				this._tasksService.error()
			) {
				return;
			}

			const byId = new Map(tasks.map((task) => [task.id, task]));

			for (const roadmap of roadmaps) {
				const snapshot: RoadmapTask[] = (roadmap.taskIds ?? [])
					.map((id) => byId.get(id))
					.filter((task) => !!task)
					.map((task) => ({ id: task.id, title: task.title, status: taskStatus(task) }));

				if (JSON.stringify(snapshot) !== JSON.stringify(roadmap.tasks ?? [])) {
					untracked(() => this._roadmapsService.update(roadmap.id, { tasks: snapshot }));
				}
			}
		});
	}

	watch() {
		this._users++;
		this._roadmapsService.watch();
		this._tasksService.watch();
	}

	unwatch() {
		this._users = Math.max(0, this._users - 1);
		this._roadmapsService.unwatch();
		this._tasksService.unwatch();
	}
}
