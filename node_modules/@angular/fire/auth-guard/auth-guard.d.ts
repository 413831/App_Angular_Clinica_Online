import { NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, UnaryFunction } from 'rxjs';
import { User } from 'firebase/app';
import { FirebaseOptions, FirebaseAppConfig } from '@angular/fire';
import * as ɵngcc0 from '@angular/core';
export declare type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export declare type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | any[]>>;
export declare class AngularFireAuthGuard implements CanActivate {
    private router;
    authState: Observable<User | null>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, zone: NgZone, router: Router);
    canActivate: (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | import("@angular/router").UrlTree>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireAuthGuard, [null, { optional: true; }, null, null]>;
}
export declare const canActivate: (pipe: AuthPipeGenerator) => {
    canActivate: (typeof AngularFireAuthGuard)[];
    data: {
        authGuardPipe: AuthPipeGenerator;
    };
};
export declare const loggedIn: AuthPipe;
export declare const isNotAnonymous: AuthPipe;
export declare const idTokenResult: import("rxjs").OperatorFunction<User, any>;
export declare const emailVerified: AuthPipe;
export declare const customClaims: UnaryFunction<Observable<User>, Observable<any>>;
export declare const hasCustomClaim: (claim: string) => UnaryFunction<Observable<User>, Observable<any>>;
export declare const redirectUnauthorizedTo: (redirect: any[]) => UnaryFunction<Observable<User>, Observable<true | any[]>>;
export declare const redirectLoggedInTo: (redirect: any[]) => UnaryFunction<Observable<User>, Observable<true | any[]>>;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5kLnRzIiwic291cmNlcyI6WyJhdXRoLWd1YXJkLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgVW5hcnlGdW5jdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMsIEZpcmViYXNlQXBwQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5leHBvcnQgZGVjbGFyZSB0eXBlIEF1dGhQaXBlR2VuZXJhdG9yID0gKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiBBdXRoUGlwZTtcbmV4cG9ydCBkZWNsYXJlIHR5cGUgQXV0aFBpcGUgPSBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8VXNlciB8IG51bGw+LCBPYnNlcnZhYmxlPGJvb2xlYW4gfCBhbnlbXT4+O1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQW5ndWxhckZpcmVBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gICAgcHJpdmF0ZSByb3V0ZXI7XG4gICAgYXV0aFN0YXRlOiBPYnNlcnZhYmxlPFVzZXIgfCBudWxsPjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIG5hbWVPckNvbmZpZzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLCB6b25lOiBOZ1pvbmUsIHJvdXRlcjogUm91dGVyKTtcbiAgICBjYW5BY3RpdmF0ZTogKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBpbXBvcnQoXCJAYW5ndWxhci9yb3V0ZXJcIikuVXJsVHJlZT47XG59XG5leHBvcnQgZGVjbGFyZSBjb25zdCBjYW5BY3RpdmF0ZTogKHBpcGU6IEF1dGhQaXBlR2VuZXJhdG9yKSA9PiB7XG4gICAgY2FuQWN0aXZhdGU6ICh0eXBlb2YgQW5ndWxhckZpcmVBdXRoR3VhcmQpW107XG4gICAgZGF0YToge1xuICAgICAgICBhdXRoR3VhcmRQaXBlOiBBdXRoUGlwZUdlbmVyYXRvcjtcbiAgICB9O1xufTtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGxvZ2dlZEluOiBBdXRoUGlwZTtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGlzTm90QW5vbnltb3VzOiBBdXRoUGlwZTtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGlkVG9rZW5SZXN1bHQ6IGltcG9ydChcInJ4anNcIikuT3BlcmF0b3JGdW5jdGlvbjxVc2VyLCBhbnk+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgZW1haWxWZXJpZmllZDogQXV0aFBpcGU7XG5leHBvcnQgZGVjbGFyZSBjb25zdCBjdXN0b21DbGFpbXM6IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxVc2VyPiwgT2JzZXJ2YWJsZTxhbnk+PjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGhhc0N1c3RvbUNsYWltOiAoY2xhaW06IHN0cmluZykgPT4gVW5hcnlGdW5jdGlvbjxPYnNlcnZhYmxlPFVzZXI+LCBPYnNlcnZhYmxlPGFueT4+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgcmVkaXJlY3RVbmF1dGhvcml6ZWRUbzogKHJlZGlyZWN0OiBhbnlbXSkgPT4gVW5hcnlGdW5jdGlvbjxPYnNlcnZhYmxlPFVzZXI+LCBPYnNlcnZhYmxlPHRydWUgfCBhbnlbXT4+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgcmVkaXJlY3RMb2dnZWRJblRvOiAocmVkaXJlY3Q6IGFueVtdKSA9PiBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8VXNlcj4sIE9ic2VydmFibGU8dHJ1ZSB8IGFueVtdPj47XG4iXX0=