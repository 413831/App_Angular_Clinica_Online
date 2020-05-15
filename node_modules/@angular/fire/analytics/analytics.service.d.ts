import { NgZone, OnDestroy, ComponentFactoryResolver, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from './analytics';
import { Title } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class ScreenTrackingService implements OnDestroy {
    private disposable;
    constructor(analytics: AngularFireAnalytics, router: Router, title: Title, componentFactoryResolver: ComponentFactoryResolver, platformId: Object, debugModeEnabled: boolean | null, zone: NgZone, injector: Injector);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ScreenTrackingService, [null, { optional: true; }, { optional: true; }, null, null, { optional: true; }, null, null]>;
}
export declare class UserTrackingService implements OnDestroy {
    private disposable;
    constructor(analytics: AngularFireAnalytics, zone: NgZone, platformId: Object);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<UserTrackingService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lLCBPbkRlc3Ryb3ksIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBTY3JlZW5UcmFja2luZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgZGlzcG9zYWJsZTtcbiAgICBjb25zdHJ1Y3RvcihhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLCByb3V0ZXI6IFJvdXRlciwgdGl0bGU6IFRpdGxlLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcGxhdGZvcm1JZDogT2JqZWN0LCBkZWJ1Z01vZGVFbmFibGVkOiBib29sZWFuIHwgbnVsbCwgem9uZTogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBVc2VyVHJhY2tpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGRpc3Bvc2FibGU7XG4gICAgY29uc3RydWN0b3IoYW5hbHl0aWNzOiBBbmd1bGFyRmlyZUFuYWx5dGljcywgem9uZTogTmdab25lLCBwbGF0Zm9ybUlkOiBPYmplY3QpO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG59XG4iXX0=