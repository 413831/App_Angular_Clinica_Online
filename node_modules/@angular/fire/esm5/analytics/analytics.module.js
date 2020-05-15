/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional } from '@angular/core';
import { UserTrackingService, ScreenTrackingService } from './analytics.service';
import { AngularFireAnalytics } from './analytics';
var AngularFireAnalyticsModule = /** @class */ (function () {
    function AngularFireAnalyticsModule(analytics, screenTracking, userTracking) {
        // calling anything on analytics will eagerly load the SDK
        analytics.app;
    }
    AngularFireAnalyticsModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFireAnalytics]
                },] }
    ];
    /** @nocollapse */
    AngularFireAnalyticsModule.ctorParameters = function () { return [
        { type: AngularFireAnalytics },
        { type: ScreenTrackingService, decorators: [{ type: Optional }] },
        { type: UserTrackingService, decorators: [{ type: Optional }] }
    ]; };
    return AngularFireAnalyticsModule;
}());
export { AngularFireAnalyticsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5EO0lBSUUsb0NBQ0UsU0FBK0IsRUFDbkIsY0FBcUMsRUFDckMsWUFBaUM7UUFFN0MsMERBQTBEO1FBQzFELFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDaEIsQ0FBQzs7Z0JBWEYsUUFBUSxTQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFFLG9CQUFvQixDQUFFO2lCQUNwQzs7OztnQkFKUSxvQkFBb0I7Z0JBREMscUJBQXFCLHVCQVM5QyxRQUFRO2dCQVRKLG1CQUFtQix1QkFVdkIsUUFBUTs7SUFLYixpQ0FBQztDQUFBLEFBWkQsSUFZQztTQVRZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclRyYWNraW5nU2VydmljZSwgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnLi9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVBbmFseXRpY3NNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgIEBPcHRpb25hbCgpIHNjcmVlblRyYWNraW5nOiBTY3JlZW5UcmFja2luZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgdXNlclRyYWNraW5nOiBVc2VyVHJhY2tpbmdTZXJ2aWNlXG4gICkge1xuICAgIC8vIGNhbGxpbmcgYW55dGhpbmcgb24gYW5hbHl0aWNzIHdpbGwgZWFnZXJseSBsb2FkIHRoZSBTREtcbiAgICBhbmFseXRpY3MuYXBwO1xuICB9XG59XG4iXX0=