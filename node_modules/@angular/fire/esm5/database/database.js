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
export var URL = new InjectionToken('angularfire2.realtimeDatabaseURL');
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
    /** @nocollapse */ AngularFireDatabase.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireDatabase_Factory() { return new AngularFireDatabase(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(URL, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireDatabase, providedIn: "any" });
    return AngularFireDatabase;
}());
export { AngularFireDatabase };
if (false) {
    /** @type {?} */
    AngularFireDatabase.prototype.database;
    /** @type {?} */
    AngularFireDatabase.prototype.schedulers;
    /** @type {?} */
    AngularFireDatabase.prototype.keepUnstableUntilFirst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBc0MsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckwsT0FBTyxtQkFBbUIsQ0FBQzs7OztBQUUzQixNQUFNLEtBQU8sR0FBRyxHQUFHLElBQUksY0FBYyxDQUFTLGtDQUFrQyxDQUFDO0FBRWpGO0lBU0UsNkJBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDbEUsV0FBdUIsRUFDM0IsVUFBa0IsRUFDdkMsSUFBWTtRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDOztnQkFDL0IsR0FBRyxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1lBQzVELE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRUQsa0NBQUk7Ozs7OztJQUFKLFVBQVEsU0FBd0IsRUFBRSxPQUFpQjs7WUFDM0MsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7WUFDeEMsS0FBSyxHQUFrQixHQUFHO1FBQzlCLElBQUcsT0FBTyxFQUFFO1lBQ1YsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sbUJBQW1CLENBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUVELG9DQUFNOzs7OztJQUFOLFVBQVUsU0FBd0I7O1lBQzFCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDNUMsT0FBTyxxQkFBcUIsQ0FBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELDBDQUFZOzs7SUFBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDeEMsQ0FBQzs7Z0JBekNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEI7Ozs7Z0RBUUksTUFBTSxTQUFDLGdCQUFnQjtnREFDdkIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7Z0RBQ3BDLFFBQVEsWUFBSSxNQUFNLFNBQUMsR0FBRztnQkFDVSxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztnQkF6QmdCLE1BQU07Ozs4QkFBN0M7Q0F1REMsQUEzQ0QsSUEyQ0M7U0F4Q1ksbUJBQW1COzs7SUFDOUIsdUNBQTRDOztJQUU1Qyx5Q0FBbUQ7O0lBQ25ELHFEQUFrRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSwgUExBVEZPUk1fSUQsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhYmFzZVF1ZXJ5LCBQYXRoUmVmZXJlbmNlLCBRdWVyeUZuLCBBbmd1bGFyRmlyZUxpc3QsIEFuZ3VsYXJGaXJlT2JqZWN0IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGdldFJlZiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgY3JlYXRlTGlzdFJlZmVyZW5jZSB9IGZyb20gJy4vbGlzdC9jcmVhdGUtcmVmZXJlbmNlJztcbmltcG9ydCB7IGNyZWF0ZU9iamVjdFJlZmVyZW5jZSB9IGZyb20gJy4vb2JqZWN0L2NyZWF0ZS1yZWZlcmVuY2UnO1xuaW1wb3J0IHsgRmlyZWJhc2VPcHRpb25zLCBGaXJlYmFzZUFwcENvbmZpZywgRklSRUJBU0VfT1BUSU9OUywgRklSRUJBU0VfQVBQX05BTUUsIMm1ZmlyZWJhc2VBcHBGYWN0b3J5LCDJtWtlZXBVbnN0YWJsZVVudGlsRmlyc3RGYWN0b3J5LCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGF0YWJhc2UgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0ICdmaXJlYmFzZS9kYXRhYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBVUkwgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLnJlYWx0aW1lRGF0YWJhc2VVUkwnKVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlRGF0YWJhc2Uge1xuICBwdWJsaWMgcmVhZG9ubHkgZGF0YWJhc2U6IGRhdGFiYXNlLkRhdGFiYXNlO1xuXG4gIHB1YmxpYyByZWFkb25seSBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcbiAgcHVibGljIHJlYWRvbmx5IGtlZXBVbnN0YWJsZVVudGlsRmlyc3Q6IDxUPihvYnMkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgb3B0aW9uczpGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZU9yQ29uZmlnOnN0cmluZ3xGaXJlYmFzZUFwcENvbmZpZ3xudWxsfHVuZGVmaW5lZCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFVSTCkgZGF0YWJhc2VVUkw6c3RyaW5nfG51bGwsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgdGhpcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0ID0gybVrZWVwVW5zdGFibGVVbnRpbEZpcnN0RmFjdG9yeSh0aGlzLnNjaGVkdWxlcnMsIHBsYXRmb3JtSWQpO1xuXG4gICAgdGhpcy5kYXRhYmFzZSA9IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgYXBwID0gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKTtcbiAgICAgIHJldHVybiBhcHAuZGF0YWJhc2UoZGF0YWJhc2VVUkwgfHwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpc3Q8VD4ocGF0aE9yUmVmOiBQYXRoUmVmZXJlbmNlLCBxdWVyeUZuPzogUXVlcnlGbik6IEFuZ3VsYXJGaXJlTGlzdDxUPiB7XG4gICAgY29uc3QgcmVmID0gZ2V0UmVmKHRoaXMuZGF0YWJhc2UsIHBhdGhPclJlZik7XG4gICAgbGV0IHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5ID0gcmVmO1xuICAgIGlmKHF1ZXJ5Rm4pIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnlGbihyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlTGlzdFJlZmVyZW5jZTxUPihxdWVyeSwgdGhpcyk7XG4gIH1cblxuICBvYmplY3Q8VD4ocGF0aE9yUmVmOiBQYXRoUmVmZXJlbmNlKTogQW5ndWxhckZpcmVPYmplY3Q8VD4gIHtcbiAgICBjb25zdCByZWYgPSBnZXRSZWYodGhpcy5kYXRhYmFzZSwgcGF0aE9yUmVmKTtcbiAgICByZXR1cm4gY3JlYXRlT2JqZWN0UmVmZXJlbmNlPFQ+KHJlZiwgdGhpcyk7XG4gIH1cblxuICBjcmVhdGVQdXNoSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UucmVmKCkucHVzaCgpLmtleTtcbiAgfVxuXG59XG5cbmV4cG9ydCB7XG4gIFBhdGhSZWZlcmVuY2UsXG4gIERhdGFiYXNlU25hcHNob3QsXG4gIENoaWxkRXZlbnQsXG4gIExpc3RlbkV2ZW50LFxuICBRdWVyeUZuLFxuICBBbmd1bGFyRmlyZUxpc3QsXG4gIEFuZ3VsYXJGaXJlT2JqZWN0LFxuICBBbmd1bGFyRmlyZUFjdGlvbixcbiAgQWN0aW9uLFxuICBTbmFwc2hvdEFjdGlvblxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuIl19