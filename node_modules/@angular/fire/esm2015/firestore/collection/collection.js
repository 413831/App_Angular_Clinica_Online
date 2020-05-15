/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { fromCollectionRef } from '../observable/fromRef';
import { map, filter, scan, observeOn } from 'rxjs/operators';
import { docChanges, sortedChanges } from './changes';
import { AngularFirestoreDocument } from '../document/document';
/**
 * @param {?=} events
 * @return {?}
 */
export function validateEventsArray(events) {
    if (!events || (/** @type {?} */ (events)).length === 0) {
        events = ['added', 'removed', 'modified'];
    }
    return events;
}
/**
 * AngularFirestoreCollection service
 *
 * This class creates a reference to a Firestore Collection. A reference and a query are provided in
 * in the constructor. The query can be the unqueried reference if no query is desired.The class
 * is generic which gives you type safety for data update methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionRef = firebase.firestore.collection('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollection<Stock>(collectionRef, query);
 *
 * // NOTE!: the updates are performed on the reference not the query
 * await fakeStock.add({ name: 'FAKE', price: 0.01 });
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
export class AngularFirestoreCollection {
    /**
     * The constructor takes in a CollectionReference and Query to provide wrapper methods
     * for data operations and data streaming.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query. See the AssociatedRefence type for details
     * on this implication.
     * @param {?} ref
     * @param {?} query
     * @param {?} afs
     */
    constructor(ref, query, afs) {
        this.ref = ref;
        this.query = query;
        this.afs = afs;
    }
    /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     * @param {?=} events
     * @return {?}
     */
    stateChanges(events) {
        if (!events || events.length === 0) {
            return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(this.afs.keepUnstableUntilFirst);
        }
        return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        actions => actions.filter((/**
         * @param {?} change
         * @return {?}
         */
        change => events.indexOf(change.type) > -1)))), filter((/**
         * @param {?} changes
         * @return {?}
         */
        changes => changes.length > 0)), this.afs.keepUnstableUntilFirst);
    }
    /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     * @param {?=} events
     * @return {?}
     */
    auditTrail(events) {
        return this.stateChanges(events).pipe(scan((/**
         * @param {?} current
         * @param {?} action
         * @return {?}
         */
        (current, action) => [...current, ...action]), []));
    }
    /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     * @param {?=} events
     * @return {?}
     */
    snapshotChanges(events) {
        /** @type {?} */
        const validatedEvents = validateEventsArray(events);
        /** @type {?} */
        const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
        return scheduledSortedChanges$.pipe(this.afs.keepUnstableUntilFirst);
    }
    /**
     * @template K
     * @param {?=} options
     * @return {?}
     */
    valueChanges(options = {}) {
        return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        actions => actions.payload.docs.map((/**
         * @param {?} a
         * @return {?}
         */
        a => {
            if (options.idField) {
                return (/** @type {?} */ (Object.assign(Object.assign({}, (/** @type {?} */ (a.data()))), { [options.idField]: a.id })));
            }
            else {
                return a.data();
            }
        })))), this.afs.keepUnstableUntilFirst);
    }
    /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    get(options) {
        return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    }
    /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     * @param {?} data
     * @return {?}
     */
    add(data) {
        return this.ref.add(data);
    }
    /**
     * Create a reference to a single document in a collection.
     * @template T
     * @param {?=} path
     * @return {?}
     */
    doc(path) {
        return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
    }
}
if (false) {
    /** @type {?} */
    AngularFirestoreCollection.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollection.prototype.query;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollection.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiY29sbGVjdGlvbi9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFHaEUsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE1BQTZCO0lBQy9ELElBQUcsQ0FBQyxNQUFNLElBQUksbUJBQUEsTUFBTSxFQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzNDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCRCxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7Ozs7Ozs7O0lBV3JDLFlBQ2tCLEdBQXdCLEVBQ3ZCLEtBQVksRUFDWixHQUFxQjtRQUZ0QixRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBa0I7SUFBSSxDQUFDOzs7Ozs7OztJQVE3QyxZQUFZLENBQUMsTUFBNkI7UUFDeEMsSUFBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNqQyxPQUFPLFVBQVUsQ0FBSSxJQUFJLENB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Q0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBQ0Y7OztJQXBHRyx5Q0FBd0M7Ozs7O0lBQ3hDLDJDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZnJvbUNvbGxlY3Rpb25SZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4sIG9ic2VydmVPbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmltcG9ydCB7IERvY3VtZW50Q2hhbmdlVHlwZSwgQ29sbGVjdGlvblJlZmVyZW5jZSwgUXVlcnksIERvY3VtZW50UmVmZXJlbmNlLCBEb2N1bWVudERhdGEsIERvY3VtZW50Q2hhbmdlQWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBkb2NDaGFuZ2VzLCBzb3J0ZWRDaGFuZ2VzIH0gZnJvbSAnLi9jaGFuZ2VzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudCB9IGZyb20gJy4uL2RvY3VtZW50L2RvY3VtZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICcuLi9maXJlc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFdmVudHNBcnJheShldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSkge1xuICBpZighZXZlbnRzIHx8IGV2ZW50cyEubGVuZ3RoID09PSAwKSB7XG4gICAgZXZlbnRzID0gWydhZGRlZCcsICdyZW1vdmVkJywgJ21vZGlmaWVkJ107XG4gIH1cbiAgcmV0dXJuIGV2ZW50cztcbn1cblxuLyoqXG4gKiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiBzZXJ2aWNlXG4gKlxuICogVGhpcyBjbGFzcyBjcmVhdGVzIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIENvbGxlY3Rpb24uIEEgcmVmZXJlbmNlIGFuZCBhIHF1ZXJ5IGFyZSBwcm92aWRlZCBpblxuICogaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgcXVlcnkgY2FuIGJlIHRoZSB1bnF1ZXJpZWQgcmVmZXJlbmNlIGlmIG5vIHF1ZXJ5IGlzIGRlc2lyZWQuVGhlIGNsYXNzXG4gKiBpcyBnZW5lcmljIHdoaWNoIGdpdmVzIHlvdSB0eXBlIHNhZmV0eSBmb3IgZGF0YSB1cGRhdGUgbWV0aG9kcyBhbmQgZGF0YSBzdHJlYW1pbmcuXG4gKlxuICogVGhpcyBjbGFzcyB1c2VzIFN5bWJvbC5vYnNlcnZhYmxlIHRvIHRyYW5zZm9ybSBpbnRvIE9ic2VydmFibGUgdXNpbmcgT2JzZXJ2YWJsZS5mcm9tKCkuXG4gKlxuICogVGhpcyBjbGFzcyBpcyByYXJlbHkgdXNlZCBkaXJlY3RseSBhbmQgc2hvdWxkIGJlIGNyZWF0ZWQgZnJvbSB0aGUgQW5ndWxhckZpcmVzdG9yZSBzZXJ2aWNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogY29uc3QgY29sbGVjdGlvblJlZiA9IGZpcmViYXNlLmZpcmVzdG9yZS5jb2xsZWN0aW9uKCdzdG9ja3MnKTtcbiAqIGNvbnN0IHF1ZXJ5ID0gY29sbGVjdGlvblJlZi53aGVyZSgncHJpY2UnLCAnPicsICcwLjAxJyk7XG4gKiBjb25zdCBmYWtlU3RvY2sgPSBuZXcgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248U3RvY2s+KGNvbGxlY3Rpb25SZWYsIHF1ZXJ5KTtcbiAqXG4gKiAvLyBOT1RFITogdGhlIHVwZGF0ZXMgYXJlIHBlcmZvcm1lZCBvbiB0aGUgcmVmZXJlbmNlIG5vdCB0aGUgcXVlcnlcbiAqIGF3YWl0IGZha2VTdG9jay5hZGQoeyBuYW1lOiAnRkFLRScsIHByaWNlOiAwLjAxIH0pO1xuICpcbiAqIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGFzIHNuYXBzaG90cy4gVGhpcyBwcm92aWRlcyB5b3UgZGF0YSB1cGRhdGVzIGFzIHdlbGwgYXMgZGVsdGEgdXBkYXRlcy5cbiAqIGZha2VTdG9jay52YWx1ZUNoYW5nZXMoKS5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFQ9RG9jdW1lbnREYXRhPiB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgaW4gYSBDb2xsZWN0aW9uUmVmZXJlbmNlIGFuZCBRdWVyeSB0byBwcm92aWRlIHdyYXBwZXIgbWV0aG9kc1xuICAgKiBmb3IgZGF0YSBvcGVyYXRpb25zIGFuZCBkYXRhIHN0cmVhbWluZy5cbiAgICpcbiAgICogTm90ZTogRGF0YSBvcGVyYXRpb24gbWV0aG9kcyBhcmUgZG9uZSBvbiB0aGUgcmVmZXJlbmNlIG5vdCB0aGUgcXVlcnkuIFRoaXMgbWVhbnNcbiAgICogd2hlbiB5b3UgdXBkYXRlIGRhdGEgaXQgaXMgbm90IHVwZGF0aW5nIGRhdGEgdG8gdGhlIHdpbmRvdyBvZiB5b3VyIHF1ZXJ5IHVubGVzc1xuICAgKiB0aGUgZGF0YSBmaXRzIHRoZSBjcml0ZXJpYSBvZiB0aGUgcXVlcnkuIFNlZSB0aGUgQXNzb2NpYXRlZFJlZmVuY2UgdHlwZSBmb3IgZGV0YWlsc1xuICAgKiBvbiB0aGlzIGltcGxpY2F0aW9uLlxuICAgKiBAcGFyYW0gcmVmXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcXVlcnk6IFF1ZXJ5LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWZzOiBBbmd1bGFyRmlyZXN0b3JlKSB7IH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBsYXRlc3QgY2hhbmdlIGluIHRoZSBzdHJlYW0uIFRoaXMgbWV0aG9kIHJldHVybnMgY2hhbmdlc1xuICAgKiBhcyB0aGV5IG9jY3VyIGFuZCB0aGV5IGFyZSBub3Qgc29ydGVkIGJ5IHF1ZXJ5IG9yZGVyLiBUaGlzIGFsbG93cyB5b3UgdG8gY29uc3RydWN0XG4gICAqIHlvdXIgb3duIGRhdGEgc3RydWN0dXJlLlxuICAgKiBAcGFyYW0gZXZlbnRzXG4gICAqL1xuICBzdGF0ZUNoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBpZighZXZlbnRzIHx8IGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBkb2NDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLnBpcGUoXG4gICAgICAgIHRoaXMuYWZzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkb2NDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLnBpcGUoXG4gICAgICBtYXAoYWN0aW9ucyA9PiBhY3Rpb25zLmZpbHRlcihjaGFuZ2UgPT4gZXZlbnRzLmluZGV4T2YoY2hhbmdlLnR5cGUpID4gLTEpKSxcbiAgICAgIGZpbHRlcihjaGFuZ2VzID0+ICBjaGFuZ2VzLmxlbmd0aCA+IDApLFxuICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc3RyZWFtIG9mIGNoYW5nZXMgYXMgdGhleSBvY2N1ciBpdCB0aW1lLiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHN0YXRlQ2hhbmdlcygpXG4gICAqIGJ1dCBpdCBjb2xsZWN0cyBlYWNoIGV2ZW50IGluIGFuIGFycmF5IG92ZXIgdGltZS5cbiAgICogQHBhcmFtIGV2ZW50c1xuICAgKi9cbiAgYXVkaXRUcmFpbChldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlQ2hhbmdlcyhldmVudHMpLnBpcGUoc2NhbigoY3VycmVudCwgYWN0aW9uKSA9PiBbLi4uY3VycmVudCwgLi4uYWN0aW9uXSwgW10pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzdHJlYW0gb2Ygc3luY2hyb25pemVkIGNoYW5nZXMuIFRoaXMgbWV0aG9kIGtlZXBzIHRoZSBsb2NhbCBhcnJheSBpbiBzb3J0ZWRcbiAgICogcXVlcnkgb3JkZXIuXG4gICAqIEBwYXJhbSBldmVudHNcbiAgICovXG4gIHNuYXBzaG90Q2hhbmdlcyhldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIGNvbnN0IHZhbGlkYXRlZEV2ZW50cyA9IHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzKTtcbiAgICBjb25zdCBzY2hlZHVsZWRTb3J0ZWRDaGFuZ2VzJCA9IHNvcnRlZENoYW5nZXM8VD4odGhpcy5xdWVyeSwgdmFsaWRhdGVkRXZlbnRzLCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKTtcbiAgICByZXR1cm4gc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQucGlwZShcbiAgICAgIHRoaXMuYWZzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBhbGwgZG9jdW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uIGFuZCBpdHMgcG9zc2libGUgcXVlcnkgYXMgYW4gT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogSWYgdGhlIGBpZEZpZWxkYCBvcHRpb24gaXMgcHJvdmlkZWQsIGRvY3VtZW50IElEcyBhcmUgaW5jbHVkZWQgYW5kIG1hcHBlZCB0byB0aGVcbiAgICogcHJvdmlkZWQgYGlkRmllbGRgIHByb3BlcnR5IG5hbWUuXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxUW10+XG4gIHZhbHVlQ2hhbmdlcyh7fSk6IE9ic2VydmFibGU8VFtdPlxuICB2YWx1ZUNoYW5nZXM8SyBleHRlbmRzIHN0cmluZz4ob3B0aW9uczoge2lkRmllbGQ6IEt9KTogT2JzZXJ2YWJsZTwoVCAmIHsgW1QgaW4gS106IHN0cmluZyB9KVtdPlxuICB2YWx1ZUNoYW5nZXM8SyBleHRlbmRzIHN0cmluZz4ob3B0aW9uczoge2lkRmllbGQ/OiBLfSA9IHt9KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWY8VD4odGhpcy5xdWVyeSwgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcilcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoYWN0aW9ucyA9PiBhY3Rpb25zLnBheWxvYWQuZG9jcy5tYXAoYSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuaWRGaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uYS5kYXRhKCkgYXMgT2JqZWN0LFxuICAgICAgICAgICAgICAuLi57IFtvcHRpb25zLmlkRmllbGRdOiBhLmlkIH1cbiAgICAgICAgICAgIH0gYXMgVCAmIHsgW1QgaW4gS106IHN0cmluZyB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYS5kYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pKSxcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgcXVlcnkgb25jZS5cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGdldChvcHRpb25zPzogZmlyZXN0b3JlLkdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLnF1ZXJ5LmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIG9ic2VydmVPbih0aGlzLmFmcy5zY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGRhdGEgdG8gYSBjb2xsZWN0aW9uIHJlZmVyZW5jZS5cbiAgICpcbiAgICogTm90ZTogRGF0YSBvcGVyYXRpb24gbWV0aG9kcyBhcmUgZG9uZSBvbiB0aGUgcmVmZXJlbmNlIG5vdCB0aGUgcXVlcnkuIFRoaXMgbWVhbnNcbiAgICogd2hlbiB5b3UgdXBkYXRlIGRhdGEgaXQgaXMgbm90IHVwZGF0aW5nIGRhdGEgdG8gdGhlIHdpbmRvdyBvZiB5b3VyIHF1ZXJ5IHVubGVzc1xuICAgKiB0aGUgZGF0YSBmaXRzIHRoZSBjcml0ZXJpYSBvZiB0aGUgcXVlcnkuXG4gICAqL1xuICBhZGQoZGF0YTogVCk6IFByb21pc2U8RG9jdW1lbnRSZWZlcmVuY2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuYWRkKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlZmVyZW5jZSB0byBhIHNpbmdsZSBkb2N1bWVudCBpbiBhIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqL1xuICBkb2M8VD4ocGF0aD86IHN0cmluZyk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPiB7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD4odGhpcy5yZWYuZG9jKHBhdGgpLCB0aGlzLmFmcyk7XG4gIH1cbn1cbiJdfQ==