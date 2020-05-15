/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken, NgModule, Optional, NgZone, VERSION as NG_VERSION, Version, PLATFORM_ID, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
/**
 * @record
 */
export function FirebaseOptions() { }
;
/**
 * @record
 */
export function FirebaseAppConfig() { }
;
/** @type {?} */
export var FIREBASE_OPTIONS = new InjectionToken('angularfire2.app.options');
/** @type {?} */
export var FIREBASE_APP_NAME = new InjectionToken('angularfire2.app.nameOrConfig');
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
var 
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
FirebaseApp = /** @class */ (function () {
    function FirebaseApp() {
    }
    return FirebaseApp;
}());
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
export { FirebaseApp };
if (false) {
    /** @type {?} */
    FirebaseApp.prototype.name;
    /** @type {?} */
    FirebaseApp.prototype.options;
    /** @type {?} */
    FirebaseApp.prototype.analytics;
    /** @type {?} */
    FirebaseApp.prototype.auth;
    /** @type {?} */
    FirebaseApp.prototype.database;
    /** @type {?} */
    FirebaseApp.prototype.messaging;
    /** @type {?} */
    FirebaseApp.prototype.performance;
    /** @type {?} */
    FirebaseApp.prototype.storage;
    /** @type {?} */
    FirebaseApp.prototype.delete;
    /** @type {?} */
    FirebaseApp.prototype.firestore;
    /** @type {?} */
    FirebaseApp.prototype.functions;
    /** @type {?} */
    FirebaseApp.prototype.remoteConfig;
}
/** @type {?} */
export var VERSION = new Version('6.0.0');
/**
 * @param {?} options
 * @param {?} zone
 * @param {?=} nameOrConfig
 * @return {?}
 */
