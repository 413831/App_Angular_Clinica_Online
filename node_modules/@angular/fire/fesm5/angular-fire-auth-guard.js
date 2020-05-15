import { Injectable, Inject, Optional, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, pipe } from 'rxjs';
import { take, map, observeOn, switchMap, shareReplay } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵfirebaseAppFactory, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ AngularFireAuthGuard.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireAuthGuard_Factory() { return new AngularFireAuthGuard(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(NgZone), ɵɵinject(Router)); }, token: AngularFireAuthGuard, providedIn: "any" });
    return AngularFireAuthGuard;
}());
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
var canActivate = (/**
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
var loggedIn = map((ɵ0));
var ɵ1 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return !!user && !user.isAnonymous; };
/** @type {?} */
var isNotAnonymous = map((ɵ1));
var ɵ2 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return user ? user.getIdTokenResult() : of(null); };
/** @type {?} */
var idTokenResult = switchMap((ɵ2));
var ɵ3 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return !!user && user.emailVerified; };
/** @type {?} */
var emailVerified = map((ɵ3));
var ɵ4 = /**
 * @param {?} idTokenResult
 * @return {?}
 */
function (idTokenResult) { return idTokenResult ? idTokenResult.claims : []; };
/** @type {?} */
var customClaims = pipe(idTokenResult, map((ɵ4)));
/** @type {?} */
var hasCustomClaim = (/**
 * @param {?} claim
 * @return {?}
 */
function (claim) { return pipe(customClaims, map((/**
 * @param {?} claims
 * @return {?}
 */
function (claims) { return claims.hasOwnProperty(claim); }))); });
/** @type {?} */
var redirectUnauthorizedTo = (/**
 * @param {?} redirect
 * @return {?}
 */
function (redirect) { return pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
function (loggedIn) { return loggedIn || redirect; }))); });
/** @type {?} */
var redirectLoggedInTo = (/**
 * @param {?} redirect
 * @return {?}
 */
function (redirect) { return pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
function (loggedIn) { return loggedIn && redirect || true; }))); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireAuthGuardModule = /** @class */ (function () {
    function AngularFireAuthGuardModule() {
    }
    AngularFireAuthGuardModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireAuthGuard]
                },] }
    ];
    return AngularFireAuthGuardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireAuthGuard, AngularFireAuthGuardModule, canActivate, customClaims, emailVerified, hasCustomClaim, idTokenResult, isNotAnonymous, loggedIn, redirectLoggedInTo, redirectUnauthorizedTo };
//# sourceMappingURL=angular-fire-auth-guard.js.map
