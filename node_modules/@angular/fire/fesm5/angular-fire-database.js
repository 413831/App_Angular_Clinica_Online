import { InjectionToken, Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { __spread, __read } from 'tslib';
import { asyncScheduler, Observable, of, merge } from 'rxjs';
import { map, share, switchMap, scan, distinctUntilChanged, withLatestFrom, skipWhile } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵfirebaseAppFactory, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import 'firebase/database';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isNil(obj) {
    return obj === undefined || obj === null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
/**
 * Returns a database reference given a Firebase App and an
 * absolute or relative path.
 * @param {?} database
 * @param {?} pathRef
 * @return {?}
 */
function getRef(database, pathRef) {
    // if a db ref was passed in, just return it
    return isFirebaseRef(pathRef) ? (/** @type {?} */ (pathRef))
        : database.ref((/** @type {?} */ (pathRef)));
}
/**
 * @param {?} item
 * @param {?} cases
 * @return {?}
 */
function checkOperationCases(item, cases) {
    if (isString(item)) {
        return cases.stringCase();
    }
    else if (isFirebaseRef(item)) {
        return (/** @type {?} */ (cases.firebaseCase))();
    }
    else if (isFirebaseDataSnapshot(item)) {
        return (/** @type {?} */ (cases.snapshotCase))();
    }
    throw new Error("Expects a string, snapshot, or reference. Got: " + typeof item);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function SnapshotPrevKey() { }
if (false) {
    /** @type {?} */
    SnapshotPrevKey.prototype.snapshot;
    /** @type {?} */
    SnapshotPrevKey.prototype.prevKey;
}
/**
 * Create an observable from a Database Reference or Database Query.
 * @template T
 * @param {?} ref Database Reference
 * @param {?} event Listen event type ('value', 'added', 'changed', 'removed', 'moved')
 * @param {?=} listenType
 * @param {?=} scheduler
 * @return {?}
 */
function fromRef(ref, event, listenType, scheduler) {
    if (listenType === void 0) { listenType = 'on'; }
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    function (subscriber) {
        /** @type {?} */
        var fn = null;
        fn = ref[listenType](event, (/**
         * @param {?} snapshot
         * @param {?} prevKey
         * @return {?}
         */
        function (snapshot, prevKey) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () {
                subscriber.next({ snapshot: snapshot, prevKey: prevKey });
            }));
            if (listenType == 'once') {
                scheduler.schedule((/**
                 * @return {?}
                 */
                function () { return subscriber.complete(); }));
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () { return subscriber.error(err); }));
        }));
        if (listenType == 'on') {
            return {
                unsubscribe: /**
                 * @return {?}
                 */
                function () {
                    if (fn != null) {
                        ref.off(event, fn);
                    }
                }
            };
        }
        else {
            return { unsubscribe: /**
                 * @return {?}
                 */
                function () { } };
        }
    })).pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        var snapshot = payload.snapshot, prevKey = payload.prevKey;
        /** @type {?} */
        var key = null;
        if (snapshot.exists()) {
            key = snapshot.key;
        }
        return { type: event, payload: snapshot, prevKey: prevKey, key: key };
    })), share());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} ref
 * @param {?} events
 * @param {?=} scheduler
 * @return {?}
 */
function listChanges(ref, events, scheduler) {
    return fromRef(ref, 'value', 'once', scheduler).pipe(switchMap((/**
     * @param {?} snapshotAction
     * @return {?}
     */
    function (snapshotAction) {
        /** @type {?} */
        var childEvent$ = [of(snapshotAction)];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return childEvent$.push(fromRef(ref, event, 'on', scheduler)); }));
        return merge.apply(void 0, __spread(childEvent$)).pipe(scan(buildView, []));
    })), distinctUntilChanged());
}
/**
 * @template T
 * @param {?} changes
 * @param {?} key
 * @return {?}
 */
function positionFor(changes, key) {
    /** @type {?} */
    var len = changes.length;
    for (var i = 0; i < len; i++) {
        if (changes[i].payload.key === key) {
            return i;
        }
    }
    return -1;
}
/**
 * @template T
 * @param {?} changes
 * @param {?=} prevKey
 * @return {?}
 */
function positionAfter(changes, prevKey) {
    if (isNil(prevKey)) {
        return 0;
    }
    else {
        /** @type {?} */
        var i = positionFor(changes, prevKey);
        if (i === -1) {
            return changes.length;
        }
        else {
            return i + 1;
        }
    }
}
/**
 * @param {?} current
 * @param {?} action
 * @return {?}
 */
