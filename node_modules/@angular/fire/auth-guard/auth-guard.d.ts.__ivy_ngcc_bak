import { NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, UnaryFunction } from 'rxjs';
import { User } from 'firebase/app';
import { FirebaseOptions, FirebaseAppConfig } from '@angular/fire';
export declare type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export declare type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | any[]>>;
export declare class AngularFireAuthGuard implements CanActivate {
    private router;
    authState: Observable<User | null>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, zone: NgZone, router: Router);
    canActivate: (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | import("@angular/router").UrlTree>;
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
