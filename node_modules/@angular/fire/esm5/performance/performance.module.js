/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional } from '@angular/core';
import { AngularFirePerformance } from './performance';
import { PerformanceMonitoringService } from './performance.service';
var AngularFirePerformanceModule = /** @class */ (function () {
    function AngularFirePerformanceModule(perf, _) {
        // call anything here to get perf loading
        perf.dataCollectionEnabled;
    }
    AngularFirePerformanceModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFirePerformance]
                },] }
    ];
    /** @nocollapse */
    AngularFirePerformanceModule.ctorParameters = function () { return [
        { type: AngularFirePerformance },
        { type: PerformanceMonitoringService, decorators: [{ type: Optional }] }
    ]; };
    return AngularFirePerformanceModule;
}());
export { AngularFirePerformanceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9wZXJmb3JtYW5jZS8iLCJzb3VyY2VzIjpbInBlcmZvcm1hbmNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJFO0lBSUUsc0NBQ0UsSUFBNEIsRUFDaEIsQ0FBK0I7UUFFM0MseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQTtJQUM1QixDQUFDOztnQkFWRixRQUFRLFNBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsc0JBQXNCLENBQUU7aUJBQ3RDOzs7O2dCQUxRLHNCQUFzQjtnQkFDdEIsNEJBQTRCLHVCQVFoQyxRQUFROztJQUtiLG1DQUFDO0NBQUEsQUFYRCxJQVdDO1NBUlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlIH0gZnJvbSAnLi9wZXJmb3JtYW5jZSc7XG5pbXBvcnQgeyBQZXJmb3JtYW5jZU1vbml0b3JpbmdTZXJ2aWNlIH0gZnJvbSAnLi9wZXJmb3JtYW5jZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlUGVyZm9ybWFuY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVBlcmZvcm1hbmNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcGVyZjogQW5ndWxhckZpcmVQZXJmb3JtYW5jZSxcbiAgICBAT3B0aW9uYWwoKSBfOiBQZXJmb3JtYW5jZU1vbml0b3JpbmdTZXJ2aWNlXG4gICkge1xuICAgIC8vIGNhbGwgYW55dGhpbmcgaGVyZSB0byBnZXQgcGVyZiBsb2FkaW5nXG4gICAgcGVyZi5kYXRhQ29sbGVjdGlvbkVuYWJsZWRcbiAgfVxufVxuIl19