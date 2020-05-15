/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { map } from 'rxjs/operators';
import { createObjectSnapshotChanges } from './snapshot-changes';
/**
 * @template T
 * @param {?} query
 * @param {?} afDatabase
 * @return {?}
 */
export function createObjectReference(query, afDatabase) {
    return {
        query: query,
        snapshotChanges: /**
         * @template T
         * @return {?}
         */
        function () {
            return createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)().pipe((/** @type {?} */ (afDatabase.keepUnstableUntilFirst)));
        },
        update: /**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (/** @type {?} */ (query.ref.update((/** @type {?} */ (data))))); },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (/** @type {?} */ (query.ref.set(data))); },
        remove: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (query.ref.remove())); },
        valueChanges: /**
         * @template T
         * @return {?}
         */
        function () {
            /** @type {?} */
            var snapshotChanges$ = createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)();
            return snapshotChanges$.pipe(afDatabase.keepUnstableUntilFirst, map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return action.payload.exists() ? (/** @type {?} */ (action.payload.val())) : null; })));
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJvYmplY3QvY3JlYXRlLXJlZmVyZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBR2pFLE1BQU0sVUFBVSxxQkFBcUIsQ0FBUSxLQUFvQixFQUFFLFVBQStCO0lBQ2hHLE9BQU87UUFDTCxLQUFLLE9BQUE7UUFDTCxlQUFlOzs7O1FBQWY7WUFDRSxPQUFPLDJCQUEyQixDQUFJLEtBQUssRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUN2RixtQkFBQSxVQUFVLENBQUMsc0JBQXNCLEVBQUMsQ0FDbkMsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNOzs7O1FBQU4sVUFBTyxJQUFnQixJQUFJLE9BQU8sbUJBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbkYsR0FBRzs7OztRQUFILFVBQUksSUFBTyxJQUFJLE9BQU8sbUJBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU07OztzQkFBSyxPQUFPLG1CQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3hELFlBQVk7Ozs7UUFBWjs7Z0JBQ1EsZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDbkcsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQzFCLFVBQVUsQ0FBQyxzQkFBc0IsRUFDakMsR0FBRzs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQTFELENBQTBELEVBQUMsQ0FDMUUsQ0FBQTtRQUNILENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGFiYXNlUXVlcnksIEFuZ3VsYXJGaXJlT2JqZWN0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3RTbmFwc2hvdENoYW5nZXMgfSBmcm9tICcuL3NuYXBzaG90LWNoYW5nZXMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVEYXRhYmFzZSB9IGZyb20gJy4uL2RhdGFiYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9iamVjdFJlZmVyZW5jZTxUPWFueT4ocXVlcnk6IERhdGFiYXNlUXVlcnksIGFmRGF0YWJhc2U6IEFuZ3VsYXJGaXJlRGF0YWJhc2UpOiBBbmd1bGFyRmlyZU9iamVjdDxUPiB7XG4gIHJldHVybiB7XG4gICAgcXVlcnksXG4gICAgc25hcHNob3RDaGFuZ2VzPFQ+KCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU9iamVjdFNuYXBzaG90Q2hhbmdlczxUPihxdWVyeSwgYWZEYXRhYmFzZS5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSgpLnBpcGUoXG4gICAgICAgIGFmRGF0YWJhc2Uua2VlcFVuc3RhYmxlVW50aWxGaXJzdCFcbiAgICAgICk7XG4gICAgfSxcbiAgICB1cGRhdGUoZGF0YTogUGFydGlhbDxUPikgeyByZXR1cm4gcXVlcnkucmVmLnVwZGF0ZShkYXRhIGFzIGFueSkgYXMgUHJvbWlzZTx2b2lkPjsgfSxcbiAgICBzZXQoZGF0YTogVCkgeyByZXR1cm4gcXVlcnkucmVmLnNldChkYXRhKSBhcyBQcm9taXNlPHZvaWQ+OyB9LFxuICAgIHJlbW92ZSgpIHsgcmV0dXJuIHF1ZXJ5LnJlZi5yZW1vdmUoKSBhcyBQcm9taXNlPHZvaWQ+OyB9LFxuICAgIHZhbHVlQ2hhbmdlczxUPigpIHtcbiAgICAgIGNvbnN0IHNuYXBzaG90Q2hhbmdlcyQgPSBjcmVhdGVPYmplY3RTbmFwc2hvdENoYW5nZXMocXVlcnksIGFmRGF0YWJhc2Uuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcikoKTtcbiAgICAgIHJldHVybiBzbmFwc2hvdENoYW5nZXMkLnBpcGUoXG4gICAgICAgIGFmRGF0YWJhc2Uua2VlcFVuc3RhYmxlVW50aWxGaXJzdCxcbiAgICAgICAgbWFwKGFjdGlvbiA9PiBhY3Rpb24ucGF5bG9hZC5leGlzdHMoKSA/IGFjdGlvbi5wYXlsb2FkLnZhbCgpIGFzIFQgOiBudWxsKVxuICAgICAgKVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==