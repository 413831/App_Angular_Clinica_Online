/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { from } from 'rxjs';
import { fromCollectionRef } from '../observable/fromRef';
import { map, filter, scan, observeOn } from 'rxjs/operators';
import { validateEventsArray } from '../collection/collection';
import { docChanges, sortedChanges } from '../collection/changes';
/**
 * AngularFirestoreCollectionGroup service
 *
 * This class holds a reference to a Firestore Collection Group Query.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionGroup = firebase.firestore.collectionGroup('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollectionGroup<Stock>(query, afs);
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
var /**
 * AngularFirestoreCollectionGroup service
 *
 * This class holds a reference to a Firestore Collection Group Query.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionGroup = firebase.firestore.collectionGroup('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollectionGroup<Stock>(query, afs);
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
AngularFirestoreCollectionGroup = /** @class */ (function () {
    /**
     * The constructor takes in a CollectionGroupQuery to provide wrapper methods
     * for data operations and data streaming.
     * @param query
     * @param afs
     */
    function AngularFirestoreCollectionGroup(query, afs) {
        this.query = query;
        this.afs = afs;
    }
    /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     * @param events
     */
    /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     * @param {?=} events
     * @return {?}
     */
    AngularFirestoreCollectionGroup.prototype.stateChanges = /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     * @param {?=} events
     * @return {?}
     */
    function (events) {
        if (!events || events.length === 0) {
            return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(this.afs.keepUnstableUntilFirst);
        }
        return docChanges(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        function (actions) { return actions.filter((/**
         * @param {?} change
         * @return {?}
         */
        function (change) { return events.indexOf(change.type) > -1; })); })), filter((/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) { return changes.length > 0; })), this.afs.keepUnstableUntilFirst);
    };
    /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     * @param events
     */
    /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     * @param {?=} events
     * @return {?}
     */
    AngularFirestoreCollectionGroup.prototype.auditTrail = /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     * @param {?=} events
     * @return {?}
     */
    function (events) {
        return this.stateChanges(events).pipe(scan((/**
         * @param {?} current
         * @param {?} action
         * @return {?}
         */
        function (current, action) { return __spread(current, action); }), []));
    };
    /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     * @param events
     */
    /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     * @param {?=} events
     * @return {?}
     */
    AngularFirestoreCollectionGroup.prototype.snapshotChanges = /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     * @param {?=} events
     * @return {?}
     */
    function (events) {
        /** @type {?} */
        var validatedEvents = validateEventsArray(events);
        /** @type {?} */
        var scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
        return scheduledSortedChanges$.pipe(this.afs.keepUnstableUntilFirst);
    };
    /**
     * Listen to all documents in the collection and its possible query as an Observable.
     */
    /**
     * Listen to all documents in the collection and its possible query as an Observable.
     * @return {?}
     */
    AngularFirestoreCollectionGroup.prototype.valueChanges = /**
     * Listen to all documents in the collection and its possible query as an Observable.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fromCollectionRefScheduled$ = fromCollectionRef(this.query, this.afs.schedulers.outsideAngular);
        return fromCollectionRefScheduled$
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        function (actions) { return actions.payload.docs.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.data(); })); })), this.afs.keepUnstableUntilFirst);
    };
    /**
     * Retrieve the results of the query once.
     * @param options
     */
    /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    AngularFirestoreCollectionGroup.prototype.get = /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    };
    return AngularFirestoreCollectionGroup;
}());
/**
 * AngularFirestoreCollectionGroup service
 *
 * This class holds a reference to a Firestore Collection Group Query.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionGroup = firebase.firestore.collectionGroup('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollectionGroup<Stock>(query, afs);
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
export { AngularFirestoreCollectionGroup };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollectionGroup.prototype.query;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollectionGroup.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiY29sbGVjdGlvbi1ncm91cC9jb2xsZWN0aW9uLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQmxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNFOzs7OztPQUtHO0lBQ0gseUNBQ21CLEtBQVksRUFDWixHQUFxQjtRQURyQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBa0I7SUFBSSxDQUFDO0lBRTdDOzs7OztPQUtHOzs7Ozs7OztJQUNILHNEQUFZOzs7Ozs7O0lBQVosVUFBYSxNQUE2QjtRQUN4QyxJQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sVUFBVSxDQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUNoQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLFVBQVUsQ0FBSSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQzthQUNqRSxJQUFJLENBQ0gsR0FBRzs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxFQUFDLEVBQTFELENBQTBELEVBQUMsRUFDMUUsTUFBTTs7OztRQUFDLFVBQUEsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWxCLENBQWtCLEVBQUMsRUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0RBQVU7Ozs7OztJQUFWLFVBQVcsTUFBNkI7UUFDdEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSyxnQkFBSSxPQUFPLEVBQUssTUFBTSxHQUF0QixDQUF1QixHQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCx5REFBZTs7Ozs7O0lBQWYsVUFBZ0IsTUFBNkI7O1lBQ3JDLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7O1lBQzdDLHVCQUF1QixHQUFHLGFBQWEsQ0FBSSxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDakgsT0FBTyx1QkFBdUIsQ0FBQyxJQUFJLENBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0RBQVk7Ozs7SUFBWjs7WUFDUSwyQkFBMkIsR0FBRyxpQkFBaUIsQ0FBSSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUN4RyxPQUFPLDJCQUEyQjthQUMvQixJQUFJLENBQ0gsR0FBRzs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsRUFBQyxFQUF2QyxDQUF1QyxFQUFDLEVBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQ2hDLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw2Q0FBRzs7Ozs7SUFBSCxVQUFJLE9BQThCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQzdDLENBQUM7SUFDSixDQUFDO0lBRUgsc0NBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW5FRyxnREFBNkI7Ozs7O0lBQzdCLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZyb21Db2xsZWN0aW9uUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5pbXBvcnQgeyBEb2N1bWVudENoYW5nZVR5cGUsIFF1ZXJ5LCBEb2N1bWVudERhdGEsIERvY3VtZW50Q2hhbmdlQWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50c0FycmF5IH0gZnJvbSAnLi4vY29sbGVjdGlvbi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IGRvY0NoYW5nZXMsIHNvcnRlZENoYW5nZXMgfSBmcm9tICcuLi9jb2xsZWN0aW9uL2NoYW5nZXMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSB9IGZyb20gJy4uL2ZpcmVzdG9yZSc7XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb25Hcm91cCBzZXJ2aWNlXG4gKlxuICogVGhpcyBjbGFzcyBob2xkcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBDb2xsZWN0aW9uIEdyb3VwIFF1ZXJ5LlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyBTeW1ib2wub2JzZXJ2YWJsZSB0byB0cmFuc2Zvcm0gaW50byBPYnNlcnZhYmxlIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcmFyZWx5IHVzZWQgZGlyZWN0bHkgYW5kIHNob3VsZCBiZSBjcmVhdGVkIGZyb20gdGhlIEFuZ3VsYXJGaXJlc3RvcmUgc2VydmljZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IGNvbGxlY3Rpb25Hcm91cCA9IGZpcmViYXNlLmZpcmVzdG9yZS5jb2xsZWN0aW9uR3JvdXAoJ3N0b2NrcycpO1xuICogY29uc3QgcXVlcnkgPSBjb2xsZWN0aW9uUmVmLndoZXJlKCdwcmljZScsICc+JywgJzAuMDEnKTtcbiAqIGNvbnN0IGZha2VTdG9jayA9IG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFN0b2NrPihxdWVyeSwgYWZzKTtcbiAqXG4gKiAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBhcyBzbmFwc2hvdHMuIFRoaXMgcHJvdmlkZXMgeW91IGRhdGEgdXBkYXRlcyBhcyB3ZWxsIGFzIGRlbHRhIHVwZGF0ZXMuXG4gKiBmYWtlU3RvY2sudmFsdWVDaGFuZ2VzKCkuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFQ9RG9jdW1lbnREYXRhPiB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgaW4gYSBDb2xsZWN0aW9uR3JvdXBRdWVyeSB0byBwcm92aWRlIHdyYXBwZXIgbWV0aG9kc1xuICAgKiBmb3IgZGF0YSBvcGVyYXRpb25zIGFuZCBkYXRhIHN0cmVhbWluZy5cbiAgICogQHBhcmFtIHF1ZXJ5XG4gICAqIEBwYXJhbSBhZnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcXVlcnk6IFF1ZXJ5LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWZzOiBBbmd1bGFyRmlyZXN0b3JlKSB7IH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBsYXRlc3QgY2hhbmdlIGluIHRoZSBzdHJlYW0uIFRoaXMgbWV0aG9kIHJldHVybnMgY2hhbmdlc1xuICAgKiBhcyB0aGV5IG9jY3VyIGFuZCB0aGV5IGFyZSBub3Qgc29ydGVkIGJ5IHF1ZXJ5IG9yZGVyLiBUaGlzIGFsbG93cyB5b3UgdG8gY29uc3RydWN0XG4gICAqIHlvdXIgb3duIGRhdGEgc3RydWN0dXJlLlxuICAgKiBAcGFyYW0gZXZlbnRzXG4gICAqL1xuICBzdGF0ZUNoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBpZighZXZlbnRzIHx8IGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBkb2NDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLnBpcGUoXG4gICAgICAgIHRoaXMuYWZzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkb2NDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5maWx0ZXIoY2hhbmdlID0+IGV2ZW50cy5pbmRleE9mKGNoYW5nZS50eXBlKSA+IC0xKSksXG4gICAgICAgIGZpbHRlcihjaGFuZ2VzID0+ICBjaGFuZ2VzLmxlbmd0aCA+IDApLFxuICAgICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHN0cmVhbSBvZiBjaGFuZ2VzIGFzIHRoZXkgb2NjdXIgaXQgdGltZS4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byBzdGF0ZUNoYW5nZXMoKVxuICAgKiBidXQgaXQgY29sbGVjdHMgZWFjaCBldmVudCBpbiBhbiBhcnJheSBvdmVyIHRpbWUuXG4gICAqIEBwYXJhbSBldmVudHNcbiAgICovXG4gIGF1ZGl0VHJhaWwoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZUNoYW5nZXMoZXZlbnRzKS5waXBlKHNjYW4oKGN1cnJlbnQsIGFjdGlvbikgPT4gWy4uLmN1cnJlbnQsIC4uLmFjdGlvbl0sIFtdKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc3RyZWFtIG9mIHN5bmNocm9uaXplZCBjaGFuZ2VzLiBUaGlzIG1ldGhvZCBrZWVwcyB0aGUgbG9jYWwgYXJyYXkgaW4gc29ydGVkXG4gICAqIHF1ZXJ5IG9yZGVyLlxuICAgKiBAcGFyYW0gZXZlbnRzXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBjb25zdCB2YWxpZGF0ZWRFdmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cyk7XG4gICAgY29uc3Qgc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQgPSBzb3J0ZWRDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHZhbGlkYXRlZEV2ZW50cywgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcik7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFNvcnRlZENoYW5nZXMkLnBpcGUoXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gYWxsIGRvY3VtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgaXRzIHBvc3NpYmxlIHF1ZXJ5IGFzIGFuIE9ic2VydmFibGUuXG4gICAqL1xuICB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICBjb25zdCBmcm9tQ29sbGVjdGlvblJlZlNjaGVkdWxlZCQgPSBmcm9tQ29sbGVjdGlvblJlZjxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKTtcbiAgICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWZTY2hlZHVsZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5wYXlsb2FkLmRvY3MubWFwKGEgPT4gYS5kYXRhKCkpKSxcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgcXVlcnkgb25jZS5cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGdldChvcHRpb25zPzogZmlyZXN0b3JlLkdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLnF1ZXJ5LmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIG9ic2VydmVPbih0aGlzLmFmcy5zY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpXG4gICAgKTtcbiAgfVxuXG59XG4iXX0=