import { Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { observeOn, switchMap, map, shareReplay } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// WARNING: interface has both a type and a value, skipping emit
;
var AngularFireAuth = /** @class */ (function () {
    function AngularFireAuth(options, nameOrConfig, platformId, zone) {
        /** @type {?} */
        var schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        var keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(schedulers, platformId);
        /** @type {?} */
        var auth = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return import('firebase/auth'); })); })), map((/**
         * @return {?}
         */
        function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
         * @param {?} app
         * @return {?}
         */
        function (app) { return app.auth(); })), shareReplay({ bufferSize: 1, refCount: false }));
        this.authState = auth.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) { return new Observable(auth.onAuthStateChanged.bind(auth)); })), keepUnstableUntilFirst);
        this.user = auth.pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) { return new Observable(auth.onIdTokenChanged.bind(auth)); })), keepUnstableUntilFirst);
        this.idToken = this.user.pipe(switchMap((/**
         * @param {?} user
         * @return {?}
         */
        function (user) { return user ? from(user.getIdToken()) : of(null); })));
        this.idTokenResult = this.user.pipe(switchMap((/**
         * @param {?} user
         * @return {?}
         */
        function (user) { return user ? from(user.getIdTokenResult()) : of(null); })));
        return ɵlazySDKProxy(this, auth, zone);
    }
    AngularFireAuth.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireAuth.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ AngularFireAuth.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireAuth_Factory() { return new AngularFireAuth(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone)); }, token: AngularFireAuth, providedIn: "any" });
    return AngularFireAuth;
}());
if (false) {
    /**
     * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
     * @type {?}
     */
    AngularFireAuth.prototype.authState;
    /**
     * Observable of the currently signed-in user's JWT token used to identify the user to a Firebase service (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.idToken;
    /**
     * Observable of the currently signed-in user (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.user;
    /**
     * Observable of the currently signed-in user's IdTokenResult object which contains the ID token JWT string and other
     * helper properties for getting different data associated with the token as well as all the decoded payload claims
     * (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.idTokenResult;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireAuthModule = /** @class */ (function () {
    function AngularFireAuthModule() {
    }
    AngularFireAuthModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireAuth]
                },] }
    ];
    return AngularFireAuthModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireAuth, AngularFireAuthModule };
//# sourceMappingURL=angular-fire-auth.js.map
