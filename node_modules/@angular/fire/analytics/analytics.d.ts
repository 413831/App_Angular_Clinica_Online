import { NgZone, InjectionToken } from '@angular/core';
import { FirebaseAppConfig, FirebaseOptions, ɵPromiseProxy } from '@angular/fire';
import { analytics } from 'firebase';
import * as ɵngcc0 from '@angular/core';
export interface Config {
    [key: string]: any;
}
export declare const COLLECTION_ENABLED: InjectionToken<boolean>;
export declare const APP_VERSION: InjectionToken<string>;
export declare const APP_NAME: InjectionToken<string>;
export declare const DEBUG_MODE: InjectionToken<boolean>;
export declare const CONFIG: InjectionToken<Config>;
export interface AngularFireAnalytics extends ɵPromiseProxy<analytics.Analytics> {
}
export declare class AngularFireAnalytics {
    private options;
    updateConfig(config: Config): Promise<void>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, analyticsCollectionEnabled: boolean | null, providedAppVersion: string | null, providedAppName: string | null, debugModeEnabled: boolean | null, providedConfig: Config | null, platformId: Object, zone: NgZone);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireAnalytics, [null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, null, null]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmQudHMiLCJzb3VyY2VzIjpbImFuYWx5dGljcy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlyZWJhc2VBcHBDb25maWcsIEZpcmViYXNlT3B0aW9ucywgybVQcm9taXNlUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGFuYWx5dGljcyB9IGZyb20gJ2ZpcmViYXNlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5leHBvcnQgZGVjbGFyZSBjb25zdCBDT0xMRUNUSU9OX0VOQUJMRUQ6IEluamVjdGlvblRva2VuPGJvb2xlYW4+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgQVBQX1ZFUlNJT046IEluamVjdGlvblRva2VuPHN0cmluZz47XG5leHBvcnQgZGVjbGFyZSBjb25zdCBBUFBfTkFNRTogSW5qZWN0aW9uVG9rZW48c3RyaW5nPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IERFQlVHX01PREU6IEluamVjdGlvblRva2VuPGJvb2xlYW4+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxDb25maWc+O1xuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZUFuYWx5dGljcyBleHRlbmRzIMm1UHJvbWlzZVByb3h5PGFuYWx5dGljcy5BbmFseXRpY3M+IHtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIHtcbiAgICBwcml2YXRlIG9wdGlvbnM7XG4gICAgdXBkYXRlQ29uZmlnKGNvbmZpZzogQ29uZmlnKTogUHJvbWlzZTx2b2lkPjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIG5hbWVPckNvbmZpZzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLCBhbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZDogYm9vbGVhbiB8IG51bGwsIHByb3ZpZGVkQXBwVmVyc2lvbjogc3RyaW5nIHwgbnVsbCwgcHJvdmlkZWRBcHBOYW1lOiBzdHJpbmcgfCBudWxsLCBkZWJ1Z01vZGVFbmFibGVkOiBib29sZWFuIHwgbnVsbCwgcHJvdmlkZWRDb25maWc6IENvbmZpZyB8IG51bGwsIHBsYXRmb3JtSWQ6IE9iamVjdCwgem9uZTogTmdab25lKTtcbn1cbiJdfQ==