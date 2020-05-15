/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, InjectionToken, NgZone, PLATFORM_ID } from '@angular/core';
import { createStorageRef } from './ref';
import { ɵfirebaseAppFactory, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵkeepUnstableUntilFirstFactory, ɵAngularFireSchedulers } from '@angular/fire';
import 'firebase/storage';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export var BUCKET = new InjectionToken('angularfire2.storageBucket');
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
    /** @nocollapse */ AngularFireStorage.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireStorage_Factory() { return new AngularFireStorage(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(BUCKET, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireStorage, providedIn: "any" });
    return AngularFireStorage;
}());
export { AngularFireStorage };
if (false) {
    /** @type {?} */
    AngularFireStorage.prototype.storage;
    /** @type {?} */
    AngularFireStorage.prototype.keepUnstableUntilFirst;
    /** @type {?} */
    AngularFireStorage.prototype.schedulers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvc3RvcmFnZS8iLCJzb3VyY2VzIjpbInN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFekMsT0FBTyxFQUFzQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSw4QkFBOEIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyTCxPQUFPLGtCQUFrQixDQUFDOzs7O0FBRTFCLE1BQU0sS0FBTyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsNEJBQTRCLENBQUM7Ozs7Ozs7O0FBUzlFO0lBU0UsNEJBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDL0QsYUFBeUIsRUFDaEMsVUFBa0IsRUFDdkMsSUFBWTtRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDOztnQkFDOUIsR0FBRyxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1lBQzVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGdDQUFHOzs7O0lBQUgsVUFBSSxJQUFZO1FBQ2QsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Ozs7Ozs7SUFFRCxtQ0FBTTs7Ozs7O0lBQU4sVUFBTyxJQUFZLEVBQUUsSUFBUyxFQUFFLFFBQXlCOztZQUNqRCxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztZQUNuQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQ3RGLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBakNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEI7Ozs7Z0RBUUksTUFBTSxTQUFDLGdCQUFnQjtnREFDdkIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7Z0RBQ3BDLFFBQVEsWUFBSSxNQUFNLFNBQUMsTUFBTTtnQkFDTyxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztnQkE5QmdDLE1BQU07Ozs2QkFBN0Q7Q0FvREMsQUFuQ0QsSUFtQ0M7U0FoQ1ksa0JBQWtCOzs7SUFDN0IscUNBQXlDOztJQUV6QyxvREFBaUY7O0lBQ2pGLHdDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yYWdlUmVmIH0gZnJvbSAnLi9yZWYnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlyZWJhc2VPcHRpb25zLCBGaXJlYmFzZUFwcENvbmZpZywgybVmaXJlYmFzZUFwcEZhY3RvcnksIEZJUkVCQVNFX09QVElPTlMsIEZJUkVCQVNFX0FQUF9OQU1FLCDJtWtlZXBVbnN0YWJsZVVudGlsRmlyc3RGYWN0b3J5LCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgVXBsb2FkTWV0YWRhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgJ2ZpcmViYXNlL3N0b3JhZ2UnO1xuXG5leHBvcnQgY29uc3QgQlVDS0VUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ2FuZ3VsYXJmaXJlMi5zdG9yYWdlQnVja2V0Jyk7XG5cbi8qKlxuICogQW5ndWxhckZpcmVTdG9yYWdlIFNlcnZpY2VcbiAqXG4gKiBUaGlzIHNlcnZpY2UgaXMgdGhlIG1haW4gZW50cnkgcG9pbnQgZm9yIHRoaXMgZmVhdHVyZSBtb2R1bGUuIEl0IHByb3ZpZGVzXG4gKiBhbiBBUEkgZm9yIHVwbG9hZGluZyBhbmQgZG93bmxvYWRpbmcgYmluYXJ5IGZpbGVzIGZyb20gQ2xvdWQgU3RvcmFnZSBmb3JcbiAqIEZpcmViYXNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlU3RvcmFnZSB7XG4gIHB1YmxpYyByZWFkb25seSBzdG9yYWdlOiBzdG9yYWdlLlN0b3JhZ2U7XG5cbiAgcHVibGljIHJlYWRvbmx5IGtlZXBVbnN0YWJsZVVudGlsRmlyc3Q6IDxUPihvYnM6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD47XG4gIHB1YmxpYyByZWFkb25seSBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChCVUNLRVQpIHN0b3JhZ2VCdWNrZXQ6c3RyaW5nfG51bGwsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgdGhpcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0ID0gybVrZWVwVW5zdGFibGVVbnRpbEZpcnN0RmFjdG9yeSh0aGlzLnNjaGVkdWxlcnMsIHBsYXRmb3JtSWQpO1xuXG4gICAgdGhpcy5zdG9yYWdlID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBhcHAgPSDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpO1xuICAgICAgcmV0dXJuIGFwcC5zdG9yYWdlKHN0b3JhZ2VCdWNrZXQgfHwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZihwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY3JlYXRlU3RvcmFnZVJlZih0aGlzLnN0b3JhZ2UucmVmKHBhdGgpLCB0aGlzLnNjaGVkdWxlcnMsIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gIH1cblxuICB1cGxvYWQocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIG1ldGFkYXRhPzogVXBsb2FkTWV0YWRhdGEpIHtcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gdGhpcy5zdG9yYWdlLnJlZihwYXRoKTtcbiAgICBjb25zdCByZWYgPSBjcmVhdGVTdG9yYWdlUmVmKHN0b3JhZ2VSZWYsIHRoaXMuc2NoZWR1bGVycywgdGhpcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0KTtcbiAgICByZXR1cm4gcmVmLnB1dChkYXRhLCBtZXRhZGF0YSk7XG4gIH1cblxufVxuIl19