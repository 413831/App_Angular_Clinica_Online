import { NgZone, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { performance } from 'firebase/app';
import { FirebaseApp, ɵPromiseProxy } from '@angular/fire';
import * as ɵngcc0 from '@angular/core';
export declare const AUTOMATICALLY_TRACE_CORE_NG_METRICS: InjectionToken<boolean>;
export declare const INSTRUMENTATION_ENABLED: InjectionToken<boolean>;
export declare const DATA_COLLECTION_ENABLED: InjectionToken<boolean>;
export interface AngularFirePerformance extends ɵPromiseProxy<performance.Performance> {
}
export declare class AngularFirePerformance {
    private zone;
    private readonly performance;
    constructor(app: FirebaseApp, instrumentationEnabled: boolean | null, dataCollectionEnabled: boolean | null, zone: NgZone, platformId: Object);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFirePerformance, [null, { optional: true; }, { optional: true; }, null, null]>;
}
export declare const traceUntil: <T = any>(name: string, test: (a: T) => boolean, options?: {
    orComplete?: boolean;
}) => (source$: Observable<T>) => Observable<T>;
export declare const traceWhile: <T = any>(name: string, test: (a: T) => boolean, options?: {
    orComplete?: boolean;
}) => (source$: Observable<T>) => Observable<T>;
export declare const traceUntilComplete: <T = any>(name: string) => (source$: Observable<T>) => Observable<T>;
export declare const traceUntilFirst: <T = any>(name: string) => (source$: Observable<T>) => Observable<T>;
export declare const trace: <T = any>(name: string) => (source$: Observable<T>) => Observable<T>;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuZC50cyIsInNvdXJjZXMiOlsicGVyZm9ybWFuY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBwZXJmb3JtYW5jZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgybVQcm9taXNlUHJveHkgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IEFVVE9NQVRJQ0FMTFlfVFJBQ0VfQ09SRV9OR19NRVRSSUNTOiBJbmplY3Rpb25Ub2tlbjxib29sZWFuPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IElOU1RSVU1FTlRBVElPTl9FTkFCTEVEOiBJbmplY3Rpb25Ub2tlbjxib29sZWFuPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IERBVEFfQ09MTEVDVElPTl9FTkFCTEVEOiBJbmplY3Rpb25Ub2tlbjxib29sZWFuPjtcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVQZXJmb3JtYW5jZSBleHRlbmRzIMm1UHJvbWlzZVByb3h5PHBlcmZvcm1hbmNlLlBlcmZvcm1hbmNlPiB7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlIHtcbiAgICBwcml2YXRlIHpvbmU7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwZXJmb3JtYW5jZTtcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEZpcmViYXNlQXBwLCBpbnN0cnVtZW50YXRpb25FbmFibGVkOiBib29sZWFuIHwgbnVsbCwgZGF0YUNvbGxlY3Rpb25FbmFibGVkOiBib29sZWFuIHwgbnVsbCwgem9uZTogTmdab25lLCBwbGF0Zm9ybUlkOiBPYmplY3QpO1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgdHJhY2VVbnRpbDogPFQgPSBhbnk+KG5hbWU6IHN0cmluZywgdGVzdDogKGE6IFQpID0+IGJvb2xlYW4sIG9wdGlvbnM/OiB7XG4gICAgb3JDb21wbGV0ZT86IGJvb2xlYW47XG59KSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IHRyYWNlV2hpbGU6IDxUID0gYW55PihuYW1lOiBzdHJpbmcsIHRlc3Q6IChhOiBUKSA9PiBib29sZWFuLCBvcHRpb25zPzoge1xuICAgIG9yQ29tcGxldGU/OiBib29sZWFuO1xufSkgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD47XG5leHBvcnQgZGVjbGFyZSBjb25zdCB0cmFjZVVudGlsQ29tcGxldGU6IDxUID0gYW55PihuYW1lOiBzdHJpbmcpID0+IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgdHJhY2VVbnRpbEZpcnN0OiA8VCA9IGFueT4obmFtZTogc3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IHRyYWNlOiA8VCA9IGFueT4obmFtZTogc3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbiJdfQ==