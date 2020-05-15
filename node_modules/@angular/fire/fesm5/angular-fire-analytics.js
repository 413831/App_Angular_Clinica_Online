import { __spread, __awaiter, __generator, __assign, __read } from 'tslib';
import { InjectionToken, Injectable, Inject, Optional, PLATFORM_ID, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModuleFactory, ComponentFactoryResolver, Injector, INJECTOR, NgModule } from '@angular/core';
import { of, empty, Observable, from } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { observeOn, switchMap, map, tap, shareReplay, filter, withLatestFrom, groupBy, mergeMap, startWith, pairwise } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import { ActivationEnd, NavigationEnd, ROUTES, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Config() { }
;
/** @type {?} */
var COLLECTION_ENABLED = new InjectionToken('angularfire2.analytics.analyticsCollectionEnabled');
/** @type {?} */
var APP_VERSION = new InjectionToken('angularfire2.analytics.appVersion');
/** @type {?} */
var APP_NAME = new InjectionToken('angularfire2.analytics.appName');
/** @type {?} */
var DEBUG_MODE = new InjectionToken('angularfire2.analytics.debugMode');
/** @type {?} */
var CONFIG = new InjectionToken('angularfire2.analytics.config');
/** @type {?} */
var APP_NAME_KEY = 'app_name';
/** @type {?} */
var APP_VERSION_KEY = 'app_version';
/** @type {?} */
var DEBUG_MODE_KEY = 'debug_mode';
/** @type {?} */
var ANALYTICS_ID_FIELD = 'measurementId';
/** @type {?} */
var GTAG_CONFIG_COMMAND = 'config';
/** @type {?} */
var GTAG_FUNCTION_NAME = 'gtag';
/** @type {?} */
var DATA_LAYER_NAME = 'dataLayer';
// WARNING: interface has both a type and a value, skipping emit
;
/** @type {?} */
var gtag;
/** @type {?} */
var analyticsInitialized;
/** @type {?} */
var analyticsInstanceCache = {};
var AngularFireAnalytics = /** @class */ (function () {
    function AngularFireAnalytics(options, nameOrConfig, analyticsCollectionEnabled, providedAppVersion, providedAppName, debugModeEnabled, providedConfig, platformId, zone) {
        var _a, _b, _c;
        this.options = options;
        if (!analyticsInitialized) {
            if (isPlatformBrowser(platformId)) {
                gtag = window[GTAG_FUNCTION_NAME] || (/**
                 * @return {?}
                 */
                function () { window[DATA_LAYER_NAME].push(arguments); });
                window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];
                analyticsInitialized = zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return new Promise((/**
                     * @param {?} resolve
                     * @return {?}
                     */
                    function (resolve) {
                        window[GTAG_FUNCTION_NAME] = (/**
                         * @param {...?} args
                         * @return {?}
                         */
                        function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (args[0] == 'js') {
                                resolve();
                            }
                            gtag.apply(void 0, __spread(args));
                        });
                    }));
                }));
            }
            else {
                gtag = (/**
                 * @return {?}
                 */
                function () { });
                analyticsInitialized = Promise.resolve();
            }
        }
        /** @type {?} */
        var analytics = analyticsInstanceCache[options[ANALYTICS_ID_FIELD]];
        if (!analytics) {
            analytics = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
             * @return {?}
             */
            function () { return isPlatformBrowser(platformId) ? import('firebase/analytics') : empty(); })), map((/**
             * @return {?}
             */
            function () { return ɵfirebaseAppFactory(options, zone, nameOrConfig); })), map((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return app.analytics(); })), tap((/**
             * @param {?} analytics
             * @return {?}
             */
            function (analytics) {
                if (analyticsCollectionEnabled === false) {
                    analytics.setAnalyticsCollectionEnabled(false);
                }
            })), shareReplay({ bufferSize: 1, refCount: false }));
            analyticsInstanceCache[options[ANALYTICS_ID_FIELD]] = analytics;
        }
        if (providedConfig) {
            this.updateConfig(providedConfig);
        }
        if (providedAppName) {
            this.updateConfig((_a = {}, _a[APP_NAME_KEY] = providedAppName, _a));
        }
        if (providedAppVersion) {
            this.updateConfig((_b = {}, _b[APP_VERSION_KEY] = providedAppVersion, _b));
        }
        if (debugModeEnabled) {
            this.updateConfig((_c = {}, _c[DEBUG_MODE_KEY] = 1, _c));
        }
        return ɵlazySDKProxy(this, analytics, zone);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    AngularFireAnalytics.prototype.updateConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, analyticsInitialized];
                    case 1:
                        _a.sent();
                        gtag(GTAG_CONFIG_COMMAND, this.options[ANALYTICS_ID_FIELD], __assign(__assign({}, config), { update: true }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AngularFireAnalytics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'any'
                },] }
    ];
    /** @nocollapse */
    AngularFireAnalytics.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [COLLECTION_ENABLED,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_VERSION,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_NAME,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONFIG,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ AngularFireAnalytics.ɵprov = ɵɵdefineInjectable({ factory: function AngularFireAnalytics_Factory() { return new AngularFireAnalytics(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(COLLECTION_ENABLED, 8), ɵɵinject(APP_VERSION, 8), ɵɵinject(APP_NAME, 8), ɵɵinject(DEBUG_MODE, 8), ɵɵinject(CONFIG, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone)); }, token: AngularFireAnalytics, providedIn: "any" });
    return AngularFireAnalytics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFireAnalytics.prototype.options;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ ScreenTrackingService.ɵprov = ɵɵdefineInjectable({ factory: function ScreenTrackingService_Factory() { return new ScreenTrackingService(ɵɵinject(AngularFireAnalytics), ɵɵinject(Router, 8), ɵɵinject(Title, 8), ɵɵinject(ComponentFactoryResolver), ɵɵinject(PLATFORM_ID), ɵɵinject(DEBUG_MODE, 8), ɵɵinject(NgZone), ɵɵinject(INJECTOR)); }, token: ScreenTrackingService, providedIn: "any" });
    return ScreenTrackingService;
}());
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
    /** @nocollapse */ UserTrackingService.ɵprov = ɵɵdefineInjectable({ factory: function UserTrackingService_Factory() { return new UserTrackingService(ɵɵinject(AngularFireAnalytics), ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID)); }, token: UserTrackingService, providedIn: "any" });
    return UserTrackingService;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularFireAnalyticsModule = /** @class */ (function () {
    function AngularFireAnalyticsModule(analytics, screenTracking, userTracking) {
        // calling anything on analytics will eagerly load the SDK
        analytics.app;
    }
    AngularFireAnalyticsModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireAnalytics]
                },] }
    ];
    /** @nocollapse */
    AngularFireAnalyticsModule.ctorParameters = function () { return [
        { type: AngularFireAnalytics },
        { type: ScreenTrackingService, decorators: [{ type: Optional }] },
        { type: UserTrackingService, decorators: [{ type: Optional }] }
    ]; };
    return AngularFireAnalyticsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { APP_NAME, APP_VERSION, AngularFireAnalytics, AngularFireAnalyticsModule, COLLECTION_ENABLED, CONFIG, DEBUG_MODE, ScreenTrackingService, UserTrackingService };
//# sourceMappingURL=angular-fire-analytics.js.map
