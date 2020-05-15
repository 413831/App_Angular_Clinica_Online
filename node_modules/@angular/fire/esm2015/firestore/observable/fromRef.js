/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable, asyncScheduler } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * @template T, R
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
function _fromRef(ref, scheduler = asyncScheduler) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        let unsubscribe;
        if (scheduler != null) {
            scheduler.schedule((/**
             * @return {?}
             */
            () => {
                unsubscribe = ref.onSnapshot(subscriber);
            }));
        }
        else {
            unsubscribe = ref.onSnapshot(subscriber);
        }
        return (/**
         * @return {?}
         */
        function () {
            if (unsubscribe != null) {
                unsubscribe();
            }
        });
    }));
}
/**
 * @template R
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
export function fromRef(ref, scheduler) {
    return _fromRef(ref, scheduler);
}
/**
 * @template T
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
export function fromDocRef(ref, scheduler) {
    return fromRef(ref, scheduler)
        .pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    payload => ({ payload, type: 'value' }))));
}
/**
 * @template T
 * @param {?} ref
 * @param {?=} scheduler
 * @return {?}
 */
export function fromCollectionRef(ref, scheduler) {
    return fromRef(ref, scheduler).pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    payload => ({ payload, type: 'query' }))));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsib2JzZXJ2YWJsZS9mcm9tUmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFpQixjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBRXJDLFNBQVMsUUFBUSxDQUFPLEdBQWlCLEVBQUUsWUFBMkIsY0FBYztJQUNsRixPQUFPLElBQUksVUFBVTs7OztJQUFDLFVBQVUsQ0FBQyxFQUFFOztZQUM3QixXQUFXO1FBQ2YsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLFNBQVMsQ0FBQyxRQUFROzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ3RCLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQ7OztRQUFPO1lBQ0wsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUN2QixXQUFXLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBSSxHQUE4QixFQUFFLFNBQXlCO0lBQ2xGLE9BQU8sUUFBUSxDQUFnQixHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDakQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUksR0FBc0IsRUFBRSxTQUF5QjtJQUM3RSxPQUFPLE9BQU8sQ0FBc0IsR0FBRyxFQUFFLFNBQVMsQ0FBQztTQUNoRCxJQUFJLENBQ0gsR0FBRzs7OztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUM3QyxDQUFDO0FBQ04sQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxHQUFVLEVBQUUsU0FBeUI7SUFDeEUsT0FBTyxPQUFPLENBQW1CLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7QUFDdEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFNjaGVkdWxlckxpa2UsIGFzeW5jU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEb2N1bWVudFJlZmVyZW5jZSwgUXVlcnksIEFjdGlvbiwgUmVmZXJlbmNlLCBEb2N1bWVudFNuYXBzaG90LCBRdWVyeVNuYXBzaG90IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmZ1bmN0aW9uIF9mcm9tUmVmPFQsIFI+KHJlZjogUmVmZXJlbmNlPFQ+LCBzY2hlZHVsZXI6IFNjaGVkdWxlckxpa2UgPSBhc3luY1NjaGVkdWxlcik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgbGV0IHVuc3Vic2NyaWJlO1xuICAgIGlmIChzY2hlZHVsZXIgIT0gbnVsbCkge1xuICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSByZWYub25TbmFwc2hvdChzdWJzY3JpYmVyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bnN1YnNjcmliZSA9IHJlZi5vblNuYXBzaG90KHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh1bnN1YnNjcmliZSAhPSBudWxsKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21SZWY8Uj4ocmVmOiBEb2N1bWVudFJlZmVyZW5jZSB8IFF1ZXJ5LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKSB7XG4gIHJldHVybiBfZnJvbVJlZjx0eXBlb2YgcmVmLCBSPihyZWYsIHNjaGVkdWxlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRG9jUmVmPFQ+KHJlZjogRG9jdW1lbnRSZWZlcmVuY2UsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPEFjdGlvbjxEb2N1bWVudFNuYXBzaG90PFQ+Pj57XG4gIHJldHVybiBmcm9tUmVmPERvY3VtZW50U25hcHNob3Q8VD4+KHJlZiwgc2NoZWR1bGVyKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHBheWxvYWQgPT4gKHsgcGF5bG9hZCwgdHlwZTogJ3ZhbHVlJyB9KSlcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUNvbGxlY3Rpb25SZWY8VD4ocmVmOiBRdWVyeSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8QWN0aW9uPFF1ZXJ5U25hcHNob3Q8VD4+PiB7XG4gIHJldHVybiBmcm9tUmVmPFF1ZXJ5U25hcHNob3Q8VD4+KHJlZiwgc2NoZWR1bGVyKS5waXBlKG1hcChwYXlsb2FkID0+ICh7IHBheWxvYWQsIHR5cGU6ICdxdWVyeScgfSkpKTtcbn1cbiJdfQ==