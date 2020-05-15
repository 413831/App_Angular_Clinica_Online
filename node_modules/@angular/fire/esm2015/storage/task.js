/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromTask } from './observable/fromTask';
import { map } from 'rxjs/operators';
/**
 * @record
 */
export function AngularFireUploadTask() { }
if (false) {
    /** @type {?} */
    AngularFireUploadTask.prototype.task;
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.snapshotChanges = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.percentageChanges = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.pause = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.cancel = function () { };
    /**
     * @return {?}
     */
    AngularFireUploadTask.prototype.resume = function () { };
    /**
     * @param {?=} onFulfilled
     * @param {?=} onRejected
     * @return {?}
     */
    AngularFireUploadTask.prototype.then = function (onFulfilled, onRejected) { };
    /**
     * @param {?} onRejected
     * @return {?}
     */
    AngularFireUploadTask.prototype.catch = function (onRejected) { };
}
/**
 * Create an AngularFireUploadTask from a regular UploadTask from the Storage SDK.
 * This method creates an observable of the upload and returns on object that provides
 * multiple methods for controlling and monitoring the file upload.
 * @param {?} task
 * @return {?}
 */
export function createUploadTask(task) {
    /** @type {?} */
    const inner$ = fromTask(task);
    return {
        task: task,
        then: task.then.bind(task),
        catch: task.catch.bind(task),
        pause: task.pause.bind(task),
        cancel: task.cancel.bind(task),
        resume: task.resume.bind(task),
        snapshotChanges: (/**
         * @return {?}
         */
        () => inner$),
        percentageChanges: (/**
         * @return {?}
         */
        () => inner$.pipe(map((/**
         * @param {?} s
         * @return {?}
         */
        s => s.bytesTransferred / s.totalBytes * 100))))
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvc3RvcmFnZS8iLCJzb3VyY2VzIjpbInRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFckMsMkNBWUM7OztJQVhDLHFDQUFpQjs7OztJQUNqQixrRUFBOEQ7Ozs7SUFDOUQsb0VBQW9EOzs7O0lBQ3BELHdEQUFpQjs7OztJQUNqQix5REFBa0I7Ozs7SUFDbEIseURBQWtCOzs7Ozs7SUFDbEIsOEVBR2dCOzs7OztJQUNoQixrRUFBbUQ7Ozs7Ozs7OztBQVNyRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBZ0I7O1VBQ3pDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzdCLE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixlQUFlOzs7UUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUE7UUFDN0IsaUJBQWlCOzs7UUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNsQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUMsQ0FDbEQsQ0FBQTtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXBsb2FkVGFza1NuYXBzaG90LCBVcGxvYWRUYXNrIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb21UYXNrIH0gZnJvbSAnLi9vYnNlcnZhYmxlL2Zyb21UYXNrJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZVVwbG9hZFRhc2sge1xuICB0YXNrOiBVcGxvYWRUYXNrLFxuICBzbmFwc2hvdENoYW5nZXMoKTogT2JzZXJ2YWJsZTxVcGxvYWRUYXNrU25hcHNob3QgfCB1bmRlZmluZWQ+O1xuICBwZXJjZW50YWdlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD47XG4gIHBhdXNlKCk6IGJvb2xlYW47XG4gIGNhbmNlbCgpOiBib29sZWFuO1xuICByZXN1bWUoKTogYm9vbGVhbjtcbiAgdGhlbihcbiAgICBvbkZ1bGZpbGxlZD86ICgoYTogVXBsb2FkVGFza1NuYXBzaG90KSA9PiBhbnkpIHwgbnVsbCwgXG4gICAgb25SZWplY3RlZD86ICgoYTogRXJyb3IpID0+IGFueSkgfCBudWxsXG4gICk6IFByb21pc2U8YW55PjtcbiAgY2F0Y2gob25SZWplY3RlZDogKGE6IEVycm9yKSA9PiBhbnkpOiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIEFuZ3VsYXJGaXJlVXBsb2FkVGFzayBmcm9tIGEgcmVndWxhciBVcGxvYWRUYXNrIGZyb20gdGhlIFN0b3JhZ2UgU0RLLlxuICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBvYnNlcnZhYmxlIG9mIHRoZSB1cGxvYWQgYW5kIHJldHVybnMgb24gb2JqZWN0IHRoYXQgcHJvdmlkZXNcbiAqIG11bHRpcGxlIG1ldGhvZHMgZm9yIGNvbnRyb2xsaW5nIGFuZCBtb25pdG9yaW5nIHRoZSBmaWxlIHVwbG9hZC5cbiAqIEBwYXJhbSB0YXNrIFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXBsb2FkVGFzayh0YXNrOiBVcGxvYWRUYXNrKTogQW5ndWxhckZpcmVVcGxvYWRUYXNrIHtcbiAgY29uc3QgaW5uZXIkID0gZnJvbVRhc2sodGFzayk7XG4gIHJldHVybiB7XG4gICAgdGFzazogdGFzayxcbiAgICB0aGVuOiB0YXNrLnRoZW4uYmluZCh0YXNrKSxcbiAgICBjYXRjaDogdGFzay5jYXRjaC5iaW5kKHRhc2spLFxuICAgIHBhdXNlOiB0YXNrLnBhdXNlLmJpbmQodGFzayksXG4gICAgY2FuY2VsOiB0YXNrLmNhbmNlbC5iaW5kKHRhc2spLFxuICAgIHJlc3VtZTogdGFzay5yZXN1bWUuYmluZCh0YXNrKSxcbiAgICBzbmFwc2hvdENoYW5nZXM6ICgpID0+IGlubmVyJCxcbiAgICBwZXJjZW50YWdlQ2hhbmdlczogKCkgPT4gaW5uZXIkLnBpcGUoXG4gICAgICBtYXAocyA9PiBzLmJ5dGVzVHJhbnNmZXJyZWQgLyBzLnRvdGFsQnl0ZXMgKiAxMDApXG4gICAgKVxuICB9O1xufVxuIl19