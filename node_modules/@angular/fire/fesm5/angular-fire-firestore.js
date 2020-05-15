import { InjectionToken, Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { asyncScheduler, Observable, from, of } from 'rxjs';
import { map, scan, filter, observeOn } from 'rxjs/operators';
import { __spread, __assign } from 'tslib';
import { ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵfirebaseAppFactory, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import firebase from '@firebase/app';
import { registerFirestore } from '@firebase/firestore';
import 'firebase/firestore';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, R
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
function _fromRef(ref, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    function (subscriber) {
        /** @type {?} */
        var unsubscribe;
        if (scheduler != null) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () {
                unsubscribe = ref.onSnapshot(subscriber);
            }));
        }
        else {
            unsubscribe = ref.onSnapshot(subscriber);
        }
        return (/**
         * @return {?}
         */
        function () {
            if (unsubscribe != null) {
                unsubscribe();
            }
        });
    }));
}
/**
 * @template R
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
function fromRef(ref, scheduler) {
    return _fromRef(ref, scheduler);
}
/**
 * @template T
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
function fromDocRef(ref, scheduler) {
    return fromRef(ref, scheduler)
        .pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    function (payload) { return ({ payload: payload, type: 'value' }); })));
}
/**
 * @template T
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
function fromCollectionRef(ref, scheduler) {
    return fromRef(ref, scheduler).pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    function (payload) { return ({ payload: payload, type: 'query' }); })));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Return a stream of document changes on a query. These results are not in sort order but in
 * order of occurence.
 * @template T
 * @param {?} query
 * @param {?=} scheduler
 * @return {?}
 */
function docChanges(query, scheduler) {
    return fromCollectionRef(query, scheduler)
        .pipe(map((/**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return action.payload.docChanges()
            .map((/**
         * @param {?} change
         * @return {?}
         */
        function (change) { return ((/** @type {?} */ ({ type: change.type, payload: change }))); }));
    })));
}
/**
 * Return a stream of document changes on a query. These results are in sort order.
 * @template T
 * @param {?} query
 * @param {?} events
 * @param {?=} scheduler
 * @return {?}
 */
function sortedChanges(query, events, scheduler) {
    return fromCollectionRef(query, scheduler)
        .pipe(map((/**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { return changes.payload.docChanges(); })), scan((/**
     * @param {?} current
     * @param {?} changes
     * @return {?}
     */
    function (current, changes) { return combineChanges(current, changes, events); }), []), map((/**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { return changes.map((/**
     * @param {?} c
     * @return {?}
     */
    function (c) { return ((/** @type {?} */ ({ type: c.type, payload: c }))); })); })));
}
/**
 * Combines the total result set from the current set of changes from an incoming set
 * of changes.
 * @template T
 * @param {?} current
 * @param {?} changes
 * @param {?} events
 * @return {?}
 */
