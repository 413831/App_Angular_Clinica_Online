/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, NgZone, PLATFORM_ID } from '@angular/core';
import { Observable, empty, of, throwError } from 'rxjs';
import { mergeMap, catchError, map, switchMap, concat, observeOn, defaultIfEmpty } from 'rxjs/operators';
import { ɵAngularFireSchedulers, FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵlazySDKProxy } from '@angular/fire';
import { ɵfirebaseAppFactory } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
// WARNING: interface has both a type and a value, skipping emit
;
var AngularFireMessaging = /** @class */ (function () {
    function AngularFireMessaging(options, nameOrConfig, platformId, zone) {
        var _this = this;
        /** @type {?} */
        var schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        var messaging = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return isPlatformServer(platformId) ? empty() : import('firebase/messaging'); })), map((/**
         * @return {?}
         */
        function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
         * @param {?} app
         * @return {?}
         */
        function (app) { return app.messaging(); })));
        if (!isPlatformServer(platformId)) {
            this.requestPermission = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return messaging.requestPermission(); })));
        }
        else {
            this.requestPermission = throwError('Not available on server platform.');
        }
        this.getToken = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        function (messaging) { return messaging.getToken(); })), defaultIfEmpty(null));
        /** @type {?} */
        var tokenChanges = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        function (messaging) { return new Observable(messaging.onTokenRefresh.bind(messaging)).pipe(switchMap((/**
         * @return {?}
         */
        function () { return messaging.getToken(); }))); })));
        this.tokenChanges = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        function (messaging) { return messaging.getToken(); })), concat(tokenChanges));
        this.messages = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        function (messaging) { return new Observable(messaging.onMessage.bind(messaging)); })));
        this.requestToken = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        function () { return _this.requestPermission; })), catchError((/**
         * @return {?}
         */
        function () { return of(null); })), mergeMap((/**
         * @return {?}
         */
        function () { return _this.tokenChanges; })));
        this.deleteToken = (/**
         * @param {?} token
         * @return {?}
         */
        function (token) { return messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        function (messaging) { return messaging.deleteToken(token); })), defaultIfEmpty(false)); });
        return ɵlazySDKProxy(this, messaging, zone);
    }
    AngularFireMessaging.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireMessaging.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ AngularFireMessaging.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireMessaging_Factory() { return new AngularFireMessaging(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireMessaging, providedIn: "any" });
    return AngularFireMessaging;
}());
export { AngularFireMessaging };
if (false) {
    /** @type {?} */
    AngularFireMessaging.prototype.requestPermission;
    /** @type {?} */
    AngularFireMessaging.prototype.getToken;
    /** @type {?} */
    AngularFireMessaging.prototype.tokenChanges;
    /** @type {?} */
    AngularFireMessaging.prototype.messages;
    /** @type {?} */
    AngularFireMessaging.prototype.requestToken;
    /** @type {?} */
    AngularFireMessaging.prototype.deleteToken;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9tZXNzYWdpbmcvIiwic291cmNlcyI6WyJtZXNzYWdpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pHLE9BQU8sRUFBc0Msc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFb0YsQ0FBQztBQUV4STtJQVlFLDhCQUM0QixPQUF1QixFQUNWLFlBQW9ELEVBQ3RFLFVBQWtCLEVBQ3ZDLElBQVk7UUFKZCxpQkFpRUM7O1lBM0RPLFVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQzs7WUFFN0MsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ2xDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3BDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFyRSxDQUFxRSxFQUFDLEVBQ3RG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QyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7O2dCQTdFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLEtBQUs7aUJBQ2xCOzs7O2dEQVdJLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCO2dCQUNKLE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXO2dCQXpCZ0IsTUFBTTs7OytCQUE3QztDQXlGQyxBQS9FRCxJQStFQztTQTVFWSxvQkFBb0I7OztJQUUvQixpREFBb0Q7O0lBQ3BELHdDQUFrRDs7SUFDbEQsNENBQXNEOztJQUN0RCx3Q0FBeUM7O0lBQ3pDLDRDQUFzRDs7SUFDdEQsMkNBQW9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCwgTmdab25lLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVzc2FnaW5nIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGVtcHR5LCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIGNhdGNoRXJyb3IsIG1hcCwgc3dpdGNoTWFwLCBjb25jYXQsIG9ic2VydmVPbiwgZGVmYXVsdElmRW1wdHkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMsIEZpcmViYXNlQXBwQ29uZmlnLCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycywgRklSRUJBU0VfQVBQX05BTUUsIEZJUkVCQVNFX09QVElPTlMsIMm1bGF6eVNES1Byb3h5LCDJtVByb21pc2VQcm94eSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgybVmaXJlYmFzZUFwcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaXJlTWVzc2FnaW5nIGV4dGVuZHMgT21pdDzJtVByb21pc2VQcm94eTxtZXNzYWdpbmcuTWVzc2FnaW5nPiwgJ2RlbGV0ZVRva2VuJ3wnZ2V0VG9rZW4nfCdyZXF1ZXN0UGVybWlzc2lvbic+IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlTWVzc2FnaW5nIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdFBlcm1pc3Npb246IE9ic2VydmFibGU8dm9pZD47XG4gIHB1YmxpYyByZWFkb25seSBnZXRUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmd8bnVsbD47XG4gIHB1YmxpYyByZWFkb25seSB0b2tlbkNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nfG51bGw+O1xuICBwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZXM6IE9ic2VydmFibGU8e30+O1xuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdFRva2VuOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IGRlbGV0ZVRva2VuOiAodG9rZW46IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCBzY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuXG4gICAgY29uc3QgbWVzc2FnaW5nID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkgPyBlbXB0eSgpIDogaW1wb3J0KCdmaXJlYmFzZS9tZXNzYWdpbmcnKSksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICBtYXAoYXBwID0+IGFwcC5tZXNzYWdpbmcoKSlcbiAgICApO1xuXG4gICAgaWYgKCFpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpKSB7XG5cbiAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb24gPSBtZXNzYWdpbmcucGlwZShcbiAgICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5yZXF1ZXN0UGVybWlzc2lvbigpKSxcbiAgICAgICk7XG4gICAgXG4gICAgfSBlbHNlIHtcbiAgICBcbiAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb24gPSB0aHJvd0Vycm9yKCdOb3QgYXZhaWxhYmxlIG9uIHNlcnZlciBwbGF0Zm9ybS4nKTtcbiAgICBcbiAgICB9XG5cbiAgICB0aGlzLmdldFRva2VuID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5nZXRUb2tlbigpKSxcbiAgICAgIGRlZmF1bHRJZkVtcHR5KG51bGwpXG4gICAgKVxuXG4gICAgY29uc3QgdG9rZW5DaGFuZ2VzID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG5ldyBPYnNlcnZhYmxlKG1lc3NhZ2luZy5vblRva2VuUmVmcmVzaC5iaW5kKG1lc3NhZ2luZykpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtZXNzYWdpbmcuZ2V0VG9rZW4oKSlcbiAgICAgICkpXG4gICAgKTtcblxuICAgIHRoaXMudG9rZW5DaGFuZ2VzID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5nZXRUb2tlbigpKSxcbiAgICAgIGNvbmNhdCh0b2tlbkNoYW5nZXMpXG4gICAgKTtcblxuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbmV3IE9ic2VydmFibGUobWVzc2FnaW5nLm9uTWVzc2FnZS5iaW5kKG1lc3NhZ2luZykpKVxuICAgICk7XG5cbiAgICB0aGlzLnJlcXVlc3RUb2tlbiA9IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uKSxcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YobnVsbCkpLFxuICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy50b2tlbkNoYW5nZXMpXG4gICAgKTtcblxuICAgIHRoaXMuZGVsZXRlVG9rZW4gPSAodG9rZW46IHN0cmluZykgPT4gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5kZWxldGVUb2tlbih0b2tlbikpLFxuICAgICAgZGVmYXVsdElmRW1wdHkoZmFsc2UpXG4gICAgKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBtZXNzYWdpbmcsIHpvbmUpO1xuICB9XG5cbn1cbiJdfQ==