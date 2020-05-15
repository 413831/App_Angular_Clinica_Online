import { Observable, of, from } from 'rxjs';
import { map, observeOn, switchMap } from 'rxjs/operators';
import { InjectionToken, Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵfirebaseAppFactory, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import 'firebase/storage';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} task
 * @return {?}
 */
function fromTask(task) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    function (subscriber) {
        /** @type {?} */
        var progress = (/**
         * @param {?} snap
         * @return {?}
         */
        function (snap) { return subscriber.next(snap); });
        /** @type {?} */
        var error = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return subscriber.error(e); });
        /** @type {?} */
        var complete = (/**
         * @return {?}
         */
        function () { return subscriber.complete(); });
        task.on('state_changed', progress, error, complete);
        return (/**
         * @return {?}
         */
        function () { return task.cancel(); });
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AngularFireUploadTask() { }
if (false) {
    /** @type {?} */
    AngularFireUploadTask.prototype.task;
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.snapshotChanges = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.percentageChanges = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.pause = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.cancel = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.resume = function () { };
    /**
     * @param {?=} onFulfilled
     * @param {?=} onRejected
     * @return {?}
     */
    AngularFireUploadTask.prototype.then = function (onFulfilled, onRejected) { };
    /**
     * @param {?} onRejected
     * @return {?}
     */
    AngularFireUploadTask.prototype.catch = function (onRejected) { };
}
/**
 * Create an AngularFireUploadTask from a regular UploadTask from the Storage SDK.
 * This method creates an observable of the upload and returns on object that provides
 * multiple methods for controlling and monitoring the file upload.
 * @param {?} task
 * @return {?}
 */
function createUploadTask(task) {
    /** @type {?} */
    var inner$ = fromTask(task);
    return {
        task: task,
        then: task.then.bind(task),
        catch: task.catch.bind(task),
        pause: task.pause.bind(task),
        cancel: task.cancel.bind(task),
        resume: task.resume.bind(task),
        snapshotChanges: (/**
         * @return {?}
         */
        function () { return inner$; }),
        percentageChanges: (/**
         * @return {?}
         */
        function () { return inner$.pipe(map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.bytesTransferred / s.totalBytes * 100; }))); })
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AngularFireStorageReference() { }
if (false) {
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.getDownloadURL = function () { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.getMetadata = function () { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.delete = function () { };
    /**
     * @param {?} path
     * @return {?}
     */
    AngularFireStorageReference.prototype.child = function (path) { };
    /**
     * @param {?} meta
     * @return {?}
     */
    AngularFireStorageReference.prototype.updateMetadata = function (meta) { };
    /**
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    AngularFireStorageReference.prototype.put = function (data, metadata) { };
    /**
     * @param {?} data
     * @param {?=} format
     * @param {?=} metadata
     * @return {?}
     */
    AngularFireStorageReference.prototype.putString = function (data, format, metadata) { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.listAll = function () { };
}
/**
 * Create an AngularFire wrapped Storage Reference. This object
 * creates observable methods from promise based methods.
 * @param {?} ref
 * @param {?} schedulers
 * @param {?} keepUnstableUntilFirst
 * @return {?}
 */
function createStorageRef(ref, schedulers, keepUnstableUntilFirst) {
    return {
        getDownloadURL: (/**
         * @return {?}
         */
        function () { return of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return ref.getDownloadURL(); })), keepUnstableUntilFirst); }),
        getMetadata: (/**
         * @return {?}
         */
        function () { return of().pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return ref.getMetadata(); })), keepUnstableUntilFirst); }),
        delete: (/**
         * @return {?}
         */
        function () { return from(ref.delete()); }),
        child: (/**
         * @param {?} path
         * @return {?}
         */
        function (path) { return createStorageRef(ref.child(path), schedulers, keepUnstableUntilFirst); }),
        updateMetadata: (/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return from(ref.updateMetadata(meta)); }),
        put: (/**
         * @param {?} data
         * @param {?=} metadata
         * @return {?}
         */
        function (data, metadata) {
            /** @type {?} */
            var task = ref.put(data, metadata);
            return createUploadTask(task);
        }),
        putString: (/**
         * @param {?} data
         * @param {?=} format
         * @param {?=} metadata
         * @return {?}
         */
        function (data, format, metadata) {
            /** @type {?} */
            var task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }),
        listAll: (/**
         * @return {?}
         */
        function () { return from(ref.listAll()); })
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var BUCKET = new InjectionToken('angularfire2.storageBucket');
/**
 * AngularFireStorage Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for uploading and downloading binary files from Cloud Storage for
 * Firebase.
 */
var AngularFireStorage = /** @class */ (function () {
    function AngularFireStorage(options, nameOrConfig, storageBucket, platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers, platformId);
        this.storage = zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            return app.storage(storageBucket || undefined);
        }));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    AngularFireStorage.prototype.ref = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return createStorageRef(this.storage.ref(path), this.schedulers, this.keepUnstableUntilFirst);
    };
    /**
     * @param {?} path
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    AngularFireStorage.prototype.upload = /**
     * @param {?} path
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    function (path, data, metadata) {
        /** @type {?} */
        var storageRef = this.storage.ref(path);
        /** @type {?} */
        var ref = createStorageRef(storageRef, this.schedulers, this.keepUnstableUntilFirst);
        return ref.put(data, metadata);
    };
    AngularFireStorage.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireStorage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [BUCKET,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ AngularFireStorage.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireStorage_Factory() { return new AngularFireStorage(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(BUCKET, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone)); }, token: AngularFireStorage, providedIn: "any" });
    return AngularFireStorage;
}());
if (false) {
    /** @type {?} */
    AngularFireStorage.prototype.storage;
    /** @type {?} */
    AngularFireStorage.prototype.keepUnstableUntilFirst;
    /** @type {?} */
    AngularFireStorage.prototype.schedulers;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireStorageModule = /** @class */ (function () {
    function AngularFireStorageModule() {
    }
    AngularFireStorageModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireStorage]
                },] }
    ];
    return AngularFireStorageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireStorage, AngularFireStorageModule, BUCKET, createStorageRef, createUploadTask, fromTask };
//# sourceMappingURL=angular-fire-storage.js.map
