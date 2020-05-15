import { InjectionToken, NgZone, Version } from '@angular/core';
import { app, auth, database, messaging, storage, firestore, functions, analytics, performance, remoteConfig } from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export interface FirebaseOptions {
    [key: string]: any;
}
export interface FirebaseAppConfig {
    [key: string]: any;
}
export declare const FIREBASE_OPTIONS: InjectionToken<FirebaseOptions>;
export declare const FIREBASE_APP_NAME: InjectionToken<string | FirebaseAppConfig>;
export declare class FirebaseApp implements Partial<app.App> {
    name: string;
    options: {};
    analytics: () => analytics.Analytics;
    auth: () => auth.Auth;
    database: (databaseURL?: string) => database.Database;
    messaging: () => messaging.Messaging;
    performance: () => performance.Performance;
    storage: (storageBucket?: string) => storage.Storage;
    delete: () => Promise<void>;
    firestore: () => firestore.Firestore;
    functions: (region?: string) => functions.Functions;
    remoteConfig: () => remoteConfig.RemoteConfig;
}
export declare const VERSION: Version;
export declare function ɵfirebaseAppFactory(options: FirebaseOptions, zone: NgZone, nameOrConfig?: string | FirebaseAppConfig | null): FirebaseApp;
export declare class AngularFireModule {
    static initializeApp(options: FirebaseOptions, nameOrConfig?: string | FirebaseAppConfig): ({
        ngModule: typeof AngularFireModule;
        providers: {
            provide: InjectionToken<string | FirebaseAppConfig>;
            useValue: string | FirebaseAppConfig;
        }[];
    })&{ngModule:AngularFireModule};
    constructor(platformId: Object);
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<AngularFireModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<AngularFireModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuYXBwLm1vZHVsZS5kLnRzIiwic291cmNlcyI6WyJmaXJlYmFzZS5hcHAubW9kdWxlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtGQUErRjs7Ozs7O21DQU0xRjtBQUNMOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBOZ1pvbmUsIFZlcnNpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFwcCwgYXV0aCwgZGF0YWJhc2UsIG1lc3NhZ2luZywgc3RvcmFnZSwgZmlyZXN0b3JlLCBmdW5jdGlvbnMsIGFuYWx5dGljcywgcGVyZm9ybWFuY2UsIHJlbW90ZUNvbmZpZyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlT3B0aW9ucyB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBGaXJlYmFzZUFwcENvbmZpZyB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgRklSRUJBU0VfT1BUSU9OUzogSW5qZWN0aW9uVG9rZW48RmlyZWJhc2VPcHRpb25zPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IEZJUkVCQVNFX0FQUF9OQU1FOiBJbmplY3Rpb25Ub2tlbjxzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZz47XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGaXJlYmFzZUFwcCBpbXBsZW1lbnRzIFBhcnRpYWw8YXBwLkFwcD4ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvcHRpb25zOiB7fTtcbiAgICBhbmFseXRpY3M6ICgpID0+IGFuYWx5dGljcy5BbmFseXRpY3M7XG4gICAgYXV0aDogKCkgPT4gYXV0aC5BdXRoO1xuICAgIGRhdGFiYXNlOiAoZGF0YWJhc2VVUkw/OiBzdHJpbmcpID0+IGRhdGFiYXNlLkRhdGFiYXNlO1xuICAgIG1lc3NhZ2luZzogKCkgPT4gbWVzc2FnaW5nLk1lc3NhZ2luZztcbiAgICBwZXJmb3JtYW5jZTogKCkgPT4gcGVyZm9ybWFuY2UuUGVyZm9ybWFuY2U7XG4gICAgc3RvcmFnZTogKHN0b3JhZ2VCdWNrZXQ/OiBzdHJpbmcpID0+IHN0b3JhZ2UuU3RvcmFnZTtcbiAgICBkZWxldGU6ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgZmlyZXN0b3JlOiAoKSA9PiBmaXJlc3RvcmUuRmlyZXN0b3JlO1xuICAgIGZ1bmN0aW9uczogKHJlZ2lvbj86IHN0cmluZykgPT4gZnVuY3Rpb25zLkZ1bmN0aW9ucztcbiAgICByZW1vdGVDb25maWc6ICgpID0+IHJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc7XG59XG5leHBvcnQgZGVjbGFyZSBjb25zdCBWRVJTSU9OOiBWZXJzaW9uO1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9uczogRmlyZWJhc2VPcHRpb25zLCB6b25lOiBOZ1pvbmUsIG5hbWVPckNvbmZpZz86IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCk6IEZpcmViYXNlQXBwO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQW5ndWxhckZpcmVNb2R1bGUge1xuICAgIHN0YXRpYyBpbml0aWFsaXplQXBwKG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucywgbmFtZU9yQ29uZmlnPzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcpOiB7XG4gICAgICAgIG5nTW9kdWxlOiB0eXBlb2YgQW5ndWxhckZpcmVNb2R1bGU7XG4gICAgICAgIHByb3ZpZGVyczoge1xuICAgICAgICAgICAgcHJvdmlkZTogSW5qZWN0aW9uVG9rZW48c3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWc+O1xuICAgICAgICAgICAgdXNlVmFsdWU6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnO1xuICAgICAgICB9W107XG4gICAgfTtcbiAgICBjb25zdHJ1Y3RvcihwbGF0Zm9ybUlkOiBPYmplY3QpO1xufVxuIl19