/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, NgZone, PLATFORM_ID, InjectionToken } from '@angular/core';
import { getRef } from './utils';
import { createListReference } from './list/create-reference';
import { createObjectReference } from './object/create-reference';
import { FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory, ɵAngularFireSchedulers } from '@angular/fire';
import 'firebase/database';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export const URL = new InjectionToken('angularfire2.realtimeDatabaseURL');
export class AngularFireDatabase {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} databaseURL
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, databaseURL, platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers, platformId);
        this.database = zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            return app.database(databaseURL || undefined);
        }));
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    list(pathOrRef, queryFn) {
        /** @type {?} */
        const ref = getRef(this.database, pathOrRef);
        /** @type {?} */
        let query = ref;
        if (queryFn) {
            query = queryFn(ref);
        }
        return createListReference(query, this);
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    object(pathOrRef) {
        /** @type {?} */
        const ref = getRef(this.database, pathOrRef);
        return createObjectReference(ref, this);
    }
    /**
     * @return {?}
     */
    createPushId() {
        return this.database.ref().push().key;
    }
}
AngularFireDatabase.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireDatabase.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [URL,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireDatabase.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireDatabase_Factory() { return new AngularFireDatabase(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(URL, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireDatabase, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireDatabase.prototype.database;
    /** @type {?} */
    AngularFireDatabase.prototype.schedulers;
    /** @type {?} */
    AngularFireDatabase.prototype.keepUnstableUntilFirst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBc0MsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckwsT0FBTyxtQkFBbUIsQ0FBQzs7OztBQUUzQixNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksY0FBYyxDQUFTLGtDQUFrQyxDQUFDO0FBS2pGLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7O0lBTTlCLFlBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDbEUsV0FBdUIsRUFDM0IsVUFBa0IsRUFDdkMsSUFBWTtRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ3BDLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztZQUM1RCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVELElBQUksQ0FBSSxTQUF3QixFQUFFLE9BQWlCOztjQUMzQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDOztZQUN4QyxLQUFLLEdBQWtCLEdBQUc7UUFDOUIsSUFBRyxPQUFPLEVBQUU7WUFDVixLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxtQkFBbUIsQ0FBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFJLFNBQXdCOztjQUMxQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQzVDLE9BQU8scUJBQXFCLENBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUN4QyxDQUFDOzs7WUF6Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxLQUFLO2FBQ2xCOzs7OzRDQVFJLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzRDQUNwQyxRQUFRLFlBQUksTUFBTSxTQUFDLEdBQUc7WUFDVSxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQXpCZ0IsTUFBTTs7Ozs7SUFnQjNDLHVDQUE0Qzs7SUFFNUMseUNBQW1EOztJQUNuRCxxREFBa0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YWJhc2VRdWVyeSwgUGF0aFJlZmVyZW5jZSwgUXVlcnlGbiwgQW5ndWxhckZpcmVMaXN0LCBBbmd1bGFyRmlyZU9iamVjdCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBnZXRSZWYgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZUxpc3RSZWZlcmVuY2UgfSBmcm9tICcuL2xpc3QvY3JlYXRlLXJlZmVyZW5jZSc7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3RSZWZlcmVuY2UgfSBmcm9tICcuL29iamVjdC9jcmVhdGUtcmVmZXJlbmNlJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIEZJUkVCQVNFX09QVElPTlMsIEZJUkVCQVNFX0FQUF9OQU1FLCDJtWZpcmViYXNlQXBwRmFjdG9yeSwgybVrZWVwVW5zdGFibGVVbnRpbEZpcnN0RmFjdG9yeSwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRhdGFiYXNlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCAnZmlyZWJhc2UvZGF0YWJhc2UnO1xuXG5leHBvcnQgY29uc3QgVVJMID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ2FuZ3VsYXJmaXJlMi5yZWFsdGltZURhdGFiYXNlVVJMJylcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZURhdGFiYXNlIHtcbiAgcHVibGljIHJlYWRvbmx5IGRhdGFiYXNlOiBkYXRhYmFzZS5EYXRhYmFzZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgc2NoZWR1bGVyczogybVBbmd1bGFyRmlyZVNjaGVkdWxlcnM7XG4gIHB1YmxpYyByZWFkb25seSBrZWVwVW5zdGFibGVVbnRpbEZpcnN0OiA8VD4ob2JzJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChVUkwpIGRhdGFiYXNlVVJMOnN0cmluZ3xudWxsLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5zY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuICAgIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnkodGhpcy5zY2hlZHVsZXJzLCBwbGF0Zm9ybUlkKTtcblxuICAgIHRoaXMuZGF0YWJhc2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFwcCA9IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZyk7XG4gICAgICByZXR1cm4gYXBwLmRhdGFiYXNlKGRhdGFiYXNlVVJMIHx8IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBsaXN0PFQ+KHBhdGhPclJlZjogUGF0aFJlZmVyZW5jZSwgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZUxpc3Q8VD4ge1xuICAgIGNvbnN0IHJlZiA9IGdldFJlZih0aGlzLmRhdGFiYXNlLCBwYXRoT3JSZWYpO1xuICAgIGxldCBxdWVyeTogRGF0YWJhc2VRdWVyeSA9IHJlZjtcbiAgICBpZihxdWVyeUZuKSB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5Rm4ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUxpc3RSZWZlcmVuY2U8VD4ocXVlcnksIHRoaXMpO1xuICB9XG5cbiAgb2JqZWN0PFQ+KHBhdGhPclJlZjogUGF0aFJlZmVyZW5jZSk6IEFuZ3VsYXJGaXJlT2JqZWN0PFQ+ICB7XG4gICAgY29uc3QgcmVmID0gZ2V0UmVmKHRoaXMuZGF0YWJhc2UsIHBhdGhPclJlZik7XG4gICAgcmV0dXJuIGNyZWF0ZU9iamVjdFJlZmVyZW5jZTxUPihyZWYsIHRoaXMpO1xuICB9XG5cbiAgY3JlYXRlUHVzaElkKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnJlZigpLnB1c2goKS5rZXk7XG4gIH1cblxufVxuXG5leHBvcnQge1xuICBQYXRoUmVmZXJlbmNlLFxuICBEYXRhYmFzZVNuYXBzaG90LFxuICBDaGlsZEV2ZW50LFxuICBMaXN0ZW5FdmVudCxcbiAgUXVlcnlGbixcbiAgQW5ndWxhckZpcmVMaXN0LFxuICBBbmd1bGFyRmlyZU9iamVjdCxcbiAgQW5ndWxhckZpcmVBY3Rpb24sXG4gIEFjdGlvbixcbiAgU25hcHNob3RBY3Rpb25cbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbiJdfQ==