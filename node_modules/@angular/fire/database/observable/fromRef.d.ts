import { DatabaseQuery, DatabaseSnapshot, ListenEvent, AngularFireAction } from '../interfaces';
import { Observable, SchedulerLike } from 'rxjs';
/**
 * Create an observable from a Database Reference or Database Query.
 * @param ref Database Reference
 * @param event Listen event type ('value', 'added', 'changed', 'removed', 'moved')
 */
export declare function fromRef<T>(ref: DatabaseQuery, event: ListenEvent, listenType?: string, scheduler?: SchedulerLike): Observable<AngularFireAction<DatabaseSnapshot<T>>>;
