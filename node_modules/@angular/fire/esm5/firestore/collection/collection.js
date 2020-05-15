/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread } from "tslib";
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
var /**
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
AngularFirestoreCollection = /** @class */ (function () {
    /**
     * The constructor takes in a CollectionReference and Query to provide wrapper methods
     * for data operations and data streaming.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query. See the AssociatedRefence type for details
     * on this implication.
     * @param ref
     */
    function AngularFirestoreCollection(ref, query, afs) {
        this.ref = ref;
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
    AngularFirestoreCollection.prototype.stateChanges = /**
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
        return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(map((/**
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
    AngularFirestoreCollection.prototype.auditTrail = /**
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
    AngularFirestoreCollection.prototype.snapshotChanges = /**
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
     * @template K
     * @param {?=} options
     * @return {?}
     */
    AngularFirestoreCollection.prototype.valueChanges = /**
     * @template K
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        function (actions) { return actions.payload.docs.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            var _a;
            if (options.idField) {
                return (/** @type {?} */ (__assign(__assign({}, (/** @type {?} */ (a.data()))), (_a = {}, _a[options.idField] = a.id, _a))));
            }
            else {
                return a.data();
            }
        })); })), this.afs.keepUnstableUntilFirst);
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
    AngularFirestoreCollection.prototype.get = /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    };
    /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     */
    /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     * @param {?} data
     * @return {?}
     */
    AngularFirestoreCollection.prototype.add = /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this.ref.add(data);
    };
    /**
     * Create a reference to a single document in a collection.
     * @param path
     */
    /**
     * Create a reference to a single document in a collection.
     * @template T
     * @param {?=} path
     * @return {?}
     */
    AngularFirestoreCollection.prototype.doc = /**
     * Create a reference to a single document in a collection.
     * @template T
     * @param {?=} path
     * @return {?}
     */
    function (path) {
        return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
    };
    return AngularFirestoreCollection;
}());
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
export { AngularFirestoreCollection };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiY29sbGVjdGlvbi9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBR2hFLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUE2QjtJQUMvRCxJQUFHLENBQUMsTUFBTSxJQUFJLG1CQUFBLE1BQU0sRUFBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMzQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDRTs7Ozs7Ozs7O09BU0c7SUFDSCxvQ0FDa0IsR0FBd0IsRUFDdkIsS0FBWSxFQUNaLEdBQXFCO1FBRnRCLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFJLENBQUM7SUFFN0M7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsaURBQVk7Ozs7Ozs7SUFBWixVQUFhLE1BQTZCO1FBQ3hDLElBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FB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QUgsVUFBSSxJQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsd0NBQUc7Ozs7OztJQUFILFVBQU8sSUFBYTtRQUNsQixPQUFPLElBQUksd0JBQXdCLENBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUFoSEQsSUFnSEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFwR0cseUNBQXdDOzs7OztJQUN4QywyQ0FBNkI7Ozs7O0lBQzdCLHlDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZyb21Db2xsZWN0aW9uUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5pbXBvcnQgeyBEb2N1bWVudENoYW5nZVR5cGUsIENvbGxlY3Rpb25SZWZlcmVuY2UsIFF1ZXJ5LCBEb2N1bWVudFJlZmVyZW5jZSwgRG9jdW1lbnREYXRhLCBEb2N1bWVudENoYW5nZUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZG9jQ2hhbmdlcywgc29ydGVkQ2hhbmdlcyB9IGZyb20gJy4vY2hhbmdlcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgfSBmcm9tICcuLi9kb2N1bWVudC9kb2N1bWVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnLi4vZmlyZXN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pIHtcbiAgaWYoIWV2ZW50cyB8fCBldmVudHMhLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2ZW50cyA9IFsnYWRkZWQnLCAncmVtb3ZlZCcsICdtb2RpZmllZCddO1xuICB9XG4gIHJldHVybiBldmVudHM7XG59XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb24gc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBDb2xsZWN0aW9uLiBBIHJlZmVyZW5jZSBhbmQgYSBxdWVyeSBhcmUgcHJvdmlkZWQgaW5cbiAqIGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhlIHF1ZXJ5IGNhbiBiZSB0aGUgdW5xdWVyaWVkIHJlZmVyZW5jZSBpZiBubyBxdWVyeSBpcyBkZXNpcmVkLlRoZSBjbGFzc1xuICogaXMgZ2VuZXJpYyB3aGljaCBnaXZlcyB5b3UgdHlwZSBzYWZldHkgZm9yIGRhdGEgdXBkYXRlIG1ldGhvZHMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyBTeW1ib2wub2JzZXJ2YWJsZSB0byB0cmFuc2Zvcm0gaW50byBPYnNlcnZhYmxlIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcmFyZWx5IHVzZWQgZGlyZWN0bHkgYW5kIHNob3VsZCBiZSBjcmVhdGVkIGZyb20gdGhlIEFuZ3VsYXJGaXJlc3RvcmUgc2VydmljZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSBmaXJlYmFzZS5maXJlc3RvcmUuY29sbGVjdGlvbignc3RvY2tzJyk7XG4gKiBjb25zdCBxdWVyeSA9IGNvbGxlY3Rpb25SZWYud2hlcmUoJ3ByaWNlJywgJz4nLCAnMC4wMScpO1xuICogY29uc3QgZmFrZVN0b2NrID0gbmV3IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFN0b2NrPihjb2xsZWN0aW9uUmVmLCBxdWVyeSk7XG4gKlxuICogLy8gTk9URSE6IHRoZSB1cGRhdGVzIGFyZSBwZXJmb3JtZWQgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5XG4gKiBhd2FpdCBmYWtlU3RvY2suYWRkKHsgbmFtZTogJ0ZBS0UnLCBwcmljZTogMC4wMSB9KTtcbiAqXG4gKiAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBhcyBzbmFwc2hvdHMuIFRoaXMgcHJvdmlkZXMgeW91IGRhdGEgdXBkYXRlcyBhcyB3ZWxsIGFzIGRlbHRhIHVwZGF0ZXMuXG4gKiBmYWtlU3RvY2sudmFsdWVDaGFuZ2VzKCkuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPURvY3VtZW50RGF0YT4ge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHRha2VzIGluIGEgQ29sbGVjdGlvblJlZmVyZW5jZSBhbmQgUXVlcnkgdG8gcHJvdmlkZSB3cmFwcGVyIG1ldGhvZHNcbiAgICogZm9yIGRhdGEgb3BlcmF0aW9ucyBhbmQgZGF0YSBzdHJlYW1pbmcuXG4gICAqXG4gICAqIE5vdGU6IERhdGEgb3BlcmF0aW9uIG1ldGhvZHMgYXJlIGRvbmUgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5LiBUaGlzIG1lYW5zXG4gICAqIHdoZW4geW91IHVwZGF0ZSBkYXRhIGl0IGlzIG5vdCB1cGRhdGluZyBkYXRhIHRvIHRoZSB3aW5kb3cgb2YgeW91ciBxdWVyeSB1bmxlc3NcbiAgICogdGhlIGRhdGEgZml0cyB0aGUgY3JpdGVyaWEgb2YgdGhlIHF1ZXJ5LiBTZWUgdGhlIEFzc29jaWF0ZWRSZWZlbmNlIHR5cGUgZm9yIGRldGFpbHNcbiAgICogb24gdGhpcyBpbXBsaWNhdGlvbi5cbiAgICogQHBhcmFtIHJlZlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IHJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHF1ZXJ5OiBRdWVyeSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFmczogQW5ndWxhckZpcmVzdG9yZSkgeyB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgbGF0ZXN0IGNoYW5nZSBpbiB0aGUgc3RyZWFtLiBUaGlzIG1ldGhvZCByZXR1cm5zIGNoYW5nZXNcbiAgICogYXMgdGhleSBvY2N1ciBhbmQgdGhleSBhcmUgbm90IHNvcnRlZCBieSBxdWVyeSBvcmRlci4gVGhpcyBhbGxvd3MgeW91IHRvIGNvbnN0cnVjdFxuICAgKiB5b3VyIG93biBkYXRhIHN0cnVjdHVyZS5cbiAgICogQHBhcmFtIGV2ZW50c1xuICAgKi9cbiAgc3RhdGVDaGFuZ2VzKGV2ZW50cz86IERvY3VtZW50Q2hhbmdlVHlwZVtdKTogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxUPltdPiB7XG4gICAgaWYoIWV2ZW50cyB8fCBldmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZG9jQ2hhbmdlczxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKS5waXBlKFxuICAgICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZG9jQ2hhbmdlczxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKS5waXBlKFxuICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5maWx0ZXIoY2hhbmdlID0+IGV2ZW50cy5pbmRleE9mKGNoYW5nZS50eXBlKSA+IC0xKSksXG4gICAgICBmaWx0ZXIoY2hhbmdlcyA9PiAgY2hhbmdlcy5sZW5ndGggPiAwKSxcbiAgICAgIHRoaXMuYWZzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHN0cmVhbSBvZiBjaGFuZ2VzIGFzIHRoZXkgb2NjdXIgaXQgdGltZS4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byBzdGF0ZUNoYW5nZXMoKVxuICAgKiBidXQgaXQgY29sbGVjdHMgZWFjaCBldmVudCBpbiBhbiBhcnJheSBvdmVyIHRpbWUuXG4gICAqIEBwYXJhbSBldmVudHNcbiAgICovXG4gIGF1ZGl0VHJhaWwoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZUNoYW5nZXMoZXZlbnRzKS5waXBlKHNjYW4oKGN1cnJlbnQsIGFjdGlvbikgPT4gWy4uLmN1cnJlbnQsIC4uLmFjdGlvbl0sIFtdKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc3RyZWFtIG9mIHN5bmNocm9uaXplZCBjaGFuZ2VzLiBUaGlzIG1ldGhvZCBrZWVwcyB0aGUgbG9jYWwgYXJyYXkgaW4gc29ydGVkXG4gICAqIHF1ZXJ5IG9yZGVyLlxuICAgKiBAcGFyYW0gZXZlbnRzXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBjb25zdCB2YWxpZGF0ZWRFdmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cyk7XG4gICAgY29uc3Qgc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQgPSBzb3J0ZWRDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHZhbGlkYXRlZEV2ZW50cywgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcik7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFNvcnRlZENoYW5nZXMkLnBpcGUoXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gYWxsIGRvY3VtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgaXRzIHBvc3NpYmxlIHF1ZXJ5IGFzIGFuIE9ic2VydmFibGUuXG4gICAqXG4gICAqIElmIHRoZSBgaWRGaWVsZGAgb3B0aW9uIGlzIHByb3ZpZGVkLCBkb2N1bWVudCBJRHMgYXJlIGluY2x1ZGVkIGFuZCBtYXBwZWQgdG8gdGhlXG4gICAqIHByb3ZpZGVkIGBpZEZpZWxkYCBwcm9wZXJ0eSBuYW1lLlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgdmFsdWVDaGFuZ2VzKCk6IE9ic2VydmFibGU8VFtdPlxuICB2YWx1ZUNoYW5nZXMoe30pOiBPYnNlcnZhYmxlPFRbXT5cbiAgdmFsdWVDaGFuZ2VzPEsgZXh0ZW5kcyBzdHJpbmc+KG9wdGlvbnM6IHtpZEZpZWxkOiBLfSk6IE9ic2VydmFibGU8KFQgJiB7IFtUIGluIEtdOiBzdHJpbmcgfSlbXT5cbiAgdmFsdWVDaGFuZ2VzPEsgZXh0ZW5kcyBzdHJpbmc+KG9wdGlvbnM6IHtpZEZpZWxkPzogS30gPSB7fSk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIGZyb21Db2xsZWN0aW9uUmVmPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5wYXlsb2FkLmRvY3MubWFwKGEgPT4ge1xuICAgICAgICAgIGlmIChvcHRpb25zLmlkRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmEuZGF0YSgpIGFzIE9iamVjdCxcbiAgICAgICAgICAgICAgLi4ueyBbb3B0aW9ucy5pZEZpZWxkXTogYS5pZCB9XG4gICAgICAgICAgICB9IGFzIFQgJiB7IFtUIGluIEtdOiBzdHJpbmcgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGEuZGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KSksXG4gICAgICAgIHRoaXMuYWZzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHJlc3VsdHMgb2YgdGhlIHF1ZXJ5IG9uY2UuXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBnZXQob3B0aW9ucz86IGZpcmVzdG9yZS5HZXRPcHRpb25zKSB7XG4gICAgcmV0dXJuIGZyb20odGhpcy5xdWVyeS5nZXQob3B0aW9ucykpLnBpcGUoXG4gICAgICBvYnNlcnZlT24odGhpcy5hZnMuc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBkYXRhIHRvIGEgY29sbGVjdGlvbiByZWZlcmVuY2UuXG4gICAqXG4gICAqIE5vdGU6IERhdGEgb3BlcmF0aW9uIG1ldGhvZHMgYXJlIGRvbmUgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5LiBUaGlzIG1lYW5zXG4gICAqIHdoZW4geW91IHVwZGF0ZSBkYXRhIGl0IGlzIG5vdCB1cGRhdGluZyBkYXRhIHRvIHRoZSB3aW5kb3cgb2YgeW91ciBxdWVyeSB1bmxlc3NcbiAgICogdGhlIGRhdGEgZml0cyB0aGUgY3JpdGVyaWEgb2YgdGhlIHF1ZXJ5LlxuICAgKi9cbiAgYWRkKGRhdGE6IFQpOiBQcm9taXNlPERvY3VtZW50UmVmZXJlbmNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLmFkZChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBzaW5nbGUgZG9jdW1lbnQgaW4gYSBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gcGF0aFxuICAgKi9cbiAgZG9jPFQ+KHBhdGg/OiBzdHJpbmcpOiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD4ge1xuICAgIHJldHVybiBuZXcgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFQ+KHRoaXMucmVmLmRvYyhwYXRoKSwgdGhpcy5hZnMpO1xuICB9XG59XG4iXX0=