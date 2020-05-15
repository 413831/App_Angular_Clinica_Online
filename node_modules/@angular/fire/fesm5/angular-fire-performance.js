import { InjectionToken, Injectable, Optional, Inject, NgZone, PLATFORM_ID, ɵɵdefineInjectable, ɵɵinject, ApplicationRef, NgModule } from '@angular/core';
import { of, empty, Observable } from 'rxjs';
import { switchMap, map, tap, shareReplay, first } from 'rxjs/operators';
import { ɵlazySDKProxy, FirebaseApp } from '@angular/fire';
import { isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// SEMVER @ v6, drop and move core ng metrics to a service
/** @type {?} */
var AUTOMATICALLY_TRACE_CORE_NG_METRICS = new InjectionToken('angularfire2.performance.auto_trace');
/** @type {?} */
var INSTRUMENTATION_ENABLED = new InjectionToken('angularfire2.performance.instrumentationEnabled');
/** @type {?} */
var DATA_COLLECTION_ENABLED = new InjectionToken('angularfire2.performance.dataCollectionEnabled');
// WARNING: interface has both a type and a value, skipping emit
;
var AngularFirePerformance = /** @class */ (function () {
    function AngularFirePerformance(app, instrumentationEnabled, dataCollectionEnabled, zone, platformId) {
        this.zone = zone;
        this.performance = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        function () { return isPlatformBrowser(platformId) ? zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return import('firebase/performance'); })) : empty(); })), map((/**
         * @return {?}
         */
        function () { return zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return app.performance(); })); })), tap((/**
         * @param {?} performance
         * @return {?}
         */
        function (performance) {
            if (instrumentationEnabled == false) {
                performance.instrumentationEnabled = false;
            }
            if (dataCollectionEnabled == false) {
                performance.dataCollectionEnabled = false;
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        return ɵlazySDKProxy(this, this.performance, zone);
    }
    AngularFirePerformance.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFirePerformance.ctorParameters = function () { return [
        { type: FirebaseApp },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INSTRUMENTATION_ENABLED,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DATA_COLLECTION_ENABLED,] }] },
        { type: NgZone },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ AngularFirePerformance.ɵprov = ɵɵdefineInjectable({ factory: function AngularFirePerformance_Factory() { return new AngularFirePerformance(ɵɵinject(FirebaseApp), ɵɵinject(INSTRUMENTATION_ENABLED, 8), ɵɵinject(DATA_COLLECTION_ENABLED, 8), ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID)); }, token: AngularFirePerformance, providedIn: "any" });
    return AngularFirePerformance;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFirePerformance.prototype.performance;
    /**
     * @type {?}
     * @private
     */
    AngularFirePerformance.prototype.zone;
}
/** @type {?} */
var trace$ = (/**
 * @param {?} traceId
 * @return {?}
 */
function (traceId) {
    if (typeof window !== 'undefined' && window.performance) {
        /** @type {?} */
        var entries = window.performance.getEntriesByName(traceId, 'measure') || [];
        /** @type {?} */
        var startMarkName_1 = "_" + traceId + "Start[" + entries.length + "]";
        /** @type {?} */
        var endMarkName_1 = "_" + traceId + "End[" + entries.length + "]";
        return new Observable((/**
         * @param {?} emitter
         * @return {?}
         */
        function (emitter) {
            window.performance.mark(startMarkName_1);
            emitter.next();
            return { unsubscribe: (/**
                 * @return {?}
                 */
                function () {
                    window.performance.mark(endMarkName_1);
                    window.performance.measure(traceId, startMarkName_1, endMarkName_1);
                }) };
        }));
    }
    else {
        return empty();
    }
});
var ɵ0 = trace$;
/** @type {?} */
var traceUntil = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
function (name, test, options) { return (/**
 * @param {?} source$
 * @return {?}
 */
function (source$) { return new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
function (subscriber) {
    /** @type {?} */
    var traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    function (a) { return test(a) && traceSubscription.unsubscribe(); }), (/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { return options && options.orComplete && traceSubscription.unsubscribe(); }))).subscribe(subscriber);
})); }); });
/** @type {?} */
var traceWhile = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
function (name, test, options) { return (/**
 * @param {?} source$
 * @return {?}
 */
function (source$) { return new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
function (subscriber) {
    /** @type {?} */
    var traceSubscription;
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    function (a) {
        if (test(a)) {
            traceSubscription = traceSubscription || trace$(name).subscribe();
        }
        else {
            traceSubscription && traceSubscription.unsubscribe();
            traceSubscription = undefined;
        }
    }), (/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { return options && options.orComplete && traceSubscription && traceSubscription.unsubscribe(); }))).subscribe(subscriber);
})); }); });
/** @type {?} */
var traceUntilComplete = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
function (name) { return (/**
 * @param {?} source$
 * @return {?}
 */
function (source$) { return new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
function (subscriber) {
    /** @type {?} */
    var traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { return traceSubscription.unsubscribe(); }))).subscribe(subscriber);
})); }); });
/** @type {?} */
var traceUntilFirst = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
function (name) { return (/**
 * @param {?} source$
 * @return {?}
 */
function (source$) { return new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
function (subscriber) {
    /** @type {?} */
    var traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    function () { return traceSubscription.unsubscribe(); }), (/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { }))).subscribe(subscriber);
})); }); });
/** @type {?} */
var trace = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
function (name) { return (/**
 * @param {?} source$
 * @return {?}
 */
function (source$) { return new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
function (subscriber) {
    /** @type {?} */
    var traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    function () { return traceSubscription.unsubscribe(); }), (/**
     * @return {?}
     */
    function () { }), (/**
     * @return {?}
     */
    function () { return traceSubscription.unsubscribe(); }))).subscribe(subscriber);
})); }); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var IS_STABLE_START_MARK = '_isStableStart';
/** @type {?} */
var IS_STABLE_END_MARK = '_isStableEnd';
/**
 * @return {?}
 */
