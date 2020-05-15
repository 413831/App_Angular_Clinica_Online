/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Injectable, Inject, Optional, NgZone, InjectionToken, PLATFORM_ID } from '@angular/core';
import { of, empty } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { map, tap, shareReplay, switchMap, observeOn } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory } from '@angular/fire';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/**
 * @record
 */
export function Config() { }
;
/** @type {?} */
export const COLLECTION_ENABLED = new InjectionToken('angularfire2.analytics.analyticsCollectionEnabled');
/** @type {?} */
export const APP_VERSION = new InjectionToken('angularfire2.analytics.appVersion');
/** @type {?} */
export const APP_NAME = new InjectionToken('angularfire2.analytics.appName');
/** @type {?} */
export const DEBUG_MODE = new InjectionToken('angularfire2.analytics.debugMode');
/** @type {?} */
export const CONFIG = new InjectionToken('angularfire2.analytics.config');
/** @type {?} */
const APP_NAME_KEY = 'app_name';
/** @type {?} */
const APP_VERSION_KEY = 'app_version';
/** @type {?} */
const DEBUG_MODE_KEY = 'debug_mode';
/** @type {?} */
const ANALYTICS_ID_FIELD = 'measurementId';
/** @type {?} */
const GTAG_CONFIG_COMMAND = 'config';
/** @type {?} */
const GTAG_FUNCTION_NAME = 'gtag';
/** @type {?} */
const DATA_LAYER_NAME = 'dataLayer';
// WARNING: interface has both a type and a value, skipping emit
;
/** @type {?} */
let gtag;
/** @type {?} */
let analyticsInitialized;
/** @type {?} */
const analyticsInstanceCache = {};
export class AngularFireAnalytics {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} analyticsCollectionEnabled
     * @param {?} providedAppVersion
     * @param {?} providedAppName
     * @param {?} debugModeEnabled
     * @param {?} providedConfig
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, analyticsCollectionEnabled, providedAppVersion, providedAppName, debugModeEnabled, providedConfig, platformId, zone) {
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
                () => new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                resolve => {
                    window[GTAG_FUNCTION_NAME] = (/**
                     * @param {...?} args
                     * @return {?}
                     */
                    (...args) => {
                        if (args[0] == 'js') {
                            resolve();
                        }
                        gtag(...args);
                    });
                }))));
            }
            else {
                gtag = (/**
                 * @return {?}
                 */
                () => { });
                analyticsInitialized = Promise.resolve();
            }
        }
        /** @type {?} */
        let analytics = analyticsInstanceCache[options[ANALYTICS_ID_FIELD]];
        if (!analytics) {
            analytics = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
             * @return {?}
             */
            () => isPlatformBrowser(platformId) ? import('firebase/analytics') : empty())), map((/**
             * @return {?}
             */
            () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
             * @param {?} app
             * @return {?}
             */
            app => app.analytics())), tap((/**
             * @param {?} analytics
             * @return {?}
             */
            analytics => {
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
            this.updateConfig({ [APP_NAME_KEY]: providedAppName });
        }
        if (providedAppVersion) {
            this.updateConfig({ [APP_VERSION_KEY]: providedAppVersion });
        }
        if (debugModeEnabled) {
            this.updateConfig({ [DEBUG_MODE_KEY]: 1 });
        }
        return ɵlazySDKProxy(this, analytics, zone);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    updateConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield analyticsInitialized;
            gtag(GTAG_CONFIG_COMMAND, this.options[ANALYTICS_ID_FIELD], Object.assign(Object.assign({}, config), { update: true }));
        });
    }
    ;
}
AngularFireAnalytics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireAnalytics.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [COLLECTION_ENABLED,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_VERSION,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONFIG,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAnalytics_Factory() { return new AngularFireAnalytics(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(COLLECTION_ENABLED, 8), i0.ɵɵinject(APP_VERSION, 8), i0.ɵɵinject(APP_NAME, 8), i0.ɵɵinject(DEBUG_MODE, 8), i0.ɵɵinject(CONFIG, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireAnalytics, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFireAnalytics.prototype.options;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9hbmFseXRpY3MvIiwic291cmNlcyI6WyJhbmFseXRpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQXNDLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUduTCw0QkFBMkM7QUFBQSxDQUFDOztBQUU1QyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQVUsbURBQW1ELENBQUM7O0FBQ2xILE1BQU0sT0FBTyxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVMsbUNBQW1DLENBQUM7O0FBQzFGLE1BQU0sT0FBTyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQVMsZ0NBQWdDLENBQUM7O0FBQ3BGLE1BQU0sT0FBTyxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVUsa0NBQWtDLENBQUM7O0FBQ3pGLE1BQU0sT0FBTyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsK0JBQStCLENBQUM7O01BRTNFLFlBQVksR0FBRyxVQUFVOztNQUN6QixlQUFlLEdBQUcsYUFBYTs7TUFDL0IsY0FBYyxHQUFHLFlBQVk7O01BQzdCLGtCQUFrQixHQUFHLGVBQWU7O01BQ3BDLG1CQUFtQixH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b25lLCBJbmplY3Rpb25Ub2tlbiwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mLCBlbXB0eSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgbWFwLCB0YXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAsIG9ic2VydmVPbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpcmViYXNlQXBwQ29uZmlnLCBGaXJlYmFzZU9wdGlvbnMsIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWxhenlTREtQcm94eSwgRklSRUJBU0VfT1BUSU9OUywgRklSRUJBU0VfQVBQX05BTUUsIMm1ZmlyZWJhc2VBcHBGYWN0b3J5LCDJtVByb21pc2VQcm94eSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgYW5hbHl0aWNzIH0gZnJvbSAnZmlyZWJhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7W2tleTpzdHJpbmddOiBhbnl9O1xuXG5leHBvcnQgY29uc3QgQ09MTEVDVElPTl9FTkFCTEVEID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkJyk7XG5leHBvcnQgY29uc3QgQVBQX1ZFUlNJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmFuYWx5dGljcy5hcHBWZXJzaW9uJyk7XG5leHBvcnQgY29uc3QgQVBQX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmFuYWx5dGljcy5hcHBOYW1lJyk7XG5leHBvcnQgY29uc3QgREVCVUdfTU9ERSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignYW5ndWxhcmZpcmUyLmFuYWx5dGljcy5kZWJ1Z01vZGUnKTtcbmV4cG9ydCBjb25zdCBDT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29uZmlnPignYW5ndWxhcmZpcmUyLmFuYWx5dGljcy5jb25maWcnKTtcblxuY29uc3QgQVBQX05BTUVfS0VZID0gJ2FwcF9uYW1lJztcbmNvbnN0IEFQUF9WRVJTSU9OX0tFWSA9ICdhcHBfdmVyc2lvbic7XG5jb25zdCBERUJVR19NT0RFX0tFWSA9ICdkZWJ1Z19tb2RlJztcbmNvbnN0IEFOQUxZVElDU19JRF9GSUVMRCA9ICdtZWFzdXJlbWVudElkJztcbmNvbnN0IEdUQUdfQ09ORklHX0NPTU1BTkQgPSAnY29uZmlnJztcbmNvbnN0IEdUQUdfRlVOQ1RJT05fTkFNRSA9ICdndGFnJztcbmNvbnN0IERBVEFfTEFZRVJfTkFNRSA9ICdkYXRhTGF5ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIGV4dGVuZHMgybVQcm9taXNlUHJveHk8YW5hbHl0aWNzLkFuYWx5dGljcz4ge307XG5cbmxldCBndGFnOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5sZXQgYW5hbHl0aWNzSW5pdGlhbGl6ZWQ6IFByb21pc2U8dm9pZD47XG5jb25zdCBhbmFseXRpY3NJbnN0YW5jZUNhY2hlOiB7W2tleTpzdHJpbmddOiBPYnNlcnZhYmxlPGFuYWx5dGljcy5BbmFseXRpY3M+fSA9IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIHtcblxuICBhc3luYyB1cGRhdGVDb25maWcoY29uZmlnOiBDb25maWcpIHtcbiAgICBhd2FpdCBhbmFseXRpY3NJbml0aWFsaXplZDtcbiAgICBndGFnKEdUQUdfQ09ORklHX0NPTU1BTkQsIHRoaXMub3B0aW9uc1tBTkFMWVRJQ1NfSURfRklFTERdLCB7IC4uLmNvbmZpZywgdXBkYXRlOiB0cnVlIH0pO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgcHJpdmF0ZSBvcHRpb25zOkZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6c3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGx8dW5kZWZpbmVkLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQ09MTEVDVElPTl9FTkFCTEVEKSBhbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZDpib29sZWFufG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBUFBfVkVSU0lPTikgcHJvdmlkZWRBcHBWZXJzaW9uOnN0cmluZ3xudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQVBQX05BTUUpIHByb3ZpZGVkQXBwTmFtZTpzdHJpbmd8bnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERFQlVHX01PREUpIGRlYnVnTW9kZUVuYWJsZWQ6Ym9vbGVhbnxudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQ09ORklHKSBwcm92aWRlZENvbmZpZzpDb25maWd8bnVsbCxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOk9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG5cbiAgICBpZiAoIWFuYWx5dGljc0luaXRpYWxpemVkKSB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgICAgZ3RhZyA9IHdpbmRvd1tHVEFHX0ZVTkNUSU9OX05BTUVdIHx8IGZ1bmN0aW9uKCkgeyB3aW5kb3dbREFUQV9MQVlFUl9OQU1FXS5wdXNoKGFyZ3VtZW50cykgfTtcbiAgICAgICAgd2luZG93W0RBVEFfTEFZRVJfTkFNRV0gPSB3aW5kb3dbREFUQV9MQVlFUl9OQU1FXSB8fCBbXTtcbiAgICAgICAgYW5hbHl0aWNzSW5pdGlhbGl6ZWQgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XG4gICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbR1RBR19GVU5DVElPTl9OQU1FXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYXJnc1swXSA9PSAnanMnKSB7IHJlc29sdmUoKSB9XG4gICAgICAgICAgICAgIGd0YWcoLi4uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGd0YWcgPSAoKSA9PiB7fTtcbiAgICAgICAgYW5hbHl0aWNzSW5pdGlhbGl6ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYW5hbHl0aWNzID0gYW5hbHl0aWNzSW5zdGFuY2VDYWNoZVtvcHRpb25zW0FOQUxZVElDU19JRF9GSUVMRF1dO1xuICAgIGlmICghYW5hbHl0aWNzKSB7XG4gICAgICBhbmFseXRpY3MgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkgPyBpbXBvcnQoJ2ZpcmViYXNlL2FuYWx5dGljcycpIDogZW1wdHkoKSksXG4gICAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgICAgbWFwKGFwcCA9PiBhcHAuYW5hbHl0aWNzKCkpLFxuICAgICAgICB0YXAoYW5hbHl0aWNzID0+IHtcbiAgICAgICAgICBpZiAoYW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQgPT09IGZhbHNlKSB7IGFuYWx5dGljcy5zZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZChmYWxzZSkgfVxuICAgICAgICB9KSxcbiAgICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSksXG4gICAgICApO1xuICAgICAgYW5hbHl0aWNzSW5zdGFuY2VDYWNoZVtvcHRpb25zW0FOQUxZVElDU19JRF9GSUVMRF1dID0gYW5hbHl0aWNzO1xuICAgIH1cblxuICAgIGlmIChwcm92aWRlZENvbmZpZykgICAgIHsgdGhpcy51cGRhdGVDb25maWcocHJvdmlkZWRDb25maWcpIH1cbiAgICBpZiAocHJvdmlkZWRBcHBOYW1lKSAgICB7IHRoaXMudXBkYXRlQ29uZmlnKHsgW0FQUF9OQU1FX0tFWV06ICAgIHByb3ZpZGVkQXBwTmFtZSB9KSB9XG4gICAgaWYgKHByb3ZpZGVkQXBwVmVyc2lvbikgeyB0aGlzLnVwZGF0ZUNvbmZpZyh7IFtBUFBfVkVSU0lPTl9LRVldOiBwcm92aWRlZEFwcFZlcnNpb24gfSkgfVxuICAgIGlmIChkZWJ1Z01vZGVFbmFibGVkKSAgIHsgdGhpcy51cGRhdGVDb25maWcoeyBbREVCVUdfTU9ERV9LRVldOiAgMSB9KSB9XG5cbiAgICByZXR1cm4gybVsYXp5U0RLUHJveHkodGhpcywgYW5hbHl0aWNzLCB6b25lKTtcblxuICB9XG5cbn0iXX0=