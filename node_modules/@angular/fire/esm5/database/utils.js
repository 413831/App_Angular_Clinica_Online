/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isNil(obj) {
    return obj === undefined || obj === null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
/**
 * Returns a database reference given a Firebase App and an
 * absolute or relative path.
 * @param {?} database
 * @param {?} pathRef
 * @return {?}
 */
export function getRef(database, pathRef) {
    // if a db ref was passed in, just return it
    return isFirebaseRef(pathRef) ? (/** @type {?} */ (pathRef))
        : database.ref((/** @type {?} */ (pathRef)));
}
/**
 * @param {?} item
 * @param {?} cases
 * @return {?}
 */
export function checkOperationCases(item, cases) {
    if (isString(item)) {
        return cases.stringCase();
    }
    else if (isFirebaseRef(item)) {
        return (/** @type {?} */ (cases.firebaseCase))();
    }
    else if (isFirebaseDataSnapshot(item)) {
        return (/** @type {?} */ (cases.snapshotCase))();
    }
    throw new Error("Expects a string, snapshot, or reference. Got: " + typeof item);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDbkMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBVTtJQUMvQyxPQUFPLE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUFDLEdBQVE7SUFDNUIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDM0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQVU7SUFDdEMsT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDO0FBQ3pDLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUEyQixFQUFFLE9BQXNCO0lBQ3hFLDRDQUE0QztJQUM1QyxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFxQjtRQUMxRCxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBQSxPQUFPLEVBQVUsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUF1QixFQUFFLEtBQTZCO0lBQ3hGLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzNCO1NBQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsT0FBTyxtQkFBQSxLQUFLLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQztLQUM5QjtTQUFNLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsT0FBTyxtQkFBQSxLQUFLLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQztLQUM5QjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQWtELE9BQU8sSUFBTSxDQUFDLENBQUM7QUFDbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYXRoUmVmZXJlbmNlLCBEYXRhYmFzZVJlZmVyZW5jZSwgRmlyZWJhc2VPcGVyYXRpb24sIEZpcmViYXNlT3BlcmF0aW9uQ2FzZXMgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZGF0YWJhc2UgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlyZWJhc2VEYXRhU25hcHNob3QodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlLmV4cG9ydFZhbCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmlsKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZpcmViYXNlUmVmKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZS5zZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGRhdGFiYXNlIHJlZmVyZW5jZSBnaXZlbiBhIEZpcmViYXNlIEFwcCBhbmQgYW5cbiAqIGFic29sdXRlIG9yIHJlbGF0aXZlIHBhdGguXG4gKiBAcGFyYW0gYXBwIC0gRmlyZWJhc2UgQXBwXG4gKiBAcGFyYW0gcGF0aCAtIERhdGFiYXNlIHBhdGgsIHJlbGF0aXZlIG9yIGFic29sdXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWYoZGF0YWJhc2U6IGRhdGFiYXNlLkRhdGFiYXNlLCBwYXRoUmVmOiBQYXRoUmVmZXJlbmNlKTogRGF0YWJhc2VSZWZlcmVuY2Uge1xuICAvLyBpZiBhIGRiIHJlZiB3YXMgcGFzc2VkIGluLCBqdXN0IHJldHVybiBpdFxuICByZXR1cm4gaXNGaXJlYmFzZVJlZihwYXRoUmVmKSA/IHBhdGhSZWYgYXMgRGF0YWJhc2VSZWZlcmVuY2VcbiAgICA6IGRhdGFiYXNlLnJlZihwYXRoUmVmIGFzIHN0cmluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja09wZXJhdGlvbkNhc2VzKGl0ZW06IEZpcmViYXNlT3BlcmF0aW9uLCBjYXNlczogRmlyZWJhc2VPcGVyYXRpb25DYXNlcykgOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgcmV0dXJuIGNhc2VzLnN0cmluZ0Nhc2UoKTtcbiAgfSBlbHNlIGlmIChpc0ZpcmViYXNlUmVmKGl0ZW0pKSB7XG4gICAgcmV0dXJuIGNhc2VzLmZpcmViYXNlQ2FzZSEoKTtcbiAgfSBlbHNlIGlmIChpc0ZpcmViYXNlRGF0YVNuYXBzaG90KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGNhc2VzLnNuYXBzaG90Q2FzZSEoKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdHMgYSBzdHJpbmcsIHNuYXBzaG90LCBvciByZWZlcmVuY2UuIEdvdDogJHt0eXBlb2YgaXRlbX1gKTtcbn1cbiJdfQ==