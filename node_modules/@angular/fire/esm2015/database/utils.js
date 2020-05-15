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
    throw new Error(`Expects a string, snapshot, or reference. Got: ${typeof item}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDbkMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBVTtJQUMvQyxPQUFPLE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUFDLEdBQVE7SUFDNUIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDM0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQVU7SUFDdEMsT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDO0FBQ3pDLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUEyQixFQUFFLE9BQXNCO0lBQ3hFLDRDQUE0QztJQUM1QyxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFxQjtRQUMxRCxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBQSxPQUFPLEVBQVUsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUF1QixFQUFFLEtBQTZCO0lBQ3hGLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzNCO1NBQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsT0FBTyxtQkFBQSxLQUFLLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQztLQUM5QjtTQUFNLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsT0FBTyxtQkFBQSxLQUFLLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQztLQUM5QjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBhdGhSZWZlcmVuY2UsIERhdGFiYXNlUmVmZXJlbmNlLCBGaXJlYmFzZU9wZXJhdGlvbiwgRmlyZWJhc2VPcGVyYXRpb25DYXNlcyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBkYXRhYmFzZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaXJlYmFzZURhdGFTbmFwc2hvdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUuZXhwb3J0VmFsID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOaWwob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlyZWJhc2VSZWYodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlLnNldCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGF0YWJhc2UgcmVmZXJlbmNlIGdpdmVuIGEgRmlyZWJhc2UgQXBwIGFuZCBhblxuICogYWJzb2x1dGUgb3IgcmVsYXRpdmUgcGF0aC5cbiAqIEBwYXJhbSBhcHAgLSBGaXJlYmFzZSBBcHBcbiAqIEBwYXJhbSBwYXRoIC0gRGF0YWJhc2UgcGF0aCwgcmVsYXRpdmUgb3IgYWJzb2x1dGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZihkYXRhYmFzZTogZGF0YWJhc2UuRGF0YWJhc2UsIHBhdGhSZWY6IFBhdGhSZWZlcmVuY2UpOiBEYXRhYmFzZVJlZmVyZW5jZSB7XG4gIC8vIGlmIGEgZGIgcmVmIHdhcyBwYXNzZWQgaW4sIGp1c3QgcmV0dXJuIGl0XG4gIHJldHVybiBpc0ZpcmViYXNlUmVmKHBhdGhSZWYpID8gcGF0aFJlZiBhcyBEYXRhYmFzZVJlZmVyZW5jZVxuICAgIDogZGF0YWJhc2UucmVmKHBhdGhSZWYgYXMgc3RyaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrT3BlcmF0aW9uQ2FzZXMoaXRlbTogRmlyZWJhc2VPcGVyYXRpb24sIGNhc2VzOiBGaXJlYmFzZU9wZXJhdGlvbkNhc2VzKSA6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICByZXR1cm4gY2FzZXMuc3RyaW5nQ2FzZSgpO1xuICB9IGVsc2UgaWYgKGlzRmlyZWJhc2VSZWYoaXRlbSkpIHtcbiAgICByZXR1cm4gY2FzZXMuZmlyZWJhc2VDYXNlISgpO1xuICB9IGVsc2UgaWYgKGlzRmlyZWJhc2VEYXRhU25hcHNob3QoaXRlbSkpIHtcbiAgICByZXR1cm4gY2FzZXMuc25hcHNob3RDYXNlISgpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgRXhwZWN0cyBhIHN0cmluZywgc25hcHNob3QsIG9yIHJlZmVyZW5jZS4gR290OiAke3R5cGVvZiBpdGVtfWApO1xufVxuIl19