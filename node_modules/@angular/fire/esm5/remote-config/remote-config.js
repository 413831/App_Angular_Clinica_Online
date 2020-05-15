/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends, __read, __spread } from "tslib";
import { Injectable, Inject, Optional, NgZone, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Observable, concat, of, pipe, empty } from 'rxjs';
import { map, switchMap, tap, shareReplay, distinctUntilChanged, filter, groupBy, mergeMap, scan, withLatestFrom, startWith, debounceTime, observeOn } from 'rxjs/operators';
import { ɵfirebaseAppFactory, ɵAngularFireSchedulers, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import { remoteConfig } from 'firebase/app';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/**
 * @record
 */
export function ConfigTemplate() { }
;
/** @type {?} */
export var SETTINGS = new InjectionToken('angularfire2.remoteConfig.settings');
/** @type {?} */
export var DEFAULTS = new InjectionToken('angularfire2.remoteConfig.defaultConfig');
// WARNING: interface has both a type and a value, skipping emit
;
// TODO export as implements Partial<...> so minor doesn't break us
var 
// TODO export as implements Partial<...> so minor doesn't break us
Value = /** @class */ (function () {
    function Value(_source, _value) {
        this._source = _source;
        this._value = _value;
    }
    /**
     * @return {?}
     */
    Value.prototype.asBoolean = /**
     * @return {?}
     */
    function () { return ['1', 'true', 't', 'y', 'yes', 'on'].indexOf(this._value.toLowerCase()) > -1; };
    /**
     * @return {?}
     */
    Value.prototype.asString = /**
     * @return {?}
     */
    function () { return this._value; };
    /**
     * @return {?}
     */
    Value.prototype.asNumber = /**
     * @return {?}
     */
    function () { return Number(this._value) || 0; };
    /**
     * @return {?}
     */
    Value.prototype.getSource = /**
     * @return {?}
     */
    function () { return this._source; };
    return Value;
}());
// TODO export as implements Partial<...> so minor doesn't break us
export { Value };
if (false) {
    /** @type {?} */
    Value.prototype._source;
    /** @type {?} */
    Value.prototype._value;
}
// SEMVER use ConstructorParameters when we can support Typescript 3.6
var 
// SEMVER use ConstructorParameters when we can support Typescript 3.6
Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter(key, fetchTimeMillis, source, value) {
        var _this = _super.call(this, source, value) || this;
        _this.key = key;
        _this.fetchTimeMillis = fetchTimeMillis;
        return _this;
    }
    return Parameter;
}(Value));
// SEMVER use ConstructorParameters when we can support Typescript 3.6
export { Parameter };
if (false) {
    /** @type {?} */
    Parameter.prototype.key;
    /** @type {?} */
    Parameter.prototype.fetchTimeMillis;
}
// If it's a Parameter array, test any, else test the individual Parameter
/** @type {?} */
var filterTest = (/**
 * @param {?} fn
 * @return {?}
 */
function (fn) { return filter((/**
 * @param {?} it
 * @return {?}
 */
function (it) { return Array.isArray(it) ? it.some(fn) : fn(it); })); })
// Allow the user to bypass the default values and wait till they get something from the server, even if it's a cached copy;
// if used in conjuntion with first() it will only fetch RC values from the server if they aren't cached locally
;
var ɵ0 = filterTest;
// Allow the user to bypass the default values and wait till they get something from the server, even if it's a cached copy;
// if used in conjuntion with first() it will only fetch RC values from the server if they aren't cached locally
/** @type {?} */
export var filterRemote = (/**
 * @return {?}
 */
function () { return filterTest((/**
 * @param {?} p
 * @return {?}
 */
function (p) { return p.getSource() === 'remote'; })); });
// filterFresh allows the developer to effectively set up a maximum cache time
/** @type {?} */
export var filterFresh = (/**
 * @param {?} howRecentInMillis
 * @return {?}
 */
function (howRecentInMillis) { return filterTest((/**
 * @param {?} p
 * @return {?}
 */
function (p) { return p.fetchTimeMillis + howRecentInMillis >= new Date().getTime(); })); });
var AngularFireRemoteConfig = /** @class */ (function () {
    function AngularFireRemoteConfig(options, nameOrConfig, settings, defaultConfig, zone, platformId) {
        this.zone = zone;
        /** @type {?} */
        var schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        var remoteConfig$ = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return isPlatformBrowser(platformId) ? import('firebase/remote-config') : empty(); })), map((/**
         * @return {?}
         */
        function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
         * @param {?} app
         * @return {?}
         */
        function (app) { return app.remoteConfig(); })), tap((/**
         * @param {?} rc
         * @return {?}
         */
        function (rc) {
            if (settings) {
                rc.settings = settings;
            }
            if (defaultConfig) {
                rc.defaultConfig = defaultConfig;
            }
        })), startWith(undefined), shareReplay({ bufferSize: 1, refCount: false }));
        /** @type {?} */
        var loadedRemoteConfig$ = remoteConfig$.pipe(filter((/**
         * @param {?} rc
         * @return {?}
         */
        function (rc) { return !!rc; })));
        /** @type {?} */
        var default$ = of(Object.keys(defaultConfig || {}).reduce((/**
         * @param {?} c
         * @param {?} k
         * @return {?}
         */
        function (c, k) {
            var _a;
            return (__assign(__assign({}, c), (_a = {}, _a[k] = new Value("default", (/** @type {?} */ (defaultConfig))[k].toString()), _a)));
        }), {}));
        // we should filter out the defaults we provided to RC, since we have our own implementation
        // that gives us a -1 for fetchTimeMillis (so filterFresh can filter them out)
        /** @type {?} */
        var filterOutDefaults = map((/**
         * @param {?} all
         * @return {?}
         */
        function (all) {
            return Object.keys(all)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return all[key].getSource() != 'default'; }))
                .reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            function (acc, key) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[key] = all[key], _a)));
            }), {});
        }));
        /** @type {?} */
        var existing$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        function (rc) {
            return rc.activate()
                .then((/**
             * @return {?}
             */
            function () { return rc.ensureInitialized(); }))
                .then((/**
             * @return {?}
             */
            function () { return rc.getAll(); }));
        })), filterOutDefaults);
        /** @type {?} */
        var fresh$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        function (rc) { return zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            return rc.fetchAndActivate()
                .then((/**
             * @return {?}
             */
            function () { return rc.ensureInitialized(); }))
                .then((/**
             * @return {?}
             */
            function () { return rc.getAll(); }));
        })); })), filterOutDefaults);
        this.parameters = concat(default$, existing$, fresh$).pipe(scanToParametersArray(remoteConfig$), shareReplay({ bufferSize: 1, refCount: true }));
        this.changes = this.parameters.pipe(switchMap((/**
         * @param {?} params
         * @return {?}
         */
        function (params) { return of.apply(void 0, __spread(params)); })), groupBy((/**
         * @param {?} param
         * @return {?}
         */
        function (param) { return param.key; })), mergeMap((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.pipe(distinctUntilChanged()); })));
        this.strings = proxyAll(this.parameters, 'strings');
        this.booleans = proxyAll(this.parameters, 'booleans');
        this.numbers = proxyAll(this.parameters, 'numbers');
        return ɵlazySDKProxy(this, loadedRemoteConfig$, zone);
    }
    AngularFireRemoteConfig.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireRemoteConfig.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SETTINGS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEFAULTS,] }] },
        { type: NgZone },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ AngularFireRemoteConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireRemoteConfig_Factory() { return new AngularFireRemoteConfig(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(SETTINGS, 8), i0.ɵɵinject(DEFAULTS, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFireRemoteConfig, providedIn: "any" });
    return AngularFireRemoteConfig;
}());
export { AngularFireRemoteConfig };
if (false) {
    /** @type {?} */
    AngularFireRemoteConfig.prototype.changes;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.parameters;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.numbers;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.booleans;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.strings;
    /**
     * @type {?}
     * @private
     */
    AngularFireRemoteConfig.prototype.zone;
}
// I ditched loading the defaults into RC and a simple map for scan since we already have our own defaults implementation.
// The idea here being that if they have a default that never loads from the server, they will be able to tell via fetchTimeMillis on the Parameter.
// Also if it doesn't come from the server it won't emit again in .changes, due to the distinctUntilChanged, which we can simplify to === rather than deep comparison
/** @type {?} */
var scanToParametersArray = (/**
 * @param {?} remoteConfig
 * @return {?}
 */
function (remoteConfig) { return pipe(withLatestFrom(remoteConfig), scan((/**
 * @param {?} existing
 * @param {?} __1
 * @return {?}
 */
function (existing, _a) {
    var _b = __read(_a, 2), all = _b[0], rc = _b[1];
    // SEMVER use "new Set" to unique once we're only targeting es6
    // at the scale we expect remote config to be at, we probably won't see a performance hit from this unoptimized uniqueness implementation
    // const allKeys = [...new Set([...existing.map(p => p.key), ...Object.keys(all)])];
    /** @type {?} */
    var allKeys = __spread(existing.map((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.key; })), Object.keys(all)).filter((/**
     * @param {?} v
     * @param {?} i
     * @param {?} a
     * @return {?}
     */
    function (v, i, a) { return a.indexOf(v) === i; }));
    return allKeys.map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var updatedValue = all[key];
        return updatedValue ? new Parameter(key, rc ? rc.fetchTimeMillis : -1, updatedValue.getSource(), updatedValue.asString())
            : (/** @type {?} */ (existing.find((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.key === key; }))));
    }));
}), (/** @type {?} */ ([])))); });
var ɵ1 = scanToParametersArray;
/** @type {?} */
var AS_TO_FN = { 'strings': 'asString', 'numbers': 'asNumber', 'booleans': 'asBoolean' };
/** @type {?} */
var STATIC_VALUES = { 'numbers': 0, 'booleans': false, 'strings': undefined };
/** @type {?} */
export var budget = (/**
 * @template T
 * @param {?} interval
 * @return {?}
 */
function (interval) { return (/**
 * @param {?} source
 * @return {?}
 */
function (source) { return new Observable((/**
 * @param {?} observer
 * @return {?}
 */
function (observer) {
    /** @type {?} */
    var timedOut = false;
    // TODO use scheduler task rather than settimeout
    /** @type {?} */
    var timeout = setTimeout((/**
     * @return {?}
     */
    function () {
        observer.complete();
        timedOut = true;
    }), interval);
    return source.subscribe({
        next: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { if (!timedOut) {
            observer.next(val);
        } },
        error: /**
         * @param {?} err
         * @return {?}
         */
        function (err) { if (!timedOut) {
            clearTimeout(timeout);
            observer.error(err);
        } },
        complete: /**
         * @return {?}
         */
        function () { if (!timedOut) {
            clearTimeout(timeout);
            observer.complete();
        } }
    });
})); }); });
/** @type {?} */
var typedMethod = (/**
 * @param {?} it
 * @return {?}
 */
function (it) {
    switch (typeof it) {
        case 'string': return 'asString';
        case 'boolean': return 'asBoolean';
        case 'number': return 'asNumber';
        default: return 'asString';
    }
});
var ɵ2 = typedMethod;
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function scanToObject(to) {
    if (to === void 0) { to = 'strings'; }
    return pipe(
    // TODO cleanup
    scan((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    function (c, p) {
        var _a;
        return (__assign(__assign({}, c), (_a = {}, _a[p.key] = typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]](), _a)));
    }), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))), debounceTime(1), budget(10), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) { return JSON.stringify(a) === JSON.stringify(b); })));
}
;
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function mapToObject(to) {
    if (to === void 0) { to = 'strings'; }
    return pipe(
    // TODO this is getting a little long, cleanup
    map((/**
     * @param {?} params
     * @return {?}
     */
    function (params) { return params.reduce((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    function (c, p) {
        var _a;
        return (__assign(__assign({}, c), (_a = {}, _a[p.key] = typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]](), _a)));
    }), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))); })), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) { return JSON.stringify(a) === JSON.stringify(b); })));
}
;
// TODO look into the types here, I don't like the anys
/** @type {?} */
var proxyAll = (/**
 * @param {?} observable
 * @param {?} as
 * @return {?}
 */
function (observable, as) { return (/** @type {?} */ (new Proxy(observable.pipe(mapToObject((/** @type {?} */ (as)))), {
    get: (/**
     * @param {?} self
     * @param {?} name
     * @return {?}
     */
    function (self, name) { return self[name] || observable.pipe(map((/**
     * @param {?} all
     * @return {?}
     */
    function (all) { return all.find((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.key === name; })); })), map((/**
     * @param {?} param
     * @return {?}
     */
    function (param) { return param ? param[AS_TO_FN[as]]() : STATIC_VALUES[as]; })), distinctUntilChanged()); })
}))); });
var ɵ3 = proxyAll;
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvcmVtb3RlLWNvbmZpZy8iLCJzb3VyY2VzIjpbInJlbW90ZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBOEMsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pMLE9BQU8sRUFBaUIsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQXNDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7QUFFcEQsb0NBQXFFO0FBQUEsQ0FBQzs7QUFFdEUsTUFBTSxLQUFPLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBd0Isb0NBQW9DLENBQUM7O0FBQ3ZHLE1BQU0sS0FBTyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQWlCLHlDQUF5QyxDQUFDOztBQUVULENBQUM7O0FBRzdGOzs7SUFLRSxlQUFtQixPQUFpQyxFQUFTLE1BQWM7UUFBeEQsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lB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QUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFqRCxDQUFpRCxFQUFDLEVBQy9ELG9CQUFvQixFQUFFLENBQ3ZCLEVBSjJCLENBSTNCLENBQUE7Q0FDRixDQUNGLEVBQU8sR0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCwgTmdab25lLCBJbmplY3Rpb25Ub2tlbiwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbmNhdCwgb2YsIHBpcGUsIE9wZXJhdG9yRnVuY3Rpb24sIE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgZW1wdHksIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YXAsIHNoYXJlUmVwbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBncm91cEJ5LCBtZXJnZU1hcCwgc2Nhbiwgd2l0aExhdGVzdEZyb20sIHN0YXJ0V2l0aCwgZGVib3VuY2VUaW1lLCBvYnNlcnZlT24sIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyDJtVByb21pc2VQcm94eSwgybVmaXJlYmFzZUFwcEZhY3RvcnksIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCBGaXJlYmFzZUFwcENvbmZpZywgRmlyZWJhc2VPcHRpb25zLCDJtWxhenlTREtQcm94eSwgRklSRUJBU0VfT1BUSU9OUywgRklSRUJBU0VfQVBQX05BTUUgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IHJlbW90ZUNvbmZpZyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnVGVtcGxhdGUge1trZXk6c3RyaW5nXTogc3RyaW5nfG51bWJlcnxib29sZWFufTtcblxuZXhwb3J0IGNvbnN0IFNFVFRJTkdTID0gbmV3IEluamVjdGlvblRva2VuPHJlbW90ZUNvbmZpZy5TZXR0aW5ncz4oJ2FuZ3VsYXJmaXJlMi5yZW1vdGVDb25maWcuc2V0dGluZ3MnKTtcbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWdUZW1wbGF0ZT4oJ2FuZ3VsYXJmaXJlMi5yZW1vdGVDb25maWcuZGVmYXVsdENvbmZpZycpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaXJlUmVtb3RlQ29uZmlnIGV4dGVuZHMgybVQcm9taXNlUHJveHk8cmVtb3RlQ29uZmlnLlJlbW90ZUNvbmZpZz4ge307XG5cbi8vIFRPRE8gZXhwb3J0IGFzIGltcGxlbWVudHMgUGFydGlhbDwuLi4+IHNvIG1pbm9yIGRvZXNuJ3QgYnJlYWsgdXNcbmV4cG9ydCBjbGFzcyBWYWx1ZSBpbXBsZW1lbnRzIHJlbW90ZUNvbmZpZy5WYWx1ZSB7XG4gIGFzQm9vbGVhbigpIHsgcmV0dXJuIFsnMScsICd0cnVlJywgJ3QnLCAneScsICd5ZXMnLCAnb24nXS5pbmRleE9mKHRoaXMuX3ZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTEgfVxuICBhc1N0cmluZygpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlIH1cbiAgYXNOdW1iZXIoKSB7IHJldHVybiBOdW1iZXIodGhpcy5fdmFsdWUpIHx8IDAgfVxuICBnZXRTb3VyY2UoKSB7IHJldHVybiB0aGlzLl9zb3VyY2U7IH1cbiAgY29uc3RydWN0b3IocHVibGljIF9zb3VyY2U6IHJlbW90ZUNvbmZpZy5WYWx1ZVNvdXJjZSwgcHVibGljIF92YWx1ZTogc3RyaW5nKSB7IH1cbn1cblxuLy8gU0VNVkVSIHVzZSBDb25zdHJ1Y3RvclBhcmFtZXRlcnMgd2hlbiB3ZSBjYW4gc3VwcG9ydCBUeXBlc2NyaXB0IDMuNlxuZXhwb3J0IGNsYXNzIFBhcmFtZXRlciBleHRlbmRzIFZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGtleTogc3RyaW5nLCBwdWJsaWMgZmV0Y2hUaW1lTWlsbGlzOiBudW1iZXIsIHNvdXJjZTogcmVtb3RlQ29uZmlnLlZhbHVlU291cmNlLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc291cmNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuLy8gSWYgaXQncyBhIFBhcmFtZXRlciBhcnJheSwgdGVzdCBhbnksIGVsc2UgdGVzdCB0aGUgaW5kaXZpZHVhbCBQYXJhbWV0ZXJcbmNvbnN0IGZpbHRlclRlc3QgPSAoZm46IChwYXJhbTpQYXJhbWV0ZXIpID0+IGJvb2xlYW4pID0+IGZpbHRlcjxQYXJhbWV0ZXJ8UGFyYW1ldGVyW10+KGl0ID0+IEFycmF5LmlzQXJyYXkoaXQpID8gaXQuc29tZShmbikgOiBmbihpdCkpXG5cbi8vIEFsbG93IHRoZSB1c2VyIHRvIGJ5cGFzcyB0aGUgZGVmYXVsdCB2YWx1ZXMgYW5kIHdhaXQgdGlsbCB0aGV5IGdldCBzb21ldGhpbmcgZnJvbSB0aGUgc2VydmVyLCBldmVuIGlmIGl0J3MgYSBjYWNoZWQgY29weTtcbi8vIGlmIHVzZWQgaW4gY29uanVudGlvbiB3aXRoIGZpcnN0KCkgaXQgd2lsbCBvbmx5IGZldGNoIFJDIHZhbHVlcyBmcm9tIHRoZSBzZXJ2ZXIgaWYgdGhleSBhcmVuJ3QgY2FjaGVkIGxvY2FsbHlcbmV4cG9ydCBjb25zdCBmaWx0ZXJSZW1vdGUgPSAoKSA9PiBmaWx0ZXJUZXN0KHAgPT4gcC5nZXRTb3VyY2UoKSA9PT0gJ3JlbW90ZScpO1xuXG4vLyBmaWx0ZXJGcmVzaCBhbGxvd3MgdGhlIGRldmVsb3BlciB0byBlZmZlY3RpdmVseSBzZXQgdXAgYSBtYXhpbXVtIGNhY2hlIHRpbWVcbmV4cG9ydCBjb25zdCBmaWx0ZXJGcmVzaCA9IChob3dSZWNlbnRJbk1pbGxpczogbnVtYmVyKSA9PiBmaWx0ZXJUZXN0KHAgPT4gcC5mZXRjaFRpbWVNaWxsaXMgKyBob3dSZWNlbnRJbk1pbGxpcyA+PSBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVSZW1vdGVDb25maWcge1xuXG4gIHJlYWRvbmx5IGNoYW5nZXM6ICAgIE9ic2VydmFibGU8UGFyYW1ldGVyPjtcbiAgcmVhZG9ubHkgcGFyYW1ldGVyczogT2JzZXJ2YWJsZTxQYXJhbWV0ZXJbXT47XG4gIHJlYWRvbmx5IG51bWJlcnM6ICAgIE9ic2VydmFibGU8e1trZXk6c3RyaW5nXTogbnVtYmVyfHVuZGVmaW5lZH0+ICAmIHtba2V5OnN0cmluZ106IE9ic2VydmFibGU8bnVtYmVyPn07XG4gIHJlYWRvbmx5IGJvb2xlYW5zOiAgIE9ic2VydmFibGU8e1trZXk6c3RyaW5nXTogYm9vbGVhbnx1bmRlZmluZWR9PiAmIHtba2V5OnN0cmluZ106IE9ic2VydmFibGU8Ym9vbGVhbj59O1xuICByZWFkb25seSBzdHJpbmdzOiAgICBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106IHN0cmluZ3x1bmRlZmluZWR9PiAgJiB7W2tleTpzdHJpbmddOiBPYnNlcnZhYmxlPHN0cmluZ3x1bmRlZmluZWQ+fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6RmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzpzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbHx1bmRlZmluZWQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChTRVRUSU5HUykgc2V0dGluZ3M6cmVtb3RlQ29uZmlnLlNldHRpbmdzfG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERUZBVUxUUykgZGVmYXVsdENvbmZpZzpDb25maWdUZW1wbGF0ZXxudWxsLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6T2JqZWN0XG4gICkge1xuXG4gICAgY29uc3Qgc2NoZWR1bGVycyA9IG5ldyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyh6b25lKTtcbiAgICBcbiAgICBjb25zdCByZW1vdGVDb25maWckID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gaW1wb3J0KCdmaXJlYmFzZS9yZW1vdGUtY29uZmlnJykgOiBlbXB0eSgpKSxcbiAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgIG1hcChhcHAgPT4gYXBwLnJlbW90ZUNvbmZpZygpKSxcbiAgICAgIHRhcChyYyA9PiB7XG4gICAgICAgIGlmIChzZXR0aW5ncykgeyByYy5zZXR0aW5ncyA9IHNldHRpbmdzIH1cbiAgICAgICAgaWYgKGRlZmF1bHRDb25maWcpIHsgcmMuZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWcgfVxuICAgICAgfSksXG4gICAgICBzdGFydFdpdGgodW5kZWZpbmVkKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGxvYWRlZFJlbW90ZUNvbmZpZyQgPSByZW1vdGVDb25maWckLnBpcGUoXG4gICAgICBmaWx0ZXI8cmVtb3RlQ29uZmlnLlJlbW90ZUNvbmZpZz4ocmMgPT4gISFyYylcbiAgICApO1xuXG4gICAgbGV0IGRlZmF1bHQkOiBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106IHJlbW90ZUNvbmZpZy5WYWx1ZX0+ID0gb2YoT2JqZWN0LmtleXMoZGVmYXVsdENvbmZpZyB8fCB7fSkucmVkdWNlKFxuICAgICAgKGMsIGspID0+ICh7Li4uYywgW2tdOiBuZXcgVmFsdWUoXCJkZWZhdWx0XCIsIGRlZmF1bHRDb25maWchW2tdLnRvU3RyaW5nKCkpIH0pLCB7fVxuICAgICkpO1xuXG4gICAgLy8gd2Ugc2hvdWxkIGZpbHRlciBvdXQgdGhlIGRlZmF1bHRzIHdlIHByb3ZpZGVkIHRvIFJDLCBzaW5jZSB3ZSBoYXZlIG91ciBvd24gaW1wbGVtZW50YXRpb25cbiAgICAvLyB0aGF0IGdpdmVzIHVzIGEgLTEgZm9yIGZldGNoVGltZU1pbGxpcyAoc28gZmlsdGVyRnJlc2ggY2FuIGZpbHRlciB0aGVtIG91dClcbiAgICBjb25zdCBmaWx0ZXJPdXREZWZhdWx0cyA9IG1hcDx7W2tleTogc3RyaW5nXTogcmVtb3RlQ29uZmlnLlZhbHVlfSwge1trZXk6IHN0cmluZ106IHJlbW90ZUNvbmZpZy5WYWx1ZX0+KGFsbCA9PlxuICAgICAgT2JqZWN0LmtleXMoYWxsKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhbGxba2V5XS5nZXRTb3VyY2UoKSAhPSAnZGVmYXVsdCcpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywga2V5KSA9PiAoey4uLmFjYywgW2tleV06IGFsbFtrZXldfSksIHt9KVxuICAgICk7XG5cbiAgICBjb25zdCBleGlzdGluZyQgPSBsb2FkZWRSZW1vdGVDb25maWckLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocmMgPT5cbiAgICAgICAgcmMuYWN0aXZhdGUoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHJjLmVuc3VyZUluaXRpYWxpemVkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmMuZ2V0QWxsKCkpXG4gICAgICApLFxuICAgICAgZmlsdGVyT3V0RGVmYXVsdHNcbiAgICApO1xuXG4gICAgY29uc3QgZnJlc2gkID0gbG9hZGVkUmVtb3RlQ29uZmlnJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHJjID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgcmMuZmV0Y2hBbmRBY3RpdmF0ZSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmMuZW5zdXJlSW5pdGlhbGl6ZWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiByYy5nZXRBbGwoKSlcbiAgICAgICkpLFxuICAgICAgZmlsdGVyT3V0RGVmYXVsdHNcbiAgICApO1xuXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gY29uY2F0KGRlZmF1bHQkLCBleGlzdGluZyQsIGZyZXNoJCkucGlwZShcbiAgICAgIHNjYW5Ub1BhcmFtZXRlcnNBcnJheShyZW1vdGVDb25maWckKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgICApO1xuXG4gICAgdGhpcy5jaGFuZ2VzID0gdGhpcy5wYXJhbWV0ZXJzLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGFyYW1zID0+IG9mKC4uLnBhcmFtcykpLFxuICAgICAgZ3JvdXBCeShwYXJhbSA9PiBwYXJhbS5rZXkpLFxuICAgICAgbWVyZ2VNYXAoZ3JvdXAgPT4gZ3JvdXAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdHJpbmdzICA9IHByb3h5QWxsKHRoaXMucGFyYW1ldGVycywgJ3N0cmluZ3MnKTtcbiAgICB0aGlzLmJvb2xlYW5zID0gcHJveHlBbGwodGhpcy5wYXJhbWV0ZXJzLCAnYm9vbGVhbnMnKTtcbiAgICB0aGlzLm51bWJlcnMgID0gcHJveHlBbGwodGhpcy5wYXJhbWV0ZXJzLCAnbnVtYmVycycpO1xuXG4gICAgcmV0dXJuIMm1bGF6eVNES1Byb3h5KHRoaXMsIGxvYWRlZFJlbW90ZUNvbmZpZyQsIHpvbmUpO1xuICB9XG5cbn1cblxuLy8gSSBkaXRjaGVkIGxvYWRpbmcgdGhlIGRlZmF1bHRzIGludG8gUkMgYW5kIGEgc2ltcGxlIG1hcCBmb3Igc2NhbiBzaW5jZSB3ZSBhbHJlYWR5IGhhdmUgb3VyIG93biBkZWZhdWx0cyBpbXBsZW1lbnRhdGlvbi5cbi8vIFRoZSBpZGVhIGhlcmUgYmVpbmcgdGhhdCBpZiB0aGV5IGhhdmUgYSBkZWZhdWx0IHRoYXQgbmV2ZXIgbG9hZHMgZnJvbSB0aGUgc2VydmVyLCB0aGV5IHdpbGwgYmUgYWJsZSB0byB0ZWxsIHZpYSBmZXRjaFRpbWVNaWxsaXMgb24gdGhlIFBhcmFtZXRlci5cbi8vIEFsc28gaWYgaXQgZG9lc24ndCBjb21lIGZyb20gdGhlIHNlcnZlciBpdCB3b24ndCBlbWl0IGFnYWluIGluIC5jaGFuZ2VzLCBkdWUgdG8gdGhlIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB3aGljaCB3ZSBjYW4gc2ltcGxpZnkgdG8gPT09IHJhdGhlciB0aGFuIGRlZXAgY29tcGFyaXNvblxuY29uc3Qgc2NhblRvUGFyYW1ldGVyc0FycmF5ID0gKHJlbW90ZUNvbmZpZzogT2JzZXJ2YWJsZTxyZW1vdGVDb25maWcuUmVtb3RlQ29uZmlnfHVuZGVmaW5lZD4pOiBPcGVyYXRvckZ1bmN0aW9uPHtba2V5OnN0cmluZ106IHJlbW90ZUNvbmZpZy5WYWx1ZX0sIFBhcmFtZXRlcltdPiA9PiBwaXBlKFxuICB3aXRoTGF0ZXN0RnJvbShyZW1vdGVDb25maWcpLFxuICBzY2FuKChleGlzdGluZywgW2FsbCwgcmNdKSA9PiB7XG4gICAgLy8gU0VNVkVSIHVzZSBcIm5ldyBTZXRcIiB0byB1bmlxdWUgb25jZSB3ZSdyZSBvbmx5IHRhcmdldGluZyBlczZcbiAgICAvLyBhdCB0aGUgc2NhbGUgd2UgZXhwZWN0IHJlbW90ZSBjb25maWcgdG8gYmUgYXQsIHdlIHByb2JhYmx5IHdvbid0IHNlZSBhIHBlcmZvcm1hbmNlIGhpdCBmcm9tIHRoaXMgdW5vcHRpbWl6ZWQgdW5pcXVlbmVzcyBpbXBsZW1lbnRhdGlvblxuICAgIC8vIGNvbnN0IGFsbEtleXMgPSBbLi4ubmV3IFNldChbLi4uZXhpc3RpbmcubWFwKHAgPT4gcC5rZXkpLCAuLi5PYmplY3Qua2V5cyhhbGwpXSldO1xuICAgIGNvbnN0IGFsbEtleXMgPSBbLi4uZXhpc3RpbmcubWFwKHAgPT4gcC5rZXkpLCAuLi5PYmplY3Qua2V5cyhhbGwpXS5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSk7XG4gICAgcmV0dXJuIGFsbEtleXMubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkVmFsdWUgPSBhbGxba2V5XTtcbiAgICAgIHJldHVybiB1cGRhdGVkVmFsdWUgPyBuZXcgUGFyYW1ldGVyKGtleSwgcmMgPyByYy5mZXRjaFRpbWVNaWxsaXMgOiAtMSwgdXBkYXRlZFZhbHVlLmdldFNvdXJjZSgpLCB1cGRhdGVkVmFsdWUuYXNTdHJpbmcoKSlcbiAgICAgICAgICAgICAgICA6IGV4aXN0aW5nLmZpbmQocCA9PiBwLmtleSA9PT0ga2V5KSFcbiAgICB9KTtcbiAgfSwgW10gYXMgQXJyYXk8UGFyYW1ldGVyPilcbik7XG5cbmNvbnN0IEFTX1RPX0ZOID0geyAnc3RyaW5ncyc6ICdhc1N0cmluZycsICdudW1iZXJzJzogJ2FzTnVtYmVyJywgJ2Jvb2xlYW5zJzogJ2FzQm9vbGVhbicgfTtcbmNvbnN0IFNUQVRJQ19WQUxVRVMgPSB7ICdudW1iZXJzJzogMCwgJ2Jvb2xlYW5zJzogZmFsc2UsICdzdHJpbmdzJzogdW5kZWZpbmVkIH07XG5cbmV4cG9ydCBjb25zdCBidWRnZXQgPSA8VD4oaW50ZXJ2YWw6IG51bWJlcik6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPiA9PiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBuZXcgT2JzZXJ2YWJsZTxUPihvYnNlcnZlciA9PiB7XG4gICAgbGV0IHRpbWVkT3V0ID0gZmFsc2U7XG4gICAgLy8gVE9ETyB1c2Ugc2NoZWR1bGVyIHRhc2sgcmF0aGVyIHRoYW4gc2V0dGltZW91dFxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQodmFsKSB7IGlmICghdGltZWRPdXQpIHsgb2JzZXJ2ZXIubmV4dCh2YWwpOyB9IH0sXG4gICAgICBlcnJvcihlcnIpIHsgaWYgKCF0aW1lZE91dCkgeyBjbGVhclRpbWVvdXQodGltZW91dCk7IG9ic2VydmVyLmVycm9yKGVycik7IH0gfSxcbiAgICAgIGNvbXBsZXRlKCkgeyBpZiAoIXRpbWVkT3V0KSB7IGNsZWFyVGltZW91dCh0aW1lb3V0KTsgb2JzZXJ2ZXIuY29tcGxldGUoKTsgfSB9XG4gICAgfSlcbiAgfSk7XG5cbmNvbnN0IHR5cGVkTWV0aG9kID0gKGl0OmFueSkgPT4ge1xuICBzd2l0Y2godHlwZW9mIGl0KSB7XG4gICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuICdhc1N0cmluZyc7XG4gICAgY2FzZSAnYm9vbGVhbic6IHJldHVybiAnYXNCb29sZWFuJztcbiAgICBjYXNlICdudW1iZXInOiByZXR1cm4gJ2FzTnVtYmVyJztcbiAgICBkZWZhdWx0OiByZXR1cm4gJ2FzU3RyaW5nJztcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Ub09iamVjdCgpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Ub09iamVjdCh0bzogJ251bWJlcnMnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIHtba2V5OnN0cmluZ106IG51bWJlcnx1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdib29sZWFucycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwge1trZXk6c3RyaW5nXTogYm9vbGVhbnx1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdzdHJpbmdzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCB7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odGVtcGxhdGU6IFQpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwgVCAmIHtba2V5OnN0cmluZ106IHN0cmluZ3x1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3Q8VCBleHRlbmRzIENvbmZpZ1RlbXBsYXRlPih0bzogJ251bWJlcnMnfCdib29sZWFucyd8J3N0cmluZ3MnfFQgPSAnc3RyaW5ncycpIHtcbiAgcmV0dXJuIHBpcGUoXG4gICAgLy8gVE9ETyBjbGVhbnVwXG4gICAgc2NhbihcbiAgICAgIChjLCBwOiBQYXJhbWV0ZXIpID0+ICh7Li4uYywgW3Aua2V5XTogdHlwZW9mIHRvID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHBbdHlwZWRNZXRob2QodG9bcC5rZXldKV0oKSA6XG4gICAgICAgIHBbQVNfVE9fRk5bdG9dXSgpICB9KSxcbiAgICAgIHR5cGVvZiB0byA9PT0gJ29iamVjdCcgP1xuICAgICAgICB0byBhcyBUICYge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH06XG4gICAgICAgIHt9IGFzIHtba2V5OnN0cmluZ106IG51bWJlcnxib29sZWFufHN0cmluZ31cbiAgICApLFxuICAgIGRlYm91bmNlVGltZSgxKSxcbiAgICBidWRnZXQoMTApLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSlcbiAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iamVjdCgpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3QodG86ICdudW1iZXJzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyW10sIHtba2V5OnN0cmluZ106IG51bWJlcnx1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iamVjdCh0bzogJ2Jvb2xlYW5zJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyW10sIHtba2V5OnN0cmluZ106ICBib29sZWFufHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0KHRvOiAnc3RyaW5ncycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3Q8VCBleHRlbmRzIENvbmZpZ1RlbXBsYXRlPih0ZW1wbGF0ZTogVCk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyW10sIFQgJiB7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3Q8VCBleHRlbmRzIENvbmZpZ1RlbXBsYXRlPih0bzogJ251bWJlcnMnfCdib29sZWFucyd8J3N0cmluZ3MnfFQgPSAnc3RyaW5ncycpIHtcbiAgcmV0dXJuIHBpcGUoXG4gICAgLy8gVE9ETyB0aGlzIGlzIGdldHRpbmcgYSBsaXR0bGUgbG9uZywgY2xlYW51cFxuICAgIG1hcCgocGFyYW1zOiBQYXJhbWV0ZXJbXSkgPT4gcGFyYW1zLnJlZHVjZShcbiAgICAgIChjLCBwKSA9PiAoey4uLmMsIFtwLmtleV06IHR5cGVvZiB0byA9PT0gJ29iamVjdCcgP1xuICAgICAgICBwW3R5cGVkTWV0aG9kKHRvW3Aua2V5XSldKCkgOlxuICAgICAgICBwW0FTX1RPX0ZOW3RvXV0oKSB9KSxcbiAgICAgIHR5cGVvZiB0byA9PT0gJ29iamVjdCcgP1xuICAgICAgICB0byBhcyBUICYge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0gOlxuICAgICAgICB7fSBhcyB7W2tleTpzdHJpbmddOiBudW1iZXJ8Ym9vbGVhbnxzdHJpbmd9XG4gICAgKSksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsYikgPT4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpKVxuICApO1xufTtcblxuLy8gVE9ETyBsb29rIGludG8gdGhlIHR5cGVzIGhlcmUsIEkgZG9uJ3QgbGlrZSB0aGUgYW55c1xuY29uc3QgcHJveHlBbGwgPSAob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxQYXJhbWV0ZXJbXT4sIGFzOiAnbnVtYmVycyd8J2Jvb2xlYW5zJ3wnc3RyaW5ncycpID0+IG5ldyBQcm94eShcbiAgb2JzZXJ2YWJsZS5waXBlKG1hcFRvT2JqZWN0KGFzIGFzIGFueSkpLCB7XG4gICAgZ2V0OiAoc2VsZiwgbmFtZTpzdHJpbmcpID0+IHNlbGZbbmFtZV0gfHwgb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgbWFwKGFsbCA9PiBhbGwuZmluZChwID0+IHAua2V5ID09PSBuYW1lKSksXG4gICAgICBtYXAocGFyYW0gPT4gcGFyYW0gPyBwYXJhbVtBU19UT19GTlthc11dKCkgOiBTVEFUSUNfVkFMVUVTW2FzXSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKVxuICB9XG4pIGFzIGFueTsiXX0=