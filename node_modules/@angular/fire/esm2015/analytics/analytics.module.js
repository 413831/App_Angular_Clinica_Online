/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional } from '@angular/core';
import { UserTrackingService, ScreenTrackingService } from './analytics.service';
import { AngularFireAnalytics } from './analytics';
export class AngularFireAnalyticsModule {
    /**
     * @param {?} analytics
     * @param {?} screenTracking
     * @param {?} userTracking
     */
    constructor(analytics, screenTracking, userTracking) {
        // calling anything on analytics will eagerly load the SDK
        analytics.app;
    }
}
AngularFireAnalyticsModule.decorators = [
    { type: NgModule, args: [{
                providers: [AngularFireAnalytics]
            },] }
];
/** @nocollapse */
AngularFireAnalyticsModule.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: ScreenTrackingService, decorators: [{ type: Optional }] },
    { type: UserTrackingService, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS25ELE1BQU0sT0FBTywwQkFBMEI7Ozs7OztJQUNyQyxZQUNFLFNBQStCLEVBQ25CLGNBQXFDLEVBQ3JDLFlBQWlDO1FBRTdDLDBEQUEwRDtRQUMxRCxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQ2hCLENBQUM7OztZQVhGLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUUsQ0FBRSxvQkFBb0IsQ0FBRTthQUNwQzs7OztZQUpRLG9CQUFvQjtZQURDLHFCQUFxQix1QkFTOUMsUUFBUTtZQVRKLG1CQUFtQix1QkFVdkIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclRyYWNraW5nU2VydmljZSwgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnLi9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVBbmFseXRpY3NNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgIEBPcHRpb25hbCgpIHNjcmVlblRyYWNraW5nOiBTY3JlZW5UcmFja2luZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgdXNlclRyYWNraW5nOiBVc2VyVHJhY2tpbmdTZXJ2aWNlXG4gICkge1xuICAgIC8vIGNhbGxpbmcgYW55dGhpbmcgb24gYW5hbHl0aWNzIHdpbGwgZWFnZXJseSBsb2FkIHRoZSBTREtcbiAgICBhbmFseXRpY3MuYXBwO1xuICB9XG59XG4iXX0=