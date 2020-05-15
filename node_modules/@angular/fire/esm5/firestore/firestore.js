/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken, NgZone, PLATFORM_ID, Injectable, Inject, Optional } from '@angular/core';
import { of, from } from 'rxjs';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
import { AngularFirestoreCollectionGroup } from './collection-group/collection-group';
import { FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory, ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import firebase from '@firebase/app';
import { registerFirestore } from '@firebase/firestore';
import 'firebase/firestore';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/**
 * The value of this token determines whether or not the firestore will have persistance enabled
 * @type {?}
 */
export var ENABLE_PERSISTENCE = new InjectionToken('angularfire2.enableFirestorePersistence');
/** @type {?} */
export var PERSISTENCE_SETTINGS = new InjectionToken('angularfire2.firestore.persistenceSettings');
/** @type {?} */
export var SETTINGS = new InjectionToken('angularfire2.firestore.settings');
/**
 * A utility methods for associating a collection reference with
 * a query.
 *
 * @param {?} collectionRef - A collection reference to query
 * @param {?=} queryFn - The callback to create a query
 *
 * Example:
 * const { query, ref } = associateQuery(docRef.collection('items'), ref => {
 *  return ref.where('age', '<', 200);
 * });
 * @return {?}
 */
export function associateQuery(collectionRef, queryFn) {
    if (queryFn === void 0) { queryFn = (/**
     * @param {?} ref
     * @return {?}
     */
    function (ref) { return ref; }); }
    /** @type {?} */
    var query = queryFn(collectionRef);
    /** @type {?} */
    var ref = collectionRef;
    return { query: query, ref: ref };
}
/**
 * AngularFirestore Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for creating Collection and Reference services. These services can
 * then be used to do data updates and observable streams of the data.
 *
 * Example:
 *
 * import { Component } from '\@angular/core';
 * import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '\@angular/fire/firestore';
 * import { Observable } from 'rxjs/Observable';
 * import { from } from 'rxjs/observable';
 *
 * \@Component({
 *   selector: 'app-my-component',
 *   template: `
 *    <h2>Items for {{ (profile | async)?.name }}
 *    <ul>
 *       <li *ngFor="let item of items | async">{{ item.name }}</li>
 *    </ul>
 *    <div class="control-input">
 *       <input type="text" #itemname />
 *       <button (click)="addItem(itemname.value)">Add Item</button>
 *    </div>
 *   `
 * })
 * export class MyComponent implements OnInit {
 *
 *   // services for data operations and data streaming
 *   private readonly itemsRef: AngularFirestoreCollection<Item>;
 *   private readonly profileRef: AngularFirestoreDocument<Profile>;
 *
 *   // observables for template
 *   items: Observable<Item[]>;
 *   profile: Observable<Profile>;
 *
 *   // inject main service
 *   constructor(private readonly afs: AngularFirestore) {}
 *
 *   ngOnInit() {
 *     this.itemsRef = afs.collection('items', ref => ref.where('user', '==', 'davideast').limit(10));
 *     this.items = this.itemsRef.valueChanges().map(snap => snap.docs.map(data => doc.data()));
 *     // this.items = from(this.itemsRef); // you can also do this with no mapping
 *
 *     this.profileRef = afs.doc('users/davideast');
 *     this.profile = this.profileRef.valueChanges();
 *   }
 *
 *   addItem(name: string) {
 *     const user = 'davideast';
 *     this.itemsRef.add({ name, user });
 *   }
 * }
 */
var AngularFirestore = /** @class */ (function () {
    /**
     * Each Feature of AngularFire has a FirebaseApp injected. This way we
     * don't rely on the main Firebase App instance and we can create named
     * apps and use multiple apps.
     * @param app
     */
    function AngularFirestore(options, nameOrConfig, shouldEnablePersistence, settings, platformId, zone, persistenceSettings) {
        var _this = this;
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers, platformId);
        this.firestore = zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            // INVESTIGATE this seems to be required because in the browser build registerFirestore is an Object?
            //             seems like we're fighting ngcc. In the server firestore() isn't available, so I have to register
            //             in the browser registerFirestore is not a function... maybe this is an underlying firebase-js-sdk issue
            if (registerFirestore) {
                registerFirestore(firebase);
            }
            /** @type {?} */
            var firestore = app.firestore();
            if (settings) {
                firestore.settings(settings);
            }
            return firestore;
        }));
        if (shouldEnablePersistence && !isPlatformServer(platformId)) {
            // We need to try/catch here because not all enablePersistence() failures are caught
            // https://github.com/firebase/firebase-js-sdk/issues/608
            /** @type {?} */
            var enablePersistence = (/**
             * @return {?}
             */
            function () {
                try {
                    return from(_this.firestore.enablePersistence(persistenceSettings || undefined).then((/**
                     * @return {?}
                     */
                    function () { return true; }), (/**
                     * @return {?}
                     */
                    function () { return false; })));
                }
                catch (e) {
                    return of(false);
                }
            });
            this.persistenceEnabled$ = zone.runOutsideAngular(enablePersistence);
        }
        else {
            this.persistenceEnabled$ = of(false);
        }
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    AngularFirestore.prototype.collection = /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    function (pathOrRef, queryFn) {
        /** @type {?} */
        var collectionRef;
        if (typeof pathOrRef === 'string') {
            collectionRef = this.firestore.collection(pathOrRef);
        }
        else {
            collectionRef = pathOrRef;
        }
        var _a = associateQuery(collectionRef, queryFn), ref = _a.ref, query = _a.query;
        return new AngularFirestoreCollection(ref, query, this);
    };
    /**
     * Create a reference to a Firestore Collection Group based on a collectionId
     * and an optional query function to narrow the result
     * set.
     * @param collectionId
     * @param queryGroupFn
     */
    /**
     * Create a reference to a Firestore Collection Group based on a collectionId
     * and an optional query function to narrow the result
     * set.
     * @template T
     * @param {?} collectionId
     * @param {?=} queryGroupFn
     * @return {?}
     */
    AngularFirestore.prototype.collectionGroup = /**
     * Create a reference to a Firestore Collection Group based on a collectionId
     * and an optional query function to narrow the result
     * set.
     * @template T
     * @param {?} collectionId
     * @param {?=} queryGroupFn
     * @return {?}
     */
    function (collectionId, queryGroupFn) {
        /** @type {?} */
        var queryFn = queryGroupFn || ((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) { return ref; }));
        /** @type {?} */
        var collectionGroup = this.firestore.collectionGroup(collectionId);
        return new AngularFirestoreCollectionGroup(queryFn(collectionGroup), this);
    };
    /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    AngularFirestore.prototype.doc = /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    function (pathOrRef) {
        /** @type {?} */
        var ref;
        if (typeof pathOrRef === 'string') {
            ref = this.firestore.doc(pathOrRef);
        }
        else {
            ref = pathOrRef;
        }
        return new AngularFirestoreDocument(ref, this);
    };
    /**
     * Returns a generated Firestore Document Id.
     */
    /**
     * Returns a generated Firestore Document Id.
     * @return {?}
     */
    AngularFirestore.prototype.createId = /**
     * Returns a generated Firestore Document Id.
     * @return {?}
     */
    function () {
        return this.firestore.collection('_').doc().id;
    };
    AngularFirestore.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFirestore.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ENABLE_PERSISTENCE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SETTINGS,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PERSISTENCE_SETTINGS,] }] }
    ]; };
    /** @nocollapse */ AngularFirestore.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFirestore_Factory() { return new AngularFirestore(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(ENABLE_PERSISTENCE, 8), i0.ɵɵinject(SETTINGS, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(PERSISTENCE_SETTINGS, 8)); }, token: AngularFirestore, providedIn: "any" });
    return AngularFirestore;
}());
export { AngularFirestore };
if (false) {
    /** @type {?} */
    AngularFirestore.prototype.firestore;
    /** @type {?} */
    AngularFirestore.prototype.persistenceEnabled$;
    /** @type {?} */
    AngularFirestore.prototype.schedulers;
    /** @type {?} */
    AngularFirestore.prototype.keepUnstableUntilFirst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUvIiwic291cmNlcyI6WyJmaXJlc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RixPQUFPLEVBQXNDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JMLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLG9CQUFvQixDQUFDOzs7Ozs7O0FBSzVCLE1BQU0sS0FBTyxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsQ0FBVSx5Q0FBeUMsQ0FBQzs7QUFDeEcsTUFBTSxLQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFnQyw0Q0FBNEMsQ0FBQzs7QUFDbkksTUFBTSxLQUFPLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBVyxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFjdkYsTUFBTSxVQUFVLGNBQWMsQ0FBQyxhQUFrQyxFQUFFLE9BQW9CO0lBQXBCLHdCQUFBLEVBQUE7Ozs7SUFBVSxV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SUQsIEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZXR0aW5ncywgUGVyc2lzdGVuY2VTZXR0aW5ncywgQ29sbGVjdGlvblJlZmVyZW5jZSwgRG9jdW1lbnRSZWZlcmVuY2UsIFF1ZXJ5Rm4sIFF1ZXJ5LCBRdWVyeUdyb3VwRm4sIEFzc29jaWF0ZWRSZWZlcmVuY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50IH0gZnJvbSAnLi9kb2N1bWVudC9kb2N1bWVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uR3JvdXAgfSBmcm9tICcuL2NvbGxlY3Rpb24tZ3JvdXAvY29sbGVjdGlvbi1ncm91cCc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMsIEZpcmViYXNlQXBwQ29uZmlnLCBGSVJFQkFTRV9PUFRJT05TLCBGSVJFQkFTRV9BUFBfTkFNRSwgybVmaXJlYmFzZUFwcEZhY3RvcnksIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWtlZXBVbnN0YWJsZVVudGlsRmlyc3RGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnQGZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyByZWdpc3RlckZpcmVzdG9yZSB9IGZyb20gJ0BmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0ICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuXG4vKipcbiAqIFRoZSB2YWx1ZSBvZiB0aGlzIHRva2VuIGRldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGZpcmVzdG9yZSB3aWxsIGhhdmUgcGVyc2lzdGFuY2UgZW5hYmxlZFxuICovXG5leHBvcnQgY29uc3QgRU5BQkxFX1BFUlNJU1RFTkNFID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIuZW5hYmxlRmlyZXN0b3JlUGVyc2lzdGVuY2UnKTtcbmV4cG9ydCBjb25zdCBQRVJTSVNURU5DRV9TRVRUSU5HUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxQZXJzaXN0ZW5jZVNldHRpbmdzfHVuZGVmaW5lZD4oJ2FuZ3VsYXJmaXJlMi5maXJlc3RvcmUucGVyc2lzdGVuY2VTZXR0aW5ncycpO1xuZXhwb3J0IGNvbnN0IFNFVFRJTkdTID0gbmV3IEluamVjdGlvblRva2VuPFNldHRpbmdzPignYW5ndWxhcmZpcmUyLmZpcmVzdG9yZS5zZXR0aW5ncycpO1xuXG4vKipcbiAqIEEgdXRpbGl0eSBtZXRob2RzIGZvciBhc3NvY2lhdGluZyBhIGNvbGxlY3Rpb24gcmVmZXJlbmNlIHdpdGhcbiAqIGEgcXVlcnkuXG4gKlxuICogQHBhcmFtIGNvbGxlY3Rpb25SZWYgLSBBIGNvbGxlY3Rpb24gcmVmZXJlbmNlIHRvIHF1ZXJ5XG4gKiBAcGFyYW0gcXVlcnlGbiAtIFRoZSBjYWxsYmFjayB0byBjcmVhdGUgYSBxdWVyeVxuICpcbiAqIEV4YW1wbGU6XG4gKiBjb25zdCB7IHF1ZXJ5LCByZWYgfSA9IGFzc29jaWF0ZVF1ZXJ5KGRvY1JlZi5jb2xsZWN0aW9uKCdpdGVtcycpLCByZWYgPT4ge1xuICogIHJldHVybiByZWYud2hlcmUoJ2FnZScsICc8JywgMjAwKTtcbiAqIH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzb2NpYXRlUXVlcnkoY29sbGVjdGlvblJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSwgcXVlcnlGbiA9IHJlZiA9PiByZWYpOiBBc3NvY2lhdGVkUmVmZXJlbmNlIHtcbiAgY29uc3QgcXVlcnkgPSBxdWVyeUZuKGNvbGxlY3Rpb25SZWYpO1xuICBjb25zdCByZWYgPSBjb2xsZWN0aW9uUmVmO1xuICByZXR1cm4geyBxdWVyeSwgcmVmIH07XG59XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZSBTZXJ2aWNlXG4gKlxuICogVGhpcyBzZXJ2aWNlIGlzIHRoZSBtYWluIGVudHJ5IHBvaW50IGZvciB0aGlzIGZlYXR1cmUgbW9kdWxlLiBJdCBwcm92aWRlc1xuICogYW4gQVBJIGZvciBjcmVhdGluZyBDb2xsZWN0aW9uIGFuZCBSZWZlcmVuY2Ugc2VydmljZXMuIFRoZXNlIHNlcnZpY2VzIGNhblxuICogdGhlbiBiZSB1c2VkIHRvIGRvIGRhdGEgdXBkYXRlcyBhbmQgb2JzZXJ2YWJsZSBzdHJlYW1zIG9mIHRoZSBkYXRhLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlLCBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiwgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xuICogaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG4gKiBpbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAtbXktY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgIDxoMj5JdGVtcyBmb3Ige3sgKHByb2ZpbGUgfCBhc3luYyk/Lm5hbWUgfX1cbiAqICAgIDx1bD5cbiAqICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtcyB8IGFzeW5jXCI+e3sgaXRlbS5uYW1lIH19PC9saT5cbiAqICAgIDwvdWw+XG4gKiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1pbnB1dFwiPlxuICogICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgI2l0ZW1uYW1lIC8+XG4gKiAgICAgICA8YnV0dG9uIChjbGljayk9XCJhZGRJdGVtKGl0ZW1uYW1lLnZhbHVlKVwiPkFkZCBJdGVtPC9idXR0b24+XG4gKiAgICA8L2Rpdj5cbiAqICAgYFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gKlxuICogICAvLyBzZXJ2aWNlcyBmb3IgZGF0YSBvcGVyYXRpb25zIGFuZCBkYXRhIHN0cmVhbWluZ1xuICogICBwcml2YXRlIHJlYWRvbmx5IGl0ZW1zUmVmOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxJdGVtPjtcbiAqICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlUmVmOiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8UHJvZmlsZT47XG4gKlxuICogICAvLyBvYnNlcnZhYmxlcyBmb3IgdGVtcGxhdGVcbiAqICAgaXRlbXM6IE9ic2VydmFibGU8SXRlbVtdPjtcbiAqICAgcHJvZmlsZTogT2JzZXJ2YWJsZTxQcm9maWxlPjtcbiAqXG4gKiAgIC8vIGluamVjdCBtYWluIHNlcnZpY2VcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhZnM6IEFuZ3VsYXJGaXJlc3RvcmUpIHt9XG4gKlxuICogICBuZ09uSW5pdCgpIHtcbiAqICAgICB0aGlzLml0ZW1zUmVmID0gYWZzLmNvbGxlY3Rpb24oJ2l0ZW1zJywgcmVmID0+IHJlZi53aGVyZSgndXNlcicsICc9PScsICdkYXZpZGVhc3QnKS5saW1pdCgxMCkpO1xuICogICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zUmVmLnZhbHVlQ2hhbmdlcygpLm1hcChzbmFwID0+IHNuYXAuZG9jcy5tYXAoZGF0YSA9PiBkb2MuZGF0YSgpKSk7XG4gKiAgICAgLy8gdGhpcy5pdGVtcyA9IGZyb20odGhpcy5pdGVtc1JlZik7IC8vIHlvdSBjYW4gYWxzbyBkbyB0aGlzIHdpdGggbm8gbWFwcGluZ1xuICpcbiAqICAgICB0aGlzLnByb2ZpbGVSZWYgPSBhZnMuZG9jKCd1c2Vycy9kYXZpZGVhc3QnKTtcbiAqICAgICB0aGlzLnByb2ZpbGUgPSB0aGlzLnByb2ZpbGVSZWYudmFsdWVDaGFuZ2VzKCk7XG4gKiAgIH1cbiAqXG4gKiAgIGFkZEl0ZW0obmFtZTogc3RyaW5nKSB7XG4gKiAgICAgY29uc3QgdXNlciA9ICdkYXZpZGVhc3QnO1xuICogICAgIHRoaXMuaXRlbXNSZWYuYWRkKHsgbmFtZSwgdXNlciB9KTtcbiAqICAgfVxuICogfVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmUge1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyZXN0b3JlOiBmaXJlc3RvcmUuRmlyZXN0b3JlO1xuICBwdWJsaWMgcmVhZG9ubHkgcGVyc2lzdGVuY2VFbmFibGVkJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHVibGljIHJlYWRvbmx5IHNjaGVkdWxlcnM6IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzO1xuICBwdWJsaWMgcmVhZG9ubHkga2VlcFVuc3RhYmxlVW50aWxGaXJzdDogPFQ+KG9iczogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcblxuICAvKipcbiAgICogRWFjaCBGZWF0dXJlIG9mIEFuZ3VsYXJGaXJlIGhhcyBhIEZpcmViYXNlQXBwIGluamVjdGVkLiBUaGlzIHdheSB3ZVxuICAgKiBkb24ndCByZWx5IG9uIHRoZSBtYWluIEZpcmViYXNlIEFwcCBpbnN0YW5jZSBhbmQgd2UgY2FuIGNyZWF0ZSBuYW1lZFxuICAgKiBhcHBzIGFuZCB1c2UgbXVsdGlwbGUgYXBwcy5cbiAgICogQHBhcmFtIGFwcFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOkZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6c3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGx8dW5kZWZpbmVkLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRU5BQkxFX1BFUlNJU1RFTkNFKSBzaG91bGRFbmFibGVQZXJzaXN0ZW5jZTogYm9vbGVhbnxudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VUVElOR1MpIHNldHRpbmdzOiBTZXR0aW5nc3xudWxsLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQRVJTSVNURU5DRV9TRVRUSU5HUykgcGVyc2lzdGVuY2VTZXR0aW5nczogUGVyc2lzdGVuY2VTZXR0aW5nc3xudWxsLFxuICApIHtcbiAgICB0aGlzLnNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgdGhpcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0ID0gybVrZWVwVW5zdGFibGVVbnRpbEZpcnN0RmFjdG9yeSh0aGlzLnNjaGVkdWxlcnMsIHBsYXRmb3JtSWQpO1xuXG4gICAgdGhpcy5maXJlc3RvcmUgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFwcCA9IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZyk7XG4gICAgICAvLyBJTlZFU1RJR0FURSB0aGlzIHNlZW1zIHRvIGJlIHJlcXVpcmVkIGJlY2F1c2UgaW4gdGhlIGJyb3dzZXIgYnVpbGQgcmVnaXN0ZXJGaXJlc3RvcmUgaXMgYW4gT2JqZWN0P1xuICAgICAgLy8gICAgICAgICAgICAgc2VlbXMgbGlrZSB3ZSdyZSBmaWdodGluZyBuZ2NjLiBJbiB0aGUgc2VydmVyIGZpcmVzdG9yZSgpIGlzbid0IGF2YWlsYWJsZSwgc28gSSBoYXZlIHRvIHJlZ2lzdGVyXG4gICAgICAvLyAgICAgICAgICAgICBpbiB0aGUgYnJvd3NlciByZWdpc3RlckZpcmVzdG9yZSBpcyBub3QgYSBmdW5jdGlvbi4uLiBtYXliZSB0aGlzIGlzIGFuIHVuZGVybHlpbmcgZmlyZWJhc2UtanMtc2RrIGlzc3VlXG4gICAgICBpZiAocmVnaXN0ZXJGaXJlc3RvcmUpIHsgcmVnaXN0ZXJGaXJlc3RvcmUoZmlyZWJhc2UpIH1cbiAgICAgIGNvbnN0IGZpcmVzdG9yZSA9IGFwcC5maXJlc3RvcmUoKTtcbiAgICAgIGlmIChzZXR0aW5ncykgeyBmaXJlc3RvcmUuc2V0dGluZ3Moc2V0dGluZ3MpIH1cbiAgICAgIHJldHVybiBmaXJlc3RvcmU7XG4gICAgfSk7XG5cbiAgICBpZiAoc2hvdWxkRW5hYmxlUGVyc2lzdGVuY2UgJiYgIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gdHJ5L2NhdGNoIGhlcmUgYmVjYXVzZSBub3QgYWxsIGVuYWJsZVBlcnNpc3RlbmNlKCkgZmFpbHVyZXMgYXJlIGNhdWdodFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZpcmViYXNlL2ZpcmViYXNlLWpzLXNkay9pc3N1ZXMvNjA4XG4gICAgICBjb25zdCBlbmFibGVQZXJzaXN0ZW5jZSA9ICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmZpcmVzdG9yZS5lbmFibGVQZXJzaXN0ZW5jZShwZXJzaXN0ZW5jZVNldHRpbmdzIHx8IHVuZGVmaW5lZCkudGhlbigoKSA9PiB0cnVlLCAoKSA9PiBmYWxzZSkpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpcy5wZXJzaXN0ZW5jZUVuYWJsZWQkID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcihlbmFibGVQZXJzaXN0ZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGVyc2lzdGVuY2VFbmFibGVkJCA9IG9mKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIENvbGxlY3Rpb24gYmFzZWQgb24gYSBwYXRoIG9yXG4gICAqIENvbGxlY3Rpb25SZWZlcmVuY2UgYW5kIGFuIG9wdGlvbmFsIHF1ZXJ5IGZ1bmN0aW9uIHRvIG5hcnJvdyB0aGUgcmVzdWx0XG4gICAqIHNldC5cbiAgICogQHBhcmFtIHBhdGhPclJlZlxuICAgKiBAcGFyYW0gcXVlcnlGblxuICAgKi9cbiAgY29sbGVjdGlvbjxUPihwYXRoOiBzdHJpbmcsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248VD5cbiAgY29sbGVjdGlvbjxUPihyZWY6IENvbGxlY3Rpb25SZWZlcmVuY2UsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248VD5cbiAgY29sbGVjdGlvbjxUPihwYXRoT3JSZWY6IHN0cmluZyB8IENvbGxlY3Rpb25SZWZlcmVuY2UsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248VD4ge1xuICAgIGxldCBjb2xsZWN0aW9uUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlO1xuICAgIGlmICh0eXBlb2YgcGF0aE9yUmVmID09PSAnc3RyaW5nJykge1xuICAgICAgY29sbGVjdGlvblJlZiA9IHRoaXMuZmlyZXN0b3JlLmNvbGxlY3Rpb24ocGF0aE9yUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sbGVjdGlvblJlZiA9IHBhdGhPclJlZjtcbiAgICB9XG4gICAgY29uc3QgeyByZWYsIHF1ZXJ5IH0gPSBhc3NvY2lhdGVRdWVyeShjb2xsZWN0aW9uUmVmLCBxdWVyeUZuKTtcbiAgICByZXR1cm4gbmV3IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFQ+KHJlZiwgcXVlcnksIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBDb2xsZWN0aW9uIEdyb3VwIGJhc2VkIG9uIGEgY29sbGVjdGlvbklkXG4gICAqIGFuZCBhbiBvcHRpb25hbCBxdWVyeSBmdW5jdGlvbiB0byBuYXJyb3cgdGhlIHJlc3VsdFxuICAgKiBzZXQuXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uSWRcbiAgICogQHBhcmFtIHF1ZXJ5R3JvdXBGblxuICAgKi9cbiAgY29sbGVjdGlvbkdyb3VwPFQ+KGNvbGxlY3Rpb25JZDogc3RyaW5nLCBxdWVyeUdyb3VwRm4/OiBRdWVyeUdyb3VwRm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFQ+IHtcbiAgICBjb25zdCBxdWVyeUZuID0gcXVlcnlHcm91cEZuIHx8IChyZWYgPT4gcmVmKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uR3JvdXA6IFF1ZXJ5ID0gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbkdyb3VwKGNvbGxlY3Rpb25JZCk7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFQ+KHF1ZXJ5Rm4oY29sbGVjdGlvbkdyb3VwKSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIERvY3VtZW50IGJhc2VkIG9uIGEgcGF0aCBvclxuICAgKiBEb2N1bWVudFJlZmVyZW5jZS4gTm90ZSB0aGF0IGRvY3VtZW50cyBhcmUgbm90IHF1ZXJ5YWJsZSBiZWNhdXNlIHRoZXkgYXJlXG4gICAqIHNpbXBseSBvYmplY3RzLiBIb3dldmVyLCBkb2N1bWVudHMgaGF2ZSBzdWItY29sbGVjdGlvbnMgdGhhdCByZXR1cm4gYVxuICAgKiBDb2xsZWN0aW9uIHJlZmVyZW5jZSBhbmQgY2FuIGJlIHF1ZXJpZWQuXG4gICAqIEBwYXJhbSBwYXRoT3JSZWZcbiAgICovXG4gIGRvYzxUPihwYXRoOiBzdHJpbmcpOiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD5cbiAgZG9jPFQ+KHJlZjogRG9jdW1lbnRSZWZlcmVuY2UpOiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD5cbiAgZG9jPFQ+KHBhdGhPclJlZjogc3RyaW5nIHwgRG9jdW1lbnRSZWZlcmVuY2UpOiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD4ge1xuICAgIGxldCByZWY6IERvY3VtZW50UmVmZXJlbmNlO1xuICAgIGlmICh0eXBlb2YgcGF0aE9yUmVmID09PSAnc3RyaW5nJykge1xuICAgICAgcmVmID0gdGhpcy5maXJlc3RvcmUuZG9jKHBhdGhPclJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZiA9IHBhdGhPclJlZjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD4ocmVmLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZ2VuZXJhdGVkIEZpcmVzdG9yZSBEb2N1bWVudCBJZC5cbiAgICovXG4gIGNyZWF0ZUlkKCkge1xuICAgIHJldHVybiB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKCdfJykuZG9jKCkuaWRcbiAgfVxufVxuIl19