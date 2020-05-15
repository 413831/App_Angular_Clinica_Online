/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ApplicationRef } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
/** @type {?} */
const IS_STABLE_START_MARK = '_isStableStart';
/** @type {?} */
const IS_STABLE_END_MARK = '_isStableEnd';
/**
 * @return {?}
 */
function markStarts() {
    if (typeof (window) !== "undefined" && window.performance) {
        window.performance.mark(IS_STABLE_START_MARK);
        return true;
    }
    else {
        return false;
    }
}
/** @type {?} */
const started = markStarts();
export class PerformanceMonitoringService {
    /**
     * @param {?} appRef
     */
    constructor(appRef) {
        if (started) {
            this.disposable = appRef.isStable.pipe(first((/**
             * @param {?} it
             * @return {?}
             */
            it => it)), tap((/**
             * @return {?}
             */
            () => {
                window.performance.mark(IS_STABLE_END_MARK);
                window.performance.measure('isStable', IS_STABLE_START_MARK, IS_STABLE_END_MARK);
            }))).subscribe();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
PerformanceMonitoringService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
PerformanceMonitoringService.ctorParameters = () => [
    { type: ApplicationRef }
];
/** @nocollapse */ PerformanceMonitoringService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PerformanceMonitoringService_Factory() { return new PerformanceMonitoringService(i0.ɵɵinject(i0.ApplicationRef)); }, token: PerformanceMonitoringService, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    PerformanceMonitoringService.prototype.disposable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvcGVyZm9ybWFuY2UvIiwic291cmNlcyI6WyJwZXJmb3JtYW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7TUFFdEMsb0JBQW9CLEdBQUcsZ0JBQWdCOztNQUN2QyxrQkFBa0IsR0FBRyxjQUFjOzs7O0FBRXpDLFNBQVMsVUFBVTtJQUNmLElBQUksT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ3RELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUM7S0FDZjtTQUFNO1FBQ0gsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDOztNQUVLLE9BQU8sR0FBRyxVQUFVLEVBQUU7QUFLNUIsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQUlyQyxZQUFZLE1BQXNCO1FBQzlCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDbEMsS0FBSzs7OztZQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQ2YsR0FBRzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsRUFBQyxDQUNMLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRTtJQUMzRCxDQUFDOzs7WUFyQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxLQUFLO2FBQ3BCOzs7O1lBcEIrQixjQUFjOzs7Ozs7OztJQXVCMUMsa0RBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBBcHBsaWNhdGlvblJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBJU19TVEFCTEVfU1RBUlRfTUFSSyA9ICdfaXNTdGFibGVTdGFydCc7XG5jb25zdCBJU19TVEFCTEVfRU5EX01BUksgPSAnX2lzU3RhYmxlRW5kJztcblxuZnVuY3Rpb24gbWFya1N0YXJ0cygpIHtcbiAgICBpZiAodHlwZW9mKHdpbmRvdykgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKElTX1NUQUJMRV9TVEFSVF9NQVJLKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3Qgc3RhcnRlZCA9IG1hcmtTdGFydHMoKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlTW9uaXRvcmluZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBkaXNwb3NhYmxlOiBTdWJzY3JpcHRpb258dW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlID0gYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlyc3QoaXQgPT4gaXQpLFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKElTX1NUQUJMRV9FTkRfTUFSSyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKCdpc1N0YWJsZScsIElTX1NUQUJMRV9TVEFSVF9NQVJLLCBJU19TVEFCTEVfRU5EX01BUkspO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG5cbn0iXX0=