/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { fromRef } from '../observable/fromRef';
import { validateEventsArray } from './utils';
import { merge } from 'rxjs';
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
export function stateChanges(query, events, scheduler) {
    events = (/** @type {?} */ (validateEventsArray(events)));
    /** @type {?} */
    var childEvent$ = events.map((/**
     * @param {?} event
     * @return {?}
     */
    function (event) { return fromRef(query, event, 'on', scheduler); }));
    return merge.apply(void 0, __spread(childEvent$));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L3N0YXRlLWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzlDLE9BQU8sRUFBNkIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7OztBQUd4RCxNQUFNLFVBQVUsWUFBWSxDQUFJLEtBQW9CLEVBQUUsTUFBcUIsRUFBRSxTQUF5QjtJQUNwRyxNQUFNLEdBQUcsbUJBQUEsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQzs7UUFDaEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHOzs7O0lBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQXpDLENBQXlDLEVBQUM7SUFDbEYsT0FBTyxLQUFLLHdCQUFJLFdBQVcsR0FBRTtBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2VRdWVyeSwgQ2hpbGRFdmVudCwgQW5ndWxhckZpcmVBY3Rpb24sIFNuYXBzaG90QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBmcm9tUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzQXJyYXkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFNjaGVkdWxlckxpa2UsIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhYmFzZVNuYXBzaG90IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZUNoYW5nZXM8VD4ocXVlcnk6IERhdGFiYXNlUXVlcnksIGV2ZW50cz86IENoaWxkRXZlbnRbXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSkge1xuICBldmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cykhO1xuICBjb25zdCBjaGlsZEV2ZW50JCA9IGV2ZW50cy5tYXAoZXZlbnQgPT4gZnJvbVJlZjxUPihxdWVyeSwgZXZlbnQsICdvbicsIHNjaGVkdWxlcikpO1xuICByZXR1cm4gbWVyZ2UoLi4uY2hpbGRFdmVudCQpO1xufVxuIl19