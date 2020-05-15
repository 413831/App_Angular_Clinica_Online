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
var AngularFireAuthGuard = /** @class */ (function () {
    function AngularFireAuthGuard(options, nameOrConfig, zone, router) {
        var _this = this;
        this.router = router;
        this.canActivate = (/**
         * @param {?} next
         * @param {?} state
         * @return {?}
         */
        function (next, state) {
            /** @type {?} */
            var authPipeFactory = (/** @type {?} */ (next.data.authGuardPipe)) || ((/**
             * @return {?}
             */
            function () { return loggedIn; }));
            return _this.authState.pipe(take(1), authPipeFactory(next, state), map((/**
             * @param {?} can
             * @return {?}
             */
            function (can) { return typeof can == "boolean" ? can : _this.router.createUrlTree((/** @type {?} */ (can))); })));
        });
        /** @type {?} */
        var auth = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return import('firebase/auth'); })); })), observeOn(new ɵAngularFireSchedulers(zone).insideAngular), map((/**
         * @return {?}
         */
        function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
         * @param {?} app
         * @return {?}
         */
        function (app) { return app.auth(); })), shareReplay({ bufferSize: 1, refCount: false }));
        this.authState = auth.pipe(switchMap((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) { return new Observable(auth.onAuthStateChanged.bind(auth)); })));
    }
    AngularFireAuthGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireAuthGuard.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: NgZone },
        { type: Router }
    ]; };
    /** @nocollapse */ AngularFireAuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAuthGuard_Factory() { return new AngularFireAuthGuard(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.Router)); }, token: AngularFireAuthGuard, providedIn: "any" });
    return AngularFireAuthGuard;
}());
export { AngularFireAuthGuard };
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
export var canActivate = (/**
 * @param {?} pipe
 * @return {?}
 */
function (pipe) { return ({
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: pipe }
}); });
var ɵ0 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return !!user; };
/** @type {?} */
export var loggedIn = map((ɵ0));
var ɵ1 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return !!user && !user.isAnonymous; };
/** @type {?} */
export var isNotAnonymous = map((ɵ1));
var ɵ2 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return user ? user.getIdTokenResult() : of(null); };
/** @type {?} */
export var idTokenResult = switchMap((ɵ2));
var ɵ3 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return !!user && user.emailVerified; };
/** @type {?} */
export var emailVerified = map((ɵ3));
var ɵ4 = /**
 * @param {?} idTokenResult
 * @return {?}
 */
