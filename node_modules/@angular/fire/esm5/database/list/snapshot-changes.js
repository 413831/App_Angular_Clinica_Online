/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { listChanges } from './changes';
import { validateEventsArray } from './utils';
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
export function snapshotChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    return listChanges(query, (/** @type {?} */ (events)), scheduler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L3NuYXBzaG90LWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFeEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7OztBQUU5QyxNQUFNLFVBQVUsZUFBZSxDQUFJLEtBQW9CLEVBQUUsTUFBcUIsRUFBRSxTQUF5QjtJQUN2RyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsT0FBTyxXQUFXLENBQUksS0FBSyxFQUFFLG1CQUFBLE1BQU0sRUFBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBsaXN0Q2hhbmdlcyB9IGZyb20gJy4vY2hhbmdlcyc7XG5pbXBvcnQgeyBEYXRhYmFzZVF1ZXJ5LCBDaGlsZEV2ZW50LCBTbmFwc2hvdEFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHNBcnJheSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc25hcHNob3RDaGFuZ2VzPFQ+KHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5LCBldmVudHM/OiBDaGlsZEV2ZW50W10sIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFNuYXBzaG90QWN0aW9uPFQ+W10+IHtcbiAgZXZlbnRzID0gdmFsaWRhdGVFdmVudHNBcnJheShldmVudHMpO1xuICByZXR1cm4gbGlzdENoYW5nZXM8VD4ocXVlcnksIGV2ZW50cyEsIHNjaGVkdWxlcik7XG59XG4iXX0=