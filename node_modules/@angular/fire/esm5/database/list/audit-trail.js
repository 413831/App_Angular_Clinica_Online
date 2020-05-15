/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { stateChanges } from './state-changes';
import { fromRef } from '../observable/fromRef';
import { skipWhile, withLatestFrom, map, scan } from 'rxjs/operators';
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
export function auditTrail(query, events, scheduler) {
    /** @type {?} */
    var auditTrail$ = stateChanges(query, events)
        .pipe(scan((/**
     * @param {?} current
     * @param {?} action
     * @return {?}
     */
    function (current, action) { return __spread(current, [action]); }), []));
    return waitForLoaded(query, auditTrail$, scheduler);
}
/**
 * @record
 */
function LoadedMetadata() { }
if (false) {
    /** @type {?} */
    LoadedMetadata.prototype.data;
    /** @type {?} */
    LoadedMetadata.prototype.lastKeyToLoad;
}
/**
 * @template T
 * @param {?} query
 * @param {?=} scheduler
 * @return {?}
 */
function loadedData(query, scheduler) {
    // Create an observable of loaded values to retrieve the
    // known dataset. This will allow us to know what key to
    // emit the "whole" array at when listening for child events.
    return fromRef(query, 'value', 'on', scheduler)
        .pipe(map((/**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // Store the last key in the data set
        /** @type {?} */
        var lastKeyToLoad;
        // Loop through loaded dataset to find the last key
        data.payload.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            lastKeyToLoad = child.key;
            return false;
        }));
        // return data set and the current last key loaded
        return { data: data, lastKeyToLoad: lastKeyToLoad };
    })));
}
/**
 * @template T
 * @param {?} query
 * @param {?} action$
 * @param {?=} scheduler
 * @return {?}
 */