function (idTokenResult) { return idTokenResult ? idTokenResult.claims : []; };
/** @type {?} */
export var customClaims = pipe(idTokenResult, map((ɵ4)));
/** @type {?} */
export var hasCustomClaim = (/**
 * @param {?} claim
 * @return {?}
 */
function (claim) { return pipe(customClaims, map((/**
 * @param {?} claims
 * @return {?}
 */
function (claims) { return claims.hasOwnProperty(claim); }))); });
/** @type {?} */
export var redirectUnauthorizedTo = (/**
 * @param {?} redirect
 * @return {?}
 */
function (redirect) { return pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
function (loggedIn) { return loggedIn || redirect; }))); });
/** @type {?} */
export var redirectLoggedInTo = (/**
 * @param {?} redirect
 * @return {?}
 */
function (redirect) { return pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
function (loggedIn) { return loggedIn && redirect || true; }))); });
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvYXV0aC1ndWFyZC8iLCJzb3VyY2VzIjpbImF1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUE0RCxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQWlCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFzQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUtySjtJQU9FLDhCQUM0QixPQUF1QixFQUNWLFlBQW9ELEVBQzNGLElBQVksRUFDSixNQUFjO1FBSnhCLGlCQWtCQztRQWRTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFnQnhCLGdCQUFXOzs7OztRQUFHLFVBQUMsSUFBNEIsRUFBRSxLQUEwQjs7Z0JBQy9ELGVBQWUsR0FBRyxtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBcUIsSUFBSTs7O1lBQUMsY0FBTSxPQUFBLFFBQVEsRUFBUixDQUFRLEVBQUM7WUFDeEYsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQzVCLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMs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QTRELENBQUM7O0FBQ2hILE1BQU0sS0FBTyxjQUFjOzs7O0FBQUcsVUFBQyxLQUFZLElBQUssT0FBQSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUc7Ozs7QUFBQyxVQUFBLE1BQU0sSUFBSyxPQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLEVBQUMsQ0FBQyxFQUFoRSxDQUFnRSxDQUFBOztBQUNoSCxNQUFNLEtBQU8sc0JBQXNCOzs7O0FBQUcsVUFBQyxRQUFlLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUc7Ozs7QUFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsSUFBSSxRQUFRLEVBQXBCLENBQW9CLEVBQUMsQ0FBQyxFQUFyRCxDQUFxRCxDQUFBOztBQUNoSCxNQUFNLEtBQU8sa0JBQWtCOzs7O0FBQUcsVUFBQyxRQUFlLElBQU0sT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUc7Ozs7QUFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSSxFQUE1QixDQUE0QixFQUFDLENBQUMsRUFBN0QsQ0FBNkQsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgcGlwZSwgVW5hcnlGdW5jdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIG9ic2VydmVPbiwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIEZJUkVCQVNFX09QVElPTlMsIEZJUkVCQVNFX0FQUF9OQU1FLCDJtWZpcmViYXNlQXBwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuXG5leHBvcnQgdHlwZSBBdXRoUGlwZUdlbmVyYXRvciA9IChuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4gQXV0aFBpcGU7XG5leHBvcnQgdHlwZSBBdXRoUGlwZSA9IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxVc2VyfG51bGw+LCBPYnNlcnZhYmxlPGJvb2xlYW58YW55W10+PjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcblxuICBhdXRoU3RhdGU6IE9ic2VydmFibGU8VXNlcnxudWxsPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgY29uc3QgYXV0aCA9IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpKSxcbiAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkuaW5zaWRlQW5ndWxhciksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICBtYXAoYXBwID0+IGFwcC5hdXRoKCkpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYXV0aFN0YXRlID0gYXV0aC5waXBlKFxuICAgICAgc3dpdGNoTWFwKGF1dGggPT4gbmV3IE9ic2VydmFibGU8VXNlcnxudWxsPihhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZC5iaW5kKGF1dGgpKSlcbiAgICApO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUgPSAobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpID0+IHtcbiAgICBjb25zdCBhdXRoUGlwZUZhY3RvcnkgPSBuZXh0LmRhdGEuYXV0aEd1YXJkUGlwZSBhcyBBdXRoUGlwZUdlbmVyYXRvciB8fCAoKCkgPT4gbG9nZ2VkSW4pO1xuICAgIHJldHVybiB0aGlzLmF1dGhTdGF0ZS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIGF1dGhQaXBlRmFjdG9yeShuZXh0LCBzdGF0ZSksXG4gICAgICBtYXAoY2FuID0+IHR5cGVvZiBjYW4gPT0gXCJib29sZWFuXCIgPyBjYW4gOiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKDxhbnlbXT5jYW4pKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgY2FuQWN0aXZhdGUgPSAocGlwZTogQXV0aFBpcGVHZW5lcmF0b3IpID0+ICh7XG4gICAgY2FuQWN0aXZhdGU6IFsgQW5ndWxhckZpcmVBdXRoR3VhcmQgXSwgZGF0YTogeyBhdXRoR3VhcmRQaXBlOiBwaXBlIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VkSW46IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyKTtcbmV4cG9ydCBjb25zdCBpc05vdEFub255bW91czogQXV0aFBpcGUgPSBtYXAodXNlciA9PiAhIXVzZXIgJiYgIXVzZXIuaXNBbm9ueW1vdXMpO1xuZXhwb3J0IGNvbnN0IGlkVG9rZW5SZXN1bHQgPSBzd2l0Y2hNYXAoKHVzZXI6IFVzZXJ8bnVsbCkgPT4gdXNlciA/IHVzZXIuZ2V0SWRUb2tlblJlc3VsdCgpIDogb2YobnVsbCkpO1xuZXhwb3J0IGNvbnN0IGVtYWlsVmVyaWZpZWQ6IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyICYmIHVzZXIuZW1haWxWZXJpZmllZCk7XG5leHBvcnQgY29uc3QgY3VzdG9tQ2xhaW1zID0gcGlwZShpZFRva2VuUmVzdWx0LCBtYXAoaWRUb2tlblJlc3VsdCA9PiBpZFRva2VuUmVzdWx0ID8gaWRUb2tlblJlc3VsdC5jbGFpbXMgOiBbXSkpO1xuZXhwb3J0IGNvbnN0IGhhc0N1c3RvbUNsYWltID0gKGNsYWltOnN0cmluZykgPT4gcGlwZShjdXN0b21DbGFpbXMsIG1hcChjbGFpbXMgPT4gIGNsYWltcy5oYXNPd25Qcm9wZXJ0eShjbGFpbSkpKTtcbmV4cG9ydCBjb25zdCByZWRpcmVjdFVuYXV0aG9yaXplZFRvID0gKHJlZGlyZWN0OiBhbnlbXSkgPT4gcGlwZShsb2dnZWRJbiwgbWFwKGxvZ2dlZEluID0+IGxvZ2dlZEluIHx8IHJlZGlyZWN0KSk7XG5leHBvcnQgY29uc3QgcmVkaXJlY3RMb2dnZWRJblRvID0gKHJlZGlyZWN0OiBhbnlbXSkgPT4gIHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiAmJiByZWRpcmVjdCB8fCB0cnVlKSk7XG4iXX0=