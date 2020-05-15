(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/fire'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@angular/fire/messaging', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/fire', '@angular/common'], factory) :
    (global = global || self, factory((global.angular = global.angular || {}, global.angular.fire = global.angular.fire || {}, global.angular.fire.messaging = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.angular.fire, global.ng.common));
}(this, (function (exports, core, rxjs, operators, fire, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit
    ;
    var AngularFireMessaging = /** @class */ (function () {
        function AngularFireMessaging(options, nameOrConfig, platformId, zone) {
            var _this = this;
            /** @type {?} */
            var schedulers = new fire["ɵAngularFireSchedulers"](zone);
            /** @type {?} */
            var messaging = rxjs.of(undefined).pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @return {?}
             */
            function () { return common.isPlatformServer(platformId) ? rxjs.empty() : import('firebase/messaging'); })), operators.map((/**
             * @return {?}
             */
            function () { return fire["ɵfirebaseAppFactory"](options, zone, nameOrConfig); })), operators.map((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return app.messaging(); })));
            if (!common.isPlatformServer(platformId)) {
                this.requestPermission = messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
                 * @param {?} messaging
                 * @return {?}
                 */
                function (messaging) { return messaging.requestPermission(); })));
            }
            else {
                this.requestPermission = rxjs.throwError('Not available on server platform.');
            }
            this.getToken = messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return messaging.getToken(); })), operators.defaultIfEmpty(null));
            /** @type {?} */
            var tokenChanges = messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return new rxjs.Observable(messaging.onTokenRefresh.bind(messaging)).pipe(operators.switchMap((/**
             * @return {?}
             */
            function () { return messaging.getToken(); }))); })));
            this.tokenChanges = messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return messaging.getToken(); })), operators.concat(tokenChanges));
            this.messages = messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return new rxjs.Observable(messaging.onMessage.bind(messaging)); })));
            this.requestToken = rxjs.of(undefined).pipe(operators.switchMap((/**
             * @return {?}
             */
            function () { return _this.requestPermission; })), operators.catchError((/**
             * @return {?}
             */
            function () { return rxjs.of(null); })), operators.mergeMap((/**
             * @return {?}
             */
            function () { return _this.tokenChanges; })));
            this.deleteToken = (/**
             * @param {?} token
             * @return {?}
             */
            function (token) { return messaging.pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} messaging
             * @return {?}
             */
            function (messaging) { return messaging.deleteToken(token); })), operators.defaultIfEmpty(false)); });
            return fire["ɵlazySDKProxy"](this, messaging, zone);
        }
        AngularFireMessaging.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'any'
                    },] }
        ];
        /** @nocollapse */
        AngularFireMessaging.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [fire.FIREBASE_OPTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [fire.FIREBASE_APP_NAME,] }] },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: core.NgZone }
        ]; };
        /** @nocollapse */ AngularFireMessaging.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AngularFireMessaging_Factory() { return new AngularFireMessaging(core["ɵɵinject"](fire.FIREBASE_OPTIONS), core["ɵɵinject"](fire.FIREBASE_APP_NAME, 8), core["ɵɵinject"](core.PLATFORM_ID), core["ɵɵinject"](core.NgZone)); }, token: AngularFireMessaging, providedIn: "any" });
        return AngularFireMessaging;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularFireMessagingModule = /** @class */ (function () {
        function AngularFireMessagingModule() {
        }
        AngularFireMessagingModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [AngularFireMessaging]
                    },] }
        ];
        return AngularFireMessagingModule;
    }());

    exports.AngularFireMessaging = AngularFireMessaging;
    exports.AngularFireMessagingModule = AngularFireMessagingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-fire-messaging.umd.js.map
