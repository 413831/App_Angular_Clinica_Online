import { NgZone } from '@angular/core';
import { messaging } from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseOptions, FirebaseAppConfig, ɵPromiseProxy } from '@angular/fire';
import * as ɵngcc0 from '@angular/core';
export interface AngularFireMessaging extends Omit<ɵPromiseProxy<messaging.Messaging>, 'deleteToken' | 'getToken' | 'requestPermission'> {
}
export declare class AngularFireMessaging {
    readonly requestPermission: Observable<void>;
    readonly getToken: Observable<string | null>;
    readonly tokenChanges: Observable<string | null>;
    readonly messages: Observable<{}>;
    readonly requestToken: Observable<string | null>;
    readonly deleteToken: (token: string) => Observable<boolean>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, platformId: Object, zone: NgZone);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireMessaging, [null, { optional: true; }, null, null]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLmQudHMiLCJzb3VyY2VzIjpbIm1lc3NhZ2luZy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXNzYWdpbmcgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlyZWJhc2VPcHRpb25zLCBGaXJlYmFzZUFwcENvbmZpZywgybVQcm9taXNlUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVNZXNzYWdpbmcgZXh0ZW5kcyBPbWl0PMm1UHJvbWlzZVByb3h5PG1lc3NhZ2luZy5NZXNzYWdpbmc+LCAnZGVsZXRlVG9rZW4nIHwgJ2dldFRva2VuJyB8ICdyZXF1ZXN0UGVybWlzc2lvbic+IHtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFuZ3VsYXJGaXJlTWVzc2FnaW5nIHtcbiAgICByZWFkb25seSByZXF1ZXN0UGVybWlzc2lvbjogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgICByZWFkb25seSBnZXRUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgICByZWFkb25seSB0b2tlbkNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG4gICAgcmVhZG9ubHkgbWVzc2FnZXM6IE9ic2VydmFibGU8e30+O1xuICAgIHJlYWRvbmx5IHJlcXVlc3RUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgICByZWFkb25seSBkZWxldGVUb2tlbjogKHRva2VuOiBzdHJpbmcpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRmlyZWJhc2VPcHRpb25zLCBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGxhdGZvcm1JZDogT2JqZWN0LCB6b25lOiBOZ1pvbmUpO1xufVxuIl19