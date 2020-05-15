/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { map, switchMap, take, observeOn, shareReplay } from 'rxjs/operators';
import { ɵAngularFireSchedulers, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory } from '@angular/fire';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
import * as i2 from "@angular/router";
export class AngularFireAuthGuard {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} zone
     * @param {?} router
     */
    constructor(options, nameOrConfig, zone, router) {
        this.router = router;
        this.canActivate = (/**
         * @param {?} next
         * @param {?} state
         * @return {?}
         */
        (next, state) => {
            /** @type {?} */
            const authPipeFactory = (/** @type {?} */ (next.data.authGuardPipe)) || ((/**
             * @return {?}
             */
            () => loggedIn));
            return this.authState.pipe(take(1), authPipeFactory(next, state), map((/**
             * @param {?} can
             * @return {?}
             */
            can => typeof can == "boolean" ? can : this.router.createUrlTree((/** @type {?} */ (can))))));
        });
        /** @type {?} */
        const auth = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
         * @return {?}
         */
        () => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => import('firebase/auth'))))), observeOn(new ɵAngularFireSchedulers(zone).insideAngular), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.auth())), shareReplay({ bufferSize: 1, refCount: false }));
        this.authState = auth.pipe(switchMap((/**
         * @param {?} auth
         * @return {?}
         */
        auth => new Observable(auth.onAuthStateChanged.bind(auth)))));
    }
}
AngularFireAuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireAuthGuard.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: NgZone },
    { type: Router }
];
/** @nocollapse */ AngularFireAuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAuthGuard_Factory() { return new AngularFireAuthGuard(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.Router)); }, token: AngularFireAuthGuard, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireAuthGuard.prototype.authState;
    /** @type {?} */
    AngularFireAuthGuard.prototype.canActivate;
    /**
     * @type {?}
     * @private
     */
    AngularFireAuthGuard.prototype.router;
}
/** @type {?} */
export const canActivate = (/**
 * @param {?} pipe
 * @return {?}
 */
(pipe) => ({
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: pipe }
}));
const ɵ0 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user;
/** @type {?} */
export const loggedIn = map((ɵ0));
const ɵ1 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user && !user.isAnonymous;
/** @type {?} */
export const isNotAnonymous = map((ɵ1));
const ɵ2 = /**
 * @param {?} user
 * @return {?}
 */
(user) => user ? user.getIdTokenResult() : of(null);
/** @type {?} */
export const idTokenResult = switchMap((ɵ2));
const ɵ3 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user && user.emailVerified;
/** @type {?} */
export const emailVerified = map((ɵ3));
const ɵ4 = /**
 * @param {?} idTokenResult
 * @return {?}
 */
