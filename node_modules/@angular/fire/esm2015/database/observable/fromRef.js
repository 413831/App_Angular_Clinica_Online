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
export function fromRef(ref, event, listenType = 'on', scheduler = asyncScheduler) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        let fn = null;
        fn = ref[listenType](event, (/**
         * @param {?} snapshot
         * @param {?} prevKey
         * @return {?}
         */
        (snapshot, prevKey) => {
            scheduler.schedule((/**
             * @return {?}
             */
            () => {
                subscriber.next({ snapshot, prevKey });
            }));
            if (listenType == 'once') {
                scheduler.schedule((/**
                 * @return {?}
                 */
                () => subscriber.complete()));
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            scheduler.schedule((/**
             * @return {?}
             */
            () => subscriber.error(err)));
        }));
        if (listenType == 'on') {
            return {
                /**
                 * @return {?}
                 */
                unsubscribe() {
                    if (fn != null) {
                        ref.off(event, fn);
                    }
                }
            };
        }
        else {
            return { /**
                 * @return {?}
                 */
                unsubscribe() { } };
        }
    })).pipe(map((/**
     * @param {?} payload
     * @return {?}
     */
    payload => {
        const { snapshot, prevKey } = payload;
        /** @type {?} */
        let key = null;
        if (snapshot.exists()) {
            key = snapshot.key;
        }
        return { type: event, payload: snapshot, prevKey, key };
    })), share());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJvYnNlcnZhYmxlL2Zyb21SZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQWlDLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU1Qyw4QkFHQzs7O0lBRkMsbUNBQThCOztJQUM5QixrQ0FBbUM7Ozs7Ozs7Ozs7O0FBUXJDLE1BQU0sVUFBVSxPQUFPLENBQUksR0FBa0IsRUFBRSxLQUFrQixFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQUUsWUFBMkIsY0FBYztJQUM3SCxPQUFPLElBQUksVUFBVTs7OztJQUFxQixVQUFVLENBQUMsRUFBRTs7WUFDakQsRUFBRSxHQUFlLElBQUk7UUFDekIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLOzs7OztRQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2hELFNBQVMsQ0FBQyxRQUFROzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksVUFBVSxJQUFJLE1BQU0sRUFBRTtnQkFDeEIsU0FBUyxDQUFDLFFBQVE7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQzthQUNqRDtRQUNILENBQUM7Ozs7UUFBRSxHQUFHLENBQUMsRUFBRTtZQUNQLFNBQVMsQ0FBQyxRQUFROzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUE7UUFDakQsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTzs7OztnQkFDTCxXQUFXO29CQUNULElBQUksRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDZCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDcEI7Z0JBQ0gsQ0FBQzthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTzs7O2dCQUFFLFdBQVcsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUMsRUFBQyxDQUFDLElBQUksQ0FDTCxHQUFHOzs7O0lBQUMsT0FBTyxDQUFDLEVBQUU7Y0FDTixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPOztZQUNqQyxHQUFHLEdBQWtCLElBQUk7UUFDN0IsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUFFO1FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzFELENBQUMsRUFBQyxFQUNGLEtBQUssRUFBRSxDQUNSLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2VRdWVyeSwgRGF0YWJhc2VTbmFwc2hvdCwgTGlzdGVuRXZlbnQsIEFuZ3VsYXJGaXJlQWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTY2hlZHVsZXJMaWtlLCBxdWV1ZVNjaGVkdWxlciwgYXN5bmNTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmludGVyZmFjZSBTbmFwc2hvdFByZXZLZXk8VD4ge1xuICBzbmFwc2hvdDogRGF0YWJhc2VTbmFwc2hvdDxUPjtcbiAgcHJldktleTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmcm9tIGEgRGF0YWJhc2UgUmVmZXJlbmNlIG9yIERhdGFiYXNlIFF1ZXJ5LlxuICogQHBhcmFtIHJlZiBEYXRhYmFzZSBSZWZlcmVuY2VcbiAqIEBwYXJhbSBldmVudCBMaXN0ZW4gZXZlbnQgdHlwZSAoJ3ZhbHVlJywgJ2FkZGVkJywgJ2NoYW5nZWQnLCAncmVtb3ZlZCcsICdtb3ZlZCcpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUmVmPFQ+KHJlZjogRGF0YWJhc2VRdWVyeSwgZXZlbnQ6IExpc3RlbkV2ZW50LCBsaXN0ZW5UeXBlID0gJ29uJywgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlID0gYXN5bmNTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPEFuZ3VsYXJGaXJlQWN0aW9uPERhdGFiYXNlU25hcHNob3Q8VD4+PiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxTbmFwc2hvdFByZXZLZXk8VD4+KHN1YnNjcmliZXIgPT4ge1xuICAgIGxldCBmbjogYW55IHwgbnVsbCA9IG51bGw7XG4gICAgZm4gPSByZWZbbGlzdGVuVHlwZV0oZXZlbnQsIChzbmFwc2hvdCwgcHJldktleSkgPT4ge1xuICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHsgc25hcHNob3QsIHByZXZLZXkgfSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChsaXN0ZW5UeXBlID09ICdvbmNlJykge1xuICAgICAgICBzY2hlZHVsZXIuc2NoZWR1bGUoKCkgPT4gc3Vic2NyaWJlci5jb21wbGV0ZSgpKTtcbiAgICAgIH1cbiAgICB9LCBlcnIgPT4ge1xuICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKCgpID0+IHN1YnNjcmliZXIuZXJyb3IoZXJyKSlcbiAgICB9KTtcblxuICAgIGlmIChsaXN0ZW5UeXBlID09ICdvbicpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIGlmIChmbiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWYub2ZmKGV2ZW50LCBmbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB1bnN1YnNjcmliZSgpIHsgfSB9O1xuICAgIH1cbiAgfSkucGlwZShcbiAgICBtYXAocGF5bG9hZCA9PiB7XG4gICAgICBjb25zdCB7IHNuYXBzaG90LCBwcmV2S2V5IH0gPSBwYXlsb2FkO1xuICAgICAgbGV0IGtleTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICBpZiAoc25hcHNob3QuZXhpc3RzKCkpIHsga2V5ID0gc25hcHNob3Qua2V5OyB9XG4gICAgICByZXR1cm4geyB0eXBlOiBldmVudCwgcGF5bG9hZDogc25hcHNob3QsIHByZXZLZXksIGtleSB9O1xuICAgIH0pLFxuICAgIHNoYXJlKClcbiAgKTtcbn1cbiJdfQ==