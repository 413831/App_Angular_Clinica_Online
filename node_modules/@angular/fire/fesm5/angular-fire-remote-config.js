import { __extends, __assign, __read, __spread } from 'tslib';
import { InjectionToken, Injectable, Inject, Optional, NgZone, PLATFORM_ID, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { of, empty, concat, pipe, Observable } from 'rxjs';
import { filter, observeOn, switchMap, map, tap, startWith, shareReplay, withLatestFrom, scan, groupBy, mergeMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import 'firebase/app';
import { isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ConfigTemplate() { }
;
/** @type {?} */
var SETTINGS = new InjectionToken('angularfire2.remoteConfig.settings');
/** @type {?} */
var DEFAULTS = new InjectionToken('angularfire2.remoteConfig.defaultConfig');
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
var filterRemote = (/**
 * @return {?}
 */
function () { return filterTest((/**
 * @param {?} p
 * @return {?}
 */
function (p) { return p.getSource() === 'remote'; })); });
// filterFresh allows the developer to effectively set up a maximum cache time
/** @type {?} */
var filterFresh = (/**
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
    /** @nocollapse */ AngularFireRemoteConfig.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireRemoteConfig_Factory() { return new AngularFireRemoteConfig(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(DEFAULTS, 8), ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID)); }, token: AngularFireRemoteConfig, providedIn: "any" });
    return AngularFireRemoteConfig;
}());
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
var budget = (/**
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
function scanToObject(to) {
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
function mapToObject(to) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireRemoteConfigModule = /** @class */ (function () {
    function AngularFireRemoteConfigModule() {
    }
    AngularFireRemoteConfigModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireRemoteConfig]
                },] }
    ];
    return AngularFireRemoteConfigModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireRemoteConfig, AngularFireRemoteConfigModule, DEFAULTS, Parameter, SETTINGS, Value, budget, filterFresh, filterRemote, mapToObject, scanToObject };
//# sourceMappingURL=angular-fire-remote-config.js.map
