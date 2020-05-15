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
export const AUTOMATICALLY_TRACE_CORE_NG_METRICS = new InjectionToken('angularfire2.performance.auto_trace');
/** @type {?} */
export const INSTRUMENTATION_ENABLED = new InjectionToken('angularfire2.performance.instrumentationEnabled');
/** @type {?} */
export const DATA_COLLECTION_ENABLED = new InjectionToken('angularfire2.performance.dataCollectionEnabled');
// WARNING: interface has both a type and a value, skipping emit
;
export class AngularFirePerformance {
    /**
     * @param {?} app
     * @param {?} instrumentationEnabled
     * @param {?} dataCollectionEnabled
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(app, instrumentationEnabled, dataCollectionEnabled, zone, platformId) {
        this.zone = zone;
        this.performance = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        () => isPlatformBrowser(platformId) ? zone.runOutsideAngular((/**
         * @return {?}
         */
        () => import('firebase/performance'))) : empty())), map((/**
         * @return {?}
         */
        () => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => app.performance())))), tap((/**
         * @param {?} performance
         * @return {?}
         */
        performance => {
            if (instrumentationEnabled == false) {
                performance.instrumentationEnabled = false;
            }
            if (dataCollectionEnabled == false) {
                performance.dataCollectionEnabled = false;
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        return ɵlazySDKProxy(this, this.performance, zone);
    }
}
AngularFirePerformance.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFirePerformance.ctorParameters = () => [
    { type: FirebaseApp },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INSTRUMENTATION_ENABLED,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DATA_COLLECTION_ENABLED,] }] },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ AngularFirePerformance.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFirePerformance_Factory() { return new AngularFirePerformance(i0.ɵɵinject(i1.FirebaseApp), i0.ɵɵinject(INSTRUMENTATION_ENABLED, 8), i0.ɵɵinject(DATA_COLLECTION_ENABLED, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFirePerformance, providedIn: "any" });
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
const trace$ = (/**
 * @param {?} traceId
 * @return {?}
 */
(traceId) => {
    if (typeof window !== 'undefined' && window.performance) {
        /** @type {?} */
        const entries = window.performance.getEntriesByName(traceId, 'measure') || [];
        /** @type {?} */
        const startMarkName = `_${traceId}Start[${entries.length}]`;
        /** @type {?} */
        const endMarkName = `_${traceId}End[${entries.length}]`;
        return new Observable((/**
         * @param {?} emitter
         * @return {?}
         */
        emitter => {
            window.performance.mark(startMarkName);
            emitter.next();
            return { unsubscribe: (/**
                 * @return {?}
                 */
                () => {
                    window.performance.mark(endMarkName);
                    window.performance.measure(traceId, startMarkName, endMarkName);
                }) };
        }));
    }
    else {
        return empty();
    }
});
const ɵ0 = trace$;
/** @type {?} */
export const traceUntil = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
(name, test, options) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    a => test(a) && traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => { }), (/**
     * @return {?}
     */
    () => options && options.orComplete && traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceWhile = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
(name, test, options) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    let traceSubscription;
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    a => {
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
    () => { }), (/**
     * @return {?}
     */
    () => options && options.orComplete && traceSubscription && traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceUntilComplete = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => { }), (/**
     * @return {?}
     */
    () => { }), (/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceUntilFirst = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => { }), (/**
     * @return {?}
     */
    () => { }))).subscribe(subscriber);
}))));
/** @type {?} */
export const trace = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => { }), (/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL3BlcmZvcm1hbmNlLyIsInNvdXJjZXMiOlsicGVyZm9ybWFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsVUFBVSxFQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsV0FBVyxFQUFpQixhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBR3BELE1BQU0sT0FBTyxtQ0FBbUMsR0FBRyxJQUFJLGNBQWMsQ0FBVSxxQ0FBcUMsQ0FBQzs7QUFDckgsTUFBTSxPQUFPLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUFVLGlEQUFpRCxDQUFDOztBQUNySCxNQUFNLE9BQU8sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQVUsZ0RBQWdELENBQUM7O0FBRTNCLENBQUM7QUFLMUYsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7SUFJakMsWUFDRSxHQUFnQixFQUM2QixzQkFBbUMsRUFDbkMscUJBQWtDLEVBQ3ZFLElBQVksRUFDQyxVQUFpQjtRQUQ5QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSXBCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbkMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FB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VSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxFQUFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdCwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mLCBlbXB0eSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBwZXJmb3JtYW5jZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgybVQcm9taXNlUHJveHksIMm1bGF6eVNES1Byb3h5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8vIFNFTVZFUiBAIHY2LCBkcm9wIGFuZCBtb3ZlIGNvcmUgbmcgbWV0cmljcyB0byBhIHNlcnZpY2VcbmV4cG9ydCBjb25zdCBBVVRPTUFUSUNBTExZX1RSQUNFX0NPUkVfTkdfTUVUUklDUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignYW5ndWxhcmZpcmUyLnBlcmZvcm1hbmNlLmF1dG9fdHJhY2UnKTtcbmV4cG9ydCBjb25zdCBJTlNUUlVNRU5UQVRJT05fRU5BQkxFRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignYW5ndWxhcmZpcmUyLnBlcmZvcm1hbmNlLmluc3RydW1lbnRhdGlvbkVuYWJsZWQnKTtcbmV4cG9ydCBjb25zdCBEQVRBX0NPTExFQ1RJT05fRU5BQkxFRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignYW5ndWxhcmZpcmUyLnBlcmZvcm1hbmNlLmRhdGFDb2xsZWN0aW9uRW5hYmxlZCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaXJlUGVyZm9ybWFuY2UgZXh0ZW5kcyDJtVByb21pc2VQcm94eTxwZXJmb3JtYW5jZS5QZXJmb3JtYW5jZT4ge307XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVQZXJmb3JtYW5jZSB7XG4gIFxuICBwcml2YXRlIHJlYWRvbmx5IHBlcmZvcm1hbmNlOiBPYnNlcnZhYmxlPHBlcmZvcm1hbmNlLlBlcmZvcm1hbmNlPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEZpcmViYXNlQXBwLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSU5TVFJVTUVOVEFUSU9OX0VOQUJMRUQpIGluc3RydW1lbnRhdGlvbkVuYWJsZWQ6Ym9vbGVhbnxudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREFUQV9DT0xMRUNUSU9OX0VOQUJMRUQpIGRhdGFDb2xsZWN0aW9uRW5hYmxlZDpib29sZWFufG51bGwsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDpPYmplY3RcbiAgKSB7XG5cbiAgICB0aGlzLnBlcmZvcm1hbmNlID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBpbXBvcnQoJ2ZpcmViYXNlL3BlcmZvcm1hbmNlJykpIDogZW1wdHkoKSksXG4gICAgICBtYXAoKCkgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBhcHAucGVyZm9ybWFuY2UoKSkpLFxuICAgICAgdGFwKHBlcmZvcm1hbmNlID0+IHtcbiAgICAgICAgaWYgKGluc3RydW1lbnRhdGlvbkVuYWJsZWQgPT0gZmFsc2UpIHsgcGVyZm9ybWFuY2UuaW5zdHJ1bWVudGF0aW9uRW5hYmxlZCA9IGZhbHNlIH1cbiAgICAgICAgaWYgKGRhdGFDb2xsZWN0aW9uRW5hYmxlZCA9PSBmYWxzZSkgeyBwZXJmb3JtYW5jZS5kYXRhQ29sbGVjdGlvbkVuYWJsZWQgPSBmYWxzZSB9XG4gICAgICB9KSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gybVsYXp5U0RLUHJveHkodGhpcywgdGhpcy5wZXJmb3JtYW5jZSwgem9uZSk7XG5cbiAgfVxuXG59XG5cbmNvbnN0IHRyYWNlJCA9ICh0cmFjZUlkOnN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKHRyYWNlSWQsICdtZWFzdXJlJykgfHwgW107XG4gICAgY29uc3Qgc3RhcnRNYXJrTmFtZSA9IGBfJHt0cmFjZUlkfVN0YXJ0WyR7ZW50cmllcy5sZW5ndGh9XWA7XG4gICAgY29uc3QgZW5kTWFya05hbWUgPSBgXyR7dHJhY2VJZH1FbmRbJHtlbnRyaWVzLmxlbmd0aH1dYDtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8dm9pZD4oZW1pdHRlciA9PiB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhzdGFydE1hcmtOYW1lKTtcbiAgICAgIGVtaXR0ZXIubmV4dCgpO1xuICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlLm1hcmsoZW5kTWFya05hbWUpO1xuICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UubWVhc3VyZSh0cmFjZUlkLCBzdGFydE1hcmtOYW1lLCBlbmRNYXJrTmFtZSk7XG4gICAgICB9fTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZW1wdHkoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdHJhY2VVbnRpbCA9IDxUPWFueT4obmFtZTpzdHJpbmcsIHRlc3Q6IChhOlQpID0+IGJvb2xlYW4sIG9wdGlvbnM/OiB7IG9yQ29tcGxldGU/OiBib29sZWFuIH0pID0+IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBuZXcgT2JzZXJ2YWJsZTxUPihzdWJzY3JpYmVyID0+IHtcbiAgY29uc3QgdHJhY2VTdWJzY3JpcHRpb24gPSB0cmFjZSQobmFtZSkuc3Vic2NyaWJlKCk7XG4gIHJldHVybiBzb3VyY2UkLnBpcGUoXG4gICAgdGFwKFxuICAgICAgYSAgPT4gdGVzdChhKSAmJiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4ge30sXG4gICAgICAoKSA9PiBvcHRpb25zICYmIG9wdGlvbnMub3JDb21wbGV0ZSAmJiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhY2VXaGlsZSA9IDxUPWFueT4obmFtZTpzdHJpbmcsIHRlc3Q6IChhOlQpID0+IGJvb2xlYW4sIG9wdGlvbnM/OiB7IG9yQ29tcGxldGU/OiBib29sZWFufSkgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBsZXQgdHJhY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbnx1bmRlZmluZWQ7XG4gIHJldHVybiBzb3VyY2UkLnBpcGUoXG4gICAgdGFwKFxuICAgICAgYSAgPT4ge1xuICAgICAgICBpZiAodGVzdChhKSkge1xuICAgICAgICAgIHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2VTdWJzY3JpcHRpb24gfHwgdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYWNlU3Vic2NyaXB0aW9uICYmIHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdHJhY2VTdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoKSA9PiB7fSxcbiAgICAgICgpID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5vckNvbXBsZXRlICYmIHRyYWNlU3Vic2NyaXB0aW9uICYmIHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0cmFjZVVudGlsQ29tcGxldGUgPSA8VD1hbnk+KG5hbWU6c3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGNvbnN0IHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICByZXR1cm4gc291cmNlJC5waXBlKFxuICAgIHRhcChcbiAgICAgICgpID0+IHt9LFxuICAgICAgKCkgPT4ge30sXG4gICAgICAoKSA9PiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhY2VVbnRpbEZpcnN0ID0gPFQ9YW55PihuYW1lOnN0cmluZykgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICAoKSA9PiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4ge30sXG4gICAgICAoKSA9PiB7fVxuICAgIClcbiAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRyYWNlID0gPFQ9YW55PihuYW1lOnN0cmluZykgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICAoKSA9PiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4ge30sXG4gICAgICAoKSA9PiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuIl19