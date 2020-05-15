import { NgZone, InjectionToken } from '@angular/core';
import { Observable, OperatorFunction, MonoTypeOperatorFunction } from 'rxjs';
import { ɵPromiseProxy, FirebaseAppConfig, FirebaseOptions } from '@angular/fire';
import { remoteConfig } from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export interface ConfigTemplate {
    [key: string]: string | number | boolean;
}
export declare const SETTINGS: InjectionToken<remoteConfig.Settings>;
export declare const DEFAULTS: InjectionToken<ConfigTemplate>;
export interface AngularFireRemoteConfig extends ɵPromiseProxy<remoteConfig.RemoteConfig> {
}
export declare class Value implements remoteConfig.Value {
    _source: remoteConfig.ValueSource;
    _value: string;
    asBoolean(): boolean;
    asString(): string;
    asNumber(): number;
    getSource(): remoteConfig.ValueSource;
    constructor(_source: remoteConfig.ValueSource, _value: string);
}
export declare class Parameter extends Value {
    key: string;
    fetchTimeMillis: number;
    constructor(key: string, fetchTimeMillis: number, source: remoteConfig.ValueSource, value: string);
}
export declare const filterRemote: () => MonoTypeOperatorFunction<Parameter | Parameter[]>;
export declare const filterFresh: (howRecentInMillis: number) => MonoTypeOperatorFunction<Parameter | Parameter[]>;
export declare class AngularFireRemoteConfig {
    private zone;
    readonly changes: Observable<Parameter>;
    readonly parameters: Observable<Parameter[]>;
    readonly numbers: Observable<{
        [key: string]: number | undefined;
    }> & {
        [key: string]: Observable<number>;
    };
    readonly booleans: Observable<{
        [key: string]: boolean | undefined;
    }> & {
        [key: string]: Observable<boolean>;
    };
    readonly strings: Observable<{
        [key: string]: string | undefined;
    }> & {
        [key: string]: Observable<string | undefined>;
    };
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, settings: remoteConfig.Settings | null, defaultConfig: ConfigTemplate | null, zone: NgZone, platformId: Object);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireRemoteConfig, [null, { optional: true; }, { optional: true; }, { optional: true; }, null, null]>;
}
export declare const budget: <T>(interval: number) => MonoTypeOperatorFunction<T>;
export declare function scanToObject(): OperatorFunction<Parameter, {
    [key: string]: string | undefined;
}>;
export declare function scanToObject(to: 'numbers'): OperatorFunction<Parameter, {
    [key: string]: number | undefined;
}>;
export declare function scanToObject(to: 'booleans'): OperatorFunction<Parameter, {
    [key: string]: boolean | undefined;
}>;
export declare function scanToObject(to: 'strings'): OperatorFunction<Parameter, {
    [key: string]: string | undefined;
}>;
export declare function scanToObject<T extends ConfigTemplate>(template: T): OperatorFunction<Parameter, T & {
    [key: string]: string | undefined;
}>;
export declare function mapToObject(): OperatorFunction<Parameter[], {
    [key: string]: string | undefined;
}>;
export declare function mapToObject(to: 'numbers'): OperatorFunction<Parameter[], {
    [key: string]: number | undefined;
}>;
export declare function mapToObject(to: 'booleans'): OperatorFunction<Parameter[], {
    [key: string]: boolean | undefined;
}>;
export declare function mapToObject(to: 'strings'): OperatorFunction<Parameter[], {
    [key: string]: string | undefined;
}>;
export declare function mapToObject<T extends ConfigTemplate>(template: T): OperatorFunction<Parameter[], T & {
    [key: string]: string | undefined;
}>;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNvbmZpZy5kLnRzIiwic291cmNlcyI6WyJyZW1vdGUtY29uZmlnLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9wZXJhdG9yRnVuY3Rpb24sIE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgybVQcm9taXNlUHJveHksIEZpcmViYXNlQXBwQ29uZmlnLCBGaXJlYmFzZU9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IHJlbW90ZUNvbmZpZyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ1RlbXBsYXRlIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgU0VUVElOR1M6IEluamVjdGlvblRva2VuPHJlbW90ZUNvbmZpZy5TZXR0aW5ncz47XG5leHBvcnQgZGVjbGFyZSBjb25zdCBERUZBVUxUUzogSW5qZWN0aW9uVG9rZW48Q29uZmlnVGVtcGxhdGU+O1xuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZVJlbW90ZUNvbmZpZyBleHRlbmRzIMm1UHJvbWlzZVByb3h5PHJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc+IHtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFZhbHVlIGltcGxlbWVudHMgcmVtb3RlQ29uZmlnLlZhbHVlIHtcbiAgICBfc291cmNlOiByZW1vdGVDb25maWcuVmFsdWVTb3VyY2U7XG4gICAgX3ZhbHVlOiBzdHJpbmc7XG4gICAgYXNCb29sZWFuKCk6IGJvb2xlYW47XG4gICAgYXNTdHJpbmcoKTogc3RyaW5nO1xuICAgIGFzTnVtYmVyKCk6IG51bWJlcjtcbiAgICBnZXRTb3VyY2UoKTogcmVtb3RlQ29uZmlnLlZhbHVlU291cmNlO1xuICAgIGNvbnN0cnVjdG9yKF9zb3VyY2U6IHJlbW90ZUNvbmZpZy5WYWx1ZVNvdXJjZSwgX3ZhbHVlOiBzdHJpbmcpO1xufVxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGFyYW1ldGVyIGV4dGVuZHMgVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGZldGNoVGltZU1pbGxpczogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nLCBmZXRjaFRpbWVNaWxsaXM6IG51bWJlciwgc291cmNlOiByZW1vdGVDb25maWcuVmFsdWVTb3VyY2UsIHZhbHVlOiBzdHJpbmcpO1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgZmlsdGVyUmVtb3RlOiAoKSA9PiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyIHwgUGFyYW1ldGVyW10+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgZmlsdGVyRnJlc2g6IChob3dSZWNlbnRJbk1pbGxpczogbnVtYmVyKSA9PiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyIHwgUGFyYW1ldGVyW10+O1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQW5ndWxhckZpcmVSZW1vdGVDb25maWcge1xuICAgIHByaXZhdGUgem9uZTtcbiAgICByZWFkb25seSBjaGFuZ2VzOiBPYnNlcnZhYmxlPFBhcmFtZXRlcj47XG4gICAgcmVhZG9ubHkgcGFyYW1ldGVyczogT2JzZXJ2YWJsZTxQYXJhbWV0ZXJbXT47XG4gICAgcmVhZG9ubHkgbnVtYmVyczogT2JzZXJ2YWJsZTx7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICB9PiAmIHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIH07XG4gICAgcmVhZG9ubHkgYm9vbGVhbnM6IE9ic2VydmFibGU8e1xuICAgICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH0+ICYge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIH07XG4gICAgcmVhZG9ubHkgc3RyaW5nczogT2JzZXJ2YWJsZTx7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9PiAmIHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIH07XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRmlyZWJhc2VPcHRpb25zLCBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCwgc2V0dGluZ3M6IHJlbW90ZUNvbmZpZy5TZXR0aW5ncyB8IG51bGwsIGRlZmF1bHRDb25maWc6IENvbmZpZ1RlbXBsYXRlIHwgbnVsbCwgem9uZTogTmdab25lLCBwbGF0Zm9ybUlkOiBPYmplY3QpO1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgYnVkZ2V0OiA8VD4oaW50ZXJ2YWw6IG51bWJlcikgPT4gTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+O1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gc2NhblRvT2JqZWN0KCk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufT47XG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdudW1iZXJzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCB7XG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgdW5kZWZpbmVkO1xufT47XG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdib29sZWFucycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwge1xuICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG59PjtcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHNjYW5Ub09iamVjdCh0bzogJ3N0cmluZ3MnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59PjtcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHNjYW5Ub09iamVjdDxUIGV4dGVuZHMgQ29uZmlnVGVtcGxhdGU+KHRlbXBsYXRlOiBUKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIFQgJiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufT47XG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBtYXBUb09iamVjdCgpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufT47XG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBtYXBUb09iamVjdCh0bzogJ251bWJlcnMnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlciB8IHVuZGVmaW5lZDtcbn0+O1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gbWFwVG9PYmplY3QodG86ICdib29sZWFucycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7XG4gICAgW2tleTogc3RyaW5nXTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbn0+O1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gbWFwVG9PYmplY3QodG86ICdzdHJpbmdzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyW10sIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59PjtcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIG1hcFRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odGVtcGxhdGU6IFQpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCBUICYge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZDtcbn0+O1xuIl19