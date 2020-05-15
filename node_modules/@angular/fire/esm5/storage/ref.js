/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createUploadTask } from './task';
import { from, of } from 'rxjs';
import { observeOn, switchMap } from 'rxjs/operators';
/**
 * @record
 */
export function AngularFireStorageReference() { }
if (false) {
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.getDownloadURL = function () { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.getMetadata = function () { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.delete = function () { };
    /**
     * @param {?} path
     * @return {?}
     */
    AngularFireStorageReference.prototype.child = function (path) { };
    /**
     * @param {?} meta
     * @return {?}
     */
    AngularFireStorageReference.prototype.updateMetadata = function (meta) { };
    /**
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    AngularFireStorageReference.prototype.put = function (data, metadata) { };
    /**
     * @param {?} data
     * @param {?=} format
     * @param {?=} metadata
     * @return {?}
     */
    AngularFireStorageReference.prototype.putString = function (data, format, metadata) { };
    /**
     * @return {?}
     */
    AngularFireStorageReference.prototype.listAll = function () { };
}
/**
 * Create an AngularFire wrapped Storage Reference. This object
 * creates observable methods from promise based methods.
 * @param {?} ref
 * @param {?} schedulers
 * @param {?} keepUnstableUntilFirst
 * @return {?}
 */
export function createStorageRef(ref, schedulers, keepUnstableUntilFirst) {
    return {
        getDownloadURL: (/**
         * @return {?}
         */
        function () { return of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return ref.getDownloadURL(); })), keepUnstableUntilFirst); }),
        getMetadata: (/**
         * @return {?}
         */
        function () { return of().pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        function () { return ref.getMetadata(); })), keepUnstableUntilFirst); }),
        delete: (/**
         * @return {?}
         */
        function () { return from(ref.delete()); }),
        child: (/**
         * @param {?} path
         * @return {?}
         */
        function (path) { return createStorageRef(ref.child(path), schedulers, keepUnstableUntilFirst); }),
        updateMetadata: (/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return from(ref.updateMetadata(meta)); }),
        put: (/**
         * @param {?} data
         * @param {?=} metadata
         * @return {?}
         */
        function (data, metadata) {
            /** @type {?} */
            var task = ref.put(data, metadata);
            return createUploadTask(task);
        }),
        putString: (/**
         * @param {?} data
         * @param {?=} format
         * @param {?=} metadata
         * @return {?}
         */
        function (data, format, metadata) {
            /** @type {?} */
            var task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }),
        listAll: (/**
         * @return {?}
         */
        function () { return from(ref.listAll()); })
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS9zdG9yYWdlLyIsInNvdXJjZXMiOlsicmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQXlCLE1BQU0sUUFBUSxDQUFDO0FBQ2pFLE9BQU8sRUFBYyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFdEQsaURBU0M7Ozs7O0lBUkMsdUVBQWtDOzs7O0lBQ2xDLG9FQUErQjs7OztJQUMvQiwrREFBMEI7Ozs7O0lBQzFCLGtFQUF5Qjs7Ozs7SUFDekIsMkVBQXdEOzs7Ozs7SUFDeEQsMEVBQTZFOzs7Ozs7O0lBQzdFLHdGQUFtSDs7OztJQUNuSCxnRUFBa0M7Ozs7Ozs7Ozs7QUFRcEMsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixHQUFjLEVBQ2QsVUFBa0MsRUFDbEMsc0JBQWlFO0lBRWpFLE9BQU87UUFDTCxjQUFjOzs7UUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDdEMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFDcEMsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBcEIsQ0FBb0IsRUFBQyxFQUNyQyxzQkFBc0IsQ0FDdkIsRUFKcUIsQ0FJckIsQ0FBQTtRQUNELFdBQVc7OztRQUFFLGNBQU0sT0FBQSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQzFCLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3BDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsRUFDbEMsc0JBQXNCLENBQ3ZCLEVBSmtCLENBSWxCLENBQUE7UUFDRCxNQUFNOzs7UUFBRSxjQUFNLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFsQixDQUFrQixDQUFBO1FBQ2hDLEtBQUs7Ozs7UUFBRSxVQUFDLElBQVksSUFBSyxPQUFBLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixDQUFDLEVBQXJFLENBQXFFLENBQUE7UUFDOUYsY0FBYzs7OztRQUFFLFVBQUMsSUFBc0IsSUFBSyxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUE7UUFDMUUsR0FBRzs7Ozs7UUFBRSxVQUFDLElBQVMsRUFBRSxRQUF5Qjs7Z0JBQ2xDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7WUFDcEMsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFDRCxTQUFTOzs7Ozs7UUFBRSxVQUFDLElBQVksRUFBRSxNQUFxQixFQUFFLFFBQXlCOztnQkFDbEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDbEQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFDRCxPQUFPOzs7UUFBRSxjQUFNLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFuQixDQUFtQixDQUFBO0tBQ25DLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2V0dGFibGVNZXRhZGF0YSwgVXBsb2FkTWV0YWRhdGEsIFJlZmVyZW5jZSwgU3RyaW5nRm9ybWF0LCBMaXN0UmVzdWx0fSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY3JlYXRlVXBsb2FkVGFzaywgQW5ndWxhckZpcmVVcGxvYWRUYXNrIH0gZnJvbSAnLi90YXNrJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVTdG9yYWdlUmVmZXJlbmNlIHtcbiAgZ2V0RG93bmxvYWRVUkwoKTogT2JzZXJ2YWJsZTxhbnk+O1xuICBnZXRNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPGFueT47XG4gIGRlbGV0ZSgpOiBPYnNlcnZhYmxlPGFueT47XG4gIGNoaWxkKHBhdGg6IHN0cmluZyk6IGFueTtcbiAgdXBkYXRlTWV0YWRhdGEobWV0YTogU2V0dGFibGVNZXRhZGF0YSk6IE9ic2VydmFibGU8YW55PjtcbiAgcHV0KGRhdGE6IGFueSwgbWV0YWRhdGE/OiBVcGxvYWRNZXRhZGF0YSB8IHVuZGVmaW5lZCk6IEFuZ3VsYXJGaXJlVXBsb2FkVGFzaztcbiAgcHV0U3RyaW5nKGRhdGE6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nIHwgdW5kZWZpbmVkLCBtZXRhZGF0YT86IFVwbG9hZE1ldGFkYXRhIHwgdW5kZWZpbmVkKTogQW5ndWxhckZpcmVVcGxvYWRUYXNrO1xuICBsaXN0QWxsKCk6IE9ic2VydmFibGU8TGlzdFJlc3VsdD47XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIEFuZ3VsYXJGaXJlIHdyYXBwZWQgU3RvcmFnZSBSZWZlcmVuY2UuIFRoaXMgb2JqZWN0XG4gKiBjcmVhdGVzIG9ic2VydmFibGUgbWV0aG9kcyBmcm9tIHByb21pc2UgYmFzZWQgbWV0aG9kcy5cbiAqIEBwYXJhbSByZWZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JhZ2VSZWYoXG4gIHJlZjogUmVmZXJlbmNlLFxuICBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAga2VlcFVuc3RhYmxlVW50aWxGaXJzdDogPFQ+KG9icyQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD5cbik6IEFuZ3VsYXJGaXJlU3RvcmFnZVJlZmVyZW5jZSB7XG4gIHJldHVybiB7XG4gICAgZ2V0RG93bmxvYWRVUkw6ICgpID0+IG9mKHVuZGVmaW5lZCkucGlwZShcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiByZWYuZ2V0RG93bmxvYWRVUkwoKSksXG4gICAgICBrZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKSxcbiAgICBnZXRNZXRhZGF0YTogKCkgPT4gb2YoKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHJlZi5nZXRNZXRhZGF0YSgpKSxcbiAgICAgIGtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICApLFxuICAgIGRlbGV0ZTogKCkgPT4gZnJvbShyZWYuZGVsZXRlKCkpLFxuICAgIGNoaWxkOiAocGF0aDogc3RyaW5nKSA9PiBjcmVhdGVTdG9yYWdlUmVmKHJlZi5jaGlsZChwYXRoKSwgc2NoZWR1bGVycywga2VlcFVuc3RhYmxlVW50aWxGaXJzdCksXG4gICAgdXBkYXRlTWV0YWRhdGE6IChtZXRhOiBTZXR0YWJsZU1ldGFkYXRhKSA9PiBmcm9tKHJlZi51cGRhdGVNZXRhZGF0YShtZXRhKSksXG4gICAgcHV0OiAoZGF0YTogYW55LCBtZXRhZGF0YT86IFVwbG9hZE1ldGFkYXRhKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gcmVmLnB1dChkYXRhLCBtZXRhZGF0YSk7XG4gICAgICByZXR1cm4gY3JlYXRlVXBsb2FkVGFzayh0YXNrKTtcbiAgICB9LFxuICAgIHB1dFN0cmluZzogKGRhdGE6IHN0cmluZywgZm9ybWF0PzogU3RyaW5nRm9ybWF0LCBtZXRhZGF0YT86IFVwbG9hZE1ldGFkYXRhKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gcmVmLnB1dFN0cmluZyhkYXRhLCBmb3JtYXQsIG1ldGFkYXRhKTtcbiAgICAgIHJldHVybiBjcmVhdGVVcGxvYWRUYXNrKHRhc2spO1xuICAgIH0sXG4gICAgbGlzdEFsbDogKCkgPT4gZnJvbShyZWYubGlzdEFsbCgpKVxuICB9O1xufVxuIl19