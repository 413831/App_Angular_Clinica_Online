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
function _fromRef(ref, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    function (subscriber) {
        /** @type {?} */
        var unsubscribe;
        if (scheduler != null) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () {
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
    function (payload) { return ({ payload: payload, type: 'value' }); })));
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
    function (payload) { return ({ payload: payload, type: 'query' }); })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsib2JzZXJ2YWJsZS9mcm9tUmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFpQixjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBRXJDLFNBQVMsUUFBUSxDQUFPLEdBQWlCLEVBQUUsU0FBeUM7SUFBekMsMEJBQUEsRUFBQSwwQkFBeUM7SUFDbEYsT0FBTyxJQUFJLFVBQVU7Ozs7SUFBQyxVQUFBLFVBQVU7O1lBQzFCLFdBQVc7UUFDZixJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsU0FBUyxDQUFDLFFBQVE7OztZQUFDO2dCQUNqQixXQUFXLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxXQUFXLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQztRQUVEOzs7UUFBTztZQUNMLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtnQkFDdkIsV0FBVyxFQUFFLENBQUM7YUFDZjtRQUNILENBQUMsRUFBQTtJQUNILENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUksR0FBOEIsRUFBRSxTQUF5QjtJQUNsRixPQUFPLFFBQVEsQ0FBZ0IsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFJLEdBQXNCLEVBQUUsU0FBeUI7SUFDN0UsT0FBTyxPQUFPLENBQXNCLEdBQUcsRUFBRSxTQUFTLENBQUM7U0FDaEQsSUFBSSxDQUNILEdBQUc7Ozs7SUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLENBQUMsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBNUIsQ0FBNEIsRUFBQyxDQUM3QyxDQUFDO0FBQ04sQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxHQUFVLEVBQUUsU0FBeUI7SUFDeEUsT0FBTyxPQUFPLENBQW1CLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztJQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQUMsQ0FBQztBQUN0RyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU2NoZWR1bGVyTGlrZSwgYXN5bmNTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERvY3VtZW50UmVmZXJlbmNlLCBRdWVyeSwgQWN0aW9uLCBSZWZlcmVuY2UsIERvY3VtZW50U25hcHNob3QsIFF1ZXJ5U25hcHNob3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZnVuY3Rpb24gX2Zyb21SZWY8VCwgUj4ocmVmOiBSZWZlcmVuY2U8VD4sIHNjaGVkdWxlcjogU2NoZWR1bGVyTGlrZSA9IGFzeW5jU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKHNjaGVkdWxlciAhPSBudWxsKSB7XG4gICAgICBzY2hlZHVsZXIuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICB1bnN1YnNjcmliZSA9IHJlZi5vblNuYXBzaG90KHN1YnNjcmliZXIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuc3Vic2NyaWJlID0gcmVmLm9uU25hcHNob3Qoc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHVuc3Vic2NyaWJlICE9IG51bGwpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlZjxSPihyZWY6IERvY3VtZW50UmVmZXJlbmNlIHwgUXVlcnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpIHtcbiAgcmV0dXJuIF9mcm9tUmVmPHR5cGVvZiByZWYsIFI+KHJlZiwgc2NoZWR1bGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Eb2NSZWY8VD4ocmVmOiBEb2N1bWVudFJlZmVyZW5jZSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8QWN0aW9uPERvY3VtZW50U25hcHNob3Q8VD4+PntcbiAgcmV0dXJuIGZyb21SZWY8RG9jdW1lbnRTbmFwc2hvdDxUPj4ocmVmLCBzY2hlZHVsZXIpXG4gICAgLnBpcGUoXG4gICAgICBtYXAocGF5bG9hZCA9PiAoeyBwYXlsb2FkLCB0eXBlOiAndmFsdWUnIH0pKVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQ29sbGVjdGlvblJlZjxUPihyZWY6IFF1ZXJ5LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxBY3Rpb248UXVlcnlTbmFwc2hvdDxUPj4+IHtcbiAgcmV0dXJuIGZyb21SZWY8UXVlcnlTbmFwc2hvdDxUPj4ocmVmLCBzY2hlZHVsZXIpLnBpcGUobWFwKHBheWxvYWQgPT4gKHsgcGF5bG9hZCwgdHlwZTogJ3F1ZXJ5JyB9KSkpO1xufVxuIl19