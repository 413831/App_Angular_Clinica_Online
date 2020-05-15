/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable, asyncScheduler } from 'rxjs';
import { map, share } from 'rxjs/operators';
/**
 * @record
 * @template T
 */
function SnapshotPrevKey() { }
if (false) {
    /** @type {?} */
    SnapshotPrevKey.prototype.snapshot;
    /** @type {?} */
    SnapshotPrevKey.prototype.prevKey;
}
/**
 * Create an observable from a Database Reference or Database Query.
 * @template T
 * @param {?} ref Database Reference
 * @param {?} event Listen event type ('value', 'added', 'changed', 'removed', 'moved')
 * @param {?=} listenType
 * @param {?=} scheduler
 * @return {?}
 */
export function fromRef(ref, event, listenType, scheduler) {
    if (listenType === void 0) { listenType = 'on'; }
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    function (subscriber) {
        /** @type {?} */
        var fn = null;
        fn = ref[listenType](event, (/**
         * @param {?} snapshot
         * @param {?} prevKey
         * @return {?}
         */
        function (snapshot, prevKey) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () {
                subscriber.next({ snapshot: snapshot, prevKey: prevKey });
            }));
            if (listenType == 'once') {
                scheduler.schedule((/**
                 * @return {?}
                 */
                function () { return subscriber.complete(); }));
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            scheduler.schedule((/**
             * @return {?}
             */
            function () { return subscriber.error(err); }));
        }));
        if (listenType == 'on') {
            return {
                unsubscribe: /**
                 * @return {?}
                 */
                function () {
                    if (fn != null) {
                        ref.off(event, fn);
                    }
                }
            };
        }
        else {
            return { unsubscribe: /**
                 * @return {?}
                 */
                function () { } };
        }
    })).pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        var snapshot = payload.snapshot, prevKey = payload.prevKey;
        /** @type {?} */
        var key = null;
        if (snapshot.exists()) {
            key = snapshot.key;
        }
        return { type: event, payload: snapshot, prevKey: prevKey, key: key };
    })), share());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJvYnNlcnZhYmxlL2Zyb21SZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQWlDLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU1Qyw4QkFHQzs7O0lBRkMsbUNBQThCOztJQUM5QixrQ0FBbUM7Ozs7Ozs7Ozs7O0FBUXJDLE1BQU0sVUFBVSxPQUFPLENBQUksR0FBa0IsRUFBRSxLQUFrQixFQUFFLFVBQWlCLEVBQUUsU0FBeUM7SUFBNUQsMkJBQUEsRUFBQSxpQkFBaUI7SUFBRSwwQkFBQSxFQUFBLDBCQUF5QztJQUM3SCxPQUFPLElBQUksVUFBVTs7OztJQUFxQixVQUFBLFVBQVU7O1lBQzlDLEVBQUUsR0FBZSxJQUFJO1FBQ3pCLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSzs7Ozs7UUFBRSxVQUFDLFFBQVEsRUFBRSxPQUFPO1lBQzVDLFNBQVMsQ0FBQyxRQUFROzs7WUFBQztnQkFDakIsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksVUFBVSxJQUFJLE1BQU0sRUFBRTtnQkFDeEIsU0FBUyxDQUFDLFFBQVE7OztnQkFBQyxjQUFNLE9BQUEsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFyQixDQUFxQixFQUFDLENBQUM7YUFDakQ7UUFDSCxDQUFDOzs7O1FBQUUsVUFBQSxHQUFHO1lBQ0osU0FBUyxDQUFDLFFBQVE7OztZQUFDLGNBQU0sT0FBQSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixFQUFDLENBQUE7UUFDakQsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTztnQkFDTCxXQUFXOzs7O29CQUNULElBQUksRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDZCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDcEI7Z0JBQ0gsQ0FBQzthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxFQUFFLFdBQVc7Ozs4QkFBSyxDQUFDLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUMsRUFBQyxDQUFDLElBQUksQ0FDTCxHQUFHOzs7O0lBQUMsVUFBQSxPQUFPO1FBQ0QsSUFBQSwyQkFBUSxFQUFFLHlCQUFPOztZQUNyQixHQUFHLEdBQWtCLElBQUk7UUFDN0IsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUFFO1FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxTQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQztJQUMxRCxDQUFDLEVBQUMsRUFDRixLQUFLLEVBQUUsQ0FDUixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFiYXNlUXVlcnksIERhdGFiYXNlU25hcHNob3QsIExpc3RlbkV2ZW50LCBBbmd1bGFyRmlyZUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU2NoZWR1bGVyTGlrZSwgcXVldWVTY2hlZHVsZXIsIGFzeW5jU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgU25hcHNob3RQcmV2S2V5PFQ+IHtcbiAgc25hcHNob3Q6IERhdGFiYXNlU25hcHNob3Q8VD47XG4gIHByZXZLZXk6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIG9ic2VydmFibGUgZnJvbSBhIERhdGFiYXNlIFJlZmVyZW5jZSBvciBEYXRhYmFzZSBRdWVyeS5cbiAqIEBwYXJhbSByZWYgRGF0YWJhc2UgUmVmZXJlbmNlXG4gKiBAcGFyYW0gZXZlbnQgTGlzdGVuIGV2ZW50IHR5cGUgKCd2YWx1ZScsICdhZGRlZCcsICdjaGFuZ2VkJywgJ3JlbW92ZWQnLCAnbW92ZWQnKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlZjxUPihyZWY6IERhdGFiYXNlUXVlcnksIGV2ZW50OiBMaXN0ZW5FdmVudCwgbGlzdGVuVHlwZSA9ICdvbicsIHNjaGVkdWxlcjogU2NoZWR1bGVyTGlrZSA9IGFzeW5jU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxBbmd1bGFyRmlyZUFjdGlvbjxEYXRhYmFzZVNuYXBzaG90PFQ+Pj4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8U25hcHNob3RQcmV2S2V5PFQ+PihzdWJzY3JpYmVyID0+IHtcbiAgICBsZXQgZm46IGFueSB8IG51bGwgPSBudWxsO1xuICAgIGZuID0gcmVmW2xpc3RlblR5cGVdKGV2ZW50LCAoc25hcHNob3QsIHByZXZLZXkpID0+IHtcbiAgICAgIHNjaGVkdWxlci5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh7IHNuYXBzaG90LCBwcmV2S2V5IH0pO1xuICAgICAgfSk7XG4gICAgICBpZiAobGlzdGVuVHlwZSA9PSAnb25jZScpIHtcbiAgICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKCgpID0+IHN1YnNjcmliZXIuY29tcGxldGUoKSk7XG4gICAgICB9XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHNjaGVkdWxlci5zY2hlZHVsZSgoKSA9PiBzdWJzY3JpYmVyLmVycm9yKGVycikpXG4gICAgfSk7XG5cbiAgICBpZiAobGlzdGVuVHlwZSA9PSAnb24nKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICBpZiAoZm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVmLm9mZihldmVudCwgZm4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmUoKSB7IH0gfTtcbiAgICB9XG4gIH0pLnBpcGUoXG4gICAgbWFwKHBheWxvYWQgPT4ge1xuICAgICAgY29uc3QgeyBzbmFwc2hvdCwgcHJldktleSB9ID0gcGF5bG9hZDtcbiAgICAgIGxldCBrZXk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgaWYgKHNuYXBzaG90LmV4aXN0cygpKSB7IGtleSA9IHNuYXBzaG90LmtleTsgfVxuICAgICAgcmV0dXJuIHsgdHlwZTogZXZlbnQsIHBheWxvYWQ6IHNuYXBzaG90LCBwcmV2S2V5LCBrZXkgfTtcbiAgICB9KSxcbiAgICBzaGFyZSgpXG4gICk7XG59XG4iXX0=