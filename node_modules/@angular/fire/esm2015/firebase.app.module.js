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
export const FIREBASE_OPTIONS = new InjectionToken('angularfire2.app.options');
/** @type {?} */
export const FIREBASE_APP_NAME = new InjectionToken('angularfire2.app.nameOrConfig');
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
export class FirebaseApp {
}
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
export const VERSION = new Version('6.0.0');
/**
 * @param {?} options
 * @param {?} zone
 * @param {?=} nameOrConfig
 * @return {?}
 */
export function ɵfirebaseAppFactory(options, zone, nameOrConfig) {
    /** @type {?} */
    const name = typeof nameOrConfig === 'string' && nameOrConfig || '[DEFAULT]';
    /** @type {?} */
    const config = typeof nameOrConfig === 'object' && nameOrConfig || {};
    config.name = config.name || name;
    // Added any due to some inconsistency between @firebase/app and firebase types
    /** @type {?} */
    const existingApp = (/** @type {?} */ (firebase.apps.filter((/**
     * @param {?} app
     * @return {?}
     */
    app => app && app.name === config.name))[0]));
    // We support FirebaseConfig, initializeApp's public type only accepts string; need to cast as any
    // Could be solved with https://github.com/firebase/firebase-js-sdk/pull/1206
    return (/** @type {?} */ ((existingApp || zone.runOutsideAngular((/**
     * @return {?}
     */
    () => firebase.initializeApp(options, (/** @type {?} */ (config))))))));
}
/** @type {?} */
const FirebaseAppProvider = {
    provide: FirebaseApp,
    useFactory: ɵfirebaseAppFactory,
    deps: [
        FIREBASE_OPTIONS,
        NgZone,
        [new Optional(), FIREBASE_APP_NAME]
    ]
};
export class AngularFireModule {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        firebase.registerVersion('angularfire', VERSION.full, platformId.toString());
        firebase.registerVersion('angular', NG_VERSION.full);
    }
    /**
     * @param {?} options
     * @param {?=} nameOrConfig
     * @return {?}
     */
    static initializeApp(options, nameOrConfig) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: FIREBASE_OPTIONS, useValue: options },
                { provide: FIREBASE_APP_NAME, useValue: nameOrConfig }
            ]
        };
    }
}
AngularFireModule.decorators = [
    { type: NgModule, args: [{
                providers: [FirebaseAppProvider],
            },] }
];
/** @nocollapse */
AngularFireModule.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvIiwic291cmNlcyI6WyJmaXJlYmFzZS5hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sSUFBSSxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEksT0FBTyxLQUFLLFFBQVEsTUFBTSxjQUFjLENBQUM7Ozs7QUFHekMscUNBQW9EO0FBQUEsQ0FBQzs7OztBQUNyRCx1Q0FBc0Q7QUFBQSxDQUFDOztBQUV2RCxNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQWtCLDBCQUEwQixDQUFDOztBQUMvRixNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQXFDLCtCQUErQixDQUFDOzs7QUFJeEgsTUFBTSxPQUFPLFdBQVc7Q0FhdkI7OztJQVpHLDJCQUFhOztJQUNiLDhCQUFZOztJQUNaLGdDQUFxQzs7SUFDckMsMkJBQXNCOztJQUN0QiwrQkFBc0Q7O0lBQ3RELGdDQUFxQzs7SUFDckMsa0NBQTJDOztJQUMzQyw4QkFBcUQ7O0lBQ3JELDZCQUE0Qjs7SUFDNUIsZ0NBQXFDOztJQUNyQyxnQ0FBb0Q7O0lBQ3BELG1DQUE4Qzs7O0FBR2xELE1BQU0sT0FBTyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7QUFFMUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQXdCLEVBQUUsSUFBWSxFQUFFLFlBQTRDOztVQUM5RyxJQUFJLEdBQUcsT0FBTyxZQUFZLEtBQUssUUFBUSxJQUFJLFlBQVksSUFBSSxXQUFXOztVQUN0RSxNQUFNLEdBQUcsT0FBTyxZQUFZLEtBQUssUUFBUSxJQUFJLFlBQVksSUFBSSxFQUFFO0lBQ3JFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7OztVQUU1QixXQUFXLEdBQUcsbUJBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O0lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQU87SUFDMUYsa0dBQWtHO0lBQ2xHLDZFQUE2RTtJQUM3RSxPQUFPLG1CQUFBLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxpQkFBaUI7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLG1CQUFBLE1BQU0sRUFBTyxDQUFDLEVBQUMsQ0FBQyxFQUFlLENBQUM7QUFDeEgsQ0FBQzs7TUFFSyxtQkFBbUIsR0FBRztJQUN4QixPQUFPLEVBQUUsV0FBVztJQUNwQixVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLElBQUksRUFBRTtRQUNGLGdCQUFnQjtRQUNoQixNQUFNO1FBQ04sQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGlCQUFpQixDQUFDO0tBQ3RDO0NBQ0o7QUFLRCxNQUFNLE9BQU8saUJBQWlCOzs7O0lBVTFCLFlBQWlDLFVBQWlCO1FBQzlDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDN0UsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQVpELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBd0IsRUFBRSxZQUF5QztRQUNwRixPQUFPO1lBQ0gsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFDaEQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTthQUN6RDtTQUNKLENBQUE7SUFDTCxDQUFDOzs7WUFaSixRQUFRLFNBQUM7Z0JBQ04sU0FBUyxFQUFFLENBQUUsbUJBQW1CLENBQUU7YUFDckM7Ozs7WUFXK0MsTUFBTSx1QkFBckMsTUFBTSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTmdNb2R1bGUsIE9wdGlvbmFsLCBOZ1pvbmUsIFZFUlNJT04gYXMgTkdfVkVSU0lPTiwgVmVyc2lvbiwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXBwLCBhdXRoLCBkYXRhYmFzZSwgbWVzc2FnaW5nLCBzdG9yYWdlLCBmaXJlc3RvcmUsIGZ1bmN0aW9ucywgYW5hbHl0aWNzLCBwZXJmb3JtYW5jZSwgcmVtb3RlQ29uZmlnIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbi8vIElOVkVTVElHQVRFIFB1YmxpYyB0eXBlcyBkb24ndCBleHBvc2UgRmlyZWJhc2VPcHRpb25zIG9yIEZpcmViYXNlQXBwQ29uZmlnLCBpcyB0aGlzIHRoZSBjYXNlIGFueWxvbmdlcj9cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VPcHRpb25zIHtba2V5OnN0cmluZ106IGFueX07XG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlQXBwQ29uZmlnIHtba2V5OnN0cmluZ106IGFueX07XG5cbmV4cG9ydCBjb25zdCBGSVJFQkFTRV9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPEZpcmViYXNlT3B0aW9ucz4oJ2FuZ3VsYXJmaXJlMi5hcHAub3B0aW9ucycpO1xuZXhwb3J0IGNvbnN0IEZJUkVCQVNFX0FQUF9OQU1FID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZ3xGaXJlYmFzZUFwcENvbmZpZ3x1bmRlZmluZWQ+KCdhbmd1bGFyZmlyZTIuYXBwLm5hbWVPckNvbmZpZycpO1xuXG4vLyBIYXZlIHRvIGltcGxlbWVudCBhcyB3ZSBuZWVkIHRvIHJldHVybiBhIGNsYXNzIGZyb20gdGhlIHByb3ZpZGVyLCB3ZSBzaG91bGQgY29uc2lkZXIgZXhwb3J0aW5nXG4vLyB0aGlzIGluIHRoZSBmaXJlYmFzZS9hcHAgdHlwZXMgYXMgdGhpcyBpcyBvdXIgaGlnaGVzdCByaXNrIG9mIGJyZWFrc1xuZXhwb3J0IGNsYXNzIEZpcmViYXNlQXBwIGltcGxlbWVudHMgUGFydGlhbDxhcHAuQXBwPiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9wdGlvbnM6IHt9O1xuICAgIGFuYWx5dGljczogKCkgPT4gYW5hbHl0aWNzLkFuYWx5dGljcztcbiAgICBhdXRoOiAoKSA9PiBhdXRoLkF1dGg7XG4gICAgZGF0YWJhc2U6IChkYXRhYmFzZVVSTD86IHN0cmluZykgPT4gZGF0YWJhc2UuRGF0YWJhc2U7XG4gICAgbWVzc2FnaW5nOiAoKSA9PiBtZXNzYWdpbmcuTWVzc2FnaW5nO1xuICAgIHBlcmZvcm1hbmNlOiAoKSA9PiBwZXJmb3JtYW5jZS5QZXJmb3JtYW5jZTtcbiAgICBzdG9yYWdlOiAoc3RvcmFnZUJ1Y2tldD86IHN0cmluZykgPT4gc3RvcmFnZS5TdG9yYWdlO1xuICAgIGRlbGV0ZTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICBmaXJlc3RvcmU6ICgpID0+IGZpcmVzdG9yZS5GaXJlc3RvcmU7XG4gICAgZnVuY3Rpb25zOiAocmVnaW9uPzogc3RyaW5nKSA9PiBmdW5jdGlvbnMuRnVuY3Rpb25zO1xuICAgIHJlbW90ZUNvbmZpZzogKCkgPT4gcmVtb3RlQ29uZmlnLlJlbW90ZUNvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBuZXcgVmVyc2lvbignQU5HVUxBUkZJUkUyX1ZFUlNJT04nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucywgem9uZTogTmdab25lLCBuYW1lT3JDb25maWc/OiBzdHJpbmd8RmlyZWJhc2VBcHBDb25maWd8bnVsbCkge1xuICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgbmFtZU9yQ29uZmlnID09PSAnc3RyaW5nJyAmJiBuYW1lT3JDb25maWcgfHwgJ1tERUZBVUxUXSc7XG4gICAgY29uc3QgY29uZmlnID0gdHlwZW9mIG5hbWVPckNvbmZpZyA9PT0gJ29iamVjdCcgJiYgbmFtZU9yQ29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5uYW1lID0gY29uZmlnLm5hbWUgfHwgbmFtZTtcbiAgICAvLyBBZGRlZCBhbnkgZHVlIHRvIHNvbWUgaW5jb25zaXN0ZW5jeSBiZXR3ZWVuIEBmaXJlYmFzZS9hcHAgYW5kIGZpcmViYXNlIHR5cGVzXG4gICAgY29uc3QgZXhpc3RpbmdBcHAgPSBmaXJlYmFzZS5hcHBzLmZpbHRlcihhcHAgPT4gYXBwICYmIGFwcC5uYW1lID09PSBjb25maWcubmFtZSlbMF0gYXMgYW55O1xuICAgIC8vIFdlIHN1cHBvcnQgRmlyZWJhc2VDb25maWcsIGluaXRpYWxpemVBcHAncyBwdWJsaWMgdHlwZSBvbmx5IGFjY2VwdHMgc3RyaW5nOyBuZWVkIHRvIGNhc3QgYXMgYW55XG4gICAgLy8gQ291bGQgYmUgc29sdmVkIHdpdGggaHR0cHM6Ly9naXRodWIuY29tL2ZpcmViYXNlL2ZpcmViYXNlLWpzLXNkay9wdWxsLzEyMDZcbiAgICByZXR1cm4gKGV4aXN0aW5nQXBwIHx8IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChvcHRpb25zLCBjb25maWcgYXMgYW55KSkpIGFzIEZpcmViYXNlQXBwO1xufVxuXG5jb25zdCBGaXJlYmFzZUFwcFByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6IEZpcmViYXNlQXBwLFxuICAgIHVzZUZhY3Rvcnk6IMm1ZmlyZWJhc2VBcHBGYWN0b3J5LFxuICAgIGRlcHM6IFtcbiAgICAgICAgRklSRUJBU0VfT1BUSU9OUyxcbiAgICAgICAgTmdab25lLFxuICAgICAgICBbbmV3IE9wdGlvbmFsKCksIEZJUkVCQVNFX0FQUF9OQU1FXVxuICAgIF1cbn07XG4gXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogWyBGaXJlYmFzZUFwcFByb3ZpZGVyIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlTW9kdWxlIHtcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZUFwcChvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIG5hbWVPckNvbmZpZz86IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQW5ndWxhckZpcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEZJUkVCQVNFX09QVElPTlMsIHVzZVZhbHVlOiBvcHRpb25zIH0sXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBGSVJFQkFTRV9BUFBfTkFNRSwgdXNlVmFsdWU6IG5hbWVPckNvbmZpZyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDpPYmplY3QgKSB7XG4gICAgICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsIHBsYXRmb3JtSWQudG9TdHJpbmcoKSk7XG4gICAgICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcicsIE5HX1ZFUlNJT04uZnVsbCk7XG4gICAgfVxufSJdfQ==