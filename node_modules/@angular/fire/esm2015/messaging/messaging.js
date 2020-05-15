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
export class AngularFireMessaging {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, platformId, zone) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const messaging = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => isPlatformServer(platformId) ? empty() : import('firebase/messaging'))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.messaging())));
        if (!isPlatformServer(platformId)) {
            this.requestPermission = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            messaging => messaging.requestPermission())));
        }
        else {
            this.requestPermission = throwError('Not available on server platform.');
        }
        this.getToken = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => messaging.getToken())), defaultIfEmpty(null));
        /** @type {?} */
        const tokenChanges = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => new Observable(messaging.onTokenRefresh.bind(messaging)).pipe(switchMap((/**
         * @return {?}
         */
        () => messaging.getToken()))))));
        this.tokenChanges = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => messaging.getToken())), concat(tokenChanges));
        this.messages = messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => new Observable(messaging.onMessage.bind(messaging)))));
        this.requestToken = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        () => this.requestPermission)), catchError((/**
         * @return {?}
         */
        () => of(null))), mergeMap((/**
         * @return {?}
         */
        () => this.tokenChanges)));
        this.deleteToken = (/**
         * @param {?} token
         * @return {?}
         */
        (token) => messaging.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => messaging.deleteToken(token))), defaultIfEmpty(false)));
        return ɵlazySDKProxy(this, messaging, zone);
    }
}
AngularFireMessaging.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireMessaging.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireMessaging.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireMessaging_Factory() { return new AngularFireMessaging(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireMessaging, providedIn: "any" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9tZXNzYWdpbmcvIiwic291cmNlcyI6WyJtZXNzYWdpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pHLE9BQU8sRUFBc0Msc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFb0YsQ0FBQztBQUt4SSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBUy9CLFlBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDdEUsVUFBa0IsRUFDdkMsSUFBWTs7Y0FFTixVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7O2NBRTdDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNsQyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUNwQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDLEVB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NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCO1lBQ0osTUFBTSx1QkFBdEMsTUFBTSxTQUFDLFdBQVc7WUF6QmdCLE1BQU07Ozs7O0lBZTNDLGlEQUFvRDs7SUFDcEQsd0NBQWtEOztJQUNsRCw0Q0FBc0Q7O0lBQ3RELHdDQUF5Qzs7SUFDekMsNENBQXNEOztJQUN0RCwyQ0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBOZ1pvbmUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXNzYWdpbmcgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZW1wdHksIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAsIGNvbmNhdCwgb2JzZXJ2ZU9uLCBkZWZhdWx0SWZFbXB0eSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCBGSVJFQkFTRV9BUFBfTkFNRSwgRklSRUJBU0VfT1BUSU9OUywgybVsYXp5U0RLUHJveHksIMm1UHJvbWlzZVByb3h5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyDJtWZpcmViYXNlQXBwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVNZXNzYWdpbmcgZXh0ZW5kcyBPbWl0PMm1UHJvbWlzZVByb3h5PG1lc3NhZ2luZy5NZXNzYWdpbmc+LCAnZGVsZXRlVG9rZW4nfCdnZXRUb2tlbid8J3JlcXVlc3RQZXJtaXNzaW9uJz4ge307XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVNZXNzYWdpbmcge1xuXG4gIHB1YmxpYyByZWFkb25seSByZXF1ZXN0UGVybWlzc2lvbjogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcHVibGljIHJlYWRvbmx5IGdldFRva2VuOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IHRva2VuQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmd8bnVsbD47XG4gIHB1YmxpYyByZWFkb25seSBtZXNzYWdlczogT2JzZXJ2YWJsZTx7fT47XG4gIHB1YmxpYyByZWFkb25seSByZXF1ZXN0VG9rZW46IE9ic2VydmFibGU8c3RyaW5nfG51bGw+O1xuICBwdWJsaWMgcmVhZG9ubHkgZGVsZXRlVG9rZW46ICh0b2tlbjogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgb3B0aW9uczpGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZU9yQ29uZmlnOnN0cmluZ3xGaXJlYmFzZUFwcENvbmZpZ3xudWxsfHVuZGVmaW5lZCxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgem9uZTogTmdab25lXG4gICkge1xuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG5cbiAgICBjb25zdCBtZXNzYWdpbmcgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKSA/IGVtcHR5KCkgOiBpbXBvcnQoJ2ZpcmViYXNlL21lc3NhZ2luZycpKSxcbiAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgIG1hcChhcHAgPT4gYXBwLm1lc3NhZ2luZygpKVxuICAgICk7XG5cbiAgICBpZiAoIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcblxuICAgICAgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbiA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbWVzc2FnaW5nLnJlcXVlc3RQZXJtaXNzaW9uKCkpLFxuICAgICAgKTtcbiAgICBcbiAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbiA9IHRocm93RXJyb3IoJ05vdCBhdmFpbGFibGUgb24gc2VydmVyIHBsYXRmb3JtLicpO1xuICAgIFxuICAgIH1cblxuICAgIHRoaXMuZ2V0VG9rZW4gPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbWVzc2FnaW5nLmdldFRva2VuKCkpLFxuICAgICAgZGVmYXVsdElmRW1wdHkobnVsbClcbiAgICApXG5cbiAgICBjb25zdCB0b2tlbkNoYW5nZXMgPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbmV3IE9ic2VydmFibGUobWVzc2FnaW5nLm9uVG9rZW5SZWZyZXNoLmJpbmQobWVzc2FnaW5nKSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lc3NhZ2luZy5nZXRUb2tlbigpKVxuICAgICAgKSlcbiAgICApO1xuXG4gICAgdGhpcy50b2tlbkNoYW5nZXMgPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbWVzc2FnaW5nLmdldFRva2VuKCkpLFxuICAgICAgY29uY2F0KHRva2VuQ2hhbmdlcylcbiAgICApO1xuXG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKG1lc3NhZ2luZyA9PiBuZXcgT2JzZXJ2YWJsZShtZXNzYWdpbmcub25NZXNzYWdlLmJpbmQobWVzc2FnaW5nKSkpXG4gICAgKTtcblxuICAgIHRoaXMucmVxdWVzdFRva2VuID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMucmVxdWVzdFBlcm1pc3Npb24pLFxuICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihudWxsKSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLnRva2VuQ2hhbmdlcylcbiAgICApO1xuXG4gICAgdGhpcy5kZWxldGVUb2tlbiA9ICh0b2tlbjogc3RyaW5nKSA9PiBtZXNzYWdpbmcucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbWVzc2FnaW5nLmRlbGV0ZVRva2VuKHRva2VuKSksXG4gICAgICBkZWZhdWx0SWZFbXB0eShmYWxzZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIMm1bGF6eVNES1Byb3h5KHRoaXMsIG1lc3NhZ2luZywgem9uZSk7XG4gIH1cblxufVxuIl19