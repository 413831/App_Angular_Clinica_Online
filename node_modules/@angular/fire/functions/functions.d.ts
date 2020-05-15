import { NgZone, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseOptions, FirebaseAppConfig, ɵPromiseProxy } from '@angular/fire';
import { functions } from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export declare const ORIGIN: InjectionToken<string>;
export declare const REGION: InjectionToken<string>;
export interface AngularFireFunctions extends Omit<ɵPromiseProxy<functions.Functions>, 'httpsCallable'> {
}
export declare class AngularFireFunctions {
    readonly httpsCallable: <T = any, R = any>(name: string) => (data: T) => Observable<R>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, zone: NgZone, region: string | null, origin: string | null);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireFunctions, [null, { optional: true; }, null, { optional: true; }, { optional: true; }]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmQudHMiLCJzb3VyY2VzIjpbImZ1bmN0aW9ucy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlyZWJhc2VPcHRpb25zLCBGaXJlYmFzZUFwcENvbmZpZywgybVQcm9taXNlUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGZ1bmN0aW9ucyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5leHBvcnQgZGVjbGFyZSBjb25zdCBPUklHSU46IEluamVjdGlvblRva2VuPHN0cmluZz47XG5leHBvcnQgZGVjbGFyZSBjb25zdCBSRUdJT046IEluamVjdGlvblRva2VuPHN0cmluZz47XG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaXJlRnVuY3Rpb25zIGV4dGVuZHMgT21pdDzJtVByb21pc2VQcm94eTxmdW5jdGlvbnMuRnVuY3Rpb25zPiwgJ2h0dHBzQ2FsbGFibGUnPiB7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBbmd1bGFyRmlyZUZ1bmN0aW9ucyB7XG4gICAgcmVhZG9ubHkgaHR0cHNDYWxsYWJsZTogPFQgPSBhbnksIFIgPSBhbnk+KG5hbWU6IHN0cmluZykgPT4gKGRhdGE6IFQpID0+IE9ic2VydmFibGU8Uj47XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRmlyZWJhc2VPcHRpb25zLCBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCwgem9uZTogTmdab25lLCByZWdpb246IHN0cmluZyB8IG51bGwsIG9yaWdpbjogc3RyaW5nIHwgbnVsbCk7XG59XG4iXX0=