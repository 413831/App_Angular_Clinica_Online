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
    const outsideAngularScheduler = afDatabase.schedulers.outsideAngular;
    return {
        query,
        update: createDataOperationMethod(query.ref, 'update'),
        set: createDataOperationMethod(query.ref, 'set'),
        push: (/**
         * @param {?} data
         * @return {?}
         */
        (data) => query.ref.push(data)),
        remove: createRemoveMethod(query.ref),
        /**
         * @param {?=} events
         * @return {?}
         */
        snapshotChanges(events) {
            return snapshotChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        /**
         * @param {?=} events
         * @return {?}
         */
        stateChanges(events) {
            return stateChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        /**
         * @param {?=} events
         * @return {?}
         */
        auditTrail(events) {
            return auditTrail(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        /**
         * @param {?=} events
         * @return {?}
         */
        valueChanges(events) {
            /** @type {?} */
            const snapshotChanges$ = snapshotChanges(query, events, outsideAngularScheduler);
            return snapshotChanges$.pipe(map((/**
             * @param {?} actions
             * @return {?}
             */
            actions => actions.map((/**
             * @param {?} a
             * @return {?}
             */
            a => (/** @type {?} */ (a.payload.val())))))), afDatabase.keepUnstableUntilFirst);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L2NyZWF0ZS1yZWZlcmVuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBRXJDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBUSxLQUFvQixFQUFFLFVBQStCOztVQUN4Rix1QkFBdUIsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWM7SUFDcEUsT0FBTztRQUNMLEtBQUs7UUFDTCxNQUFNLEVBQUUseUJBQXlCLENBQWEsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUM7UUFDbEUsR0FBRyxFQUFFLHlCQUF5QixDQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQ25ELElBQUk7Ozs7UUFBRSxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Ozs7O1FBQ3JDLGVBQWUsQ0FBQyxNQUFxQjtZQUNuQyxPQUFPLGVBQWUsQ0FBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzVHLENBQUM7Ozs7O1FBQ0QsWUFBWSxDQUFDLE1BQXFCO1lBQ2hDLE9BQU8sWUFBWSxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDekcsQ0FBQzs7Ozs7UUFDRCxVQUFVLENBQUMsTUFBcUI7WUFDOUIsT0FBTyxVQUFVLENBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RyxDQUFDOzs7OztRQUNELFlBQVksQ0FBQyxNQUFxQjs7a0JBQzFCLGdCQUFnQixHQUFHLGVBQWUsQ0FBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixDQUFDO1lBQ25GLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUMxQixHQUFHOzs7O1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBSyxFQUFDLEVBQUMsRUFDdEQsVUFBVSxDQUFDLHNCQUFzQixDQUNsQyxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2VRdWVyeSwgQW5ndWxhckZpcmVMaXN0LCBDaGlsZEV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBzbmFwc2hvdENoYW5nZXMgfSBmcm9tICcuL3NuYXBzaG90LWNoYW5nZXMnO1xuaW1wb3J0IHsgc3RhdGVDaGFuZ2VzIH0gZnJvbSAnLi9zdGF0ZS1jaGFuZ2VzJztcbmltcG9ydCB7IGF1ZGl0VHJhaWwgfSBmcm9tICcuL2F1ZGl0LXRyYWlsJztcbmltcG9ydCB7IGNyZWF0ZURhdGFPcGVyYXRpb25NZXRob2QgfSBmcm9tICcuL2RhdGEtb3BlcmF0aW9uJztcbmltcG9ydCB7IGNyZWF0ZVJlbW92ZU1ldGhvZCB9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlRGF0YWJhc2UgfSBmcm9tICcuLi9kYXRhYmFzZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaXN0UmVmZXJlbmNlPFQ9YW55PihxdWVyeTogRGF0YWJhc2VRdWVyeSwgYWZEYXRhYmFzZTogQW5ndWxhckZpcmVEYXRhYmFzZSk6IEFuZ3VsYXJGaXJlTGlzdDxUPiB7XG4gIGNvbnN0IG91dHNpZGVBbmd1bGFyU2NoZWR1bGVyID0gYWZEYXRhYmFzZS5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyO1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5LFxuICAgIHVwZGF0ZTogY3JlYXRlRGF0YU9wZXJhdGlvbk1ldGhvZDxQYXJ0aWFsPFQ+PihxdWVyeS5yZWYsICd1cGRhdGUnKSxcbiAgICBzZXQ6IGNyZWF0ZURhdGFPcGVyYXRpb25NZXRob2Q8VD4ocXVlcnkucmVmLCAnc2V0JyksXG4gICAgcHVzaDogKGRhdGE6IFQpID0+IHF1ZXJ5LnJlZi5wdXNoKGRhdGEpLFxuICAgIHJlbW92ZTogY3JlYXRlUmVtb3ZlTWV0aG9kKHF1ZXJ5LnJlZiksXG4gICAgc25hcHNob3RDaGFuZ2VzKGV2ZW50cz86IENoaWxkRXZlbnRbXSkge1xuICAgICAgcmV0dXJuIHNuYXBzaG90Q2hhbmdlczxUPihxdWVyeSwgZXZlbnRzLCBvdXRzaWRlQW5ndWxhclNjaGVkdWxlcikucGlwZShhZkRhdGFiYXNlLmtlZXBVbnN0YWJsZVVudGlsRmlyc3QpO1xuICAgIH0sXG4gICAgc3RhdGVDaGFuZ2VzKGV2ZW50cz86IENoaWxkRXZlbnRbXSkge1xuICAgICAgcmV0dXJuIHN0YXRlQ2hhbmdlczxUPihxdWVyeSwgZXZlbnRzLCBvdXRzaWRlQW5ndWxhclNjaGVkdWxlcikucGlwZShhZkRhdGFiYXNlLmtlZXBVbnN0YWJsZVVudGlsRmlyc3QpO1xuICAgIH0sXG4gICAgYXVkaXRUcmFpbChldmVudHM/OiBDaGlsZEV2ZW50W10pIHtcbiAgICAgIHJldHVybiBhdWRpdFRyYWlsPFQ+KHF1ZXJ5LCBldmVudHMsIG91dHNpZGVBbmd1bGFyU2NoZWR1bGVyKS5waXBlKGFmRGF0YWJhc2Uua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gICAgfSxcbiAgICB2YWx1ZUNoYW5nZXMoZXZlbnRzPzogQ2hpbGRFdmVudFtdKSB7XG4gICAgICBjb25zdCBzbmFwc2hvdENoYW5nZXMkID0gc25hcHNob3RDaGFuZ2VzPFQ+KHF1ZXJ5LCBldmVudHMsIG91dHNpZGVBbmd1bGFyU2NoZWR1bGVyKTtcbiAgICAgIHJldHVybiBzbmFwc2hvdENoYW5nZXMkLnBpcGUoXG4gICAgICAgIG1hcChhY3Rpb25zID0+IGFjdGlvbnMubWFwKGEgPT4gYS5wYXlsb2FkLnZhbCgpIGFzIFQpKSxcbiAgICAgICAgYWZEYXRhYmFzZS5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19