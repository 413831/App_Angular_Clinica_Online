(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/fire')) :
    typeof define === 'function' && define.amd ? define('@angular/fire/auth', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/fire'], factory) :
    (global = global || self, factory((global.angular = global.angular || {}, global.angular.fire = global.angular.fire || {}, global.angular.fire.auth = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.angular.fire));
}(this, (function (exports, core, rxjs, operators, fire) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit
    ;
    var AngularFireAuth = /** @class */ (function () {
        function AngularFireAuth(options, nameOrConfig, platformId, zone) {
            /** @type {?} */
            var schedulers = new fire["ɵAngularFireSchedulers"](zone);
            /** @type {?} */
            var keepUnstableUntilFirst = fire["ɵkeepUnstableUntilFirstFactory"](schedulers, platformId);
            /** @type {?} */
            var auth = rxjs.of(undefined).pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @return {?}
             */
            function () { return zone.runOutsideAngular((/**
             * @return {?}
             */
            function () { return import('firebase/auth'); })); })), operators.map((/**
             * @return {?}
             */
            function () { return fire["ɵfirebaseAppFactory"](options, zone, nameOrConfig); })), operators.map((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return app.auth(); })), operators.shareReplay({ bufferSize: 1, refCount: false }));
            this.authState = auth.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            function (auth) { return new rxjs.Observable(auth.onAuthStateChanged.bind(auth)); })), keepUnstableUntilFirst);
            this.user = auth.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            function (auth) { return new rxjs.Observable(auth.onIdTokenChanged.bind(auth)); })), keepUnstableUntilFirst);
            this.idToken = this.user.pipe(operators.switchMap((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return user ? rxjs.from(user.getIdToken()) : rxjs.of(null); })));
            this.idTokenResult = this.user.pipe(operators.switchMap((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return user ? rxjs.from(user.getIdTokenResult()) : rxjs.of(null); })));
            return fire["ɵlazySDKProxy"](this, auth, zone);
        }
        AngularFireAuth.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'any'
                    },] }
        ];
        /** @nocollapse */
        AngularFireAuth.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [fire.FIREBASE_OPTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [fire.FIREBASE_APP_NAME,] }] },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: core.NgZone }
        ]; };
        /** @nocollapse */ AngularFireAuth.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AngularFireAuth_Factory() { return new AngularFireAuth(core["ɵɵinject"](fire.FIREBASE_OPTIONS), core["ɵɵinject"](fire.FIREBASE_APP_NAME, 8), core["ɵɵinject"](core.PLATFORM_ID), core["ɵɵinject"](core.NgZone)); }, token: AngularFireAuth, providedIn: "any" });
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
            { type: core.NgModule, args: [{
                        providers: [AngularFireAuth]
                    },] }
        ];
        return AngularFireAuthModule;
    }());

    exports.AngularFireAuth = AngularFireAuth;
    exports.AngularFireAuthModule = AngularFireAuthModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-fire-auth.umd.js.map
