/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { checkOperationCases } from '../utils';
/**
 * @template T
 * @param {?} ref
 * @param {?} operation
 * @return {?}
 */
export function createDataOperationMethod(ref, operation) {
    return (/**
     * @template T
     * @param {?} item
     * @param {?} value
     * @return {?}
     */
    function dataOperation(item, value) {
        return checkOperationCases(item, {
            stringCase: (/**
             * @return {?}
             */
            function () { return ref.child((/** @type {?} */ (item)))[operation](value); }),
            firebaseCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item)))[operation](value); }),
            snapshotCase: (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (item))).ref[operation](value); })
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1vcGVyYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL2RhdGFiYXNlLyIsInNvdXJjZXMiOlsibGlzdC9kYXRhLW9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0FBRS9DLE1BQU0sVUFBVSx5QkFBeUIsQ0FBSSxHQUFzQixFQUFFLFNBQWlCO0lBQ3BGOzs7Ozs7SUFBTyxTQUFTLGFBQWEsQ0FBSSxJQUF1QixFQUFFLEtBQVE7UUFDaEUsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsVUFBVTs7O1lBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQVEsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBekMsQ0FBeUMsQ0FBQTtZQUMzRCxZQUFZOzs7WUFBRSxjQUFNLE9BQUEsQ0FBQyxtQkFBbUIsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTtZQUMvRCxZQUFZOzs7WUFBRSxjQUFNLE9BQUEsQ0FBQyxtQkFBcUIsSUFBSSxFQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUE7U0FDdEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgRGF0YWJhc2VSZWZlcmVuY2UsIEZpcmViYXNlT3BlcmF0aW9uLCBEYXRhYmFzZVNuYXBzaG90IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBjaGVja09wZXJhdGlvbkNhc2VzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGF0YU9wZXJhdGlvbk1ldGhvZDxUPihyZWY6IERhdGFiYXNlUmVmZXJlbmNlLCBvcGVyYXRpb246IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gZGF0YU9wZXJhdGlvbjxUPihpdGVtOiBGaXJlYmFzZU9wZXJhdGlvbiwgdmFsdWU6IFQpIHtcbiAgICByZXR1cm4gY2hlY2tPcGVyYXRpb25DYXNlcyhpdGVtLCB7XG4gICAgICBzdHJpbmdDYXNlOiAoKSA9PiByZWYuY2hpbGQoPHN0cmluZz5pdGVtKVtvcGVyYXRpb25dKHZhbHVlKSxcbiAgICAgIGZpcmViYXNlQ2FzZTogKCkgPT4gKDxEYXRhYmFzZVJlZmVyZW5jZT5pdGVtKVtvcGVyYXRpb25dKHZhbHVlKSxcbiAgICAgIHNuYXBzaG90Q2FzZTogKCkgPT4gKDxEYXRhYmFzZVNuYXBzaG90PFQ+Pml0ZW0pLnJlZltvcGVyYXRpb25dKHZhbHVlKVxuICAgIH0pO1xuICB9XG59XG4iXX0=