function combineChanges(current, changes, events) {
    changes.forEach((/**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        // skip unwanted change types
        if (events.indexOf(change.type) > -1) {
            current = combineChange(current, change);
        }
    }));
    return current;
}
/**
 * Creates a new sorted array from a new change.
 * @template T
 * @param {?} combined
 * @param {?} change
 * @return {?}
 */
function combineChange(combined, change) {
    switch (change.type) {
        case 'added':
            if (combined[change.newIndex] && combined[change.newIndex].doc.ref.isEqual(change.doc.ref)) {
                // Not sure why the duplicates are getting fired
            }
            else {
                combined.splice(change.newIndex, 0, change);
            }
            break;
        case 'modified':
            if (combined[change.oldIndex] == null || combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
                // When an item changes position we first remove it
                // and then add it's new position
                if (change.oldIndex !== change.newIndex) {
                    combined.splice(change.oldIndex, 1);
                    combined.splice(change.newIndex, 0, change);
                }
                else {
                    combined.splice(change.newIndex, 1, change);
                }
            }
            break;
        case 'removed':
            if (combined[change.oldIndex] && combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
                combined.splice(change.oldIndex, 1);
            }
            break;
    }
    return combined;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} events
 * @return {?}
 */
function validateEventsArray(events) {
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
var  /**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
var  /**
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
if (false) {
    /** @type {?} */
    AngularFirestoreDocument.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreDocument.prototype.afs;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
var  /**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The value of this token determines whether or not the firestore will have persistance enabled
 * @type {?}
 */
var ENABLE_PERSISTENCE = new InjectionToken('angularfire2.enableFirestorePersistence');
/** @type {?} */
var PERSISTENCE_SETTINGS = new InjectionToken('angularfire2.firestore.persistenceSettings');
/** @type {?} */
var SETTINGS = new InjectionToken('angularfire2.firestore.settings');
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
function associateQuery(collectionRef, queryFn) {
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
    /** @nocollapse */ AngularFirestore.ɵprov = ɵɵdefineInjectable({ factory: function AngularFirestore_Factory() { return new AngularFirestore(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(ENABLE_PERSISTENCE, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(PERSISTENCE_SETTINGS, 8)); }, token: AngularFirestore, providedIn: "any" });
    return AngularFirestore;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFirestoreModule = /** @class */ (function () {
    function AngularFirestoreModule() {
    }
    /**
     * Attempt to enable persistent storage, if possible
     */
    /**
     * Attempt to enable persistent storage, if possible
     * @param {?=} persistenceSettings
     * @return {?}
     */
    AngularFirestoreModule.enablePersistence = /**
     * Attempt to enable persistent storage, if possible
     * @param {?=} persistenceSettings
     * @return {?}
     */
    function (persistenceSettings) {
        return {
            ngModule: AngularFirestoreModule,
            providers: [
                { provide: ENABLE_PERSISTENCE, useValue: true },
                { provide: PERSISTENCE_SETTINGS, useValue: persistenceSettings },
            ]
        };
    };
    AngularFirestoreModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFirestore]
                },] }
    ];
    return AngularFirestoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function DocumentSnapshotExists() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotExists.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotExists.prototype.data = function (options) { };
}
/**
 * @record
 */
function DocumentSnapshotDoesNotExist() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotDoesNotExist.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.data = function (options) { };
    /**
     * @param {?} fieldPath
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.get = function (fieldPath, options) { };
}
/**
 * @record
 * @template T
 */
function QueryDocumentSnapshot() { }
if (false) {
    /**
     * @param {?=} options
     * @return {?}
     */
    QueryDocumentSnapshot.prototype.data = function (options) { };
}
/**
 * @record
 * @template T
 */
function QuerySnapshot() { }
if (false) {
    /** @type {?} */
    QuerySnapshot.prototype.docs;
}
/**
 * @record
 * @template T
 */
function DocumentChange() { }
if (false) {
    /** @type {?} */
    DocumentChange.prototype.doc;
}
/**
 * @record
 * @template T
 */
function DocumentChangeAction() { }
if (false) {
    /** @type {?} */
    DocumentChangeAction.prototype.type;
    /** @type {?} */
    DocumentChangeAction.prototype.payload;
}
/**
 * @record
 * @template T
 */
function Action() { }
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?} */
    Action.prototype.payload;
}
;
/**
 * @record
 * @template T
 */
function Reference() { }
if (false) {
    /** @type {?} */
    Reference.prototype.onSnapshot;
}
/**
 * A structure that provides an association between a reference
 * and a query on that reference. Note: Performing operations
 * on the reference can lead to confusing results with complicated
 * queries.
 *
 * Example:
 *
 * const query = ref.where('type', '==', 'Book').
 *                  .where('price', '>' 18.00)
 *                  .where('price', '<' 100.00)
 *                  .where('category', '==', 'Fiction')
 *                  .where('publisher', '==', 'BigPublisher')
 *
 * // This addition would not be a result of the query above
 * ref.add({
 *  type: 'Magazine',
 *  price: 4.99,
 *  category: 'Sports',
 *  publisher: 'SportsPublisher'
 * });
 * @record
 */
function AssociatedReference() { }
if (false) {
    /** @type {?} */
    AssociatedReference.prototype.ref;
    /** @type {?} */
    AssociatedReference.prototype.query;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument, AngularFirestoreModule, ENABLE_PERSISTENCE, PERSISTENCE_SETTINGS, SETTINGS, associateQuery, combineChange, combineChanges, docChanges, fromCollectionRef, fromDocRef, fromRef, sortedChanges, validateEventsArray };
//# sourceMappingURL=angular-fire-firestore.js.map
