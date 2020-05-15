/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const SETTINGS = new InjectionToken('angularfire2.remoteConfig.settings');
/** @type {?} */
export const DEFAULTS = new InjectionToken('angularfire2.remoteConfig.defaultConfig');
// WARNING: interface has both a type and a value, skipping emit
;
// TODO export as implements Partial<...> so minor doesn't break us
export class Value {
    /**
     * @param {?} _source
     * @param {?} _value
     */
    constructor(_source, _value) {
        this._source = _source;
        this._value = _value;
    }
    /**
     * @return {?}
     */
    asBoolean() { return ['1', 'true', 't', 'y', 'yes', 'on'].indexOf(this._value.toLowerCase()) > -1; }
    /**
     * @return {?}
     */
    asString() { return this._value; }
    /**
     * @return {?}
     */
    asNumber() { return Number(this._value) || 0; }
    /**
     * @return {?}
     */
    getSource() { return this._source; }
}
if (false) {
    /** @type {?} */
    Value.prototype._source;
    /** @type {?} */
    Value.prototype._value;
}
// SEMVER use ConstructorParameters when we can support Typescript 3.6
export class Parameter extends Value {
    /**
     * @param {?} key
     * @param {?} fetchTimeMillis
     * @param {?} source
     * @param {?} value
     */
    constructor(key, fetchTimeMillis, source, value) {
        super(source, value);
        this.key = key;
        this.fetchTimeMillis = fetchTimeMillis;
    }
}
if (false) {
    /** @type {?} */
    Parameter.prototype.key;
    /** @type {?} */
    Parameter.prototype.fetchTimeMillis;
}
// If it's a Parameter array, test any, else test the individual Parameter
/** @type {?} */
const filterTest = (/**
 * @param {?} fn
 * @return {?}
 */
(fn) => filter((/**
 * @param {?} it
 * @return {?}
 */
it => Array.isArray(it) ? it.some(fn) : fn(it))))
// Allow the user to bypass the default values and wait till they get something from the server, even if it's a cached copy;
// if used in conjuntion with first() it will only fetch RC values from the server if they aren't cached locally
;
const ɵ0 = filterTest;
// Allow the user to bypass the default values and wait till they get something from the server, even if it's a cached copy;
// if used in conjuntion with first() it will only fetch RC values from the server if they aren't cached locally
/** @type {?} */
export const filterRemote = (/**
 * @return {?}
 */
() => filterTest((/**
 * @param {?} p
 * @return {?}
 */
p => p.getSource() === 'remote')));
// filterFresh allows the developer to effectively set up a maximum cache time
/** @type {?} */
export const filterFresh = (/**
 * @param {?} howRecentInMillis
 * @return {?}
 */
(howRecentInMillis) => filterTest((/**
 * @param {?} p
 * @return {?}
 */
p => p.fetchTimeMillis + howRecentInMillis >= new Date().getTime())));
export class AngularFireRemoteConfig {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} settings
     * @param {?} defaultConfig
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(options, nameOrConfig, settings, defaultConfig, zone, platformId) {
        this.zone = zone;
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const remoteConfig$ = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => isPlatformBrowser(platformId) ? import('firebase/remote-config') : empty())), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.remoteConfig())), tap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => {
            if (settings) {
                rc.settings = settings;
            }
            if (defaultConfig) {
                rc.defaultConfig = defaultConfig;
            }
        })), startWith(undefined), shareReplay({ bufferSize: 1, refCount: false }));
        /** @type {?} */
        const loadedRemoteConfig$ = remoteConfig$.pipe(filter((/**
         * @param {?} rc
         * @return {?}
         */
        rc => !!rc)));
        /** @type {?} */
        let default$ = of(Object.keys(defaultConfig || {}).reduce((/**
         * @param {?} c
         * @param {?} k
         * @return {?}
         */
        (c, k) => (Object.assign(Object.assign({}, c), { [k]: new Value("default", (/** @type {?} */ (defaultConfig))[k].toString()) }))), {}));
        // we should filter out the defaults we provided to RC, since we have our own implementation
        // that gives us a -1 for fetchTimeMillis (so filterFresh can filter them out)
        /** @type {?} */
        const filterOutDefaults = map((/**
         * @param {?} all
         * @return {?}
         */
        all => Object.keys(all)
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        key => all[key].getSource() != 'default'))
            .reduce((/**
         * @param {?} acc
         * @param {?} key
         * @return {?}
         */
        (acc, key) => (Object.assign(Object.assign({}, acc), { [key]: all[key] }))), {})));
        /** @type {?} */
        const existing$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => rc.activate()
            .then((/**
         * @return {?}
         */
        () => rc.ensureInitialized()))
            .then((/**
         * @return {?}
         */
        () => rc.getAll())))), filterOutDefaults);
        /** @type {?} */
        const fresh$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => rc.fetchAndActivate()
            .then((/**
         * @return {?}
         */
        () => rc.ensureInitialized()))
            .then((/**
         * @return {?}
         */
        () => rc.getAll())))))), filterOutDefaults);
        this.parameters = concat(default$, existing$, fresh$).pipe(scanToParametersArray(remoteConfig$), shareReplay({ bufferSize: 1, refCount: true }));
        this.changes = this.parameters.pipe(switchMap((/**
         * @param {?} params
         * @return {?}
         */
        params => of(...params))), groupBy((/**
         * @param {?} param
         * @return {?}
         */
        param => param.key)), mergeMap((/**
         * @param {?} group
         * @return {?}
         */
        group => group.pipe(distinctUntilChanged()))));
        this.strings = proxyAll(this.parameters, 'strings');
        this.booleans = proxyAll(this.parameters, 'booleans');
        this.numbers = proxyAll(this.parameters, 'numbers');
        return ɵlazySDKProxy(this, loadedRemoteConfig$, zone);
    }
}
AngularFireRemoteConfig.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireRemoteConfig.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SETTINGS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEFAULTS,] }] },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ AngularFireRemoteConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireRemoteConfig_Factory() { return new AngularFireRemoteConfig(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(SETTINGS, 8), i0.ɵɵinject(DEFAULTS, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFireRemoteConfig, providedIn: "any" });
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
const scanToParametersArray = (/**
 * @param {?} remoteConfig
 * @return {?}
 */
(remoteConfig) => pipe(withLatestFrom(remoteConfig), scan((/**
 * @param {?} existing
 * @param {?} __1
 * @return {?}
 */
(existing, [all, rc]) => {
    // SEMVER use "new Set" to unique once we're only targeting es6
    // at the scale we expect remote config to be at, we probably won't see a performance hit from this unoptimized uniqueness implementation
    // const allKeys = [...new Set([...existing.map(p => p.key), ...Object.keys(all)])];
    /** @type {?} */
    const allKeys = [...existing.map((/**
         * @param {?} p
         * @return {?}
         */
        p => p.key)), ...Object.keys(all)].filter((/**
     * @param {?} v
     * @param {?} i
     * @param {?} a
     * @return {?}
     */
    (v, i, a) => a.indexOf(v) === i));
    return allKeys.map((/**
     * @param {?} key
     * @return {?}
     */
    key => {
        /** @type {?} */
        const updatedValue = all[key];
        return updatedValue ? new Parameter(key, rc ? rc.fetchTimeMillis : -1, updatedValue.getSource(), updatedValue.asString())
            : (/** @type {?} */ (existing.find((/**
             * @param {?} p
             * @return {?}
             */
            p => p.key === key))));
    }));
}), (/** @type {?} */ ([])))));
const ɵ1 = scanToParametersArray;
/** @type {?} */
const AS_TO_FN = { 'strings': 'asString', 'numbers': 'asNumber', 'booleans': 'asBoolean' };
/** @type {?} */
const STATIC_VALUES = { 'numbers': 0, 'booleans': false, 'strings': undefined };
/** @type {?} */
export const budget = (/**
 * @template T
 * @param {?} interval
 * @return {?}
 */
(interval) => (/**
 * @param {?} source
 * @return {?}
 */
(source) => new Observable((/**
 * @param {?} observer
 * @return {?}
 */
observer => {
    /** @type {?} */
    let timedOut = false;
    // TODO use scheduler task rather than settimeout
    /** @type {?} */
    const timeout = setTimeout((/**
     * @return {?}
     */
    () => {
        observer.complete();
        timedOut = true;
    }), interval);
    return source.subscribe({
        /**
         * @param {?} val
         * @return {?}
         */
        next(val) { if (!timedOut) {
            observer.next(val);
        } },
        /**
         * @param {?} err
         * @return {?}
         */
        error(err) { if (!timedOut) {
            clearTimeout(timeout);
            observer.error(err);
        } },
        /**
         * @return {?}
         */
        complete() { if (!timedOut) {
            clearTimeout(timeout);
            observer.complete();
        } }
    });
}))));
/** @type {?} */
const typedMethod = (/**
 * @param {?} it
 * @return {?}
 */
(it) => {
    switch (typeof it) {
        case 'string': return 'asString';
        case 'boolean': return 'asBoolean';
        case 'number': return 'asNumber';
        default: return 'asString';
    }
});
const ɵ2 = typedMethod;
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function scanToObject(to = 'strings') {
    return pipe(
    // TODO cleanup
    scan((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    (c, p) => (Object.assign(Object.assign({}, c), { [p.key]: typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]]() }))), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))), debounceTime(1), budget(10), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => JSON.stringify(a) === JSON.stringify(b))));
}
;
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function mapToObject(to = 'strings') {
    return pipe(
    // TODO this is getting a little long, cleanup
    map((/**
     * @param {?} params
     * @return {?}
     */
    (params) => params.reduce((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    (c, p) => (Object.assign(Object.assign({}, c), { [p.key]: typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]]() }))), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))))), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => JSON.stringify(a) === JSON.stringify(b))));
}
;
// TODO look into the types here, I don't like the anys
/** @type {?} */
const proxyAll = (/**
 * @param {?} observable
 * @param {?} as
 * @return {?}
 */
(observable, as) => (/** @type {?} */ (new Proxy(observable.pipe(mapToObject((/** @type {?} */ (as)))), {
    get: (/**
     * @param {?} self
     * @param {?} name
     * @return {?}
     */
    (self, name) => self[name] || observable.pipe(map((/**
     * @param {?} all
     * @return {?}
     */
    all => all.find((/**
     * @param {?} p
     * @return {?}
     */
    p => p.key === name)))), map((/**
     * @param {?} param
     * @return {?}
     */
    param => param ? param[AS_TO_FN[as]]() : STATIC_VALUES[as])), distinctUntilChanged()))
}))));
const ɵ3 = proxyAll;
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvcmVtb3RlLWNvbmZpZy8iLCJzb3VyY2VzIjpbInJlbW90ZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUE4QyxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkgsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDekwsT0FBTyxFQUFpQixtQkFBbUIsRUFBRSxzQkFBc0IsRUFBc0MsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25MLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUVwRCxvQ0FBcUU7QUFBQSxDQUFDOztBQUV0RSxNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUF3QixvQ0FBb0MsQ0FBQzs7QUFDdkcsTUFBTSxPQUFPLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBaUIseUNBQXlDLENBQUM7O0FBRVQsQ0FBQzs7QUFHN0YsTUFBTSxPQUFPLEtBQUs7Ozs7O0lBS2hCLFlBQW1CLE9BQWlDLEVBQVMsTUFBYztRQUF4RCxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUFTLFdBQU0s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QXlDLENBQzlDLEVBQUMsRUFDRixvQkFBb0I7Ozs7O0lBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FDdkUsQ0FBQztBQUNKLENBQUM7QUFBQSxDQUFDOzs7TUFHSSxRQUFROzs7OztBQUFHLENBQUMsVUFBbUMsRUFBRSxFQUFrQyxFQUFFLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEtBQUssQ0FDckcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQUEsRUFBRSxFQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ3ZDLEdBQUc7Ozs7O0lBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FDdkQsR0FBRzs7OztJQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUk7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFDLEVBQUMsRUFDekMsR0FBRzs7OztJQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQy9ELG9CQUFvQixFQUFFLENBQ3ZCLENBQUE7Q0FDRixDQUNGLEVBQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSwgSW5qZWN0aW9uVG9rZW4sIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBjb25jYXQsIG9mLCBwaXBlLCBPcGVyYXRvckZ1bmN0aW9uLCBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIGVtcHR5LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwLCBzaGFyZVJlcGxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgZ3JvdXBCeSwgbWVyZ2VNYXAsIHNjYW4sIHdpdGhMYXRlc3RGcm9tLCBzdGFydFdpdGgsIGRlYm91bmNlVGltZSwgb2JzZXJ2ZU9uLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgybVQcm9taXNlUHJveHksIMm1ZmlyZWJhc2VBcHBGYWN0b3J5LCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycywgRmlyZWJhc2VBcHBDb25maWcsIEZpcmViYXNlT3B0aW9ucywgybVsYXp5U0RLUHJveHksIEZJUkVCQVNFX09QVElPTlMsIEZJUkVCQVNFX0FQUF9OQU1FIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyByZW1vdGVDb25maWcgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ1RlbXBsYXRlIHtba2V5OnN0cmluZ106IHN0cmluZ3xudW1iZXJ8Ym9vbGVhbn07XG5cbmV4cG9ydCBjb25zdCBTRVRUSU5HUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxyZW1vdGVDb25maWcuU2V0dGluZ3M+KCdhbmd1bGFyZmlyZTIucmVtb3RlQ29uZmlnLnNldHRpbmdzJyk7XG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29uZmlnVGVtcGxhdGU+KCdhbmd1bGFyZmlyZTIucmVtb3RlQ29uZmlnLmRlZmF1bHRDb25maWcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZVJlbW90ZUNvbmZpZyBleHRlbmRzIMm1UHJvbWlzZVByb3h5PHJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc+IHt9O1xuXG4vLyBUT0RPIGV4cG9ydCBhcyBpbXBsZW1lbnRzIFBhcnRpYWw8Li4uPiBzbyBtaW5vciBkb2Vzbid0IGJyZWFrIHVzXG5leHBvcnQgY2xhc3MgVmFsdWUgaW1wbGVtZW50cyByZW1vdGVDb25maWcuVmFsdWUge1xuICBhc0Jvb2xlYW4oKSB7IHJldHVybiBbJzEnLCAndHJ1ZScsICd0JywgJ3knLCAneWVzJywgJ29uJ10uaW5kZXhPZih0aGlzLl92YWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xIH1cbiAgYXNTdHJpbmcoKSB7IHJldHVybiB0aGlzLl92YWx1ZSB9XG4gIGFzTnVtYmVyKCkgeyByZXR1cm4gTnVtYmVyKHRoaXMuX3ZhbHVlKSB8fCAwIH1cbiAgZ2V0U291cmNlKCkgeyByZXR1cm4gdGhpcy5fc291cmNlOyB9XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfc291cmNlOiByZW1vdGVDb25maWcuVmFsdWVTb3VyY2UsIHB1YmxpYyBfdmFsdWU6IHN0cmluZykgeyB9XG59XG5cbi8vIFNFTVZFUiB1c2UgQ29uc3RydWN0b3JQYXJhbWV0ZXJzIHdoZW4gd2UgY2FuIHN1cHBvcnQgVHlwZXNjcmlwdCAzLjZcbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXIgZXh0ZW5kcyBWYWx1ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IHN0cmluZywgcHVibGljIGZldGNoVGltZU1pbGxpczogbnVtYmVyLCBzb3VyY2U6IHJlbW90ZUNvbmZpZy5WYWx1ZVNvdXJjZSwgdmFsdWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNvdXJjZSwgdmFsdWUpO1xuICB9XG59XG5cbi8vIElmIGl0J3MgYSBQYXJhbWV0ZXIgYXJyYXksIHRlc3QgYW55LCBlbHNlIHRlc3QgdGhlIGluZGl2aWR1YWwgUGFyYW1ldGVyXG5jb25zdCBmaWx0ZXJUZXN0ID0gKGZuOiAocGFyYW06UGFyYW1ldGVyKSA9PiBib29sZWFuKSA9PiBmaWx0ZXI8UGFyYW1ldGVyfFBhcmFtZXRlcltdPihpdCA9PiBBcnJheS5pc0FycmF5KGl0KSA/IGl0LnNvbWUoZm4pIDogZm4oaXQpKVxuXG4vLyBBbGxvdyB0aGUgdXNlciB0byBieXBhc3MgdGhlIGRlZmF1bHQgdmFsdWVzIGFuZCB3YWl0IHRpbGwgdGhleSBnZXQgc29tZXRoaW5nIGZyb20gdGhlIHNlcnZlciwgZXZlbiBpZiBpdCdzIGEgY2FjaGVkIGNvcHk7XG4vLyBpZiB1c2VkIGluIGNvbmp1bnRpb24gd2l0aCBmaXJzdCgpIGl0IHdpbGwgb25seSBmZXRjaCBSQyB2YWx1ZXMgZnJvbSB0aGUgc2VydmVyIGlmIHRoZXkgYXJlbid0IGNhY2hlZCBsb2NhbGx5XG5leHBvcnQgY29uc3QgZmlsdGVyUmVtb3RlID0gKCkgPT4gZmlsdGVyVGVzdChwID0+IHAuZ2V0U291cmNlKCkgPT09ICdyZW1vdGUnKTtcblxuLy8gZmlsdGVyRnJlc2ggYWxsb3dzIHRoZSBkZXZlbG9wZXIgdG8gZWZmZWN0aXZlbHkgc2V0IHVwIGEgbWF4aW11bSBjYWNoZSB0aW1lXG5leHBvcnQgY29uc3QgZmlsdGVyRnJlc2ggPSAoaG93UmVjZW50SW5NaWxsaXM6IG51bWJlcikgPT4gZmlsdGVyVGVzdChwID0+IHAuZmV0Y2hUaW1lTWlsbGlzICsgaG93UmVjZW50SW5NaWxsaXMgPj0gbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlUmVtb3RlQ29uZmlnIHtcblxuICByZWFkb25seSBjaGFuZ2VzOiAgICBPYnNlcnZhYmxlPFBhcmFtZXRlcj47XG4gIHJlYWRvbmx5IHBhcmFtZXRlcnM6IE9ic2VydmFibGU8UGFyYW1ldGVyW10+O1xuICByZWFkb25seSBudW1iZXJzOiAgICBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106IG51bWJlcnx1bmRlZmluZWR9PiAgJiB7W2tleTpzdHJpbmddOiBPYnNlcnZhYmxlPG51bWJlcj59O1xuICByZWFkb25seSBib29sZWFuczogICBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106IGJvb2xlYW58dW5kZWZpbmVkfT4gJiB7W2tleTpzdHJpbmddOiBPYnNlcnZhYmxlPGJvb2xlYW4+fTtcbiAgcmVhZG9ubHkgc3RyaW5nczogICAgT2JzZXJ2YWJsZTx7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT4gICYge1trZXk6c3RyaW5nXTogT2JzZXJ2YWJsZTxzdHJpbmd8dW5kZWZpbmVkPn07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOkZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6c3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGx8dW5kZWZpbmVkLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VUVElOR1MpIHNldHRpbmdzOnJlbW90ZUNvbmZpZy5TZXR0aW5nc3xudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREVGQVVMVFMpIGRlZmF1bHRDb25maWc6Q29uZmlnVGVtcGxhdGV8bnVsbCxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOk9iamVjdFxuICApIHtcblxuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgXG4gICAgY29uc3QgcmVtb3RlQ29uZmlnJCA9IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IGltcG9ydCgnZmlyZWJhc2UvcmVtb3RlLWNvbmZpZycpIDogZW1wdHkoKSksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICBtYXAoYXBwID0+IGFwcC5yZW1vdGVDb25maWcoKSksXG4gICAgICB0YXAocmMgPT4ge1xuICAgICAgICBpZiAoc2V0dGluZ3MpIHsgcmMuc2V0dGluZ3MgPSBzZXR0aW5ncyB9XG4gICAgICAgIGlmIChkZWZhdWx0Q29uZmlnKSB7IHJjLmRlZmF1bHRDb25maWcgPSBkZWZhdWx0Q29uZmlnIH1cbiAgICAgIH0pLFxuICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9KVxuICAgICk7XG5cbiAgICBjb25zdCBsb2FkZWRSZW1vdGVDb25maWckID0gcmVtb3RlQ29uZmlnJC5waXBlKFxuICAgICAgZmlsdGVyPHJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc+KHJjID0+ICEhcmMpXG4gICAgKTtcblxuICAgIGxldCBkZWZhdWx0JDogT2JzZXJ2YWJsZTx7W2tleTpzdHJpbmddOiByZW1vdGVDb25maWcuVmFsdWV9PiA9IG9mKE9iamVjdC5rZXlzKGRlZmF1bHRDb25maWcgfHwge30pLnJlZHVjZShcbiAgICAgIChjLCBrKSA9PiAoey4uLmMsIFtrXTogbmV3IFZhbHVlKFwiZGVmYXVsdFwiLCBkZWZhdWx0Q29uZmlnIVtrXS50b1N0cmluZygpKSB9KSwge31cbiAgICApKTtcblxuICAgIC8vIHdlIHNob3VsZCBmaWx0ZXIgb3V0IHRoZSBkZWZhdWx0cyB3ZSBwcm92aWRlZCB0byBSQywgc2luY2Ugd2UgaGF2ZSBvdXIgb3duIGltcGxlbWVudGF0aW9uXG4gICAgLy8gdGhhdCBnaXZlcyB1cyBhIC0xIGZvciBmZXRjaFRpbWVNaWxsaXMgKHNvIGZpbHRlckZyZXNoIGNhbiBmaWx0ZXIgdGhlbSBvdXQpXG4gICAgY29uc3QgZmlsdGVyT3V0RGVmYXVsdHMgPSBtYXA8e1trZXk6IHN0cmluZ106IHJlbW90ZUNvbmZpZy5WYWx1ZX0sIHtba2V5OiBzdHJpbmddOiByZW1vdGVDb25maWcuVmFsdWV9PihhbGwgPT5cbiAgICAgIE9iamVjdC5rZXlzKGFsbClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gYWxsW2tleV0uZ2V0U291cmNlKCkgIT0gJ2RlZmF1bHQnKVxuICAgICAgICAucmVkdWNlKChhY2MsIGtleSkgPT4gKHsuLi5hY2MsIFtrZXldOiBhbGxba2V5XX0pLCB7fSlcbiAgICApO1xuXG4gICAgY29uc3QgZXhpc3RpbmckID0gbG9hZGVkUmVtb3RlQ29uZmlnJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHJjID0+XG4gICAgICAgIHJjLmFjdGl2YXRlKClcbiAgICAgICAgICAudGhlbigoKSA9PiByYy5lbnN1cmVJbml0aWFsaXplZCgpKVxuICAgICAgICAgIC50aGVuKCgpID0+IHJjLmdldEFsbCgpKVxuICAgICAgKSxcbiAgICAgIGZpbHRlck91dERlZmF1bHRzXG4gICAgKTtcblxuICAgIGNvbnN0IGZyZXNoJCA9IGxvYWRlZFJlbW90ZUNvbmZpZyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChyYyA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XG4gICAgICAgIHJjLmZldGNoQW5kQWN0aXZhdGUoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHJjLmVuc3VyZUluaXRpYWxpemVkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmMuZ2V0QWxsKCkpXG4gICAgICApKSxcbiAgICAgIGZpbHRlck91dERlZmF1bHRzXG4gICAgKTtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IGNvbmNhdChkZWZhdWx0JCwgZXhpc3RpbmckLCBmcmVzaCQpLnBpcGUoXG4gICAgICBzY2FuVG9QYXJhbWV0ZXJzQXJyYXkocmVtb3RlQ29uZmlnJCksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICAgKTtcblxuICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMucGFyYW1ldGVycy5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBhcmFtcyA9PiBvZiguLi5wYXJhbXMpKSxcbiAgICAgIGdyb3VwQnkocGFyYW0gPT4gcGFyYW0ua2V5KSxcbiAgICAgIG1lcmdlTWFwKGdyb3VwID0+IGdyb3VwLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICkpXG4gICAgKTtcblxuICAgIHRoaXMuc3RyaW5ncyAgPSBwcm94eUFsbCh0aGlzLnBhcmFtZXRlcnMsICdzdHJpbmdzJyk7XG4gICAgdGhpcy5ib29sZWFucyA9IHByb3h5QWxsKHRoaXMucGFyYW1ldGVycywgJ2Jvb2xlYW5zJyk7XG4gICAgdGhpcy5udW1iZXJzICA9IHByb3h5QWxsKHRoaXMucGFyYW1ldGVycywgJ251bWJlcnMnKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBsb2FkZWRSZW1vdGVDb25maWckLCB6b25lKTtcbiAgfVxuXG59XG5cbi8vIEkgZGl0Y2hlZCBsb2FkaW5nIHRoZSBkZWZhdWx0cyBpbnRvIFJDIGFuZCBhIHNpbXBsZSBtYXAgZm9yIHNjYW4gc2luY2Ugd2UgYWxyZWFkeSBoYXZlIG91ciBvd24gZGVmYXVsdHMgaW1wbGVtZW50YXRpb24uXG4vLyBUaGUgaWRlYSBoZXJlIGJlaW5nIHRoYXQgaWYgdGhleSBoYXZlIGEgZGVmYXVsdCB0aGF0IG5ldmVyIGxvYWRzIGZyb20gdGhlIHNlcnZlciwgdGhleSB3aWxsIGJlIGFibGUgdG8gdGVsbCB2aWEgZmV0Y2hUaW1lTWlsbGlzIG9uIHRoZSBQYXJhbWV0ZXIuXG4vLyBBbHNvIGlmIGl0IGRvZXNuJ3QgY29tZSBmcm9tIHRoZSBzZXJ2ZXIgaXQgd29uJ3QgZW1pdCBhZ2FpbiBpbiAuY2hhbmdlcywgZHVlIHRvIHRoZSBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgd2hpY2ggd2UgY2FuIHNpbXBsaWZ5IHRvID09PSByYXRoZXIgdGhhbiBkZWVwIGNvbXBhcmlzb25cbmNvbnN0IHNjYW5Ub1BhcmFtZXRlcnNBcnJheSA9IChyZW1vdGVDb25maWc6IE9ic2VydmFibGU8cmVtb3RlQ29uZmlnLlJlbW90ZUNvbmZpZ3x1bmRlZmluZWQ+KTogT3BlcmF0b3JGdW5jdGlvbjx7W2tleTpzdHJpbmddOiByZW1vdGVDb25maWcuVmFsdWV9LCBQYXJhbWV0ZXJbXT4gPT4gcGlwZShcbiAgd2l0aExhdGVzdEZyb20ocmVtb3RlQ29uZmlnKSxcbiAgc2NhbigoZXhpc3RpbmcsIFthbGwsIHJjXSkgPT4ge1xuICAgIC8vIFNFTVZFUiB1c2UgXCJuZXcgU2V0XCIgdG8gdW5pcXVlIG9uY2Ugd2UncmUgb25seSB0YXJnZXRpbmcgZXM2XG4gICAgLy8gYXQgdGhlIHNjYWxlIHdlIGV4cGVjdCByZW1vdGUgY29uZmlnIHRvIGJlIGF0LCB3ZSBwcm9iYWJseSB3b24ndCBzZWUgYSBwZXJmb3JtYW5jZSBoaXQgZnJvbSB0aGlzIHVub3B0aW1pemVkIHVuaXF1ZW5lc3MgaW1wbGVtZW50YXRpb25cbiAgICAvLyBjb25zdCBhbGxLZXlzID0gWy4uLm5ldyBTZXQoWy4uLmV4aXN0aW5nLm1hcChwID0+IHAua2V5KSwgLi4uT2JqZWN0LmtleXMoYWxsKV0pXTtcbiAgICBjb25zdCBhbGxLZXlzID0gWy4uLmV4aXN0aW5nLm1hcChwID0+IHAua2V5KSwgLi4uT2JqZWN0LmtleXMoYWxsKV0uZmlsdGVyKCh2LCBpLCBhKSA9PiBhLmluZGV4T2YodikgPT09IGkpO1xuICAgIHJldHVybiBhbGxLZXlzLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZFZhbHVlID0gYWxsW2tleV07XG4gICAgICByZXR1cm4gdXBkYXRlZFZhbHVlID8gbmV3IFBhcmFtZXRlcihrZXksIHJjID8gcmMuZmV0Y2hUaW1lTWlsbGlzIDogLTEsIHVwZGF0ZWRWYWx1ZS5nZXRTb3VyY2UoKSwgdXBkYXRlZFZhbHVlLmFzU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgOiBleGlzdGluZy5maW5kKHAgPT4gcC5rZXkgPT09IGtleSkhXG4gICAgfSk7XG4gIH0sIFtdIGFzIEFycmF5PFBhcmFtZXRlcj4pXG4pO1xuXG5jb25zdCBBU19UT19GTiA9IHsgJ3N0cmluZ3MnOiAnYXNTdHJpbmcnLCAnbnVtYmVycyc6ICdhc051bWJlcicsICdib29sZWFucyc6ICdhc0Jvb2xlYW4nIH07XG5jb25zdCBTVEFUSUNfVkFMVUVTID0geyAnbnVtYmVycyc6IDAsICdib29sZWFucyc6IGZhbHNlLCAnc3RyaW5ncyc6IHVuZGVmaW5lZCB9O1xuXG5leHBvcnQgY29uc3QgYnVkZ2V0ID0gPFQ+KGludGVydmFsOiBudW1iZXIpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4gPT4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4ob2JzZXJ2ZXIgPT4ge1xuICAgIGxldCB0aW1lZE91dCA9IGZhbHNlO1xuICAgIC8vIFRPRE8gdXNlIHNjaGVkdWxlciB0YXNrIHJhdGhlciB0aGFuIHNldHRpbWVvdXRcbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgIH0sIGludGVydmFsKTtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZSh7XG4gICAgICBuZXh0KHZhbCkgeyBpZiAoIXRpbWVkT3V0KSB7IG9ic2VydmVyLm5leHQodmFsKTsgfSB9LFxuICAgICAgZXJyb3IoZXJyKSB7IGlmICghdGltZWRPdXQpIHsgY2xlYXJUaW1lb3V0KHRpbWVvdXQpOyBvYnNlcnZlci5lcnJvcihlcnIpOyB9IH0sXG4gICAgICBjb21wbGV0ZSgpIHsgaWYgKCF0aW1lZE91dCkgeyBjbGVhclRpbWVvdXQodGltZW91dCk7IG9ic2VydmVyLmNvbXBsZXRlKCk7IH0gfVxuICAgIH0pXG4gIH0pO1xuXG5jb25zdCB0eXBlZE1ldGhvZCA9IChpdDphbnkpID0+IHtcbiAgc3dpdGNoKHR5cGVvZiBpdCkge1xuICAgIGNhc2UgJ3N0cmluZyc6IHJldHVybiAnYXNTdHJpbmcnO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gJ2FzQm9vbGVhbic7XG4gICAgY2FzZSAnbnVtYmVyJzogcmV0dXJuICdhc051bWJlcic7XG4gICAgZGVmYXVsdDogcmV0dXJuICdhc1N0cmluZyc7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3QoKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIHtba2V5OnN0cmluZ106IHN0cmluZ3x1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdudW1iZXJzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCB7W2tleTpzdHJpbmddOiBudW1iZXJ8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0KHRvOiAnYm9vbGVhbnMnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIHtba2V5OnN0cmluZ106IGJvb2xlYW58dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0KHRvOiAnc3RyaW5ncycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Ub09iamVjdDxUIGV4dGVuZHMgQ29uZmlnVGVtcGxhdGU+KHRlbXBsYXRlOiBUKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIFQgJiB7W2tleTpzdHJpbmddOiBzdHJpbmd8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odG86ICdudW1iZXJzJ3wnYm9vbGVhbnMnfCdzdHJpbmdzJ3xUID0gJ3N0cmluZ3MnKSB7XG4gIHJldHVybiBwaXBlKFxuICAgIC8vIFRPRE8gY2xlYW51cFxuICAgIHNjYW4oXG4gICAgICAoYywgcDogUGFyYW1ldGVyKSA9PiAoey4uLmMsIFtwLmtleV06IHR5cGVvZiB0byA9PT0gJ29iamVjdCcgP1xuICAgICAgICBwW3R5cGVkTWV0aG9kKHRvW3Aua2V5XSldKCkgOlxuICAgICAgICBwW0FTX1RPX0ZOW3RvXV0oKSAgfSksXG4gICAgICB0eXBlb2YgdG8gPT09ICdvYmplY3QnID9cbiAgICAgICAgdG8gYXMgVCAmIHtba2V5OnN0cmluZ106IHN0cmluZ3x1bmRlZmluZWR9OlxuICAgICAgICB7fSBhcyB7W2tleTpzdHJpbmddOiBudW1iZXJ8Ym9vbGVhbnxzdHJpbmd9XG4gICAgKSxcbiAgICBkZWJvdW5jZVRpbWUoMSksXG4gICAgYnVkZ2V0KDEwKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSxiKSA9PiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYikpXG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3QoKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0KHRvOiAnbnVtYmVycycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7W2tleTpzdHJpbmddOiBudW1iZXJ8dW5kZWZpbmVkfT47XG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3QodG86ICdib29sZWFucycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7W2tleTpzdHJpbmddOiAgYm9vbGVhbnx1bmRlZmluZWR9PjtcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iamVjdCh0bzogJ3N0cmluZ3MnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odGVtcGxhdGU6IFQpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCBUICYge1trZXk6c3RyaW5nXTogc3RyaW5nfHVuZGVmaW5lZH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odG86ICdudW1iZXJzJ3wnYm9vbGVhbnMnfCdzdHJpbmdzJ3xUID0gJ3N0cmluZ3MnKSB7XG4gIHJldHVybiBwaXBlKFxuICAgIC8vIFRPRE8gdGhpcyBpcyBnZXR0aW5nIGEgbGl0dGxlIGxvbmcsIGNsZWFudXBcbiAgICBtYXAoKHBhcmFtczogUGFyYW1ldGVyW10pID0+IHBhcmFtcy5yZWR1Y2UoXG4gICAgICAoYywgcCkgPT4gKHsuLi5jLCBbcC5rZXldOiB0eXBlb2YgdG8gPT09ICdvYmplY3QnID9cbiAgICAgICAgcFt0eXBlZE1ldGhvZCh0b1twLmtleV0pXSgpIDpcbiAgICAgICAgcFtBU19UT19GTlt0b11dKCkgfSksXG4gICAgICB0eXBlb2YgdG8gPT09ICdvYmplY3QnID9cbiAgICAgICAgdG8gYXMgVCAmIHtba2V5OnN0cmluZ106IHN0cmluZ3x1bmRlZmluZWR9IDpcbiAgICAgICAge30gYXMge1trZXk6c3RyaW5nXTogbnVtYmVyfGJvb2xlYW58c3RyaW5nfVxuICAgICkpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSlcbiAgKTtcbn07XG5cbi8vIFRPRE8gbG9vayBpbnRvIHRoZSB0eXBlcyBoZXJlLCBJIGRvbid0IGxpa2UgdGhlIGFueXNcbmNvbnN0IHByb3h5QWxsID0gKG9ic2VydmFibGU6IE9ic2VydmFibGU8UGFyYW1ldGVyW10+LCBhczogJ251bWJlcnMnfCdib29sZWFucyd8J3N0cmluZ3MnKSA9PiBuZXcgUHJveHkoXG4gIG9ic2VydmFibGUucGlwZShtYXBUb09iamVjdChhcyBhcyBhbnkpKSwge1xuICAgIGdldDogKHNlbGYsIG5hbWU6c3RyaW5nKSA9PiBzZWxmW25hbWVdIHx8IG9ic2VydmFibGUucGlwZShcbiAgICAgIG1hcChhbGwgPT4gYWxsLmZpbmQocCA9PiBwLmtleSA9PT0gbmFtZSkpLFxuICAgICAgbWFwKHBhcmFtID0+IHBhcmFtID8gcGFyYW1bQVNfVE9fRk5bYXNdXSgpIDogU1RBVElDX1ZBTFVFU1thc10pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgIClcbiAgfVxuKSBhcyBhbnk7Il19