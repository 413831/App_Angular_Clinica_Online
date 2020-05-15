/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { snapshotChanges } from './snapshot-changes';
import { stateChanges } from './state-changes';
import { auditTrail } from './audit-trail';
import { createDataOperationMethod } from './data-operation';
import { createRemoveMethod } from './remove';
import { map } from 'rxjs/operators';
/**
 * @template T
 * @param {?} query
 * @param {?} afDatabase
 * @return {?}
 */
export function createListReference(query, afDatabase) {
    /** @type {?} */
    var outsideAngularScheduler = afDatabase.schedulers.outsideAngular;
    return {
        query: query,
        update: createDataOperationMethod(query.ref, 'update'),
        set: createDataOperationMethod(query.ref, 'set'),
        push: (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return query.ref.push(data); }),
        remove: createRemoveMethod(query.ref),
        snapshotChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return snapshotChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        stateChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return stateChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        auditTrail: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            return auditTrail(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        valueChanges: /**
         * @param {?=} events
         * @return {?}
         */
        function (events) {
            /** @type {?} */
            var snapshotChanges$ = snapshotChanges(query, events, outsideAngularScheduler);
            return snapshotChanges$.pipe(map((/**
             * @param {?} actions
             * @return {?}
             */
            function (actions) { return actions.map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return (/** @type {?} */ (a.payload.val())); })); })), afDatabase.keepUnstableUntilFirst);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L2NyZWF0ZS1yZWZlcmVuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBRXJDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBUSxLQUFvQixFQUFFLFVBQStCOztRQUN4Rix1QkFBdUIsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWM7SUFDcEUsT0FBTztRQUNMLEtBQUssT0FBQTtRQUNMLE1BQU0sRUFBRSx5QkFBeUIsQ0FBYSxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQztRQUNsRSxHQUFHLEVBQUUseUJBQXlCLENBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7UUFDbkQsSUFBSTs7OztRQUFFLFVBQUMsSUFBTyxJQUFLLE9BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLENBQUE7UUFDdkMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDckMsZUFBZTs7OztRQUFmLFVBQWdCLE1BQXFCO1lBQ25DLE9BQU8sZUFBZSxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUcsQ0FBQztRQUNELFlBQVk7Ozs7UUFBWixVQUFhLE1BQXFCO1lBQ2hDLE9BQU8sWUFBWSxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDekcsQ0FBQztRQUNELFVBQVU7Ozs7UUFBVixVQUFXLE1BQXFCO1lBQzlCLE9BQU8sVUFBVSxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkcsQ0FBQztRQUNELFlBQVk7Ozs7UUFBWixVQUFhLE1BQXFCOztnQkFDMUIsZ0JBQWdCLEdBQUcsZUFBZSxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLENBQUM7WUFDbkYsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQzFCLEdBQUc7Ozs7WUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLFdBQUksbUJBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBSyxHQUFBLEVBQUMsRUFBdEMsQ0FBc0MsRUFBQyxFQUN0RCxVQUFVLENBQUMsc0JBQXNCLENBQ2xDLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhYmFzZVF1ZXJ5LCBBbmd1bGFyRmlyZUxpc3QsIENoaWxkRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHNuYXBzaG90Q2hhbmdlcyB9IGZyb20gJy4vc25hcHNob3QtY2hhbmdlcyc7XG5pbXBvcnQgeyBzdGF0ZUNoYW5nZXMgfSBmcm9tICcuL3N0YXRlLWNoYW5nZXMnO1xuaW1wb3J0IHsgYXVkaXRUcmFpbCB9IGZyb20gJy4vYXVkaXQtdHJhaWwnO1xuaW1wb3J0IHsgY3JlYXRlRGF0YU9wZXJhdGlvbk1ldGhvZCB9IGZyb20gJy4vZGF0YS1vcGVyYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlUmVtb3ZlTWV0aG9kIH0gZnJvbSAnLi9yZW1vdmUnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVEYXRhYmFzZSB9IGZyb20gJy4uL2RhdGFiYXNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpc3RSZWZlcmVuY2U8VD1hbnk+KHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5LCBhZkRhdGFiYXNlOiBBbmd1bGFyRmlyZURhdGFiYXNlKTogQW5ndWxhckZpcmVMaXN0PFQ+IHtcbiAgY29uc3Qgb3V0c2lkZUFuZ3VsYXJTY2hlZHVsZXIgPSBhZkRhdGFiYXNlLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXI7XG4gIHJldHVybiB7XG4gICAgcXVlcnksXG4gICAgdXBkYXRlOiBjcmVhdGVEYXRhT3BlcmF0aW9uTWV0aG9kPFBhcnRpYWw8VD4+KHF1ZXJ5LnJlZiwgJ3VwZGF0ZScpLFxuICAgIHNldDogY3JlYXRlRGF0YU9wZXJhdGlvbk1ldGhvZDxUPihxdWVyeS5yZWYsICdzZXQnKSxcbiAgICBwdXNoOiAoZGF0YTogVCkgPT4gcXVlcnkucmVmLnB1c2goZGF0YSksXG4gICAgcmVtb3ZlOiBjcmVhdGVSZW1vdmVNZXRob2QocXVlcnkucmVmKSxcbiAgICBzbmFwc2hvdENoYW5nZXMoZXZlbnRzPzogQ2hpbGRFdmVudFtdKSB7XG4gICAgICByZXR1cm4gc25hcHNob3RDaGFuZ2VzPFQ+KHF1ZXJ5LCBldmVudHMsIG91dHNpZGVBbmd1bGFyU2NoZWR1bGVyKS5waXBlKGFmRGF0YWJhc2Uua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gICAgfSxcbiAgICBzdGF0ZUNoYW5nZXMoZXZlbnRzPzogQ2hpbGRFdmVudFtdKSB7XG4gICAgICByZXR1cm4gc3RhdGVDaGFuZ2VzPFQ+KHF1ZXJ5LCBldmVudHMsIG91dHNpZGVBbmd1bGFyU2NoZWR1bGVyKS5waXBlKGFmRGF0YWJhc2Uua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gICAgfSxcbiAgICBhdWRpdFRyYWlsKGV2ZW50cz86IENoaWxkRXZlbnRbXSkge1xuICAgICAgcmV0dXJuIGF1ZGl0VHJhaWw8VD4ocXVlcnksIGV2ZW50cywgb3V0c2lkZUFuZ3VsYXJTY2hlZHVsZXIpLnBpcGUoYWZEYXRhYmFzZS5rZWVwVW5zdGFibGVVbnRpbEZpcnN0KTtcbiAgICB9LFxuICAgIHZhbHVlQ2hhbmdlcyhldmVudHM/OiBDaGlsZEV2ZW50W10pIHtcbiAgICAgIGNvbnN0IHNuYXBzaG90Q2hhbmdlcyQgPSBzbmFwc2hvdENoYW5nZXM8VD4ocXVlcnksIGV2ZW50cywgb3V0c2lkZUFuZ3VsYXJTY2hlZHVsZXIpO1xuICAgICAgcmV0dXJuIHNuYXBzaG90Q2hhbmdlcyQucGlwZShcbiAgICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5tYXAoYSA9PiBhLnBheWxvYWQudmFsKCkgYXMgVCkpLFxuICAgICAgICBhZkRhdGFiYXNlLmtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=