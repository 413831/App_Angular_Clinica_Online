/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { checkOperationCases } from '../utils';
// TODO(davideast): Find out why TS thinks this returns firebase.Primise
// instead of Promise.
/**
 * @template T
 * @param {?} ref
 * @return {?}
 */
export function createRemoveMethod(ref) {
    return (/**
     * @param {?=} item
     * @return {?}
     */
    function remove(item) {
        if (!item) {
            return ref.remove();
        }
        return checkOperationCases(item, {
            stringCase: (/**
             * @return {?}
             */
            () => ref.child((/** @type {?} */ (item))).remove()),
            firebaseCase: (/**
             * @return {?}
             */
            () => ((/** @type {?} */ (item))).remove()),
            snapshotCase: (/**
             * @return {?}
             */
            () => ((/** @type {?} */ (item))).ref.remove())
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9kYXRhYmFzZS8iLCJzb3VyY2VzIjpbImxpc3QvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7O0FBSy9DLE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxHQUFzQjtJQUMxRDs7OztJQUFPLFNBQVMsTUFBTSxDQUFDLElBQXdCO1FBQzdDLElBQUcsQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUFFO1FBQ2xDLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFO1lBQy9CLFVBQVU7OztZQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQVEsSUFBSSxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNsRCxZQUFZOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ3RELFlBQVk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQXFCLElBQUksRUFBQSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQzdELENBQUMsQ0FBQztJQUNMLENBQUMsRUFBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhYmFzZVJlZmVyZW5jZSwgRGF0YVNuYXBzaG90LCBGaXJlYmFzZU9wZXJhdGlvbiwgRGF0YWJhc2VTbmFwc2hvdCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY2hlY2tPcGVyYXRpb25DYXNlcyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGRhdGFiYXNlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcblxuLy8gVE9ETyhkYXZpZGVhc3QpOiBGaW5kIG91dCB3aHkgVFMgdGhpbmtzIHRoaXMgcmV0dXJucyBmaXJlYmFzZS5QcmltaXNlXG4vLyBpbnN0ZWFkIG9mIFByb21pc2UuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVtb3ZlTWV0aG9kPFQ+KHJlZjogRGF0YWJhc2VSZWZlcmVuY2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZShpdGVtPzogRmlyZWJhc2VPcGVyYXRpb24pOiBhbnkge1xuICAgIGlmKCFpdGVtKSB7IHJldHVybiByZWYucmVtb3ZlKCk7IH1cbiAgICByZXR1cm4gY2hlY2tPcGVyYXRpb25DYXNlcyhpdGVtLCB7XG4gICAgICBzdHJpbmdDYXNlOiAoKSA9PiByZWYuY2hpbGQoPHN0cmluZz5pdGVtKS5yZW1vdmUoKSxcbiAgICAgIGZpcmViYXNlQ2FzZTogKCkgPT4gKDxEYXRhYmFzZVJlZmVyZW5jZT5pdGVtKS5yZW1vdmUoKSxcbiAgICAgIHNuYXBzaG90Q2FzZTogKCkgPT4gKDxEYXRhYmFzZVNuYXBzaG90PFQ+Pml0ZW0pLnJlZi5yZW1vdmUoKVxuICAgIH0pO1xuICB9XG59XG4iXX0=