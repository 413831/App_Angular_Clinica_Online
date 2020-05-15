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
    function (subscriber) {
        /** @type {?} */
        var progress = (/**
         * @param {?} snap
         * @return {?}
         */
        function (snap) { return subscriber.next(snap); });
        /** @type {?} */
        var error = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return subscriber.error(e); });
        /** @type {?} */
        var complete = (/**
         * @return {?}
         */
        function () { return subscriber.complete(); });
        task.on('state_changed', progress, error, complete);
        return (/**
         * @return {?}
         */
        function () { return task.cancel(); });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRhc2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci9maXJlL3N0b3JhZ2UvIiwic291cmNlcyI6WyJvYnNlcnZhYmxlL2Zyb21UYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUlsQyxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQWdCO0lBQ3ZDLE9BQU8sSUFBSSxVQUFVOzs7O0lBQXFCLFVBQUEsVUFBVTs7WUFDNUMsUUFBUTs7OztRQUFHLFVBQUMsSUFBd0IsSUFBSyxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXJCLENBQXFCLENBQUE7O1lBQzlELEtBQUs7Ozs7UUFBRyxVQUFBLENBQUMsSUFBSSxPQUFBLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUE7O1lBQ2hDLFFBQVE7OztRQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQXJCLENBQXFCLENBQUE7UUFDNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRDs7O1FBQU8sY0FBTSxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLEVBQUM7SUFDN0IsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXBsb2FkVGFzaywgVXBsb2FkVGFza1NuYXBzaG90IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UYXNrKHRhc2s6IFVwbG9hZFRhc2spIHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFVwbG9hZFRhc2tTbmFwc2hvdD4oc3Vic2NyaWJlciA9PiB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSAoc25hcDogVXBsb2FkVGFza1NuYXBzaG90KSA9PiBzdWJzY3JpYmVyLm5leHQoc25hcCk7XG4gICAgY29uc3QgZXJyb3IgPSBlID0+IHN1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgdGFzay5vbignc3RhdGVfY2hhbmdlZCcsIHByb2dyZXNzLCBlcnJvciwgY29tcGxldGUpO1xuICAgIHJldHVybiAoKSA9PiB0YXNrLmNhbmNlbCgpO1xuICB9KTtcbn1cbiJdfQ==