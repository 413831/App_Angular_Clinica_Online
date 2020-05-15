import { Observable, SchedulerLike } from 'rxjs';
import { Query, DocumentChangeType, DocumentChange, DocumentChangeAction } from '../interfaces';
/**
 * Return a stream of document changes on a query. These results are not in sort order but in
 * order of occurence.
 * @param query
 */
export declare function docChanges<T>(query: Query, scheduler?: SchedulerLike): Observable<DocumentChangeAction<T>[]>;
/**
 * Return a stream of document changes on a query. These results are in sort order.
 * @param query
 */
export declare function sortedChanges<T>(query: Query, events: DocumentChangeType[], scheduler?: SchedulerLike): Observable<DocumentChangeAction<T>[]>;
/**
 * Combines the total result set from the current set of changes from an incoming set
 * of changes.
 * @param current
 * @param changes
 * @param events
 */
export declare function combineChanges<T>(current: DocumentChange<T>[], changes: DocumentChange<T>[], events: DocumentChangeType[]): DocumentChange<T>[];
/**
 * Creates a new sorted array from a new change.
 * @param combined
 * @param change
 */
export declare function combineChange<T>(combined: DocumentChange<T>[], change: DocumentChange<T>): DocumentChange<T>[];
