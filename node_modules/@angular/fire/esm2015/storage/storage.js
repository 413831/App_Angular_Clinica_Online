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
export const BUCKET = new InjectionToken('angularfire2.storageBucket');
/**
 * AngularFireStorage Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for uploading and downloading binary files from Cloud Storage for
 * Firebase.
 */
export class AngularFireStorage {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} storageBucket
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, storageBucket, platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers, platformId);
        this.storage = zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            return app.storage(storageBucket || undefined);
        }));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    ref(path) {
        return createStorageRef(this.storage.ref(path), this.schedulers, this.keepUnstableUntilFirst);
    }
    /**
     * @param {?} path
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    upload(path, data, metadata) {
        /** @type {?} */
        const storageRef = this.storage.ref(path);
        /** @type {?} */
        const ref = createStorageRef(storageRef, this.schedulers, this.keepUnstableUntilFirst);
        return ref.put(data, metadata);
    }
}
AngularFireStorage.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireStorage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [BUCKET,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireStorage.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireStorage_Factory() { return new AngularFireStorage(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(BUCKET, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireStorage, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireStorage.prototype.storage;
    /** @type {?} */
    AngularFireStorage.prototype.keepUnstableUntilFirst;
    /** @type {?} */
    AngularFireStorage.prototype.schedulers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvc3RvcmFnZS8iLCJzb3VyY2VzIjpbInN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFekMsT0FBTyxFQUFzQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSw4QkFBOEIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyTCxPQUFPLGtCQUFrQixDQUFDOzs7O0FBRTFCLE1BQU0sT0FBTyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsNEJBQTRCLENBQUM7Ozs7Ozs7O0FBWTlFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0lBTTdCLFlBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDL0QsYUFBeUIsRUFDaEMsVUFBa0IsRUFDdkMsSUFBWTtRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ25DLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztZQUM1RCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxHQUFHLENBQUMsSUFBWTtRQUNkLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNoRyxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFTLEVBQUUsUUFBeUI7O2NBQ2pELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O2NBQ25DLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDdEYsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFqQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxLQUFLO2FBQ2xCOzs7OzRDQVFJLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzRDQUNwQyxRQUFRLFlBQUksTUFBTSxTQUFDLE1BQU07WUFDTyxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQTlCZ0MsTUFBTTs7Ozs7SUFxQjNELHFDQUF5Qzs7SUFFekMsb0RBQWlGOztJQUNqRix3Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmFnZVJlZiB9IGZyb20gJy4vcmVmJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIMm1ZmlyZWJhc2VBcHBGYWN0b3J5LCBGSVJFQkFTRV9PUFRJT05TLCBGSVJFQkFTRV9BUFBfTkFNRSwgybVrZWVwVW5zdGFibGVVbnRpbEZpcnN0RmFjdG9yeSwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IFVwbG9hZE1ldGFkYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0ICdmaXJlYmFzZS9zdG9yYWdlJztcblxuZXhwb3J0IGNvbnN0IEJVQ0tFVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIuc3RvcmFnZUJ1Y2tldCcpO1xuXG4vKipcbiAqIEFuZ3VsYXJGaXJlU3RvcmFnZSBTZXJ2aWNlXG4gKlxuICogVGhpcyBzZXJ2aWNlIGlzIHRoZSBtYWluIGVudHJ5IHBvaW50IGZvciB0aGlzIGZlYXR1cmUgbW9kdWxlLiBJdCBwcm92aWRlc1xuICogYW4gQVBJIGZvciB1cGxvYWRpbmcgYW5kIGRvd25sb2FkaW5nIGJpbmFyeSBmaWxlcyBmcm9tIENsb3VkIFN0b3JhZ2UgZm9yXG4gKiBGaXJlYmFzZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVN0b3JhZ2Uge1xuICBwdWJsaWMgcmVhZG9ubHkgc3RvcmFnZTogc3RvcmFnZS5TdG9yYWdlO1xuXG4gIHB1YmxpYyByZWFkb25seSBrZWVwVW5zdGFibGVVbnRpbEZpcnN0OiA8VD4ob2JzOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+O1xuICBwdWJsaWMgcmVhZG9ubHkgc2NoZWR1bGVyczogybVBbmd1bGFyRmlyZVNjaGVkdWxlcnM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOkZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6c3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGx8dW5kZWZpbmVkLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQlVDS0VUKSBzdG9yYWdlQnVja2V0OnN0cmluZ3xudWxsLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5zY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuICAgIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnkodGhpcy5zY2hlZHVsZXJzLCBwbGF0Zm9ybUlkKTtcblxuICAgIHRoaXMuc3RvcmFnZSA9IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgYXBwID0gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKTtcbiAgICAgIHJldHVybiBhcHAuc3RvcmFnZShzdG9yYWdlQnVja2V0IHx8IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICByZWYocGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JhZ2VSZWYodGhpcy5zdG9yYWdlLnJlZihwYXRoKSwgdGhpcy5zY2hlZHVsZXJzLCB0aGlzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3QpO1xuICB9XG5cbiAgdXBsb2FkKHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBtZXRhZGF0YT86IFVwbG9hZE1ldGFkYXRhKSB7XG4gICAgY29uc3Qgc3RvcmFnZVJlZiA9IHRoaXMuc3RvcmFnZS5yZWYocGF0aCk7XG4gICAgY29uc3QgcmVmID0gY3JlYXRlU3RvcmFnZVJlZihzdG9yYWdlUmVmLCB0aGlzLnNjaGVkdWxlcnMsIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gICAgcmV0dXJuIHJlZi5wdXQoZGF0YSwgbWV0YWRhdGEpO1xuICB9XG5cbn1cbiJdfQ==