/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
export function DocumentSnapshotExists() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotExists.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotExists.prototype.data = function (options) { };
}
/**
 * @record
 */
export function DocumentSnapshotDoesNotExist() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotDoesNotExist.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.data = function (options) { };
    /**
     * @param {?} fieldPath
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.get = function (fieldPath, options) { };
}
/**
 * @record
 * @template T
 */
export function QueryDocumentSnapshot() { }
if (false) {
    /**
     * @param {?=} options
     * @return {?}
     */
    QueryDocumentSnapshot.prototype.data = function (options) { };
}
/**
 * @record
 * @template T
 */
export function QuerySnapshot() { }
if (false) {
    /** @type {?} */
    QuerySnapshot.prototype.docs;
}
/**
 * @record
 * @template T
 */
export function DocumentChange() { }
if (false) {
    /** @type {?} */
    DocumentChange.prototype.doc;
}
/**
 * @record
 * @template T
 */
export function DocumentChangeAction() { }
if (false) {
    /** @type {?} */
    DocumentChangeAction.prototype.type;
    /** @type {?} */
    DocumentChangeAction.prototype.payload;
}
/**
 * @record
 * @template T
 */
export function Action() { }
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?} */
    Action.prototype.payload;
}
;
/**
 * @record
 * @template T
 */
export function Reference() { }
if (false) {
    /** @type {?} */
    Reference.prototype.onSnapshot;
}
/**
 * A structure that provides an association between a reference
 * and a query on that reference. Note: Performing operations
 * on the reference can lead to confusing results with complicated
 * queries.
 *
 * Example:
 *
 * const query = ref.where('type', '==', 'Book').
 *                  .where('price', '>' 18.00)
 *                  .where('price', '<' 100.00)
 *                  .where('category', '==', 'Fiction')
 *                  .where('publisher', '==', 'BigPublisher')
 *
 * // This addition would not be a result of the query above
 * ref.add({
 *  type: 'Magazine',
 *  price: 4.99,
 *  category: 'Sports',
 *  publisher: 'SportsPublisher'
 * });
 * @record
 */