function markStarts() {
    if (typeof (window) !== "undefined" && window.performance) {
        window.performance.mark(IS_STABLE_START_MARK);
        return true;
    }
    else {
        return false;
    }
}
/** @type {?} */
var started = markStarts();
var PerformanceMonitoringService = /** @class */ (function () {
    function PerformanceMonitoringService(appRef) {
        if (started) {
            this.disposable = appRef.isStable.pipe(first((/**
             * @param {?} it
             * @return {?}
             */
            function (it) { return it; })), tap((/**
             * @return {?}
             */
            function () {
                window.performance.mark(IS_STABLE_END_MARK);
                window.performance.measure('isStable', IS_STABLE_START_MARK, IS_STABLE_END_MARK);
            }))).subscribe();
        }
    }
    /**
     * @return {?}
     */
    PerformanceMonitoringService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    };
    PerformanceMonitoringService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    PerformanceMonitoringService.ctorParameters = function () { return [
        { type: ApplicationRef }
    ]; };
    /** @nocollapse */ PerformanceMonitoringService.ɵprov = ɵɵdefineInjectable({ factory: function PerformanceMonitoringService_Factory() { return new PerformanceMonitoringService(ɵɵinject(ApplicationRef)); }, token: PerformanceMonitoringService, providedIn: "any" });
    return PerformanceMonitoringService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PerformanceMonitoringService.prototype.disposable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFirePerformanceModule = /** @class */ (function () {
    function AngularFirePerformanceModule(perf, _) {
        // call anything here to get perf loading
        perf.dataCollectionEnabled;
    }
    AngularFirePerformanceModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFirePerformance]
                },] }
    ];
    /** @nocollapse */
    AngularFirePerformanceModule.ctorParameters = function () { return [
        { type: AngularFirePerformance },
        { type: PerformanceMonitoringService, decorators: [{ type: Optional }] }
    ]; };
    return AngularFirePerformanceModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AUTOMATICALLY_TRACE_CORE_NG_METRICS, AngularFirePerformance, AngularFirePerformanceModule, DATA_COLLECTION_ENABLED, INSTRUMENTATION_ENABLED, PerformanceMonitoringService, trace, traceUntil, traceUntilComplete, traceUntilFirst, traceWhile };
//# sourceMappingURL=angular-fire-performance.js.map
