/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const FIREBASE_EVENT_ORIGIN_KEY = 'firebase_event_origin';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = 'firebase_previous_class';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = 'firebase_previous_id';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_NAME_KEY = 'firebase_previous_screen';
/** @type {?} */
const FIREBASE_SCREEN_CLASS_KEY = 'firebase_screen_class';
/** @type {?} */
const FIREBASE_SCREEN_INSTANCE_ID_KEY = 'firebase_screen_id';
/** @type {?} */
const FIREBASE_SCREEN_NAME_KEY = 'firebase_screen';
/** @type {?} */
const OUTLET_KEY = 'outlet';
/** @type {?} */
const PAGE_PATH_KEY = 'page_path';
/** @type {?} */
const PAGE_TITLE_KEY = 'page_title';
/** @type {?} */
const SCREEN_CLASS_KEY = 'screen_class';
/** @type {?} */
const SCREEN_NAME_KEY = 'screen_name';
/** @type {?} */
const SCREEN_VIEW_EVENT = 'screen_view';
/** @type {?} */
const EVENT_ORIGIN_AUTO = 'auto';
/** @type {?} */
const DEFAULT_SCREEN_CLASS = '???';
/** @type {?} */
const NG_PRIMARY_OUTLET = 'primary';
/** @type {?} */
const SCREEN_INSTANCE_DELIMITER = '#';
/** @type {?} */
const ANNOTATIONS = '__annotations__';
export class ScreenTrackingService {
    /**
     * @param {?} analytics
     * @param {?} router
     * @param {?} title
     * @param {?} componentFactoryResolver
     * @param {?} platformId
     * @param {?} debugModeEnabled
     * @param {?} zone
     * @param {?} injector
     */
    constructor(analytics, router, title, componentFactoryResolver, platformId, debugModeEnabled, zone, injector) {
        if (!router || !isPlatformBrowser(platformId)) {
            return this;
        }
        zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const activationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e instanceof ActivationEnd)));
            /** @type {?} */
            const navigationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e instanceof NavigationEnd)));
            this.disposable = navigationEndEvents.pipe(withLatestFrom(activationEndEvents), switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            ([navigationEnd, activationEnd]) => {
                // SEMVER: start using optional chains and nullish coalescing once we support newer typescript
                /** @type {?} */
                const page_path = navigationEnd.url;
                /** @type {?} */
                const screen_name = activationEnd.snapshot.routeConfig && activationEnd.snapshot.routeConfig.path || page_path;
                /** @type {?} */
                const params = {
                    [SCREEN_NAME_KEY]: screen_name,
                    [PAGE_PATH_KEY]: page_path,
                    [FIREBASE_EVENT_ORIGIN_KEY]: EVENT_ORIGIN_AUTO,
                    [FIREBASE_SCREEN_NAME_KEY]: screen_name,
                    [OUTLET_KEY]: activationEnd.snapshot.outlet
                };
                if (title) {
                    params[PAGE_TITLE_KEY] = title.getTitle();
                }
                /** @type {?} */
                const component = activationEnd.snapshot.component;
                /** @type {?} */
                const routeConfig = activationEnd.snapshot.routeConfig;
                /** @type {?} */
                const loadChildren = routeConfig && routeConfig.loadChildren;
                // TODO figure out how to handle minification
                if (typeof loadChildren === "string") {
                    // SEMVER: this is the older lazy load style "./path#ClassName", drop this when we drop old ng
                    // TODO is it worth seeing if I can look up the component factory selector from the module name?
                    // it's lazy so it's not registered with componentFactoryResolver yet... seems a pain for a depreciated style
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: loadChildren.split('#')[1] }));
                }
                else if (typeof component === 'string') {
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: component }));
                }
                else if (component) {
                    /** @type {?} */
                    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: componentFactory.selector }));
                }
                else if (loadChildren) {
                    /** @type {?} */
                    const loadedChildren = loadChildren();
                    /** @type {?} */
                    var loadedChildren$ = (loadedChildren instanceof Observable) ? loadedChildren : from(Promise.resolve(loadedChildren));
                    return loadedChildren$.pipe(map((/**
                     * @param {?} lazyModule
                     * @return {?}
                     */
                    lazyModule => {
                        if (lazyModule instanceof NgModuleFactory) {
                            // AOT create an injector
                            /** @type {?} */
                            const moduleRef = lazyModule.create(injector);
                            // INVESTIGATE is this the right way to get at the matching route?
                            /** @type {?} */
                            const routes = moduleRef.injector.get(ROUTES);
                            /** @type {?} */
                            const component = routes[0][0].component;
                            try {
                                /** @type {?} */
                                const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory((/** @type {?} */ (component)));
                                return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: componentFactory.selector });
                            }
                            catch (_) {
                                return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: DEFAULT_SCREEN_CLASS });
                            }
                        }
                        else {
                            // JIT look at the annotations
                            // INVESTIGATE are there public APIs for this stuff?
                            /** @type {?} */
                            const declarations = [].concat.apply([], (lazyModule[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            (f) => f.declarations)));
                            /** @type {?} */
                            const selectors = [].concat.apply([], declarations.map((/**
                             * @param {?} c
                             * @return {?}
                             */
                            (c) => (c[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            (f) => f.selector)))));
                            // should I just be grabbing the selector like this or should i match against the route component?
                            //   const routerModule = lazyModule.ngInjectorDef.imports.find(i => i.ngModule && ....);
                            //   const route = routerModule.providers[0].find(p => p.provide == ROUTES).useValue[0];
                            return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: selectors[0] || DEFAULT_SCREEN_CLASS });
                        }
                    })));
                }
                else {
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: DEFAULT_SCREEN_CLASS }));
                }
            })), map((/**
             * @param {?} params
             * @return {?}
             */
            params => (Object.assign({ [FIREBASE_SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY], [FIREBASE_SCREEN_INSTANCE_ID_KEY]: getScreenInstanceID(params) }, params)))), tap((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                // TODO perhaps I can be smarter about this, bubble events up to the nearest outlet?
                if (params[OUTLET_KEY] == NG_PRIMARY_OUTLET) {
                    analytics.setCurrentScreen(params[SCREEN_NAME_KEY]);
                    analytics.updateConfig({
                        [PAGE_PATH_KEY]: params[PAGE_PATH_KEY],
                        [SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY]
                    });
                    if (title) {
                        analytics.updateConfig({ [PAGE_TITLE_KEY]: params[PAGE_TITLE_KEY] });
                    }
                }
            })), groupBy((/**
             * @param {?} params
             * @return {?}
             */
            params => params[OUTLET_KEY])), mergeMap((/**
             * @param {?} group
             * @return {?}
             */
            group => group.pipe(startWith(undefined), pairwise()))), map((/**
             * @param {?} __0
             * @return {?}
             */
            ([prior, current]) => prior ? Object.assign({ [FIREBASE_PREVIOUS_SCREEN_CLASS_KEY]: prior[SCREEN_CLASS_KEY], [FIREBASE_PREVIOUS_SCREEN_NAME_KEY]: prior[SCREEN_NAME_KEY], [FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY]: prior[FIREBASE_SCREEN_INSTANCE_ID_KEY] }, (/** @type {?} */ (current))) : (/** @type {?} */ (current)))), tap((/**
             * @param {?} params
             * @return {?}
             */
            params => debugModeEnabled && console.info(SCREEN_VIEW_EVENT, params))), tap((/**
             * @param {?} params
             * @return {?}
             */
            params => zone.runOutsideAngular((/**
             * @return {?}
             */
            () => analytics.logEvent(SCREEN_VIEW_EVENT, params)))))).subscribe();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
ScreenTrackingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
ScreenTrackingService.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: Router, decorators: [{ type: Optional }] },
    { type: Title, decorators: [{ type: Optional }] },
    { type: ComponentFactoryResolver },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
    { type: NgZone },
    { type: Injector }
];
/** @nocollapse */ ScreenTrackingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScreenTrackingService_Factory() { return new ScreenTrackingService(i0.ɵɵinject(i1.AngularFireAnalytics), i0.ɵɵinject(i2.Router, 8), i0.ɵɵinject(i3.Title, 8), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i1.DEBUG_MODE, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.INJECTOR)); }, token: ScreenTrackingService, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScreenTrackingService.prototype.disposable;
}
export class UserTrackingService {
    // TODO a user properties injector
    /**
     * @param {?} analytics
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(analytics, zone, platformId) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        if (!isPlatformServer(platformId)) {
            zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                // @ts-ignore zap the import in the UMD
                this.disposable = from(import('firebase/auth')).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
                 * @return {?}
                 */
                () => analytics.app)), map((/**
                 * @param {?} app
                 * @return {?}
                 */
                app => app.auth())), switchMap((/**
                 * @param {?} auth
                 * @return {?}
                 */
                auth => new Observable(auth.onAuthStateChanged.bind(auth)))), switchMap((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => analytics.setUserId(user ? user.uid : (/** @type {?} */ (null)))))).subscribe();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
UserTrackingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
UserTrackingService.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ UserTrackingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UserTrackingService_Factory() { return new UserTrackingService(i0.ɵɵinject(i1.AngularFireAnalytics), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: UserTrackingService, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserTrackingService.prototype.disposable;
}
// this is an INT64 in iOS/Android but use INT32 cause javascript
/** @type {?} */
let nextScreenInstanceID = Math.floor(Math.random() * (Math.pow(2, 32) - 1)) - Math.pow(2, 31);
/** @type {?} */
const knownScreenInstanceIDs = {};
/** @type {?} */
const getScreenInstanceID = (/**
 * @param {?} params
 * @return {?}
 */
(params) => {
    // unique the screen class against the outlet name
    /** @type {?} */
    const screenInstanceKey = [
        params[SCREEN_CLASS_KEY],
        params[OUTLET_KEY]
    ].join(SCREEN_INSTANCE_DELIMITER);
    if (knownScreenInstanceIDs.hasOwnProperty(screenInstanceKey)) {
        return knownScreenInstanceIDs[screenInstanceKey];
    }
    else {
        /** @type {?} */
        const ret = nextScreenInstanceID++;
        knownScreenInstanceIDs[screenInstanceKey] = ret;
        return ret;
    }
});
const ɵ0 = getScreenInstanceID;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2FuYWx5dGljcy8iLCJzb3VyY2VzIjpbImFuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWEsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xKLE9BQU8sRUFBZ0IsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hJLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztNQUVoRSx5QkFBeUIsR0FBRyx1QkFBdUI7O01BQ25ELGtDQUFrQyxHQUFHLHlCQUF5Qjs7TUFDOUQsd0NBQXdDLEdBQUksc0JBQXNCOztNQUNsRSxpQ0FBaUMsR0FBRywwQkFBMEI7O01BQzlELHlCQUF5QixHQUFHLHVCQUF1Qjs7TUFDbkQsK0JBQStCLEdBQUcsb0JBQW9COztNQUN0RCx3QkFBd0Is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QUcsR0FBRyxvQkFBb0IsRUFBRTtRQUNsQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIE5nWm9uZSwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdCwgUExBVEZPUk1fSUQsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgd2l0aExhdGVzdEZyb20sIHN3aXRjaE1hcCwgbWFwLCB0YXAsIHBhaXJ3aXNlLCBzdGFydFdpdGgsIGdyb3VwQnksIG1lcmdlTWFwLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIEFjdGl2YXRpb25FbmQsIFJPVVRFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVBbmFseXRpY3MsIERFQlVHX01PREUgfSBmcm9tICcuL2FuYWx5dGljcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IEZJUkVCQVNFX0VWRU5UX09SSUdJTl9LRVkgPSAnZmlyZWJhc2VfZXZlbnRfb3JpZ2luJztcbmNvbnN0IEZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9DTEFTU19LRVkgPSAnZmlyZWJhc2VfcHJldmlvdXNfY2xhc3MnO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0lOU1RBTkNFX0lEX0tFWSAgPSAnZmlyZWJhc2VfcHJldmlvdXNfaWQnO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZID0gJ2ZpcmViYXNlX3ByZXZpb3VzX3NjcmVlbic7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fQ0xBU1NfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9jbGFzcyc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9pZCc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fTkFNRV9LRVkgPSAnZmlyZWJhc2Vfc2NyZWVuJztcbmNvbnN0IE9VVExFVF9LRVkgPSAnb3V0bGV0JztcbmNvbnN0IFBBR0VfUEFUSF9LRVkgPSAncGFnZV9wYXRoJztcbmNvbnN0IFBBR0VfVElUTEVfS0VZID0gJ3BhZ2VfdGl0bGUnO1xuY29uc3QgU0NSRUVOX0NMQVNTX0tFWSA9ICdzY3JlZW5fY2xhc3MnO1xuY29uc3QgU0NSRUVOX05BTUVfS0VZID0gJ3NjcmVlbl9uYW1lJztcblxuY29uc3QgU0NSRUVOX1ZJRVdfRVZFTlQgPSAnc2NyZWVuX3ZpZXcnO1xuY29uc3QgRVZFTlRfT1JJR0lOX0FVVE8gPSAnYXV0byc7XG5jb25zdCBERUZBVUxUX1NDUkVFTl9DTEFTUyA9ICc/Pz8nO1xuY29uc3QgTkdfUFJJTUFSWV9PVVRMRVQgPSAncHJpbWFyeSc7XG5jb25zdCBTQ1JFRU5fSU5TVEFOQ0VfREVMSU1JVEVSID0gJyMnO1xuXG5jb25zdCBBTk5PVEFUSU9OUyA9ICdfX2Fubm90YXRpb25zX18nO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgZGlzcG9zYWJsZTogU3Vic2NyaXB0aW9ufHVuZGVmaW5lZDtcbiAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgICAgQE9wdGlvbmFsKCkgcm91dGVyOlJvdXRlcixcbiAgICAgIEBPcHRpb25hbCgpIHRpdGxlOlRpdGxlLFxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOk9iamVjdCxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREVCVUdfTU9ERSkgZGVidWdNb2RlRW5hYmxlZDpib29sZWFufG51bGwsXG4gICAgICB6b25lOiBOZ1pvbmUsXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHtcbiAgICAgICAgaWYgKCFyb3V0ZXIgfHwgIWlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7IHJldHVybiB0aGlzIH1cbiAgICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmF0aW9uRW5kRXZlbnRzID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcjxBY3RpdmF0aW9uRW5kPihlID0+IGUgaW5zdGFuY2VvZiBBY3RpdmF0aW9uRW5kKSk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRW5kRXZlbnRzID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcjxOYXZpZ2F0aW9uRW5kPihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGUgPSBuYXZpZ2F0aW9uRW5kRXZlbnRzLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20oYWN0aXZhdGlvbkVuZEV2ZW50cyksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChbbmF2aWdhdGlvbkVuZCwgYWN0aXZhdGlvbkVuZF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU0VNVkVSOiBzdGFydCB1c2luZyBvcHRpb25hbCBjaGFpbnMgYW5kIG51bGxpc2ggY29hbGVzY2luZyBvbmNlIHdlIHN1cHBvcnQgbmV3ZXIgdHlwZXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlX3BhdGggPSBuYXZpZ2F0aW9uRW5kLnVybDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NyZWVuX25hbWUgPSBhY3RpdmF0aW9uRW5kLnNuYXBzaG90LnJvdXRlQ29uZmlnICYmIGFjdGl2YXRpb25FbmQuc25hcHNob3Qucm91dGVDb25maWcucGF0aCB8fCBwYWdlX3BhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtTQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5fbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtQQUdFX1BBVEhfS0VZXTogcGFnZV9wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX0VWRU5UX09SSUdJTl9LRVldOiBFVkVOVF9PUklHSU5fQVVUTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtGSVJFQkFTRV9TQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5fbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtPVVRMRVRfS0VZXTogYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbUEFHRV9USVRMRV9LRVldID0gdGl0bGUuZ2V0VGl0bGUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGFjdGl2YXRpb25FbmQuc25hcHNob3QuY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3V0ZUNvbmZpZyA9IGFjdGl2YXRpb25FbmQuc25hcHNob3Qucm91dGVDb25maWc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRDaGlsZHJlbiA9IHJvdXRlQ29uZmlnICYmIHJvdXRlQ29uZmlnLmxvYWRDaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBmaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgbWluaWZpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbG9hZENoaWxkcmVuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTRU1WRVI6IHRoaXMgaXMgdGhlIG9sZGVyIGxhenkgbG9hZCBzdHlsZSBcIi4vcGF0aCNDbGFzc05hbWVcIiwgZHJvcCB0aGlzIHdoZW4gd2UgZHJvcCBvbGQgbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gaXMgaXQgd29ydGggc2VlaW5nIGlmIEkgY2FuIGxvb2sgdXAgdGhlIGNvbXBvbmVudCBmYWN0b3J5IHNlbGVjdG9yIGZyb20gdGhlIG1vZHVsZSBuYW1lP1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBsYXp5IHNvIGl0J3Mgbm90IHJlZ2lzdGVyZWQgd2l0aCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgeWV0Li4uIHNlZW1zIGEgcGFpbiBmb3IgYSBkZXByZWNpYXRlZCBzdHlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogbG9hZENoaWxkcmVuLnNwbGl0KCcjJylbMV19KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50RmFjdG9yeS5zZWxlY3RvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2FkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZENoaWxkcmVuID0gbG9hZENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZGVkQ2hpbGRyZW4kOiBPYnNlcnZhYmxlPGFueT4gPSAobG9hZGVkQ2hpbGRyZW4gaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSA/IGxvYWRlZENoaWxkcmVuIDogZnJvbShQcm9taXNlLnJlc29sdmUobG9hZGVkQ2hpbGRyZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZWRDaGlsZHJlbiQucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKGxhenlNb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXp5TW9kdWxlIGluc3RhbmNlb2YgTmdNb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBT1QgY3JlYXRlIGFuIGluamVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2R1bGVSZWYgPSBsYXp5TW9kdWxlLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJTlZFU1RJR0FURSBpcyB0aGlzIHRoZSByaWdodCB3YXkgdG8gZ2V0IGF0IHRoZSBtYXRjaGluZyByb3V0ZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlcyA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoUk9VVEVTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHJvdXRlc1swXVswXS5jb21wb25lbnQ7IC8vIHNob3VsZCBpIGp1c3QgYmUgZ3JhYmJpbmcgMC0wIGhlcmU/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gbW9kdWxlUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50RmFjdG9yeS5zZWxlY3Rvcn07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKF8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogREVGQVVMVF9TQ1JFRU5fQ0xBU1N9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBKSVQgbG9vayBhdCB0aGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElOVkVTVElHQVRFIGFyZSB0aGVyZSBwdWJsaWMgQVBJcyBmb3IgdGhpcyBzdHVmZj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdLmNvbmNhdC5hcHBseShbXSwgKGxhenlNb2R1bGVbQU5OT1RBVElPTlNdIHx8IFtdKS5tYXAoKGY6YW55KSA9PiBmLmRlY2xhcmF0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gW10uY29uY2F0LmFwcGx5KFtdLCBkZWNsYXJhdGlvbnMubWFwKChjOmFueSkgPT4gKGNbQU5OT1RBVElPTlNdIHx8IFtdKS5tYXAoKGY6YW55KSA9PiBmLnNlbGVjdG9yKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIEkganVzdCBiZSBncmFiYmluZyB0aGUgc2VsZWN0b3IgbGlrZSB0aGlzIG9yIHNob3VsZCBpIG1hdGNoIGFnYWluc3QgdGhlIHJvdXRlIGNvbXBvbmVudD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3Qgcm91dGVyTW9kdWxlID0gbGF6eU1vZHVsZS5uZ0luamVjdG9yRGVmLmltcG9ydHMuZmluZChpID0+IGkubmdNb2R1bGUgJiYgLi4uLik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHJvdXRlID0gcm91dGVyTW9kdWxlLnByb3ZpZGVyc1swXS5maW5kKHAgPT4gcC5wcm92aWRlID09IFJPVVRFUykudXNlVmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gey4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBzZWxlY3RvcnNbMF0gfHwgREVGQVVMVF9TQ1JFRU5fQ0xBU1N9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yoey4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBERUZBVUxUX1NDUkVFTl9DTEFTU30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKHBhcmFtcyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfU0NSRUVOX0NMQVNTX0tFWV06IHBhcmFtc1tTQ1JFRU5fQ0xBU1NfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBnZXRTY3JlZW5JbnN0YW5jZUlEKHBhcmFtcyksXG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtc1xuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICB0YXAocGFyYW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBwZXJoYXBzIEkgY2FuIGJlIHNtYXJ0ZXIgYWJvdXQgdGhpcywgYnViYmxlIGV2ZW50cyB1cCB0byB0aGUgbmVhcmVzdCBvdXRsZXQ/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNbT1VUTEVUX0tFWV0gPT0gTkdfUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy5zZXRDdXJyZW50U2NyZWVuKHBhcmFtc1tTQ1JFRU5fTkFNRV9LRVldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtQQUdFX1BBVEhfS0VZXTogcGFyYW1zW1BBR0VfUEFUSF9LRVldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtTQ1JFRU5fQ0xBU1NfS0VZXTogcGFyYW1zW1NDUkVFTl9DTEFTU19LRVldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoeyBbUEFHRV9USVRMRV9LRVldOiBwYXJhbXNbUEFHRV9USVRMRV9LRVldIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBncm91cEJ5KHBhcmFtcyA9PiBwYXJhbXNbT1VUTEVUX0tFWV0pLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKGdyb3VwID0+IGdyb3VwLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCksIHBhaXJ3aXNlKCkpKSxcbiAgICAgICAgICAgICAgICBtYXAoKFtwcmlvciwgY3VycmVudF0pID0+IHByaW9yID8ge1xuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0NMQVNTX0tFWV06IHByaW9yW1NDUkVFTl9DTEFTU19LRVldLFxuICAgICAgICAgICAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZXTogcHJpb3JbU0NSRUVOX05BTUVfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgW0ZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBwcmlvcltGSVJFQkFTRV9TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZXSxcbiAgICAgICAgICAgICAgICAgICAgLi4uY3VycmVudCFcbiAgICAgICAgICAgICAgICB9IDogY3VycmVudCEpLFxuICAgICAgICAgICAgICAgIHRhcChwYXJhbXMgPT4gZGVidWdNb2RlRW5hYmxlZCAmJiBjb25zb2xlLmluZm8oU0NSRUVOX1ZJRVdfRVZFTlQsIHBhcmFtcykpLFxuICAgICAgICAgICAgICAgIHRhcChwYXJhbXMgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBhbmFseXRpY3MubG9nRXZlbnQoU0NSRUVOX1ZJRVdfRVZFTlQsIHBhcmFtcykpKVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG4gIFxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclRyYWNraW5nU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIGRpc3Bvc2FibGU6IFN1YnNjcmlwdGlvbnx1bmRlZmluZWQ7XG5cbiAgICAvLyBUT0RPIGEgdXNlciBwcm9wZXJ0aWVzIGluamVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFuYWx5dGljczogQW5ndWxhckZpcmVBbmFseXRpY3MsXG4gICAgICAgIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDpPYmplY3RcbiAgICApIHtcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVycyA9IG5ldyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyh6b25lKTtcblxuICAgICAgICBpZiAoIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgemFwIHRoZSBpbXBvcnQgaW4gdGhlIFVNRFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZSA9IGZyb20oaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGFuYWx5dGljcy5hcHApLFxuICAgICAgICAgICAgICAgICAgICBtYXAoYXBwID0+IGFwcC5hdXRoKCkpLFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoYXV0aCA9PiBuZXcgT2JzZXJ2YWJsZTxVc2VyfG51bGw+KGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkLmJpbmQoYXV0aCkpKSxcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHVzZXIgPT4gYW5hbHl0aWNzLnNldFVzZXJJZCh1c2VyID8gdXNlci51aWQgOiBudWxsISkpXG4gICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG59XG5cbi8vIHRoaXMgaXMgYW4gSU5UNjQgaW4gaU9TL0FuZHJvaWQgYnV0IHVzZSBJTlQzMiBjYXVzZSBqYXZhc2NyaXB0XG5sZXQgbmV4dFNjcmVlbkluc3RhbmNlSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMioqMzIgLSAxKSkgLSAyKiozMTtcblxuY29uc3Qga25vd25TY3JlZW5JbnN0YW5jZUlEczoge1trZXk6c3RyaW5nXTogbnVtYmVyfSA9IHt9O1xuXG5jb25zdCBnZXRTY3JlZW5JbnN0YW5jZUlEID0gKHBhcmFtczp7W2tleTpzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgLy8gdW5pcXVlIHRoZSBzY3JlZW4gY2xhc3MgYWdhaW5zdCB0aGUgb3V0bGV0IG5hbWVcbiAgICBjb25zdCBzY3JlZW5JbnN0YW5jZUtleSA9IFtcbiAgICAgICAgcGFyYW1zW1NDUkVFTl9DTEFTU19LRVldLFxuICAgICAgICBwYXJhbXNbT1VUTEVUX0tFWV1cbiAgICBdLmpvaW4oU0NSRUVOX0lOU1RBTkNFX0RFTElNSVRFUik7XG4gICAgaWYgKGtub3duU2NyZWVuSW5zdGFuY2VJRHMuaGFzT3duUHJvcGVydHkoc2NyZWVuSW5zdGFuY2VLZXkpKSB7XG4gICAgICAgIHJldHVybiBrbm93blNjcmVlbkluc3RhbmNlSURzW3NjcmVlbkluc3RhbmNlS2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXQgPSBuZXh0U2NyZWVuSW5zdGFuY2VJRCsrO1xuICAgICAgICBrbm93blNjcmVlbkluc3RhbmNlSURzW3NjcmVlbkluc3RhbmNlS2V5XSA9IHJldDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG59Il19