export function ɵfirebaseAppFactory(options, zone, nameOrConfig) {
    /** @type {?} */
    var name = typeof nameOrConfig === 'string' && nameOrConfig || '[DEFAULT]';
    /** @type {?} */
    var config = typeof nameOrConfig === 'object' && nameOrConfig || {};
    config.name = config.name || name;
    // Added any due to some inconsistency between @firebase/app and firebase types
    /** @type {?} */
    var existingApp = (/** @type {?} */ (firebase.apps.filter((/**
     * @param {?} app
     * @return {?}
     */
    function (app) { return app && app.name === config.name; }))[0]));
    // We support FirebaseConfig, initializeApp's public type only accepts string; need to cast as any
    // Could be solved with https://github.com/firebase/firebase-js-sdk/pull/1206
    return (/** @type {?} */ ((existingApp || zone.runOutsideAngular((/**
     * @return {?}
     */
    function () { return firebase.initializeApp(options, (/** @type {?} */ (config))); })))));
}
/** @type {?} */
var FirebaseAppProvider = {
    provide: FirebaseApp,
    useFactory: ɵfirebaseAppFactory,
    deps: [
        FIREBASE_OPTIONS,
        NgZone,
        [new Optional(), FIREBASE_APP_NAME]
    ]
};
var AngularFireModule = /** @class */ (function () {
    function AngularFireModule(platformId) {
        firebase.registerVersion('angularfire', VERSION.full, platformId.toString());
        firebase.registerVersion('angular', NG_VERSION.full);
    }
    /**
     * @param {?} options
     * @param {?=} nameOrConfig
     * @return {?}
     */
    AngularFireModule.initializeApp = /**
     * @param {?} options
     * @param {?=} nameOrConfig
     * @return {?}
     */
    function (options, nameOrConfig) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: FIREBASE_OPTIONS, useValue: options },
                { provide: FIREBASE_APP_NAME, useValue: nameOrConfig }
            ]
        };
    };
    AngularFireModule.decorators = [
        { type: NgModule, args: [{
                    providers: [FirebaseAppProvider],
                },] }
    ];
    /** @nocollapse */
    AngularFireModule.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return AngularFireModule;
}());
export { AngularFireModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvIiwic291cmNlcyI6WyJmaXJlYmFzZS5hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sSUFBSSxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEksT0FBTyxLQUFLLFFBQVEsTUFBTSxjQUFjLENBQUM7Ozs7QUFHekMscUNBQW9EO0FBQUEsQ0FBQzs7OztBQUNyRCx1Q0FBc0Q7QUFBQSxDQUFDOztBQUV2RCxNQUFNLEtBQU8sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQWtCLDBCQUEwQixDQUFDOztBQUMvRixNQUFNLEtBQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQXFDLCtCQUErQixDQUFDOzs7QUFJeEg7Ozs7SUFBQTtJQWFBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFiRCxJQWFDOzs7Ozs7SUFaRywyQkFBYTs7SUFDYiw4QkFBWTs7SUFDWixnQ0FBcUM7O0lBQ3JDLDJCQUFzQjs7SUFDdEIsK0JBQXNEOztJQUN0RCxnQ0FBcUM7O0lBQ3JDLGtDQUEyQzs7SUFDM0MsOEJBQXFEOztJQUNyRCw2QkFBNEI7O0lBQzVCLGdDQUFxQzs7SUFDckMsZ0NBQW9EOztJQUNwRCxtQ0FBOEM7OztBQUdsRCxNQUFNLEtBQU8sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0FBRTFELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUF3QixFQUFFLElBQVksRUFBRSxZQUE0Qzs7UUFDOUcsSUFBSSxHQUFHLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLElBQUksV0FBVzs7UUFDdEUsTUFBTSxHQUFHLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLElBQUksRUFBRTtJQUNyRSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDOzs7UUFFNUIsV0FBVyxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztJQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksRUFBL0IsQ0FBK0IsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFPO0lBQzFGLGtHQUFrRztJQUNsRyw2RUFBNkU7SUFDN0UsT0FBTyxtQkFBQSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsaUJBQWlCOzs7SUFBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsbUJBQUEsTUFBTSxFQUFPLENBQUMsRUFBOUMsQ0FBOEMsRUFBQyxDQUFDLEVBQWUsQ0FBQztBQUN4SCxDQUFDOztJQUVLLG1CQUFtQixHQUFHO0lBQ3hCLE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFVBQVUsRUFBRSxtQkFBbUI7SUFDL0IsSUFBSSxFQUFFO1FBQ0YsZ0JBQWdCO1FBQ2hCLE1BQU07UUFDTixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsaUJBQWlCLENBQUM7S0FDdEM7Q0FDSjtBQUVEO0lBYUksMkJBQWlDLFVBQWlCO1FBQzlDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDN0UsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQVpNLCtCQUFhOzs7OztJQUFwQixVQUFxQixPQUF3QixFQUFFLFlBQXlDO1FBQ3BGLE9BQU87WUFDSCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2dCQUNoRCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFO2FBQ3pEO1NBQ0osQ0FBQTtJQUNMLENBQUM7O2dCQVpKLFFBQVEsU0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBRSxtQkFBbUIsQ0FBRTtpQkFDckM7Ozs7Z0JBVytDLE1BQU0sdUJBQXJDLE1BQU0sU0FBQyxXQUFXOztJQUluQyx3QkFBQztDQUFBLEFBakJELElBaUJDO1NBZFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlLCBPcHRpb25hbCwgTmdab25lLCBWRVJTSU9OIGFzIE5HX1ZFUlNJT04sIFZlcnNpb24sIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFwcCwgYXV0aCwgZGF0YWJhc2UsIG1lc3NhZ2luZywgc3RvcmFnZSwgZmlyZXN0b3JlLCBmdW5jdGlvbnMsIGFuYWx5dGljcywgcGVyZm9ybWFuY2UsIHJlbW90ZUNvbmZpZyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG4vLyBJTlZFU1RJR0FURSBQdWJsaWMgdHlwZXMgZG9uJ3QgZXhwb3NlIEZpcmViYXNlT3B0aW9ucyBvciBGaXJlYmFzZUFwcENvbmZpZywgaXMgdGhpcyB0aGUgY2FzZSBhbnlsb25nZXI/XG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlT3B0aW9ucyB7W2tleTpzdHJpbmddOiBhbnl9O1xuZXhwb3J0IGludGVyZmFjZSBGaXJlYmFzZUFwcENvbmZpZyB7W2tleTpzdHJpbmddOiBhbnl9O1xuXG5leHBvcnQgY29uc3QgRklSRUJBU0VfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxGaXJlYmFzZU9wdGlvbnM+KCdhbmd1bGFyZmlyZTIuYXBwLm9wdGlvbnMnKTtcbmV4cG9ydCBjb25zdCBGSVJFQkFTRV9BUFBfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8dW5kZWZpbmVkPignYW5ndWxhcmZpcmUyLmFwcC5uYW1lT3JDb25maWcnKTtcblxuLy8gSGF2ZSB0byBpbXBsZW1lbnQgYXMgd2UgbmVlZCB0byByZXR1cm4gYSBjbGFzcyBmcm9tIHRoZSBwcm92aWRlciwgd2Ugc2hvdWxkIGNvbnNpZGVyIGV4cG9ydGluZ1xuLy8gdGhpcyBpbiB0aGUgZmlyZWJhc2UvYXBwIHR5cGVzIGFzIHRoaXMgaXMgb3VyIGhpZ2hlc3QgcmlzayBvZiBicmVha3NcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZUFwcCBpbXBsZW1lbnRzIFBhcnRpYWw8YXBwLkFwcD4ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvcHRpb25zOiB7fTtcbiAgICBhbmFseXRpY3M6ICgpID0+IGFuYWx5dGljcy5BbmFseXRpY3M7XG4gICAgYXV0aDogKCkgPT4gYXV0aC5BdXRoO1xuICAgIGRhdGFiYXNlOiAoZGF0YWJhc2VVUkw/OiBzdHJpbmcpID0+IGRhdGFiYXNlLkRhdGFiYXNlO1xuICAgIG1lc3NhZ2luZzogKCkgPT4gbWVzc2FnaW5nLk1lc3NhZ2luZztcbiAgICBwZXJmb3JtYW5jZTogKCkgPT4gcGVyZm9ybWFuY2UuUGVyZm9ybWFuY2U7XG4gICAgc3RvcmFnZTogKHN0b3JhZ2VCdWNrZXQ/OiBzdHJpbmcpID0+IHN0b3JhZ2UuU3RvcmFnZTtcbiAgICBkZWxldGU6ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgZmlyZXN0b3JlOiAoKSA9PiBmaXJlc3RvcmUuRmlyZXN0b3JlO1xuICAgIGZ1bmN0aW9uczogKHJlZ2lvbj86IHN0cmluZykgPT4gZnVuY3Rpb25zLkZ1bmN0aW9ucztcbiAgICByZW1vdGVDb25maWc6ICgpID0+IHJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gbmV3IFZlcnNpb24oJ0FOR1VMQVJGSVJFMl9WRVJTSU9OJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIHpvbmU6IE5nWm9uZSwgbmFtZU9yQ29uZmlnPzogc3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGwpIHtcbiAgICBjb25zdCBuYW1lID0gdHlwZW9mIG5hbWVPckNvbmZpZyA9PT0gJ3N0cmluZycgJiYgbmFtZU9yQ29uZmlnIHx8ICdbREVGQVVMVF0nO1xuICAgIGNvbnN0IGNvbmZpZyA9IHR5cGVvZiBuYW1lT3JDb25maWcgPT09ICdvYmplY3QnICYmIG5hbWVPckNvbmZpZyB8fCB7fTtcbiAgICBjb25maWcubmFtZSA9IGNvbmZpZy5uYW1lIHx8IG5hbWU7XG4gICAgLy8gQWRkZWQgYW55IGR1ZSB0byBzb21lIGluY29uc2lzdGVuY3kgYmV0d2VlbiBAZmlyZWJhc2UvYXBwIGFuZCBmaXJlYmFzZSB0eXBlc1xuICAgIGNvbnN0IGV4aXN0aW5nQXBwID0gZmlyZWJhc2UuYXBwcy5maWx0ZXIoYXBwID0+IGFwcCAmJiBhcHAubmFtZSA9PT0gY29uZmlnLm5hbWUpWzBdIGFzIGFueTtcbiAgICAvLyBXZSBzdXBwb3J0IEZpcmViYXNlQ29uZmlnLCBpbml0aWFsaXplQXBwJ3MgcHVibGljIHR5cGUgb25seSBhY2NlcHRzIHN0cmluZzsgbmVlZCB0byBjYXN0IGFzIGFueVxuICAgIC8vIENvdWxkIGJlIHNvbHZlZCB3aXRoIGh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYmFzZS9maXJlYmFzZS1qcy1zZGsvcHVsbC8xMjA2XG4gICAgcmV0dXJuIChleGlzdGluZ0FwcCB8fCB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZpcmViYXNlLmluaXRpYWxpemVBcHAob3B0aW9ucywgY29uZmlnIGFzIGFueSkpKSBhcyBGaXJlYmFzZUFwcDtcbn1cblxuY29uc3QgRmlyZWJhc2VBcHBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBGaXJlYmFzZUFwcCxcbiAgICB1c2VGYWN0b3J5OiDJtWZpcmViYXNlQXBwRmFjdG9yeSxcbiAgICBkZXBzOiBbXG4gICAgICAgIEZJUkVCQVNFX09QVElPTlMsXG4gICAgICAgIE5nWm9uZSxcbiAgICAgICAgW25ldyBPcHRpb25hbCgpLCBGSVJFQkFTRV9BUFBfTkFNRV1cbiAgICBdXG59O1xuIFxuQE5nTW9kdWxlKHtcbiAgICBwcm92aWRlcnM6IFsgRmlyZWJhc2VBcHBQcm92aWRlciBdLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZU1vZHVsZSB7XG4gICAgc3RhdGljIGluaXRpYWxpemVBcHAob3B0aW9uczogRmlyZWJhc2VPcHRpb25zLCBuYW1lT3JDb25maWc/OiBzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJGaXJlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBGSVJFQkFTRV9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9ucyB9LFxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogRklSRUJBU0VfQVBQX05BTUUsIHVzZVZhbHVlOiBuYW1lT3JDb25maWcgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6T2JqZWN0ICkge1xuICAgICAgICBmaXJlYmFzZS5yZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCBwbGF0Zm9ybUlkLnRvU3RyaW5nKCkpO1xuICAgICAgICBmaXJlYmFzZS5yZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXInLCBOR19WRVJTSU9OLmZ1bGwpO1xuICAgIH1cbn0iXX0=