(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('@angular/fire')) :
    typeof define === 'function' && define.amd ? define('@angular/fire/auth-guard', ['exports', '@angular/core', '@angular/router', 'rxjs', 'rxjs/operators', '@angular/fire'], factory) :
    (global = global || self, factory((global.angular = global.angular || {}, global.angular.fire = global.angular.fire || {}, global.angular.fire['auth-guard'] = {}), global.ng.core, global.ng.router, global.rxjs, global.rxjs.operators, global.angular.fire));
}(this, (function (exports, core, router, rxjs, operators, fire) { 'use strict';

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
                return _this.authState.pipe(operators.take(1), authPipeFactory(next, state), operators.map((/**
                 * @param {?} can
                 * @return {?}
                 */
                function (can) { return typeof can == "boolean" ? can : _this.router.createUrlTree((/** @type {?} */ (can))); })));
            });
            /** @type {?} */
            var auth = rxjs.of(undefined).pipe(operators.observeOn(new fire["ɵAngularFireSchedulers"](zone).outsideAngular), operators.switchMap((/**
             * @return {?}
             */
            function () { return zone.runOutsideAngular((/**
             * @return {?}
             */
            function () { return import('firebase/auth'); })); })), operators.observeOn(new fire["ɵAngularFireSchedulers"](zone).insideAngular), operators.map((/**
             * @return {?}
             */
            function () { return fire["ɵfirebaseAppFactory"](options, zone, nameOrConfig); })), operators.map((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return app.auth(); })), operators.shareReplay({ bufferSize: 1, refCount: false }));
            this.authState = auth.pipe(operators.switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            function (auth) { return new rxjs.Observable(auth.onAuthStateChanged.bind(auth)); })));
        }
        AngularFireAuthGuard.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'any'
                    },] }
        ];
        /** @nocollapse */
        AngularFireAuthGuard.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [fire.FIREBASE_OPTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [fire.FIREBASE_APP_NAME,] }] },
            { type: core.NgZone },
            { type: router.Router }
        ]; };
        /** @nocollapse */ AngularFireAuthGuard.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AngularFireAuthGuard_Factory() { return new AngularFireAuthGuard(core["ɵɵinject"](fire.FIREBASE_OPTIONS), core["ɵɵinject"](fire.FIREBASE_APP_NAME, 8), core["ɵɵinject"](core.NgZone), core["ɵɵinject"](router.Router)); }, token: AngularFireAuthGuard, providedIn: "any" });
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
    var loggedIn = operators.map((ɵ0));
    var ɵ1 = /**
     * @param {?} user
     * @return {?}
     */
    function (user) { return !!user && !user.isAnonymous; };
    /** @type {?} */
    var isNotAnonymous = operators.map((ɵ1));
    var ɵ2 = /**
     * @param {?} user
     * @return {?}
     */
    function (user) { return user ? user.getIdTokenResult() : rxjs.of(null); };
    /** @type {?} */
    var idTokenResult = operators.switchMap((ɵ2));
    var ɵ3 = /**
     * @param {?} user
     * @return {?}
     */
    function (user) { return !!user && user.emailVerified; };
    /** @type {?} */
    var emailVerified = operators.map((ɵ3));
    var ɵ4 = /**
     * @param {?} idTokenResult
     * @return {?}
     */
    function (idTokenResult) { return idTokenResult ? idTokenResult.claims : []; };
    /** @type {?} */
    var customClaims = rxjs.pipe(idTokenResult, operators.map((ɵ4)));
    /** @type {?} */
    var hasCustomClaim = (/**
     * @param {?} claim
     * @return {?}
     */
    function (claim) { return rxjs.pipe(customClaims, operators.map((/**
     * @param {?} claims
     * @return {?}
     */
    function (claims) { return claims.hasOwnProperty(claim); }))); });
    /** @type {?} */
    var redirectUnauthorizedTo = (/**
     * @param {?} redirect
     * @return {?}
     */
    function (redirect) { return rxjs.pipe(loggedIn, operators.map((/**
     * @param {?} loggedIn
     * @return {?}
     */
    function (loggedIn) { return loggedIn || redirect; }))); });
    /** @type {?} */
    var redirectLoggedInTo = (/**
     * @param {?} redirect
     * @return {?}
     */
    function (redirect) { return rxjs.pipe(loggedIn, operators.map((/**
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
            { type: core.NgModule, args: [{
                        providers: [AngularFireAuthGuard]
                    },] }
        ];
        return AngularFireAuthGuardModule;
    }());

    exports.AngularFireAuthGuard = AngularFireAuthGuard;
    exports.AngularFireAuthGuardModule = AngularFireAuthGuardModule;
    exports.canActivate = canActivate;
    exports.customClaims = customClaims;
    exports.emailVerified = emailVerified;
    exports.hasCustomClaim = hasCustomClaim;
    exports.idTokenResult = idTokenResult;
    exports.isNotAnonymous = isNotAnonymous;
    exports.loggedIn = loggedIn;
    exports.redirectLoggedInTo = redirectLoggedInTo;
    exports.redirectUnauthorizedTo = redirectUnauthorizedTo;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-fire-auth-guard.umd.js.map
