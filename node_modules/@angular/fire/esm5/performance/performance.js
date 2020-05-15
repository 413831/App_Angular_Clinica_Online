/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone, InjectionToken, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { tap, map, shareReplay, switchMap } from 'rxjs/operators';
import { FirebaseApp, ɵlazySDKProxy } from '@angular/fire';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
// SEMVER @ v6, drop and move core ng metrics to a service
/** @type {?} */
export var AUTOMATICALLY_TRACE_CORE_NG_METRICS = new InjectionToken('angularfire2.performance.auto_trace');
/** @type {?} */
export var INSTRUMENTATION_ENABLED = new InjectionToken('angularfire2.performance.instrumentationEnabled');
/** @type {?} */
export var DATA_COLLECTION_ENABLED = new InjectionToken('angularfire2.performance.dataCollectionEnabled');
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
    /** @nocollapse */ AngularFirePerformance.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFirePerformance_Factory() { return new AngularFirePerformance(i0.ɵɵinject(i1.FirebaseApp), i0.ɵɵinject(INSTRUMENTATION_ENABLED, 8), i0.ɵɵinject(DATA_COLLECTION_ENABLED, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFirePerformance, providedIn: "any" });
    return AngularFirePerformance;
}());
export { AngularFirePerformance };
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
export var traceUntil = (/**
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
export var traceWhile = (/**
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
export var traceUntilComplete = (/**
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
export var traceUntilFirst = (/**
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
export var trace = (/**
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL3BlcmZvcm1hbmNlLyIsInNvdXJjZXMiOlsicGVyZm9ybWFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsVUFBVSxFQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsV0FBVyxFQUFpQixhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBR3BELE1BQU0sS0FBTyxtQ0FBbUMsR0FBRyxJQUFJLGNBQWMsQ0FBVSxxQ0FBcUMsQ0FBQzs7QUFDckgsTUFBTSxLQUFPLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUFVLGlEQUFpRCxDQUFDOztBQUNySCxNQUFNLEtBQU8sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQVUsZ0RBQWdELENBQUM7O0FBRTNCLENBQUM7QUFFMUY7SUFPRSxnQ0FDRSxHQUFnQixFQUM2QixzQkFBbUMsRUFDbkMscUJBQWtDLEVBQ3ZFLElBQVksRUFDQyxVQUFpQjtRQUQ5QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSXBCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbkMsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxjQUFNLE9BQUEsTUFB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0LCBPcHRpb25hbCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2YsIGVtcHR5IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHBlcmZvcm1hbmNlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IEZpcmViYXNlQXBwLCDJtVByb21pc2VQcm94eSwgybVsYXp5U0RLUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLy8gU0VNVkVSIEAgdjYsIGRyb3AgYW5kIG1vdmUgY29yZSBuZyBtZXRyaWNzIHRvIGEgc2VydmljZVxuZXhwb3J0IGNvbnN0IEFVVE9NQVRJQ0FMTFlfVFJBQ0VfQ09SRV9OR19NRVRSSUNTID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuYXV0b190cmFjZScpO1xuZXhwb3J0IGNvbnN0IElOU1RSVU1FTlRBVElPTl9FTkFCTEVEID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuaW5zdHJ1bWVudGF0aW9uRW5hYmxlZCcpO1xuZXhwb3J0IGNvbnN0IERBVEFfQ09MTEVDVElPTl9FTkFCTEVEID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuZGF0YUNvbGxlY3Rpb25FbmFibGVkJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVQZXJmb3JtYW5jZSBleHRlbmRzIMm1UHJvbWlzZVByb3h5PHBlcmZvcm1hbmNlLlBlcmZvcm1hbmNlPiB7fTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlIHtcbiAgXG4gIHByaXZhdGUgcmVhZG9ubHkgcGVyZm9ybWFuY2U6IE9ic2VydmFibGU8cGVyZm9ybWFuY2UuUGVyZm9ybWFuY2U+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFwcDogRmlyZWJhc2VBcHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChJTlNUUlVNRU5UQVRJT05fRU5BQkxFRCkgaW5zdHJ1bWVudGF0aW9uRW5hYmxlZDpib29sZWFufG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChEQVRBX0NPTExFQ1RJT05fRU5BQkxFRCkgZGF0YUNvbGxlY3Rpb25FbmFibGVkOmJvb2xlYW58bnVsbCxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOk9iamVjdFxuICApIHtcblxuICAgIHRoaXMucGVyZm9ybWFuY2UgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkgPyB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGltcG9ydCgnZmlyZWJhc2UvcGVyZm9ybWFuY2UnKSkgOiBlbXB0eSgpKSxcbiAgICAgIG1hcCgoKSA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGFwcC5wZXJmb3JtYW5jZSgpKSksXG4gICAgICB0YXAocGVyZm9ybWFuY2UgPT4ge1xuICAgICAgICBpZiAoaW5zdHJ1bWVudGF0aW9uRW5hYmxlZCA9PSBmYWxzZSkgeyBwZXJmb3JtYW5jZS5pbnN0cnVtZW50YXRpb25FbmFibGVkID0gZmFsc2UgfVxuICAgICAgICBpZiAoZGF0YUNvbGxlY3Rpb25FbmFibGVkID09IGZhbHNlKSB7IHBlcmZvcm1hbmNlLmRhdGFDb2xsZWN0aW9uRW5hYmxlZCA9IGZhbHNlIH1cbiAgICAgIH0pLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSksXG4gICAgKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCB0aGlzLnBlcmZvcm1hbmNlLCB6b25lKTtcblxuICB9XG5cbn1cblxuY29uc3QgdHJhY2UkID0gKHRyYWNlSWQ6c3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGVyZm9ybWFuY2UpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUodHJhY2VJZCwgJ21lYXN1cmUnKSB8fCBbXTtcbiAgICBjb25zdCBzdGFydE1hcmtOYW1lID0gYF8ke3RyYWNlSWR9U3RhcnRbJHtlbnRyaWVzLmxlbmd0aH1dYDtcbiAgICBjb25zdCBlbmRNYXJrTmFtZSA9IGBfJHt0cmFjZUlkfUVuZFske2VudHJpZXMubGVuZ3RofV1gO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx2b2lkPihlbWl0dGVyID0+IHtcbiAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKHN0YXJ0TWFya05hbWUpO1xuICAgICAgZW1pdHRlci5uZXh0KCk7XG4gICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogKCkgPT4ge1xuICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhlbmRNYXJrTmFtZSk7XG4gICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKHRyYWNlSWQsIHN0YXJ0TWFya05hbWUsIGVuZE1hcmtOYW1lKTtcbiAgICAgIH19O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbXB0eSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFjZVVudGlsID0gPFQ9YW55PihuYW1lOnN0cmluZywgdGVzdDogKGE6VCkgPT4gYm9vbGVhbiwgb3B0aW9ucz86IHsgb3JDb21wbGV0ZT86IGJvb2xlYW4gfSkgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICBhICA9PiB0ZXN0KGEpICYmIHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiB7fSxcbiAgICAgICgpID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5vckNvbXBsZXRlICYmIHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0cmFjZVdoaWxlID0gPFQ9YW55PihuYW1lOnN0cmluZywgdGVzdDogKGE6VCkgPT4gYm9vbGVhbiwgb3B0aW9ucz86IHsgb3JDb21wbGV0ZT86IGJvb2xlYW59KSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGxldCB0cmFjZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9ufHVuZGVmaW5lZDtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICBhICA9PiB7XG4gICAgICAgIGlmICh0ZXN0KGEpKSB7XG4gICAgICAgICAgdHJhY2VTdWJzY3JpcHRpb24gPSB0cmFjZVN1YnNjcmlwdGlvbiB8fCB0cmFjZSQobmFtZSkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJhY2VTdWJzY3JpcHRpb24gJiYgdHJhY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0cmFjZVN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICgpID0+IHt9LFxuICAgICAgKCkgPT4gb3B0aW9ucyAmJiBvcHRpb25zLm9yQ29tcGxldGUgJiYgdHJhY2VTdWJzY3JpcHRpb24gJiYgdHJhY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuICAgIClcbiAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRyYWNlVW50aWxDb21wbGV0ZSA9IDxUPWFueT4obmFtZTpzdHJpbmcpID0+IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBuZXcgT2JzZXJ2YWJsZTxUPihzdWJzY3JpYmVyID0+IHtcbiAgY29uc3QgdHJhY2VTdWJzY3JpcHRpb24gPSB0cmFjZSQobmFtZSkuc3Vic2NyaWJlKCk7XG4gIHJldHVybiBzb3VyY2UkLnBpcGUoXG4gICAgdGFwKFxuICAgICAgKCkgPT4ge30sXG4gICAgICAoKSA9PiB7fSxcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0cmFjZVVudGlsRmlyc3QgPSA8VD1hbnk+KG5hbWU6c3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGNvbnN0IHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICByZXR1cm4gc291cmNlJC5waXBlKFxuICAgIHRhcChcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiB7fSxcbiAgICAgICgpID0+IHt9XG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhY2UgPSA8VD1hbnk+KG5hbWU6c3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGNvbnN0IHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICByZXR1cm4gc291cmNlJC5waXBlKFxuICAgIHRhcChcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiB7fSxcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG4iXX0=