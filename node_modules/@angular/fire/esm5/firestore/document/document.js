/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { fromDocRef } from '../observable/fromRef';
import { map, observeOn } from 'rxjs/operators';
import { associateQuery } from '../firestore';
import { AngularFirestoreCollection } from '../collection/collection';
/**
 * AngularFirestoreDocument service
 *
 * This class creates a reference to a Firestore Document. A reference is provided in
 * in the constructor. The class is generic which gives you type safety for data update
 * methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const fakeStock = new AngularFirestoreDocument<Stock>(doc('stocks/FAKE'));
 * await fakeStock.set({ name: 'FAKE', price: 0.01 });
 * fakeStock.valueChanges().map(snap => {
 *   if(snap.exists) return snap.data();
 *   return null;
 * }).subscribe(value => console.log(value));
 * // OR! Transform using Observable.from() and the data is unwrapped for you
 * Observable.from(fakeStock).subscribe(value => console.log(value));
 * @template T
 */
var /**
 * AngularFirestoreDocument service
 *
 * This class creates a reference to a Firestore Document. A reference is provided in
 * in the constructor. The class is generic which gives you type safety for data update
 * methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const fakeStock = new AngularFirestoreDocument<Stock>(doc('stocks/FAKE'));
 * await fakeStock.set({ name: 'FAKE', price: 0.01 });
 * fakeStock.valueChanges().map(snap => {
 *   if(snap.exists) return snap.data();
 *   return null;
 * }).subscribe(value => console.log(value));
 * // OR! Transform using Observable.from() and the data is unwrapped for you
 * Observable.from(fakeStock).subscribe(value => console.log(value));
 * @template T
 */
AngularFirestoreDocument = /** @class */ (function () {
    /**
     * The contstuctor takes in a DocumentReference to provide wrapper methods
     * for data operations, data streaming, and Symbol.observable.
     * @param ref
     */
    function AngularFirestoreDocument(ref, afs) {
        this.ref = ref;
        this.afs = afs;
    }
    /**
     * Create or overwrite a single document.
     * @param data
     * @param options
     */
    /**
     * Create or overwrite a single document.
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    AngularFirestoreDocument.prototype.set = /**
     * Create or overwrite a single document.
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (data, options) {
        return this.ref.set(data, options);
    };
    /**
     * Update some fields of a document without overwriting the entire document.
     * @param data
     */
    /**
     * Update some fields of a document without overwriting the entire document.
     * @param {?} data
     * @return {?}
     */
    AngularFirestoreDocument.prototype.update = /**
     * Update some fields of a document without overwriting the entire document.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this.ref.update(data);
    };
    /**
     * Delete a document.
     */
    /**
     * Delete a document.
     * @return {?}
     */
    AngularFirestoreDocument.prototype.delete = /**
     * Delete a document.
     * @return {?}
     */
    function () {
        return this.ref.delete();
    };
    /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     * @param path
     * @param queryFn
     */
    /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     * @template R
     * @param {?} path
     * @param {?=} queryFn
     * @return {?}
     */
    AngularFirestoreDocument.prototype.collection = /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     * @template R
     * @param {?} path
     * @param {?=} queryFn
     * @return {?}
     */
    function (path, queryFn) {
        /** @type {?} */
        var collectionRef = this.ref.collection(path);
        var _a = associateQuery(collectionRef, queryFn), ref = _a.ref, query = _a.query;
        return new AngularFirestoreCollection(ref, query, this.afs);
    };
    /**
     * Listen to snapshot updates from the document.
     */
    /**
     * Listen to snapshot updates from the document.
     * @return {?}
     */
    AngularFirestoreDocument.prototype.snapshotChanges = /**
     * Listen to snapshot updates from the document.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
        return scheduledFromDocRef$.pipe(this.afs.keepUnstableUntilFirst);
    };
    /**
     * Listen to unwrapped snapshot updates from the document.
     */
    /**
     * Listen to unwrapped snapshot updates from the document.
     * @return {?}
     */
    AngularFirestoreDocument.prototype.valueChanges = /**
     * Listen to unwrapped snapshot updates from the document.
     * @return {?}
     */
    function () {
        return this.snapshotChanges().pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            return action.payload.data();
        })));
    };
    /**
     * Retrieve the document once.
     * @param options
     */
    /**
     * Retrieve the document once.
     * @param {?=} options
     * @return {?}
     */
    AngularFirestoreDocument.prototype.get = /**
     * Retrieve the document once.
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return from(this.ref.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    };
    return AngularFirestoreDocument;
}());
/**
 * AngularFirestoreDocument service
 *
 * This class creates a reference to a Firestore Document. A reference is provided in
 * in the constructor. The class is generic which gives you type safety for data update
 * methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const fakeStock = new AngularFirestoreDocument<Stock>(doc('stocks/FAKE'));
 * await fakeStock.set({ name: 'FAKE', price: 0.01 });
 * fakeStock.valueChanges().map(snap => {
 *   if(snap.exists) return snap.data();
 *   return null;
 * }).subscribe(value => console.log(value));
 * // OR! Transform using Observable.from() and the data is unwrapped for you
 * Observable.from(fakeStock).subscribe(value => console.log(value));
 * @template T
 */
