import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseOptions, FirebaseAppConfig, ɵPromiseProxy } from '@angular/fire';
import { User, auth } from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export interface AngularFireAuth extends ɵPromiseProxy<auth.Auth> {
}
export declare class AngularFireAuth {
    /**
     * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
     */
    readonly authState: Observable<User | null>;
    /**
     * Observable of the currently signed-in user's JWT token used to identify the user to a Firebase service (or null).
     */
    readonly idToken: Observable<string | null>;
    /**
     * Observable of the currently signed-in user (or null).
     */
    readonly user: Observable<User | null>;
    /**
     * Observable of the currently signed-in user's IdTokenResult object which contains the ID token JWT string and other
     * helper properties for getting different data associated with the token as well as all the decoded payload claims
     * (or null).
     */
    readonly idTokenResult: Observable<auth.IdTokenResult | null>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, platformId: Object, zone: NgZone);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireAuth, [null, { optional: true; }, null, null]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5kLnRzIiwic291cmNlcyI6WyJhdXRoLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIMm1UHJvbWlzZVByb3h5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBVc2VyLCBhdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVBdXRoIGV4dGVuZHMgybVQcm9taXNlUHJveHk8YXV0aC5BdXRoPiB7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBbmd1bGFyRmlyZUF1dGgge1xuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgb2YgYXV0aGVudGljYXRpb24gc3RhdGU7IGFzIG9mIEZpcmViYXNlIDQuMCB0aGlzIGlzIG9ubHkgdHJpZ2dlcmVkIHZpYSBzaWduLWluL291dFxuICAgICAqL1xuICAgIHJlYWRvbmx5IGF1dGhTdGF0ZTogT2JzZXJ2YWJsZTxVc2VyIHwgbnVsbD47XG4gICAgLyoqXG4gICAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudGx5IHNpZ25lZC1pbiB1c2VyJ3MgSldUIHRva2VuIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHVzZXIgdG8gYSBGaXJlYmFzZSBzZXJ2aWNlIChvciBudWxsKS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZFRva2VuOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+O1xuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnRseSBzaWduZWQtaW4gdXNlciAob3IgbnVsbCkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdXNlcjogT2JzZXJ2YWJsZTxVc2VyIHwgbnVsbD47XG4gICAgLyoqXG4gICAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudGx5IHNpZ25lZC1pbiB1c2VyJ3MgSWRUb2tlblJlc3VsdCBvYmplY3Qgd2hpY2ggY29udGFpbnMgdGhlIElEIHRva2VuIEpXVCBzdHJpbmcgYW5kIG90aGVyXG4gICAgICogaGVscGVyIHByb3BlcnRpZXMgZm9yIGdldHRpbmcgZGlmZmVyZW50IGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSB0b2tlbiBhcyB3ZWxsIGFzIGFsbCB0aGUgZGVjb2RlZCBwYXlsb2FkIGNsYWltc1xuICAgICAqIChvciBudWxsKS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZFRva2VuUmVzdWx0OiBPYnNlcnZhYmxlPGF1dGguSWRUb2tlblJlc3VsdCB8IG51bGw+O1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucywgbmFtZU9yQ29uZmlnOiBzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZyB8IG51bGwgfCB1bmRlZmluZWQsIHBsYXRmb3JtSWQ6IE9iamVjdCwgem9uZTogTmdab25lKTtcbn1cbiJdfQ==