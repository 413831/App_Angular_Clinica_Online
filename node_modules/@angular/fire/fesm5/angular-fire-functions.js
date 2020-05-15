import { InjectionToken, Injectable, Inject, Optional, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { of, from } from 'rxjs';
import { observeOn, switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var ORIGIN = new InjectionToken('angularfire2.functions.origin');
/** @type {?} */
var REGION = new InjectionToken('angularfire2.functions.region');
// WARNING: interface has both a type and a value, skipping emit
;
var AngularFireFunctions = /** @class */ (function () {
    function AngularFireFunctions(options, nameOrConfig, zone, region, origin) {
        /** @type {?} */
        var schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        var functions = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return import('firebase/functions'); })), map((/**
         * @return {?}
         */
        function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
         * @param {?} app
         * @return {?}
         */
        function (app) { return app.functions(region || undefined); })), tap((/**
         * @param {?} functions
         * @return {?}
         */
        function (functions) {
            if (origin) {
                functions.useFunctionsEmulator(origin);
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        this.httpsCallable = (/**
         * @template T, R
         * @param {?} name
         * @return {?}
         */
        function (name) { return (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return from(functions).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @param {?} functions
         * @return {?}
         */
        function (functions) { return functions.httpsCallable(name)(data); })), map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return (/** @type {?} */ (r.data)); }))); }); });
        return ɵlazySDKProxy(this, functions, zone);
    }
    AngularFireFunctions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireFunctions.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [REGION,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ORIGIN,] }] }
    ]; };
    /** @nocollapse */ AngularFireFunctions.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireFunctions_Factory() { return new AngularFireFunctions(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(NgZone), ɵɵinject(REGION, 8), ɵɵinject(ORIGIN, 8)); }, token: AngularFireFunctions, providedIn: "any" });
    return AngularFireFunctions;
}());
if (false) {
    /** @type {?} */
    AngularFireFunctions.prototype.httpsCallable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireFunctionsModule = /** @class */ (function () {
    function AngularFireFunctionsModule() {
    }
    AngularFireFunctionsModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireFunctions]
                },] }
    ];
    return AngularFireFunctionsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireFunctions, AngularFireFunctionsModule, ORIGIN, REGION };
//# sourceMappingURL=angular-fire-functions.js.map