function waitForLoaded(query, action$, scheduler) {
    /** @type {?} */
    var loaded$ = loadedData(query, scheduler);
    return loaded$
        .pipe(withLatestFrom(action$), 
    // Get the latest values from the "loaded" and "child" datasets
    // We can use both datasets to form an array of the latest values.
    map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = __read(_a, 2), loaded = _b[0], actions = _b[1];
        // Store the last key in the data set
        /** @type {?} */
        var lastKeyToLoad = loaded.lastKeyToLoad;
        // Store all child keys loaded at this point
        /** @type {?} */
        var loadedKeys = actions.map((/**
         * @param {?} snap
         * @return {?}
         */
        function (snap) { return snap.key; }));
        return { actions: actions, lastKeyToLoad: lastKeyToLoad, loadedKeys: loadedKeys };
    })), 
    // This is the magical part, only emit when the last load key
    // in the dataset has been loaded by a child event. At this point
    // we can assume the dataset is "whole".
    skipWhile((/**
     * @param {?} meta
     * @return {?}
     */
    function (meta) { return meta.loadedKeys.indexOf(meta.lastKeyToLoad) === -1; })), 
    // Pluck off the meta data because the user only cares
    // to iterate through the snapshots
    map((/**
     * @param {?} meta
     * @return {?}
     */
    function (meta) { return meta.actions; })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtdHJhaWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsibGlzdC9hdWRpdC10cmFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQUV0RSxNQUFNLFVBQVUsVUFBVSxDQUFJLEtBQW9CLEVBQUUsTUFBcUIsRUFBRSxTQUF5Qjs7UUFDNUYsV0FBVyxHQUFHLFlBQVksQ0FBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO1NBQy9DLElBQUksQ0FDSCxJQUFJOzs7OztJQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSyxnQkFBSSxPQUFPLEdBQUUsTUFBTSxJQUFuQixDQUFvQixHQUFFLEVBQUUsQ0FBQyxDQUNwRDtJQUNILE9BQU8sYUFBYSxDQUFJLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7OztBQUVELDZCQUdDOzs7SUFGQyw4QkFBc0M7O0lBQ3RDLHVDQUFtQjs7Ozs7Ozs7QUFHckIsU0FBUyxVQUFVLENBQUksS0FBb0IsRUFBRSxTQUF5QjtJQUNwRSx3REFBd0Q7SUFDeEQsd0RBQXdEO0lBQ3hELDZEQUE2RDtJQUM3RCxPQUFPLE9BQU8sQ0FBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUM7U0FDakQsSUFBSSxDQUNILEdBQUc7Ozs7SUFBQyxVQUFBLElBQUk7OztZQUVGLGFBQWE7UUFDakIsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSztZQUN4QixhQUFhLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUFDLE9BQU8sS0FBSyxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUFDO1FBQ0gsa0RBQWtEO1FBQ2xELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxhQUFhLGVBQUEsRUFBRSxDQUFDO0lBQ2pDLENBQUMsRUFBQyxDQUNILENBQUM7QUFDSixDQUFDOzs7Ozs7OztBQUVELFNBQVMsYUFBYSxDQUFJLEtBQW9CLEVBQUUsT0FBd0MsRUFBRSxTQUF5Qjs7UUFDM0csT0FBTyxHQUFHLFVBQVUsQ0FBSSxLQUFLLEVBQUUsU0FBUyxDQUFDO0lBQy9DLE9BQU8sT0FBTztTQUNYLElBQUksQ0FDSCxjQUFjLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLCtEQUErRDtJQUMvRCxrRUFBa0U7SUFDbEUsR0FBRzs7OztJQUFDLFVBQUMsRUFBaUI7WUFBakIsa0JBQWlCLEVBQWhCLGNBQU0sRUFBRSxlQUFPOzs7WUFFZixhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWE7OztZQUVsQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEVBQVIsQ0FBUSxFQUFDO1FBQ2hELE9BQU8sRUFBRSxPQUFPLFNBQUEsRUFBRSxhQUFhLGVBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFBO0lBQy9DLENBQUMsRUFBQztJQUNGLDZEQUE2RDtJQUM3RCxpRUFBaUU7SUFDakUsd0NBQXdDO0lBQ3hDLFNBQVM7Ozs7SUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBbEQsQ0FBa0QsRUFBQztJQUNyRSxzREFBc0Q7SUFDdEQsbUNBQW1DO0lBQ25DLEdBQUc7Ozs7SUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosQ0FBWSxFQUFDLENBQzFCLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVNuYXBzaG90LCBEYXRhYmFzZVF1ZXJ5LCBDaGlsZEV2ZW50LCBEYXRhYmFzZVNuYXBzaG90LCBBbmd1bGFyRmlyZUFjdGlvbiwgU25hcHNob3RBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHN0YXRlQ2hhbmdlcyB9IGZyb20gJy4vc3RhdGUtY2hhbmdlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmcm9tUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcblxuaW1wb3J0IHsgc2tpcFdoaWxlLCB3aXRoTGF0ZXN0RnJvbSwgbWFwLCBzY2FuIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXVkaXRUcmFpbDxUPihxdWVyeTogRGF0YWJhc2VRdWVyeSwgZXZlbnRzPzogQ2hpbGRFdmVudFtdLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxTbmFwc2hvdEFjdGlvbjxUPltdPiB7XG4gIGNvbnN0IGF1ZGl0VHJhaWwkID0gc3RhdGVDaGFuZ2VzPFQ+KHF1ZXJ5LCBldmVudHMpXG4gICAgLnBpcGUoXG4gICAgICBzY2FuKChjdXJyZW50LCBhY3Rpb24pID0+IFsuLi5jdXJyZW50LCBhY3Rpb25dLCBbXSlcbiAgICApO1xuICByZXR1cm4gd2FpdEZvckxvYWRlZDxUPihxdWVyeSwgYXVkaXRUcmFpbCQsIHNjaGVkdWxlcik7XG59XG5cbmludGVyZmFjZSBMb2FkZWRNZXRhZGF0YSB7XG4gIGRhdGE6IEFuZ3VsYXJGaXJlQWN0aW9uPERhdGFTbmFwc2hvdD47XG4gIGxhc3RLZXlUb0xvYWQ6IGFueTtcbn1cblxuZnVuY3Rpb24gbG9hZGVkRGF0YTxUPihxdWVyeTogRGF0YWJhc2VRdWVyeSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8TG9hZGVkTWV0YWRhdGE+IHtcbiAgLy8gQ3JlYXRlIGFuIG9ic2VydmFibGUgb2YgbG9hZGVkIHZhbHVlcyB0byByZXRyaWV2ZSB0aGVcbiAgLy8ga25vd24gZGF0YXNldC4gVGhpcyB3aWxsIGFsbG93IHVzIHRvIGtub3cgd2hhdCBrZXkgdG9cbiAgLy8gZW1pdCB0aGUgXCJ3aG9sZVwiIGFycmF5IGF0IHdoZW4gbGlzdGVuaW5nIGZvciBjaGlsZCBldmVudHMuXG4gIHJldHVybiBmcm9tUmVmPFQ+KHF1ZXJ5LCAndmFsdWUnLCAnb24nLCBzY2hlZHVsZXIpXG4gIC5waXBlKFxuICAgIG1hcChkYXRhID0+IHtcbiAgICAgIC8vIFN0b3JlIHRoZSBsYXN0IGtleSBpbiB0aGUgZGF0YSBzZXRcbiAgICAgIGxldCBsYXN0S2V5VG9Mb2FkO1xuICAgICAgLy8gTG9vcCB0aHJvdWdoIGxvYWRlZCBkYXRhc2V0IHRvIGZpbmQgdGhlIGxhc3Qga2V5XG4gICAgICBkYXRhLnBheWxvYWQuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGxhc3RLZXlUb0xvYWQgPSBjaGlsZC5rZXk7IHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgLy8gcmV0dXJuIGRhdGEgc2V0IGFuZCB0aGUgY3VycmVudCBsYXN0IGtleSBsb2FkZWRcbiAgICAgIHJldHVybiB7IGRhdGEsIGxhc3RLZXlUb0xvYWQgfTtcbiAgICB9KVxuICApO1xufVxuXG5mdW5jdGlvbiB3YWl0Rm9yTG9hZGVkPFQ+KHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5LCBhY3Rpb24kOiBPYnNlcnZhYmxlPFNuYXBzaG90QWN0aW9uPFQ+W10+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKSB7XG4gIGNvbnN0IGxvYWRlZCQgPSBsb2FkZWREYXRhPFQ+KHF1ZXJ5LCBzY2hlZHVsZXIpO1xuICByZXR1cm4gbG9hZGVkJFxuICAgIC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20oYWN0aW9uJCksXG4gICAgICAvLyBHZXQgdGhlIGxhdGVzdCB2YWx1ZXMgZnJvbSB0aGUgXCJsb2FkZWRcIiBhbmQgXCJjaGlsZFwiIGRhdGFzZXRzXG4gICAgICAvLyBXZSBjYW4gdXNlIGJvdGggZGF0YXNldHMgdG8gZm9ybSBhbiBhcnJheSBvZiB0aGUgbGF0ZXN0IHZhbHVlcy5cbiAgICAgIG1hcCgoW2xvYWRlZCwgYWN0aW9uc10pID0+IHtcbiAgICAgICAgLy8gU3RvcmUgdGhlIGxhc3Qga2V5IGluIHRoZSBkYXRhIHNldFxuICAgICAgICBsZXQgbGFzdEtleVRvTG9hZCA9IGxvYWRlZC5sYXN0S2V5VG9Mb2FkO1xuICAgICAgICAvLyBTdG9yZSBhbGwgY2hpbGQga2V5cyBsb2FkZWQgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCBsb2FkZWRLZXlzID0gYWN0aW9ucy5tYXAoc25hcCA9PiBzbmFwLmtleSk7XG4gICAgICAgIHJldHVybiB7IGFjdGlvbnMsIGxhc3RLZXlUb0xvYWQsIGxvYWRlZEtleXMgfVxuICAgICAgfSksXG4gICAgICAvLyBUaGlzIGlzIHRoZSBtYWdpY2FsIHBhcnQsIG9ubHkgZW1pdCB3aGVuIHRoZSBsYXN0IGxvYWQga2V5XG4gICAgICAvLyBpbiB0aGUgZGF0YXNldCBoYXMgYmVlbiBsb2FkZWQgYnkgYSBjaGlsZCBldmVudC4gQXQgdGhpcyBwb2ludFxuICAgICAgLy8gd2UgY2FuIGFzc3VtZSB0aGUgZGF0YXNldCBpcyBcIndob2xlXCIuXG4gICAgICBza2lwV2hpbGUobWV0YSA9PiBtZXRhLmxvYWRlZEtleXMuaW5kZXhPZihtZXRhLmxhc3RLZXlUb0xvYWQpID09PSAtMSksXG4gICAgICAvLyBQbHVjayBvZmYgdGhlIG1ldGEgZGF0YSBiZWNhdXNlIHRoZSB1c2VyIG9ubHkgY2FyZXNcbiAgICAgIC8vIHRvIGl0ZXJhdGUgdGhyb3VnaCB0aGUgc25hcHNob3RzXG4gICAgICBtYXAobWV0YSA9PiBtZXRhLmFjdGlvbnMpXG4gICAgKTtcbn1cbiJdfQ==