function buildView(current, action) {
    var payload = action.payload, type = action.type, prevKey = action.prevKey, key = action.key;
    /** @type {?} */
    var currentKeyPosition = positionFor(current, key);
    /** @type {?} */
    var afterPreviousKeyPosition = positionAfter(current, prevKey);
    switch (action.type) {
        case 'value':
            if (action.payload && action.payload.exists()) {
                /** @type {?} */
                var prevKey_1 = null;
                action.payload.forEach((/**
                 * @param {?} payload
                 * @return {?}
                 */
                function (payload) {
                    /** @type {?} */
                    var action = { payload: payload, type: 'value', prevKey: prevKey_1, key: payload.key };
                    prevKey_1 = payload.key;
                    current = __spread(current, [action]);
                    return false;
                }));
            }
            return current;
        case 'child_added':
            if (currentKeyPosition > -1) {
                // check that the previouskey is what we expect, else reorder
                /** @type {?} */
                var previous = current[currentKeyPosition - 1];
                if ((previous && previous.key || null) != prevKey) {
                    current = current.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.payload.key !== payload.key; }));
                    current.splice(afterPreviousKeyPosition, 0, action);
                }
            }
            else if (prevKey == null) {
                return __spread([action], current);
            }
            else {
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, action);
            }
            return current;
        case 'child_removed':
            return current.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.payload.key !== payload.key; }));
        case 'child_changed':
            return current.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.payload.key === key ? action : x; }));
        case 'child_moved':
            if (currentKeyPosition > -1) {
                /** @type {?} */
                var data = current.splice(currentKeyPosition, 1)[0];
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, data);
                return current;
            }
            return current;
        // default will also remove null results
        default:
            return current;
    }
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
    if (isNil(events) || (/** @type {?} */ (events)).length === 0) {
        events = ['child_added', 'child_removed', 'child_changed', 'child_moved'];
    }
    return events;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
function snapshotChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    return listChanges(query, (/** @type {?} */ (events)), scheduler);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
function stateChanges(query, events, scheduler) {
    events = (/** @type {?} */ (validateEventsArray(events)));
    /** @type {?} */
    var childEvent$ = events.map((/**
     * @param {?} event
     * @return {?}
     */
    function (event) { return fromRef(query, event, 'on', scheduler); }));
    return merge.apply(void 0, __spread(childEvent$));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
function auditTrail(query, events, scheduler) {
    /** @type {?} */
    var auditTrail$ = stateChanges(query, events)
        .pipe(scan((/**
     * @param {?} current
     * @param {?} action
     * @return {?}
     */
    function (current, action) { return __spread(current, [action]); }), []));
    return waitForLoaded(query, auditTrail$, scheduler);
}
/**
 * @record
 */
function LoadedMetadata() { }
if (false) {
    /** @type {?} */
    LoadedMetadata.prototype.data;
    /** @type {?} */
    LoadedMetadata.prototype.lastKeyToLoad;
}
/**
 * @template T
 * @param {?} query
 * @param {?=} scheduler
 * @return {?}
 */
function loadedData(query, scheduler) {
    // Create an observable of loaded values to retrieve the
    // known dataset. This will allow us to know what key to
    // emit the "whole" array at when listening for child events.
    return fromRef(query, 'value', 'on', scheduler)
        .pipe(map((/**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // Store the last key in the data set
        /** @type {?} */
        var lastKeyToLoad;
        // Loop through loaded dataset to find the last key
        data.payload.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            lastKeyToLoad = child.key;
            return false;
        }));
        // return data set and the current last key loaded
        return { data: data, lastKeyToLoad: lastKeyToLoad };
    })));
}
/**
 * @template T
 * @param {?} query
 * @param {?} action$
 * @param {?=} scheduler
 * @return {?}
 */
function waitForLoaded(query, action$, scheduler) {
    /** @type {?} */
    var loaded$ = loadedData(query, scheduler);
    return loaded$
        .pipe(withLatestFrom(action$), 
    // Get the latest values from the "loaded" and "child" datasets
    // We can use both datasets to form an array of the latest values.
    map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = __read(_a, 2), loaded = _b[0], actions = _b[1];
        // Store the last key in the data set
        /** @type {?} */
        var lastKeyToLoad = loaded.lastKeyToLoad;
        // Store all child keys loaded at this point
        /** @type {?} */
        var loadedKeys = actions.map((/**
         * @param {?} snap
         * @return {?}
         */
        function (snap) { return snap.key; }));
        return { actions: actions, lastKeyToLoad: lastKeyToLoad, loadedKeys: loadedKeys };
    })), 
    // This is the magical part, only emit when the last load key
    // in the dataset has been loaded by a child event. At this point
    // we can assume the dataset is "whole".
    skipWhile((/**
     * @param {?} meta
     * @return {?}
     */
    function (meta) { return meta.loadedKeys.indexOf(meta.lastKeyToLoad) === -1; })), 
    // Pluck off the meta data because the user only cares
    // to iterate through the snapshots
    map((/**
     * @param {?} meta
     * @return {?}
     */
    function (meta) { return meta.actions; })));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} ref
 * @param {?} operation
 * @return {?}
 */
