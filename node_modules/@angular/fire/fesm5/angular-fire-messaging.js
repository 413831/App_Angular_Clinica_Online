import { Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { of, empty, throwError, Observable } from 'rxjs';
import { observeOn, switchMap, map, defaultIfEmpty, concat, catchError, mergeMap } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import { isPlatformServer } from '@angular/common';

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
    /** @nocollapse */ AngularFireMessaging.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireMessaging_Factory() { return new AngularFireMessaging(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone)); }, token: AngularFireMessaging, providedIn: "any" });
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
        { type: NgModule, args: [{
                    providers: [AngularFireMessaging]
                },] }
    ];
    return AngularFireMessagingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireMessaging, AngularFireMessagingModule };
//# sourceMappingURL=angular-fire-messaging.js.map
