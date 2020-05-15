/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, NgZone, InjectionToken } from '@angular/core';
import { of, from } from 'rxjs';
import { map, switchMap, shareReplay, tap, observeOn } from 'rxjs/operators';
import { FIREBASE_APP_NAME, ɵlazySDKProxy, ɵAngularFireSchedulers } from '@angular/fire';
import { FIREBASE_OPTIONS, ɵfirebaseAppFactory } from '@angular/fire';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export const ORIGIN = new InjectionToken('angularfire2.functions.origin');
/** @type {?} */
export const REGION = new InjectionToken('angularfire2.functions.region');
// WARNING: interface has both a type and a value, skipping emit
;
export class AngularFireFunctions {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} zone
     * @param {?} region
     * @param {?} origin
     */
    constructor(options, nameOrConfig, zone, region, origin) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const functions = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => import('firebase/functions'))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.functions(region || undefined))), tap((/**
         * @param {?} functions
         * @return {?}
         */
        functions => {
            if (origin) {
                functions.useFunctionsEmulator(origin);
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        this.httpsCallable = (/**
         * @template T, R
         * @param {?} name
         * @return {?}
         */
        (name) => (/**
         * @param {?} data
         * @return {?}
         */
        (data) => from(functions).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} functions
         * @return {?}
         */
        functions => functions.httpsCallable(name)(data))), map((/**
         * @param {?} r
         * @return {?}
         */
        r => (/** @type {?} */ (r.data)))))));
        return ɵlazySDKProxy(this, functions, zone);
    }
}
AngularFireFunctions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireFunctions.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [REGION,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ORIGIN,] }] }
];
/** @nocollapse */ AngularFireFunctions.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireFunctions_Factory() { return new AngularFireFunctions(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(REGION, 8), i0.ɵɵinject(ORIGIN, 8)); }, token: AngularFireFunctions, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireFunctions.prototype.httpsCallable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9mdW5jdGlvbnMvIiwic291cmNlcyI6WyJmdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFzQyxpQkFBaUIsRUFBRSxhQUFhLEVBQWlCLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUd0RSxNQUFNLE9BQU8sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLCtCQUErQixDQUFDOztBQUNqRixNQUFNLE9BQU8sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLCtCQUErQixDQUFDOztBQUcwQixDQUFDO0FBSzVHLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7O0lBSS9CLFlBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDM0YsSUFBWSxFQUNnQixNQUFrQixFQUNsQixNQUFrQjs7Y0FFeEMsVUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDOztjQUU3QyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbEMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFDcEMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsRUFDN0MsR0FBRzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsRUFBQyxFQUMzRCxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsRUFBQyxFQUM5QyxHQUFHOzs7O1FBQUMsU0FBUyxDQUFDLEVBQUU7WUFDZCxJQUFJLE1BQU0sRUFBRTtnQkFBRSxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUE7YUFBRTtRQUN4RCxDQUFDLEVBQUMsRUFDRixXQUFXLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNoRDtRQUVELElBQUksQ0FBQyxhQUFhOzs7OztRQUFHLENBQWUsSUFBWSxFQUFFLEVBQUU7Ozs7UUFDbEQsQ0FBQyxJQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQy9CLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3BDLFNBQVM7Ozs7UUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFDM0QsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQUEsQ0FBQyxDQUFDLElBQUksRUFBSyxFQUFDLENBQ3RCLENBQUEsQ0FBQSxDQUFBO1FBRUgsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUU5QyxDQUFDOzs7WUFwQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxLQUFLO2FBQ2xCOzs7OzRDQU1JLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCO1lBdEJGLE1BQU07NENBd0J4QyxRQUFRLFlBQUksTUFBTSxTQUFDLE1BQU07NENBQ3pCLFFBQVEsWUFBSSxNQUFNLFNBQUMsTUFBTTs7Ozs7SUFQNUIsNkNBQXlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCwgTmdab25lLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2YsIGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCBzaGFyZVJlcGxheSwgdGFwLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMsIEZpcmViYXNlQXBwQ29uZmlnLCBGSVJFQkFTRV9BUFBfTkFNRSwgybVsYXp5U0RLUHJveHksIMm1UHJvbWlzZVByb3h5LCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgRklSRUJBU0VfT1BUSU9OUywgybVmaXJlYmFzZUFwcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGZ1bmN0aW9ucyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmV4cG9ydCBjb25zdCBPUklHSU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5vcmlnaW4nKTtcbmV4cG9ydCBjb25zdCBSRUdJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5yZWdpb24nKTtcblxuLy8gb3ZlcnJpZGUgaHR0cHNDYWxsYWJsZSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIDUueFxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZUZ1bmN0aW9ucyBleHRlbmRzIE9taXQ8ybVQcm9taXNlUHJveHk8ZnVuY3Rpb25zLkZ1bmN0aW9ucz4sICdodHRwc0NhbGxhYmxlJz4geyB9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlRnVuY3Rpb25zIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgaHR0cHNDYWxsYWJsZTogPFQ9YW55LCBSPWFueT4obmFtZTogc3RyaW5nKSA9PiAoZGF0YTogVCkgPT4gT2JzZXJ2YWJsZTxSPlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgb3B0aW9uczpGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZU9yQ29uZmlnOnN0cmluZ3xGaXJlYmFzZUFwcENvbmZpZ3xudWxsfHVuZGVmaW5lZCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChSRUdJT04pIHJlZ2lvbjpzdHJpbmd8bnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE9SSUdJTikgb3JpZ2luOnN0cmluZ3xudWxsXG4gICkge1xuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG5cbiAgICBjb25zdCBmdW5jdGlvbnMgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gaW1wb3J0KCdmaXJlYmFzZS9mdW5jdGlvbnMnKSksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICBtYXAoYXBwID0+IGFwcC5mdW5jdGlvbnMocmVnaW9uIHx8IHVuZGVmaW5lZCkpLFxuICAgICAgdGFwKGZ1bmN0aW9ucyA9PiB7XG4gICAgICAgIGlmIChvcmlnaW4pIHsgZnVuY3Rpb25zLnVzZUZ1bmN0aW9uc0VtdWxhdG9yKG9yaWdpbikgfVxuICAgICAgfSksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5odHRwc0NhbGxhYmxlID0gPFQ9YW55LCBSPWFueT4obmFtZTogc3RyaW5nKSA9PlxuICAgICAgKGRhdGE6IFQpID0+IGZyb20oZnVuY3Rpb25zKS5waXBlKFxuICAgICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICAgIHN3aXRjaE1hcChmdW5jdGlvbnMgPT4gZnVuY3Rpb25zLmh0dHBzQ2FsbGFibGUobmFtZSkoZGF0YSkpLFxuICAgICAgICBtYXAociA9PiByLmRhdGEgYXMgUilcbiAgICAgIClcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBmdW5jdGlvbnMsIHpvbmUpO1xuXG4gIH1cblxufVxuIl19