function createDataOperationMethod(ref, operation) {
    return (/**
     * @template T
     * @param {?} item
     * @param {?} value
     * @return {?}
     */
    function dataOperation(item, value) {
        return checkOperationCases(item, {
            stringCase: (/**
             * @return {?}
             */
            function () { return ref.child((/** @type {?} */ (item)))[operation](value); }),
            firebaseCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item)))[operation](value); }),
            snapshotCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item))).ref[operation](value); })
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO(davideast): Find out why TS thinks this returns firebase.Primise
// instead of Promise.
/**
 * @template T
 * @param {?} ref
 * @return {?}
 */
function createRemoveMethod(ref) {
    return (/**
     * @param {?=} item
     * @return {?}
     */
    function remove(item) {
        if (!item) {
            return ref.remove();
        }
        return checkOperationCases(item, {
            stringCase: (/**
             * @return {?}
             */
            function () { return ref.child((/** @type {?} */ (item))).remove(); }),
            firebaseCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item))).remove(); }),
            snapshotCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item))).ref.remove(); })
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?} afDatabase
 * @return {?}
 */
function createListReference(query, afDatabase) {
    /** @type {?} */
    var outsideAngularScheduler = afDatabase.schedulers.outsideAngular;
    return {
        query: query,
        update: createDataOperationMethod(query.ref, 'update'),
        set: createDataOperationMethod(query.ref, 'set'),
        push: (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return query.ref.push(data); }),
        remove: createRemoveMethod(query.ref),
        snapshotChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return snapshotChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        stateChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return stateChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        auditTrail: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return auditTrail(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        valueChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            /** @type {?} */
            var snapshotChanges$ = snapshotChanges(query, events, outsideAngularScheduler);
            return snapshotChanges$.pipe(map((/**
             * @param {?} actions
             * @return {?}
             */
            function (actions) { return actions.map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return (/** @type {?} */ (a.payload.val())); })); })), afDatabase.keepUnstableUntilFirst);
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?=} scheduler
 * @return {?}
 */
function createObjectSnapshotChanges(query, scheduler) {
    return (/**
     * @return {?}
     */
    function snapshotChanges() {
        return fromRef(query, 'value', 'on', scheduler);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} query
 * @param {?} afDatabase
 * @return {?}
 */
function createObjectReference(query, afDatabase) {
    return {
        query: query,
        snapshotChanges: /**
         * @template T
         * @return {?}
         */
        function () {
            return createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)().pipe((/** @type {?} */ (afDatabase.keepUnstableUntilFirst)));
        },
        update: /**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (/** @type {?} */ (query.ref.update((/** @type {?} */ (data))))); },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (/** @type {?} */ (query.ref.set(data))); },
        remove: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (query.ref.remove())); },
        valueChanges: /**
         * @template T
         * @return {?}
         */
        function () {
            /** @type {?} */
            var snapshotChanges$ = createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)();
            return snapshotChanges$.pipe(afDatabase.keepUnstableUntilFirst, map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return action.payload.exists() ? (/** @type {?} */ (action.payload.val())) : null; })));
        },
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var URL = new InjectionToken('angularfire2.realtimeDatabaseURL');
var AngularFireDatabase = /** @class */ (function () {
    function AngularFireDatabase(options, nameOrConfig, databaseURL, platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers, platformId);
        this.database = zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            return app.database(databaseURL || undefined);
        }));
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    AngularFireDatabase.prototype.list = /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    function (pathOrRef, queryFn) {
        /** @type {?} */
        var ref = getRef(this.database, pathOrRef);
        /** @type {?} */
        var query = ref;
        if (queryFn) {
            query = queryFn(ref);
        }
        return createListReference(query, this);
    };
    /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    AngularFireDatabase.prototype.object = /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    function (pathOrRef) {
        /** @type {?} */
        var ref = getRef(this.database, pathOrRef);
        return createObjectReference(ref, this);
    };
    /**
     * @return {?}
     */
    AngularFireDatabase.prototype.createPushId = /**
     * @return {?}
     */
    function () {
        return this.database.ref().push().key;
    };
    AngularFireDatabase.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireDatabase.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [URL,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ AngularFireDatabase.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireDatabase_Factory() { return new AngularFireDatabase(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(URL, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone)); }, token: AngularFireDatabase, providedIn: "any" });
    return AngularFireDatabase;
}());
if (false) {
    /** @type {?} */
    AngularFireDatabase.prototype.database;
    /** @type {?} */
    AngularFireDatabase.prototype.schedulers;
    /** @type {?} */
    AngularFireDatabase.prototype.keepUnstableUntilFirst;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireDatabaseModule = /** @class */ (function () {
    function AngularFireDatabaseModule() {
    }
    AngularFireDatabaseModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireDatabase]
                },] }
    ];
    return AngularFireDatabaseModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireDatabase, AngularFireDatabaseModule, URL, auditTrail, createListReference, fromRef, listChanges, snapshotChanges, stateChanges };
//# sourceMappingURL=angular-fire-database.js.map