export function AssociatedReference() { }
if (false) {
    /** @type {?} */
    AssociatedReference.prototype.ref;
    /** @type {?} */
    AssociatedReference.prototype.query;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWVBLDRDQUdDOzs7SUFGQyx3Q0FBc0I7Ozs7O0lBQ3RCLCtEQUFtQzs7Ozs7QUFHckMsa0RBSUM7OztJQUhDLDhDQUF1Qjs7Ozs7SUFDdkIscUVBQTJDOzs7Ozs7SUFDM0MsK0VBQXlFOzs7Ozs7QUFLM0UsMkNBRUM7Ozs7OztJQURDLDhEQUFtQzs7Ozs7O0FBR3JDLG1DQUVDOzs7SUFEQyw2QkFBMEM7Ozs7OztBQUc1QyxvQ0FFQzs7O0lBREMsNkJBQXVDOzs7Ozs7QUFHekMsMENBR0M7OztJQUZDLG9DQUF5Qjs7SUFDekIsdUNBQTJCOzs7Ozs7QUFHN0IsNEJBR0M7OztJQUZDLHNCQUFhOztJQUNiLHlCQUFXOztBQUNaLENBQUM7Ozs7O0FBRUYsK0JBRUM7OztJQURDLCtCQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCNUMseUNBR0M7OztJQUZDLGtDQUF5Qjs7SUFDekIsb0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5leHBvcnQgdHlwZSBTZXR0aW5ncyA9ICBmaXJlc3RvcmUuU2V0dGluZ3M7XG5leHBvcnQgdHlwZSBDb2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2U7XG5leHBvcnQgdHlwZSBEb2N1bWVudFJlZmVyZW5jZSA9IGZpcmVzdG9yZS5Eb2N1bWVudFJlZmVyZW5jZTtcbmV4cG9ydCB0eXBlIFBlcnNpc3RlbmNlU2V0dGluZ3MgPSBmaXJlc3RvcmUuUGVyc2lzdGVuY2VTZXR0aW5ncztcbmV4cG9ydCB0eXBlIERvY3VtZW50Q2hhbmdlVHlwZSA9IGZpcmVzdG9yZS5Eb2N1bWVudENoYW5nZVR5cGU7XG5leHBvcnQgdHlwZSBTbmFwc2hvdE9wdGlvbnMgPSBmaXJlc3RvcmUuU25hcHNob3RPcHRpb25zO1xuZXhwb3J0IHR5cGUgRmllbGRQYXRoID0gZmlyZXN0b3JlLkZpZWxkUGF0aDtcbmV4cG9ydCB0eXBlIFF1ZXJ5ID0gZmlyZXN0b3JlLlF1ZXJ5O1xuXG5leHBvcnQgdHlwZSBTZXRPcHRpb25zID0gZmlyZXN0b3JlLlNldE9wdGlvbnM7XG5leHBvcnQgdHlwZSBEb2N1bWVudERhdGEgPSBmaXJlc3RvcmUuRG9jdW1lbnREYXRhO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50U25hcHNob3RFeGlzdHM8VD4gZXh0ZW5kcyBmaXJlc3RvcmUuRG9jdW1lbnRTbmFwc2hvdCB7XG4gIHJlYWRvbmx5IGV4aXN0czogdHJ1ZTtcbiAgZGF0YShvcHRpb25zPzogU25hcHNob3RPcHRpb25zKTogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFNuYXBzaG90RG9lc05vdEV4aXN0IGV4dGVuZHMgZmlyZXN0b3JlLkRvY3VtZW50U25hcHNob3Qge1xuICByZWFkb25seSBleGlzdHM6IGZhbHNlO1xuICBkYXRhKG9wdGlvbnM/OiBTbmFwc2hvdE9wdGlvbnMpOiB1bmRlZmluZWQ7XG4gIGdldChmaWVsZFBhdGg6IHN0cmluZyB8IEZpZWxkUGF0aCwgb3B0aW9ucz86IFNuYXBzaG90T3B0aW9ucyk6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRTbmFwc2hvdDxUPiA9IERvY3VtZW50U25hcHNob3RFeGlzdHM8VD4gfCBEb2N1bWVudFNuYXBzaG90RG9lc05vdEV4aXN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdDxUPiBleHRlbmRzIGZpcmVzdG9yZS5RdWVyeURvY3VtZW50U25hcHNob3Qge1xuICBkYXRhKG9wdGlvbnM/OiBTbmFwc2hvdE9wdGlvbnMpOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U25hcHNob3Q8VD4gZXh0ZW5kcyBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCB7XG4gIHJlYWRvbmx5IGRvY3M6IFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdDxUPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50Q2hhbmdlPFQ+IGV4dGVuZHMgZmlyZXN0b3JlLkRvY3VtZW50Q2hhbmdlIHtcbiAgcmVhZG9ubHkgZG9jOiBRdWVyeURvY3VtZW50U25hcHNob3Q8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRDaGFuZ2VBY3Rpb248VD4ge1xuICB0eXBlOiBEb2N1bWVudENoYW5nZVR5cGU7XG4gIHBheWxvYWQ6IERvY3VtZW50Q2hhbmdlPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbjxUPiB7XG4gIHR5cGU6IHN0cmluZztcbiAgcGF5bG9hZDogVDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmZXJlbmNlPFQ+IHtcbiAgb25TbmFwc2hvdDogKHN1YjogU3Vic2NyaWJlcjxhbnk+KSA9PiBhbnk7XG59XG5cbi8vIEEgY29udmllbmNlIHR5cGUgZm9yIG1ha2luZyBhIHF1ZXJ5LlxuLy8gRXhhbXBsZTogY29uc3QgcXVlcnkgPSAocmVmKSA9PiByZWYud2hlcmUoJ25hbWUnLCA9PSAnZGF2aWQnKTtcbmV4cG9ydCB0eXBlIFF1ZXJ5Rm4gPSAocmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlKSA9PiBRdWVyeTtcblxuZXhwb3J0IHR5cGUgUXVlcnlHcm91cEZuID0gKHF1ZXJ5OiBRdWVyeSkgPT4gUXVlcnk7XG5cbi8qKlxuICogQSBzdHJ1Y3R1cmUgdGhhdCBwcm92aWRlcyBhbiBhc3NvY2lhdGlvbiBiZXR3ZWVuIGEgcmVmZXJlbmNlXG4gKiBhbmQgYSBxdWVyeSBvbiB0aGF0IHJlZmVyZW5jZS4gTm90ZTogUGVyZm9ybWluZyBvcGVyYXRpb25zXG4gKiBvbiB0aGUgcmVmZXJlbmNlIGNhbiBsZWFkIHRvIGNvbmZ1c2luZyByZXN1bHRzIHdpdGggY29tcGxpY2F0ZWRcbiAqIHF1ZXJpZXMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBjb25zdCBxdWVyeSA9IHJlZi53aGVyZSgndHlwZScsICc9PScsICdCb29rJykuXG4gKiAgICAgICAgICAgICAgICAgIC53aGVyZSgncHJpY2UnLCAnPicgMTguMDApXG4gKiAgICAgICAgICAgICAgICAgIC53aGVyZSgncHJpY2UnLCAnPCcgMTAwLjAwKVxuICogICAgICAgICAgICAgICAgICAud2hlcmUoJ2NhdGVnb3J5JywgJz09JywgJ0ZpY3Rpb24nKVxuICogICAgICAgICAgICAgICAgICAud2hlcmUoJ3B1Ymxpc2hlcicsICc9PScsICdCaWdQdWJsaXNoZXInKVxuICpcbiAqIC8vIFRoaXMgYWRkaXRpb24gd291bGQgbm90IGJlIGEgcmVzdWx0IG9mIHRoZSBxdWVyeSBhYm92ZVxuICogcmVmLmFkZCh7XG4gKiAgdHlwZTogJ01hZ2F6aW5lJyxcbiAqICBwcmljZTogNC45OSxcbiAqICBjYXRlZ29yeTogJ1Nwb3J0cycsXG4gKiAgcHVibGlzaGVyOiAnU3BvcnRzUHVibGlzaGVyJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXNzb2NpYXRlZFJlZmVyZW5jZSB7XG4gIHJlZjogQ29sbGVjdGlvblJlZmVyZW5jZTtcbiAgcXVlcnk6IFF1ZXJ5O1xufVxuIl19