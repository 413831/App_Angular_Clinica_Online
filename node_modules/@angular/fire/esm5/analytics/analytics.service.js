/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read } from "tslib";
import { Injectable, Optional, NgZone, ComponentFactoryResolver, Inject, PLATFORM_ID, Injector, NgModuleFactory } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, withLatestFrom, switchMap, map, tap, pairwise, startWith, groupBy, mergeMap, observeOn } from 'rxjs/operators';
import { Router, NavigationEnd, ActivationEnd, ROUTES } from '@angular/router';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { AngularFireAnalytics, DEBUG_MODE } from './analytics';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./analytics";
import * as i2 from "@angular/router";
import * as i3 from "@angular/platform-browser";
/** @type {?} */
var FIREBASE_EVENT_ORIGIN_KEY = 'firebase_event_origin';
/** @type {?} */
var FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = 'firebase_previous_class';
/** @type {?} */
var FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = 'firebase_previous_id';
/** @type {?} */
var FIREBASE_PREVIOUS_SCREEN_NAME_KEY = 'firebase_previous_screen';
/** @type {?} */
var FIREBASE_SCREEN_CLASS_KEY = 'firebase_screen_class';
/** @type {?} */
var FIREBASE_SCREEN_INSTANCE_ID_KEY = 'firebase_screen_id';
/** @type {?} */
var FIREBASE_SCREEN_NAME_KEY = 'firebase_screen';
/** @type {?} */
var OUTLET_KEY = 'outlet';
/** @type {?} */
var PAGE_PATH_KEY = 'page_path';
/** @type {?} */
var PAGE_TITLE_KEY = 'page_title';
/** @type {?} */
var SCREEN_CLASS_KEY = 'screen_class';
/** @type {?} */
var SCREEN_NAME_KEY = 'screen_name';
/** @type {?} */
var SCREEN_VIEW_EVENT = 'screen_view';
/** @type {?} */
var EVENT_ORIGIN_AUTO = 'auto';
/** @type {?} */
var DEFAULT_SCREEN_CLASS = '???';
/** @type {?} */
var NG_PRIMARY_OUTLET = 'primary';
/** @type {?} */
var SCREEN_INSTANCE_DELIMITER = '#';
/** @type {?} */
var ANNOTATIONS = '__annotations__';
var ScreenTrackingService = /** @class */ (function () {
    function ScreenTrackingService(analytics, router, title, componentFactoryResolver, platformId, debugModeEnabled, zone, injector) {
        var _this = this;
        if (!router || !isPlatformBrowser(platformId)) {
            return this;
        }
        zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var activationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e instanceof ActivationEnd; })));
            /** @type {?} */
            var navigationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e instanceof NavigationEnd; })));
            _this.disposable = navigationEndEvents.pipe(withLatestFrom(activationEndEvents), switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b, _c, _d, _e, _f;
                var _g = __read(_a, 2), navigationEnd = _g[0], activationEnd = _g[1];
                // SEMVER: start using optional chains and nullish coalescing once we support newer typescript
                /** @type {?} */
                var page_path = navigationEnd.url;
                /** @type {?} */
                var screen_name = activationEnd.snapshot.routeConfig && activationEnd.snapshot.routeConfig.path || page_path;
                /** @type {?} */
                var params = (_b = {},
                    _b[SCREEN_NAME_KEY] = screen_name,
                    _b[PAGE_PATH_KEY] = page_path,
                    _b[FIREBASE_EVENT_ORIGIN_KEY] = EVENT_ORIGIN_AUTO,
                    _b[FIREBASE_SCREEN_NAME_KEY] = screen_name,
                    _b[OUTLET_KEY] = activationEnd.snapshot.outlet,
                    _b);
                if (title) {
                    params[PAGE_TITLE_KEY] = title.getTitle();
                }
                /** @type {?} */
                var component = activationEnd.snapshot.component;
                /** @type {?} */
                var routeConfig = activationEnd.snapshot.routeConfig;
                /** @type {?} */
                var loadChildren = routeConfig && routeConfig.loadChildren;
                // TODO figure out how to handle minification
                if (typeof loadChildren === "string") {
                    // SEMVER: this is the older lazy load style "./path#ClassName", drop this when we drop old ng
                    // TODO is it worth seeing if I can look up the component factory selector from the module name?
                    // it's lazy so it's not registered with componentFactoryResolver yet... seems a pain for a depreciated style
                    return of(__assign(__assign({}, params), (_c = {}, _c[SCREEN_CLASS_KEY] = loadChildren.split('#')[1], _c)));
                }
                else if (typeof component === 'string') {
                    return of(__assign(__assign({}, params), (_d = {}, _d[SCREEN_CLASS_KEY] = component, _d)));
                }
                else if (component) {
                    /** @type {?} */
                    var componentFactory = componentFactoryResolver.resolveComponentFactory(component);
                    return of(__assign(__assign({}, params), (_e = {}, _e[SCREEN_CLASS_KEY] = componentFactory.selector, _e)));
                }
                else if (loadChildren) {
                    /** @type {?} */
                    var loadedChildren = loadChildren();
                    /** @type {?} */
                    var loadedChildren$ = (loadedChildren instanceof Observable) ? loadedChildren : from(Promise.resolve(loadedChildren));
                    return loadedChildren$.pipe(map((/**
                     * @param {?} lazyModule
                     * @return {?}
                     */
                    function (lazyModule) {
                        var _a, _b, _c;
                        if (lazyModule instanceof NgModuleFactory) {
                            // AOT create an injector
                            /** @type {?} */
                            var moduleRef = lazyModule.create(injector);
                            // INVESTIGATE is this the right way to get at the matching route?
                            /** @type {?} */
                            var routes = moduleRef.injector.get(ROUTES);
                            /** @type {?} */
                            var component_1 = routes[0][0].component;
                            try {
                                /** @type {?} */
                                var componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory((/** @type {?} */ (component_1)));
                                return __assign(__assign({}, params), (_a = {}, _a[SCREEN_CLASS_KEY] = componentFactory.selector, _a));
                            }
                            catch (_) {
                                return __assign(__assign({}, params), (_b = {}, _b[SCREEN_CLASS_KEY] = DEFAULT_SCREEN_CLASS, _b));
                            }
                        }
                        else {
                            // JIT look at the annotations
                            // INVESTIGATE are there public APIs for this stuff?
                            /** @type {?} */
                            var declarations = [].concat.apply([], (lazyModule[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) { return f.declarations; })));
                            /** @type {?} */
                            var selectors = [].concat.apply([], declarations.map((/**
                             * @param {?} c
                             * @return {?}
                             */
                            function (c) { return (c[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) { return f.selector; })); })));
                            // should I just be grabbing the selector like this or should i match against the route component?
                            //   const routerModule = lazyModule.ngInjectorDef.imports.find(i => i.ngModule && ....);
                            //   const route = routerModule.providers[0].find(p => p.provide == ROUTES).useValue[0];
                            return __assign(__assign({}, params), (_c = {}, _c[SCREEN_CLASS_KEY] = selectors[0] || DEFAULT_SCREEN_CLASS, _c));
                        }
                    })));
                }
                else {
                    return of(__assign(__assign({}, params), (_f = {}, _f[SCREEN_CLASS_KEY] = DEFAULT_SCREEN_CLASS, _f)));
                }
            })), map((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                var _a;
                return (__assign((_a = {}, _a[FIREBASE_SCREEN_CLASS_KEY] = params[SCREEN_CLASS_KEY], _a[FIREBASE_SCREEN_INSTANCE_ID_KEY] = getScreenInstanceID(params), _a), params));
            })), tap((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                var _a, _b;
                // TODO perhaps I can be smarter about this, bubble events up to the nearest outlet?
                if (params[OUTLET_KEY] == NG_PRIMARY_OUTLET) {
                    analytics.setCurrentScreen(params[SCREEN_NAME_KEY]);
                    analytics.updateConfig((_a = {},
                        _a[PAGE_PATH_KEY] = params[PAGE_PATH_KEY],
                        _a[SCREEN_CLASS_KEY] = params[SCREEN_CLASS_KEY],
                        _a));
                    if (title) {
                        analytics.updateConfig((_b = {}, _b[PAGE_TITLE_KEY] = params[PAGE_TITLE_KEY], _b));
                    }
                }
            })), groupBy((/**
             * @param {?} params
             * @return {?}
             */
            function (params) { return params[OUTLET_KEY]; })), mergeMap((/**
             * @param {?} group
             * @return {?}
             */
            function (group) { return group.pipe(startWith(undefined), pairwise()); })), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b;
                var _c = __read(_a, 2), prior = _c[0], current = _c[1];
                return prior ? __assign((_b = {}, _b[FIREBASE_PREVIOUS_SCREEN_CLASS_KEY] = prior[SCREEN_CLASS_KEY], _b[FIREBASE_PREVIOUS_SCREEN_NAME_KEY] = prior[SCREEN_NAME_KEY], _b[FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY] = prior[FIREBASE_SCREEN_INSTANCE_ID_KEY], _b), (/** @type {?} */ (current))) : (/** @type {?} */ (current));
            })), tap((/**
             * @param {?} params
             * @return {?}
             */
            function (params) { return debugModeEnabled && console.info(SCREEN_VIEW_EVENT, params); })), tap((/**
             * @param {?} params
             * @return {?}
             */
            function (params) { return zone.runOutsideAngular((/**
             * @return {?}
             */
            function () { return analytics.logEvent(SCREEN_VIEW_EVENT, params); })); }))).subscribe();
        }));
    }
    /**
     * @return {?}
     */
    ScreenTrackingService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    };
    ScreenTrackingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    ScreenTrackingService.ctorParameters = function () { return [
        { type: AngularFireAnalytics },
        { type: Router, decorators: [{ type: Optional }] },
        { type: Title, decorators: [{ type: Optional }] },
        { type: ComponentFactoryResolver },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
        { type: NgZone },
        { type: Injector }
    ]; };
    /** @nocollapse */ ScreenTrackingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScreenTrackingService_Factory() { return new ScreenTrackingService(i0.ɵɵinject(i1.AngularFireAnalytics), i0.ɵɵinject(i2.Router, 8), i0.ɵɵinject(i3.Title, 8), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i1.DEBUG_MODE, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.INJECTOR)); }, token: ScreenTrackingService, providedIn: "any" });
    return ScreenTrackingService;
}());
export { ScreenTrackingService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScreenTrackingService.prototype.disposable;
}
var UserTrackingService = /** @class */ (function () {
    // TODO a user properties injector
    function UserTrackingService(analytics, zone, platformId) {
        var _this = this;
        /** @type {?} */
        var schedulers = new ɵAngularFireSchedulers(zone);
        if (!isPlatformServer(platformId)) {
            zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                // @ts-ignore zap the import in the UMD
                _this.disposable = from(import('firebase/auth')).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
                 * @return {?}
                 */
                function () { return analytics.app; })), map((/**
                 * @param {?} app
                 * @return {?}
                 */
                function (app) { return app.auth(); })), switchMap((/**
                 * @param {?} auth
                 * @return {?}
                 */
                function (auth) { return new Observable(auth.onAuthStateChanged.bind(auth)); })), switchMap((/**
                 * @param {?} user
                 * @return {?}
                 */
                function (user) { return analytics.setUserId(user ? user.uid : (/** @type {?} */ (null))); }))).subscribe();
            }));
        }
    }
    /**
     * @return {?}
     */
    UserTrackingService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    };
    UserTrackingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    UserTrackingService.ctorParameters = function () { return [
        { type: AngularFireAnalytics },
        { type: NgZone },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ UserTrackingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UserTrackingService_Factory() { return new UserTrackingService(i0.ɵɵinject(i1.AngularFireAnalytics), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: UserTrackingService, providedIn: "any" });
    return UserTrackingService;
}());
export { UserTrackingService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserTrackingService.prototype.disposable;
}
// this is an INT64 in iOS/Android but use INT32 cause javascript
/** @type {?} */
var nextScreenInstanceID = Math.floor(Math.random() * (Math.pow(2, 32) - 1)) - Math.pow(2, 31);
/** @type {?} */
var knownScreenInstanceIDs = {};
/** @type {?} */
var getScreenInstanceID = (/**
 * @param {?} params
 * @return {?}
 */
function (params) {
    // unique the screen class against the outlet name
    /** @type {?} */
    var screenInstanceKey = [
        params[SCREEN_CLASS_KEY],
        params[OUTLET_KEY]
    ].join(SCREEN_INSTANCE_DELIMITER);
    if (knownScreenInstanceIDs.hasOwnProperty(screenInstanceKey)) {
        return knownScreenInstanceIDs[screenInstanceKey];
    }
    else {
        /** @type {?} */
        var ret = nextScreenInstanceID++;
        knownScreenInstanceIDs[screenInstanceKey] = ret;
        return ret;
    }
});
var ɵ0 = getScreenInstanceID;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2FuYWx5dGljcy8iLCJzb3VyY2VzIjpbImFuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFhLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSixPQUFPLEVBQWdCLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoSSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7SUFFaEUseUJBQXlCLEdBQUcsdUJBQXVCOztJQUNuRCxrQ0FBa0MsR0FBRyx5QkFBeUI7O0lBQzlELHdDQUF3QyxHQUFJLHNCQUFzQjs7SUFDbEUsaUNBQWlDLEdBQUcsMEJBQTBCOztJQUM5RCx5QkFBeUIsR0FBRyx1QkFBdUI7O0lBQ25ELCtCQUErQixHQUFHLG9CQUFvQjs7SUFDdEQsd0JBQXdC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LE9BQU8sc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUNwRDtTQUFNOztZQUNHLEdBQUcsR0FBRyxvQkFBb0IsRUFBRTtRQUNsQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIE5nWm9uZSwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdCwgUExBVEZPUk1fSUQsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgd2l0aExhdGVzdEZyb20sIHN3aXRjaE1hcCwgbWFwLCB0YXAsIHBhaXJ3aXNlLCBzdGFydFdpdGgsIGdyb3VwQnksIG1lcmdlTWFwLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIEFjdGl2YXRpb25FbmQsIFJPVVRFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVBbmFseXRpY3MsIERFQlVHX01PREUgfSBmcm9tICcuL2FuYWx5dGljcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IEZJUkVCQVNFX0VWRU5UX09SSUdJTl9LRVkgPSAnZmlyZWJhc2VfZXZlbnRfb3JpZ2luJztcbmNvbnN0IEZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9DTEFTU19LRVkgPSAnZmlyZWJhc2VfcHJldmlvdXNfY2xhc3MnO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0lOU1RBTkNFX0lEX0tFWSAgPSAnZmlyZWJhc2VfcHJldmlvdXNfaWQnO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZID0gJ2ZpcmViYXNlX3ByZXZpb3VzX3NjcmVlbic7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fQ0xBU1NfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9jbGFzcyc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9pZCc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fTkFNRV9LRVkgPSAnZmlyZWJhc2Vfc2NyZWVuJztcbmNvbnN0IE9VVExFVF9LRVkgPSAnb3V0bGV0JztcbmNvbnN0IFBBR0VfUEFUSF9LRVkgPSAncGFnZV9wYXRoJztcbmNvbnN0IFBBR0VfVElUTEVfS0VZID0gJ3BhZ2VfdGl0bGUnO1xuY29uc3QgU0NSRUVOX0NMQVNTX0tFWSA9ICdzY3JlZW5fY2xhc3MnO1xuY29uc3QgU0NSRUVOX05BTUVfS0VZID0gJ3NjcmVlbl9uYW1lJztcblxuY29uc3QgU0NSRUVOX1ZJRVdfRVZFTlQgPSAnc2NyZWVuX3ZpZXcnO1xuY29uc3QgRVZFTlRfT1JJR0lOX0FVVE8gPSAnYXV0byc7XG5jb25zdCBERUZBVUxUX1NDUkVFTl9DTEFTUyA9ICc/Pz8nO1xuY29uc3QgTkdfUFJJTUFSWV9PVVRMRVQgPSAncHJpbWFyeSc7XG5jb25zdCBTQ1JFRU5fSU5TVEFOQ0VfREVMSU1JVEVSID0gJyMnO1xuXG5jb25zdCBBTk5PVEFUSU9OUyA9ICdfX2Fubm90YXRpb25zX18nO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgZGlzcG9zYWJsZTogU3Vic2NyaXB0aW9ufHVuZGVmaW5lZDtcbiAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgICAgQE9wdGlvbmFsKCkgcm91dGVyOlJvdXRlcixcbiAgICAgIEBPcHRpb25hbCgpIHRpdGxlOlRpdGxlLFxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOk9iamVjdCxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREVCVUdfTU9ERSkgZGVidWdNb2RlRW5hYmxlZDpib29sZWFufG51bGwsXG4gICAgICB6b25lOiBOZ1pvbmUsXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHtcbiAgICAgICAgaWYgKCFyb3V0ZXIgfHwgIWlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7IHJldHVybiB0aGlzIH1cbiAgICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmF0aW9uRW5kRXZlbnRzID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcjxBY3RpdmF0aW9uRW5kPihlID0+IGUgaW5zdGFuY2VvZiBBY3RpdmF0aW9uRW5kKSk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRW5kRXZlbnRzID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcjxOYXZpZ2F0aW9uRW5kPihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGUgPSBuYXZpZ2F0aW9uRW5kRXZlbnRzLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20oYWN0aXZhdGlvbkVuZEV2ZW50cyksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChbbmF2aWdhdGlvbkVuZCwgYWN0aXZhdGlvbkVuZF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU0VNVkVSOiBzdGFydCB1c2luZyBvcHRpb25hbCBjaGFpbnMgYW5kIG51bGxpc2ggY29hbGVzY2luZyBvbmNlIHdlIHN1cHBvcnQgbmV3ZXIgdHlwZXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlX3BhdGggPSBuYXZpZ2F0aW9uRW5kLnVybDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NyZWVuX25hbWUgPSBhY3RpdmF0aW9uRW5kLnNuYXBzaG90LnJvdXRlQ29uZmlnICYmIGFjdGl2YXRpb25FbmQuc25hcHNob3Qucm91dGVDb25maWcucGF0aCB8fCBwYWdlX3BhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtTQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5fbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtQQUdFX1BBVEhfS0VZXTogcGFnZV9wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX0VWRU5UX09SSUdJTl9LRVldOiBFVkVOVF9PUklHSU5fQVVUTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtGSVJFQkFTRV9TQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5fbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtPVVRMRVRfS0VZXTogYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbUEFHRV9USVRMRV9LRVldID0gdGl0bGUuZ2V0VGl0bGUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGFjdGl2YXRpb25FbmQuc25hcHNob3QuY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3V0ZUNvbmZpZyA9IGFjdGl2YXRpb25FbmQuc25hcHNob3Qucm91dGVDb25maWc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRDaGlsZHJlbiA9IHJvdXRlQ29uZmlnICYmIHJvdXRlQ29uZmlnLmxvYWRDaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBmaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgbWluaWZpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbG9hZENoaWxkcmVuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTRU1WRVI6IHRoaXMgaXMgdGhlIG9sZGVyIGxhenkgbG9hZCBzdHlsZSBcIi4vcGF0aCNDbGFzc05hbWVcIiwgZHJvcCB0aGlzIHdoZW4gd2UgZHJvcCBvbGQgbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gaXMgaXQgd29ydGggc2VlaW5nIGlmIEkgY2FuIGxvb2sgdXAgdGhlIGNvbXBvbmVudCBmYWN0b3J5IHNlbGVjdG9yIGZyb20gdGhlIG1vZHVsZSBuYW1lP1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBsYXp5IHNvIGl0J3Mgbm90IHJlZ2lzdGVyZWQgd2l0aCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgeWV0Li4uIHNlZW1zIGEgcGFpbiBmb3IgYSBkZXByZWNpYXRlZCBzdHlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogbG9hZENoaWxkcmVuLnNwbGl0KCcjJylbMV19KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50RmFjdG9yeS5zZWxlY3RvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2FkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZENoaWxkcmVuID0gbG9hZENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZGVkQ2hpbGRyZW4kOiBPYnNlcnZhYmxlPGFueT4gPSAobG9hZGVkQ2hpbGRyZW4gaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSA/IGxvYWRlZENoaWxkcmVuIDogZnJvbShQcm9taXNlLnJlc29sdmUobG9hZGVkQ2hpbGRyZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZWRDaGlsZHJlbiQucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKGxhenlNb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXp5TW9kdWxlIGluc3RhbmNlb2YgTmdNb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBT1QgY3JlYXRlIGFuIGluamVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2R1bGVSZWYgPSBsYXp5TW9kdWxlLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJTlZFU1RJR0FURSBpcyB0aGlzIHRoZSByaWdodCB3YXkgdG8gZ2V0IGF0IHRoZSBtYXRjaGluZyByb3V0ZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlcyA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoUk9VVEVTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHJvdXRlc1swXVswXS5jb21wb25lbnQ7IC8vIHNob3VsZCBpIGp1c3QgYmUgZ3JhYmJpbmcgMC0wIGhlcmU/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gbW9kdWxlUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50RmFjdG9yeS5zZWxlY3Rvcn07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKF8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogREVGQVVMVF9TQ1JFRU5fQ0xBU1N9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBKSVQgbG9vayBhdCB0aGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElOVkVTVElHQVRFIGFyZSB0aGVyZSBwdWJsaWMgQVBJcyBmb3IgdGhpcyBzdHVmZj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdLmNvbmNhdC5hcHBseShbXSwgKGxhenlNb2R1bGVbQU5OT1RBVElPTlNdIHx8IFtdKS5tYXAoKGY6YW55KSA9PiBmLmRlY2xhcmF0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gW10uY29uY2F0LmFwcGx5KFtdLCBkZWNsYXJhdGlvbnMubWFwKChjOmFueSkgPT4gKGNbQU5OT1RBVElPTlNdIHx8IFtdKS5tYXAoKGY6YW55KSA9PiBmLnNlbGVjdG9yKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIEkganVzdCBiZSBncmFiYmluZyB0aGUgc2VsZWN0b3IgbGlrZSB0aGlzIG9yIHNob3VsZCBpIG1hdGNoIGFnYWluc3QgdGhlIHJvdXRlIGNvbXBvbmVudD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3Qgcm91dGVyTW9kdWxlID0gbGF6eU1vZHVsZS5uZ0luamVjdG9yRGVmLmltcG9ydHMuZmluZChpID0+IGkubmdNb2R1bGUgJiYgLi4uLik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHJvdXRlID0gcm91dGVyTW9kdWxlLnByb3ZpZGVyc1swXS5maW5kKHAgPT4gcC5wcm92aWRlID09IFJPVVRFUykudXNlVmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gey4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBzZWxlY3RvcnNbMF0gfHwgREVGQVVMVF9TQ1JFRU5fQ0xBU1N9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yoey4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBERUZBVUxUX1NDUkVFTl9DTEFTU30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKHBhcmFtcyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfU0NSRUVOX0NMQVNTX0tFWV06IHBhcmFtc1tTQ1JFRU5fQ0xBU1NfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBnZXRTY3JlZW5JbnN0YW5jZUlEKHBhcmFtcyksXG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtc1xuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICB0YXAocGFyYW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBwZXJoYXBzIEkgY2FuIGJlIHNtYXJ0ZXIgYWJvdXQgdGhpcywgYnViYmxlIGV2ZW50cyB1cCB0byB0aGUgbmVhcmVzdCBvdXRsZXQ/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNbT1VUTEVUX0tFWV0gPT0gTkdfUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy5zZXRDdXJyZW50U2NyZWVuKHBhcmFtc1tTQ1JFRU5fTkFNRV9LRVldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtQQUdFX1BBVEhfS0VZXTogcGFyYW1zW1BBR0VfUEFUSF9LRVldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtTQ1JFRU5fQ0xBU1NfS0VZXTogcGFyYW1zW1NDUkVFTl9DTEFTU19LRVldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoeyBbUEFHRV9USVRMRV9LRVldOiBwYXJhbXNbUEFHRV9USVRMRV9LRVldIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBncm91cEJ5KHBhcmFtcyA9PiBwYXJhbXNbT1VUTEVUX0tFWV0pLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKGdyb3VwID0+IGdyb3VwLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCksIHBhaXJ3aXNlKCkpKSxcbiAgICAgICAgICAgICAgICBtYXAoKFtwcmlvciwgY3VycmVudF0pID0+IHByaW9yID8ge1xuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0NMQVNTX0tFWV06IHByaW9yW1NDUkVFTl9DTEFTU19LRVldLFxuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZXTogcHJpb3JbU0NSRUVOX05BTUVfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBwcmlvcltGSVJFQkFTRV9TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgLi4uY3VycmVudCFcbiAgICAgICAgICAgICAgICB9IDogY3VycmVudCEpLFxuICAgICAgICAgICAgICAgIHRhcChwYXJhbXMgPT4gZGVidWdNb2RlRW5hYmxlZCAmJiBjb25zb2xlLmluZm8oU0NSRUVOX1ZJRVdfRVZFTlQsIHBhcmFtcykpLFxuICAgICAgICAgICAgICAgIHRhcChwYXJhbXMgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBhbmFseXRpY3MubG9nRXZlbnQoU0NSRUVOX1ZJRVdfRVZFTlQsIHBhcmFtcykpKVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG4gIFxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclRyYWNraW5nU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIGRpc3Bvc2FibGU6IFN1YnNjcmlwdGlvbnx1bmRlZmluZWQ7XG5cbiAgICAvLyBUT0RPIGEgdXNlciBwcm9wZXJ0aWVzIGluamVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFuYWx5dGljczogQW5ndWxhckZpcmVBbmFseXRpY3MsXG4gICAgICAgIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDpPYmplY3RcbiAgICApIHtcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVycyA9IG5ldyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyh6b25lKTtcblxuICAgICAgICBpZiAoIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgemFwIHRoZSBpbXBvcnQgaW4gdGhlIFVNRFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZSA9IGZyb20oaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGFuYWx5dGljcy5hcHApLFxuICAgICAgICAgICAgICAgICAgICBtYXAoYXBwID0+IGFwcC5hdXRoKCkpLFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoYXV0aCA9PiBuZXcgT2JzZXJ2YWJsZTxVc2VyfG51bGw+KGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkLmJpbmQoYXV0aCkpKSxcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHVzZXIgPT4gYW5hbHl0aWNzLnNldFVzZXJJZCh1c2VyID8gdXNlci51aWQgOiBudWxsISkpXG4gICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG59XG5cbi8vIHRoaXMgaXMgYW4gSU5UNjQgaW4gaU9TL0FuZHJvaWQgYnV0IHVzZSBJTlQzMiBjYXVzZSBqYXZhc2NyaXB0XG5sZXQgbmV4dFNjcmVlbkluc3RhbmNlSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMioqMzIgLSAxKSkgLSAyKiozMTtcblxuY29uc3Qga25vd25TY3JlZW5JbnN0YW5jZUlEczoge1trZXk6c3RyaW5nXTogbnVtYmVyfSA9IHt9O1xuXG5jb25zdCBnZXRTY3JlZW5JbnN0YW5jZUlEID0gKHBhcmFtczp7W2tleTpzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgLy8gdW5pcXVlIHRoZSBzY3JlZW4gY2xhc3MgYWdhaW5zdCB0aGUgb3V0bGV0IG5hbWVcbiAgICBjb25zdCBzY3JlZW5JbnN0YW5jZUtleSA9IFtcbiAgICAgICAgcGFyYW1zW1NDUkVFTl9DTEFTU19LRVldLFxuICAgICAgICBwYXJhbXNbT1VUTEVUX0tFWV1cbiAgICBdLmpvaW4oU0NSRUVOX0lOU1RBTkNFX0RFTElNSVRFUik7XG4gICAgaWYgKGtub3duU2NyZWVuSW5zdGFuY2VJRHMuaGFzT3duUHJvcGVydHkoc2NyZWVuSW5zdGFuY2VLZXkpKSB7XG4gICAgICAgIHJldHVybiBrbm93blNjcmVlbkluc3RhbmNlSURzW3NjcmVlbkluc3RhbmNlS2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXQgPSBuZXh0U2NyZWVuSW5zdGFuY2VJRCsrO1xuICAgICAgICBrbm93blNjcmVlbkluc3RhbmNlSURzW3NjcmVlbkluc3RhbmNlS2V5XSA9IHJldDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG59Il19