idTokenResult => idTokenResult ? idTokenResult.claims : [];
/** @type {?} */
export const customClaims = pipe(idTokenResult, map((ɵ4)));
/** @type {?} */
export const hasCustomClaim = (/**
 * @param {?} claim
 * @return {?}
 */
(claim) => pipe(customClaims, map((/**
 * @param {?} claims
 * @return {?}
 */
claims => claims.hasOwnProperty(claim)))));
/** @type {?} */
export const redirectUnauthorizedTo = (/**
 * @param {?} redirect
 * @return {?}
 */
(redirect) => pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
loggedIn => loggedIn || redirect))));
/** @type {?} */
export const redirectLoggedInTo = (/**
 * @param {?} redirect
 * @return {?}
 */
(redirect) => pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
loggedIn => loggedIn && redirect || true))));
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvYXV0aC1ndWFyZC8iLCJzb3VyY2VzIjpbImF1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUE0RCxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQWlCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFzQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFySixNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBSS9CLFlBQzRCLE9BQXVCLEVBQ1YsWUFBb0QsRUFDM0YsSUFBWSxFQUNKLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZ0J4QixnQkFBVzs7Ozs7UUFBRyxDQUFDLElBQTRCLEVBQUUsS0FBMEIsRUFBRSxFQUFFOztrQkFDbkUsZUFBZSxHQUFHLG1CQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFxQixJQUFJOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUM7WUFDeEYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQzVCLEdBQUc7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMs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LENBQUMsRUFBQyxDQUFDLENBQUE7O0FBQ2hILE1BQU0sT0FBTyxzQkFBc0I7Ozs7QUFBRyxDQUFDLFFBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHOzs7O0FBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFDLENBQUMsQ0FBQTs7QUFDaEgsTUFBTSxPQUFPLGtCQUFrQjs7OztBQUFHLENBQUMsUUFBZSxFQUFFLEVBQUUsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUc7Ozs7QUFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgcGlwZSwgVW5hcnlGdW5jdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIG9ic2VydmVPbiwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIEZJUkVCQVNFX09QVElPTlMsIEZJUkVCQVNFX0FQUF9OQU1FLCDJtWZpcmViYXNlQXBwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuXG5leHBvcnQgdHlwZSBBdXRoUGlwZUdlbmVyYXRvciA9IChuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4gQXV0aFBpcGU7XG5leHBvcnQgdHlwZSBBdXRoUGlwZSA9IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxVc2VyfG51bGw+LCBPYnNlcnZhYmxlPGJvb2xlYW58YW55W10+PjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcblxuICBhdXRoU3RhdGU6IE9ic2VydmFibGU8VXNlcnxudWxsPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgY29uc3QgYXV0aCA9IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpKSxcbiAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkuaW5zaWRlQW5ndWxhciksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICBtYXAoYXBwID0+IGFwcC5hdXRoKCkpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYXV0aFN0YXRlID0gYXV0aC5waXBlKFxuICAgICAgc3dpdGNoTWFwKGF1dGggPT4gbmV3IE9ic2VydmFibGU8VXNlcnxudWxsPihhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZC5iaW5kKGF1dGgpKSlcbiAgICApO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUgPSAobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpID0+IHtcbiAgICBjb25zdCBhdXRoUGlwZUZhY3RvcnkgPSBuZXh0LmRhdGEuYXV0aEd1YXJkUGlwZSBhcyBBdXRoUGlwZUdlbmVyYXRvciB8fCAoKCkgPT4gbG9nZ2VkSW4pO1xuICAgIHJldHVybiB0aGlzLmF1dGhTdGF0ZS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIGF1dGhQaXBlRmFjdG9yeShuZXh0LCBzdGF0ZSksXG4gICAgICBtYXAoY2FuID0+IHR5cGVvZiBjYW4gPT0gXCJib29sZWFuXCIgPyBjYW4gOiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKDxhbnlbXT5jYW4pKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgY2FuQWN0aXZhdGUgPSAocGlwZTogQXV0aFBpcGVHZW5lcmF0b3IpID0+ICh7XG4gICAgY2FuQWN0aXZhdGU6IFsgQW5ndWxhckZpcmVBdXRoR3VhcmQgXSwgZGF0YTogeyBhdXRoR3VhcmRQaXBlOiBwaXBlIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VkSW46IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyKTtcbmV4cG9ydCBjb25zdCBpc05vdEFub255bW91czogQXV0aFBpcGUgPSBtYXAodXNlciA9PiAhIXVzZXIgJiYgIXVzZXIuaXNBbm9ueW1vdXMpO1xuZXhwb3J0IGNvbnN0IGlkVG9rZW5SZXN1bHQgPSBzd2l0Y2hNYXAoKHVzZXI6IFVzZXJ8bnVsbCkgPT4gdXNlciA/IHVzZXIuZ2V0SWRUb2tlblJlc3VsdCgpIDogb2YobnVsbCkpO1xuZXhwb3J0IGNvbnN0IGVtYWlsVmVyaWZpZWQ6IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyICYmIHVzZXIuZW1haWxWZXJpZmllZCk7XG5leHBvcnQgY29uc3QgY3VzdG9tQ2xhaW1zID0gcGlwZShpZFRva2VuUmVzdWx0LCBtYXAoaWRUb2tlblJlc3VsdCA9PiBpZFRva2VuUmVzdWx0ID8gaWRUb2tlblJlc3VsdC5jbGFpbXMgOiBbXSkpO1xuZXhwb3J0IGNvbnN0IGhhc0N1c3RvbUNsYWltID0gKGNsYWltOnN0cmluZykgPT4gcGlwZShjdXN0b21DbGFpbXMsIG1hcChjbGFpbXMgPT4gIGNsYWltcy5oYXNPd25Qcm9wZXJ0eShjbGFpbSkpKTtcbmV4cG9ydCBjb25zdCByZWRpcmVjdFVuYXV0aG9yaXplZFRvID0gKHJlZGlyZWN0OiBhbnlbXSkgPT4gcGlwZShsb2dnZWRJbiwgbWFwKGxvZ2dlZEluID0+IGxvZ2dlZEluIHx8IHJlZGlyZWN0KSk7XG5leHBvcnQgY29uc3QgcmVkaXJlY3RMb2dnZWRJblRvID0gKHJlZGlyZWN0OiBhbnlbXSkgPT4gIHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiAmJiByZWRpcmVjdCB8fCB0cnVlKSk7XG4iXX0=