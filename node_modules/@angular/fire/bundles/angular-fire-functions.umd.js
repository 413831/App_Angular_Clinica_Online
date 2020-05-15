(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/fire')) :
    typeof define === 'function' && define.amd ? define('@angular/fire/functions', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/fire'], factory) :
    (global = global || self, factory((global.angular = global.angular || {}, global.angular.fire = global.angular.fire || {}, global.angular.fire.functions = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.angular.fire));
}(this, (function (exports, core, rxjs, operators, fire) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ORIGIN = new core.InjectionToken('angularfire2.functions.origin');
    /** @type {?} */
    var REGION = new core.InjectionToken('angularfire2.functions.region');
    // WARNING: interface has both a type and a value, skipping emit
    ;
    var AngularFireFunctions = /** @class */ (function () {
        function AngularFireFunctions(options, nameOrConfig, zone, region, origin) {
            /** @type {?} */
            var schedulers = new fire["ɵAngularFireSchedulers"](zone);
            /** @type {?} */
            var functions = rxjs.of(undefined).pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @return {?}
             */
            function () { return import('firebase/functions'); })), operators.map((/**
             * @return {?}
             */
            function () { return fire["ɵfirebaseAppFactory"](options, zone, nameOrConfig); })), operators.map((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return app.functions(region || undefined); })), operators.tap((/**
             * @param {?} functions
             * @return {?}
             */
            function (functions) {
                if (origin) {
                    functions.useFunctionsEmulator(origin);
                }
            })), operators.shareReplay({ bufferSize: 1, refCount: false }));
            this.httpsCallable = (/**
             * @template T, R
             * @param {?} name
             * @return {?}
             */
            function (name) { return (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return rxjs.from(functions).pipe(operators.observeOn(schedulers.outsideAngular), operators.switchMap((/**
             * @param {?} functions
             * @return {?}
             */
            function (functions) { return functions.httpsCallable(name)(data); })), operators.map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return (/** @type {?} */ (r.data)); }))); }); });
            return fire["ɵlazySDKProxy"](this, functions, zone);
        }
        AngularFireFunctions.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'any'
                    },] }
        ];
        /** @nocollapse */
        AngularFireFunctions.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [fire.FIREBASE_OPTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [fire.FIREBASE_APP_NAME,] }] },
            { type: core.NgZone },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [REGION,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ORIGIN,] }] }
        ]; };
        /** @nocollapse */ AngularFireFunctions.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AngularFireFunctions_Factory() { return new AngularFireFunctions(core["ɵɵinject"](fire.FIREBASE_OPTIONS), core["ɵɵinject"](fire.FIREBASE_APP_NAME, 8), core["ɵɵinject"](core.NgZone), core["ɵɵinject"](REGION, 8), core["ɵɵinject"](ORIGIN, 8)); }, token: AngularFireFunctions, providedIn: "any" });
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
            { type: core.NgModule, args: [{
                        providers: [AngularFireFunctions]
                    },] }
        ];
        return AngularFireFunctionsModule;
    }());

    exports.AngularFireFunctions = AngularFireFunctions;
    exports.AngularFireFunctionsModule = AngularFireFunctionsModule;
    exports.ORIGIN = ORIGIN;
    exports.REGION = REGION;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-fire-functions.umd.js.map
