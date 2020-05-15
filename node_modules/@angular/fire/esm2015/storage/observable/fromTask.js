/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
/**
 * @param {?} task
 * @return {?}
 */
export function fromTask(task) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        const progress = (/**
         * @param {?} snap
         * @return {?}
         */
        (snap) => subscriber.next(snap));
        /** @type {?} */
        const error = (/**
         * @param {?} e
         * @return {?}
         */
        e => subscriber.error(e));
        /** @type {?} */
        const complete = (/**
         * @return {?}
         */
        () => subscriber.complete());
        task.on('state_changed', progress, error, complete);
        return (/**
         * @return {?}
         */
        () => task.cancel());
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRhc2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL3N0b3JhZ2UvIiwic291cmNlcyI6WyJvYnNlcnZhYmxlL2Zyb21UYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUlsQyxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQWdCO0lBQ3ZDLE9BQU8sSUFBSSxVQUFVOzs7O0lBQXFCLFVBQVUsQ0FBQyxFQUFFOztjQUMvQyxRQUFROzs7O1FBQUcsQ0FBQyxJQUF3QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBOztjQUM5RCxLQUFLOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBOztjQUNoQyxRQUFROzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRDs7O1FBQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDO0lBQzdCLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVwbG9hZFRhc2ssIFVwbG9hZFRhc2tTbmFwc2hvdCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVGFzayh0YXNrOiBVcGxvYWRUYXNrKSB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxVcGxvYWRUYXNrU25hcHNob3Q+KHN1YnNjcmliZXIgPT4ge1xuICAgIGNvbnN0IHByb2dyZXNzID0gKHNuYXA6IFVwbG9hZFRhc2tTbmFwc2hvdCkgPT4gc3Vic2NyaWJlci5uZXh0KHNuYXApO1xuICAgIGNvbnN0IGVycm9yID0gZSA9PiBzdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4gc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIHRhc2sub24oJ3N0YXRlX2NoYW5nZWQnLCBwcm9ncmVzcywgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICByZXR1cm4gKCkgPT4gdGFzay5jYW5jZWwoKTtcbiAgfSk7XG59XG4iXX0=