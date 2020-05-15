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
export class AngularFirestoreDocument {
    /**
     * The contstuctor takes in a DocumentReference to provide wrapper methods
     * for data operations, data streaming, and Symbol.observable.
     * @param {?} ref
     * @param {?} afs
     */
    constructor(ref, afs) {
        this.ref = ref;
        this.afs = afs;
    }
    /**
     * Create or overwrite a single document.
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    set(data, options) {
        return this.ref.set(data, options);
    }
    /**
     * Update some fields of a document without overwriting the entire document.
     * @param {?} data
     * @return {?}
     */
    update(data) {
        return this.ref.update(data);
    }
    /**
     * Delete a document.
     * @return {?}
     */
    delete() {
        return this.ref.delete();
    }
    /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     * @template R
     * @param {?} path
     * @param {?=} queryFn
     * @return {?}
     */
    collection(path, queryFn) {
        /** @type {?} */
        const collectionRef = this.ref.collection(path);
        const { ref, query } = associateQuery(collectionRef, queryFn);
        return new AngularFirestoreCollection(ref, query, this.afs);
    }
    /**
     * Listen to snapshot updates from the document.
     * @return {?}
     */
    snapshotChanges() {
        /** @type {?} */
        const scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
        return scheduledFromDocRef$.pipe(this.afs.keepUnstableUntilFirst);
    }
    /**
     * Listen to unwrapped snapshot updates from the document.
     * @return {?}
     */
    valueChanges() {
        return this.snapshotChanges().pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        action => {
            return action.payload.data();
        })));
    }
    /**
     * Retrieve the document once.
     * @param {?=} options
     * @return {?}
     */
    get(options) {
        return from(this.ref.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    }
}
if (false) {
    /** @type {?} */
    AngularFirestoreDocument.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreDocument.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2ZpcmVzdG9yZS8iLCJzb3VyY2VzIjpbImRvY3VtZW50L2RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBb0IsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QnRFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7Ozs7SUFPbkMsWUFBbUIsR0FBc0IsRUFBVSxHQUFxQjtRQUFyRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUksQ0FBQzs7Ozs7OztJQU83RSxHQUFHLENBQUMsSUFBTyxFQUFFLE9BQW9CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxJQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBS0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7Ozs7Ozs7SUFRRCxVQUFVLENBQWlCLElBQVksRUFBRSxPQUFpQjs7Y0FDbEQsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztjQUN6QyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxjQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztRQUM3RCxPQUFPLElBQUksMEJBQTBCLENBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7SUFLRCxlQUFlOztjQUNQLG9CQUFvQixHQUFHLFVBQVUsQ0FBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUN4RixPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FDaEMsQ0FBQTtJQUNILENBQUM7Ozs7O0lBS0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDaEMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFNRCxHQUFHLENBQUMsT0FBOEI7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FDN0MsQ0FBQztJQUNKLENBQUM7Q0FDRjs7O0lBcEVhLHVDQUE2Qjs7Ozs7SUFBRSx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEb2N1bWVudFJlZmVyZW5jZSwgU2V0T3B0aW9ucywgRG9jdW1lbnREYXRhLCBRdWVyeUZuLCBBY3Rpb24sIERvY3VtZW50U25hcHNob3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb21Eb2NSZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgbWFwLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlLCBhc3NvY2lhdGVRdWVyeSB9IGZyb20gJy4uL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiB9IGZyb20gJy4uL2NvbGxlY3Rpb24vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG4vKipcbiAqIEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudCBzZXJ2aWNlXG4gKlxuICogVGhpcyBjbGFzcyBjcmVhdGVzIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIERvY3VtZW50LiBBIHJlZmVyZW5jZSBpcyBwcm92aWRlZCBpblxuICogaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgY2xhc3MgaXMgZ2VuZXJpYyB3aGljaCBnaXZlcyB5b3UgdHlwZSBzYWZldHkgZm9yIGRhdGEgdXBkYXRlXG4gKiBtZXRob2RzIGFuZCBkYXRhIHN0cmVhbWluZy5cbiAqXG4gKiBUaGlzIGNsYXNzIHVzZXMgU3ltYm9sLm9ic2VydmFibGUgdG8gdHJhbnNmb3JtIGludG8gT2JzZXJ2YWJsZSB1c2luZyBPYnNlcnZhYmxlLmZyb20oKS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHJhcmVseSB1c2VkIGRpcmVjdGx5IGFuZCBzaG91bGQgYmUgY3JlYXRlZCBmcm9tIHRoZSBBbmd1bGFyRmlyZXN0b3JlIHNlcnZpY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBjb25zdCBmYWtlU3RvY2sgPSBuZXcgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFN0b2NrPihkb2MoJ3N0b2Nrcy9GQUtFJykpO1xuICogYXdhaXQgZmFrZVN0b2NrLnNldCh7IG5hbWU6ICdGQUtFJywgcHJpY2U6IDAuMDEgfSk7XG4gKiBmYWtlU3RvY2sudmFsdWVDaGFuZ2VzKCkubWFwKHNuYXAgPT4ge1xuICogICBpZihzbmFwLmV4aXN0cykgcmV0dXJuIHNuYXAuZGF0YSgpO1xuICogICByZXR1cm4gbnVsbDtcbiAqIH0pLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICogLy8gT1IhIFRyYW5zZm9ybSB1c2luZyBPYnNlcnZhYmxlLmZyb20oKSBhbmQgdGhlIGRhdGEgaXMgdW53cmFwcGVkIGZvciB5b3VcbiAqIE9ic2VydmFibGUuZnJvbShmYWtlU3RvY2spLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICovXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFQ9RG9jdW1lbnREYXRhPiB7XG5cbiAgLyoqXG4gICAqIFRoZSBjb250c3R1Y3RvciB0YWtlcyBpbiBhIERvY3VtZW50UmVmZXJlbmNlIHRvIHByb3ZpZGUgd3JhcHBlciBtZXRob2RzXG4gICAqIGZvciBkYXRhIG9wZXJhdGlvbnMsIGRhdGEgc3RyZWFtaW5nLCBhbmQgU3ltYm9sLm9ic2VydmFibGUuXG4gICAqIEBwYXJhbSByZWZcbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWY6IERvY3VtZW50UmVmZXJlbmNlLCBwcml2YXRlIGFmczogQW5ndWxhckZpcmVzdG9yZSkgeyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBvciBvdmVyd3JpdGUgYSBzaW5nbGUgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBzZXQoZGF0YTogVCwgb3B0aW9ucz86IFNldE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuc2V0KGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzb21lIGZpZWxkcyBvZiBhIGRvY3VtZW50IHdpdGhvdXQgb3ZlcndyaXRpbmcgdGhlIGVudGlyZSBkb2N1bWVudC5cbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIHVwZGF0ZShkYXRhOiBQYXJ0aWFsPFQ+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLnVwZGF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBkb2N1bWVudC5cbiAgICovXG4gIGRlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuZGVsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgc3ViLWNvbGxlY3Rpb24gZ2l2ZW4gYSBwYXRoIGFuZCBhbiBvcHRpb25hbCBxdWVyeVxuICAgKiBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHBhcmFtIHF1ZXJ5Rm5cbiAgICovXG4gIGNvbGxlY3Rpb248Uj1Eb2N1bWVudERhdGE+KHBhdGg6IHN0cmluZywgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxSPiB7XG4gICAgY29uc3QgY29sbGVjdGlvblJlZiA9IHRoaXMucmVmLmNvbGxlY3Rpb24ocGF0aCk7XG4gICAgY29uc3QgeyByZWYsIHF1ZXJ5IH0gPSBhc3NvY2lhdGVRdWVyeShjb2xsZWN0aW9uUmVmLCBxdWVyeUZuKTtcbiAgICByZXR1cm4gbmV3IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFI+KHJlZiwgcXVlcnksIHRoaXMuYWZzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gc25hcHNob3QgdXBkYXRlcyBmcm9tIHRoZSBkb2N1bWVudC5cbiAgICovXG4gIHNuYXBzaG90Q2hhbmdlcygpOiBPYnNlcnZhYmxlPEFjdGlvbjxEb2N1bWVudFNuYXBzaG90PFQ+Pj4ge1xuICAgIGNvbnN0IHNjaGVkdWxlZEZyb21Eb2NSZWYkID0gZnJvbURvY1JlZjxUPih0aGlzLnJlZiwgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcik7XG4gICAgcmV0dXJuIHNjaGVkdWxlZEZyb21Eb2NSZWYkLnBpcGUoXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB1bndyYXBwZWQgc25hcHNob3QgdXBkYXRlcyBmcm9tIHRoZSBkb2N1bWVudC5cbiAgICovXG4gIHZhbHVlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPFR8dW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuc25hcHNob3RDaGFuZ2VzKCkucGlwZShcbiAgICAgIG1hcChhY3Rpb24gPT4ge1xuICAgICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQuZGF0YSgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBkb2N1bWVudCBvbmNlLlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgZ2V0KG9wdGlvbnM/OiBmaXJlc3RvcmUuR2V0T3B0aW9ucykge1xuICAgIHJldHVybiBmcm9tKHRoaXMucmVmLmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIG9ic2VydmVPbih0aGlzLmFmcy5zY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==