export { AngularFirestoreDocument };
if (false) {
    /** @type {?} */
    AngularFirestoreDocument.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreDocument.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2ZpcmVzdG9yZS8iLCJzb3VyY2VzIjpbImRvY3VtZW50L2RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBb0IsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFRTs7OztPQUlHO0lBQ0gsa0NBQW1CLEdBQXNCLEVBQVUsR0FBcUI7UUFBckQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFJLENBQUM7SUFFN0U7Ozs7T0FJRzs7Ozs7OztJQUNILHNDQUFHOzs7Ozs7SUFBSCxVQUFJLElBQU8sRUFBRSxPQUFvQjtRQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx5Q0FBTTs7Ozs7SUFBTixVQUFPLElBQWdCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHlDQUFNOzs7O0lBQU47UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSCw2Q0FBVTs7Ozs7Ozs7SUFBVixVQUEyQixJQUFZLEVBQUUsT0FBaUI7O1lBQ2xELGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDekMsSUFBQSwyQ0FBdUQsRUFBckQsWUFBRyxFQUFFLGdCQUFnRDtRQUM3RCxPQUFPLElBQUksMEJBQTBCLENBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGtEQUFlOzs7O0lBQWY7O1lBQ1Esb0JBQW9CLEdBQUcsVUFBVSxDQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ3hGLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUNoQyxDQUFBO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILCtDQUFZOzs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ2hDLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHNDQUFHOzs7OztJQUFILFVBQUksT0FBOEI7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FDN0MsQ0FBQztJQUNKLENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUEzRUQsSUEyRUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXBFYSx1Q0FBNkI7Ozs7O0lBQUUsdUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRG9jdW1lbnRSZWZlcmVuY2UsIFNldE9wdGlvbnMsIERvY3VtZW50RGF0YSwgUXVlcnlGbiwgQWN0aW9uLCBEb2N1bWVudFNuYXBzaG90IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBmcm9tRG9jUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IG1hcCwgb2JzZXJ2ZU9uIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSwgYXNzb2NpYXRlUXVlcnkgfSBmcm9tICcuLi9maXJlc3RvcmUnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9jb2xsZWN0aW9uL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcblxuLyoqXG4gKiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBEb2N1bWVudC4gQSByZWZlcmVuY2UgaXMgcHJvdmlkZWQgaW5cbiAqIGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhlIGNsYXNzIGlzIGdlbmVyaWMgd2hpY2ggZ2l2ZXMgeW91IHR5cGUgc2FmZXR5IGZvciBkYXRhIHVwZGF0ZVxuICogbWV0aG9kcyBhbmQgZGF0YSBzdHJlYW1pbmcuXG4gKlxuICogVGhpcyBjbGFzcyB1c2VzIFN5bWJvbC5vYnNlcnZhYmxlIHRvIHRyYW5zZm9ybSBpbnRvIE9ic2VydmFibGUgdXNpbmcgT2JzZXJ2YWJsZS5mcm9tKCkuXG4gKlxuICogVGhpcyBjbGFzcyBpcyByYXJlbHkgdXNlZCBkaXJlY3RseSBhbmQgc2hvdWxkIGJlIGNyZWF0ZWQgZnJvbSB0aGUgQW5ndWxhckZpcmVzdG9yZSBzZXJ2aWNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogY29uc3QgZmFrZVN0b2NrID0gbmV3IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxTdG9jaz4oZG9jKCdzdG9ja3MvRkFLRScpKTtcbiAqIGF3YWl0IGZha2VTdG9jay5zZXQoeyBuYW1lOiAnRkFLRScsIHByaWNlOiAwLjAxIH0pO1xuICogZmFrZVN0b2NrLnZhbHVlQ2hhbmdlcygpLm1hcChzbmFwID0+IHtcbiAqICAgaWYoc25hcC5leGlzdHMpIHJldHVybiBzbmFwLmRhdGEoKTtcbiAqICAgcmV0dXJuIG51bGw7XG4gKiB9KS5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqIC8vIE9SISBUcmFuc2Zvcm0gdXNpbmcgT2JzZXJ2YWJsZS5mcm9tKCkgYW5kIHRoZSBkYXRhIGlzIHVud3JhcHBlZCBmb3IgeW91XG4gKiBPYnNlcnZhYmxlLmZyb20oZmFrZVN0b2NrKS5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPURvY3VtZW50RGF0YT4ge1xuXG4gIC8qKlxuICAgKiBUaGUgY29udHN0dWN0b3IgdGFrZXMgaW4gYSBEb2N1bWVudFJlZmVyZW5jZSB0byBwcm92aWRlIHdyYXBwZXIgbWV0aG9kc1xuICAgKiBmb3IgZGF0YSBvcGVyYXRpb25zLCBkYXRhIHN0cmVhbWluZywgYW5kIFN5bWJvbC5vYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0gcmVmXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVmOiBEb2N1bWVudFJlZmVyZW5jZSwgcHJpdmF0ZSBhZnM6IEFuZ3VsYXJGaXJlc3RvcmUpIHsgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgb3Igb3ZlcndyaXRlIGEgc2luZ2xlIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgc2V0KGRhdGE6IFQsIG9wdGlvbnM/OiBTZXRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLnNldChkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc29tZSBmaWVsZHMgb2YgYSBkb2N1bWVudCB3aXRob3V0IG92ZXJ3cml0aW5nIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICB1cGRhdGUoZGF0YTogUGFydGlhbDxUPik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnJlZi51cGRhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgZG9jdW1lbnQuXG4gICAqL1xuICBkZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLmRlbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlZmVyZW5jZSB0byBhIHN1Yi1jb2xsZWN0aW9uIGdpdmVuIGEgcGF0aCBhbmQgYW4gb3B0aW9uYWwgcXVlcnlcbiAgICogZnVuY3Rpb24uXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEBwYXJhbSBxdWVyeUZuXG4gICAqL1xuICBjb2xsZWN0aW9uPFI9RG9jdW1lbnREYXRhPihwYXRoOiBzdHJpbmcsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248Uj4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSB0aGlzLnJlZi5jb2xsZWN0aW9uKHBhdGgpO1xuICAgIGNvbnN0IHsgcmVmLCBxdWVyeSB9ID0gYXNzb2NpYXRlUXVlcnkoY29sbGVjdGlvblJlZiwgcXVlcnlGbik7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxSPihyZWYsIHF1ZXJ5LCB0aGlzLmFmcyk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHNuYXBzaG90IHVwZGF0ZXMgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoKTogT2JzZXJ2YWJsZTxBY3Rpb248RG9jdW1lbnRTbmFwc2hvdDxUPj4+IHtcbiAgICBjb25zdCBzY2hlZHVsZWRGcm9tRG9jUmVmJCA9IGZyb21Eb2NSZWY8VD4odGhpcy5yZWYsIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpO1xuICAgIHJldHVybiBzY2hlZHVsZWRGcm9tRG9jUmVmJC5waXBlKFxuICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdW53cmFwcGVkIHNuYXBzaG90IHVwZGF0ZXMgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAqL1xuICB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxUfHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnNuYXBzaG90Q2hhbmdlcygpLnBpcGUoXG4gICAgICBtYXAoYWN0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLmRhdGEoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnQgb25jZS5cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGdldChvcHRpb25zPzogZmlyZXN0b3JlLkdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLnJlZi5nZXQob3B0aW9ucykpLnBpcGUoXG4gICAgICBvYnNlcnZlT24odGhpcy5hZnMuc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICApO1xuICB9XG59XG4iXX0=