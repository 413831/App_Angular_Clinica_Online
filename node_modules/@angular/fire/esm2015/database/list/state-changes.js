/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const childEvent$ = events.map((/**
     * @param {?} event
     * @return {?}
     */
    event => fromRef(query, event, 'on', scheduler)));
    return merge(...childEvent$);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L3N0YXRlLWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDOUMsT0FBTyxFQUE2QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBR3hELE1BQU0sVUFBVSxZQUFZLENBQUksS0FBb0IsRUFBRSxNQUFxQixFQUFFLFNBQXlCO0lBQ3BHLE1BQU0sR0FBRyxtQkFBQSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDOztVQUNoQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUc7Ozs7SUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsRUFBQztJQUNsRixPQUFPLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhYmFzZVF1ZXJ5LCBDaGlsZEV2ZW50LCBBbmd1bGFyRmlyZUFjdGlvbiwgU25hcHNob3RBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb21SZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHNBcnJheSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgU2NoZWR1bGVyTGlrZSwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFiYXNlU25hcHNob3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlQ2hhbmdlczxUPihxdWVyeTogRGF0YWJhc2VRdWVyeSwgZXZlbnRzPzogQ2hpbGRFdmVudFtdLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKSB7XG4gIGV2ZW50cyA9IHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzKSE7XG4gIGNvbnN0IGNoaWxkRXZlbnQkID0gZXZlbnRzLm1hcChldmVudCA9PiBmcm9tUmVmPFQ+KHF1ZXJ5LCBldmVudCwgJ29uJywgc2NoZWR1bGVyKSk7XG4gIHJldHVybiBtZXJnZSguLi5jaGlsZEV2ZW50JCk7XG59XG4iXX0=