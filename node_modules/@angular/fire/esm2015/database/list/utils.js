/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isNil } from '../utils';
/**
 * @param {?=} events
 * @return {?}
 */
export function validateEventsArray(events) {
    if (isNil(events) || (/** @type {?} */ (events)).length === 0) {
        events = ['child_added', 'child_removed', 'child_changed', 'child_moved'];
    }
    return events;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsibGlzdC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFFakMsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE1BQWM7SUFDaEQsSUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksbUJBQUEsTUFBTSxFQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN4QyxNQUFNLEdBQUcsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMzRTtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc05pbCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzPzogYW55W10pIHtcbiAgaWYoaXNOaWwoZXZlbnRzKSB8fCBldmVudHMhLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2ZW50cyA9IFsnY2hpbGRfYWRkZWQnLCAnY2hpbGRfcmVtb3ZlZCcsICdjaGlsZF9jaGFuZ2VkJywgJ2NoaWxkX21vdmVkJ107XG4gIH1cbiAgcmV0dXJuIGV2ZW50cztcbn0iXX0=