/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { fromRef } from '../observable/fromRef';
import { of, merge } from 'rxjs';
import { isNil } from '../utils';
import { switchMap, distinctUntilChanged, scan } from 'rxjs/operators';
/**
 * @template T
 * @param {?} ref
 * @param {?} events
 * @param {?=} scheduler
 * @return {?}
 */
export function listChanges(ref, events, scheduler) {
    return fromRef(ref, 'value', 'once', scheduler).pipe(switchMap((/**
     * @param {?} snapshotAction
     * @return {?}
     */
    function (snapshotAction) {
        /** @type {?} */
        var childEvent$ = [of(snapshotAction)];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return childEvent$.push(fromRef(ref, event, 'on', scheduler)); }));
        return merge.apply(void 0, __spread(childEvent$)).pipe(scan(buildView, []));
    })), distinctUntilChanged());
}
/**
 * @template T
 * @param {?} changes
 * @param {?} key
 * @return {?}
 */
function positionFor(changes, key) {
    /** @type {?} */
    var len = changes.length;
    for (var i = 0; i < len; i++) {
        if (changes[i].payload.key === key) {
            return i;
        }
    }
    return -1;
}
/**
 * @template T
 * @param {?} changes
 * @param {?=} prevKey
 * @return {?}
 */
function positionAfter(changes, prevKey) {
    if (isNil(prevKey)) {
        return 0;
    }
    else {
        /** @type {?} */
        var i = positionFor(changes, prevKey);
        if (i === -1) {
            return changes.length;
        }
        else {
            return i + 1;
        }
    }
}
/**
 * @param {?} current
 * @param {?} action
 * @return {?}
 */
function buildView(current, action) {
    var payload = action.payload, type = action.type, prevKey = action.prevKey, key = action.key;
    /** @type {?} */
    var currentKeyPosition = positionFor(current, key);
    /** @type {?} */
    var afterPreviousKeyPosition = positionAfter(current, prevKey);
    switch (action.type) {
        case 'value':
            if (action.payload && action.payload.exists()) {
                /** @type {?} */
                var prevKey_1 = null;
                action.payload.forEach((/**
                 * @param {?} payload
                 * @return {?}
                 */
                function (payload) {
                    /** @type {?} */
                    var action = { payload: payload, type: 'value', prevKey: prevKey_1, key: payload.key };
                    prevKey_1 = payload.key;
                    current = __spread(current, [action]);
                    return false;
                }));
            }
            return current;
        case 'child_added':
            if (currentKeyPosition > -1) {
                // check that the previouskey is what we expect, else reorder
                /** @type {?} */
                var previous = current[currentKeyPosition - 1];
                if ((previous && previous.key || null) != prevKey) {
                    current = current.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.payload.key !== payload.key; }));
                    current.splice(afterPreviousKeyPosition, 0, action);
                }
            }
            else if (prevKey == null) {
                return __spread([action], current);
            }
            else {
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, action);
            }
            return current;
        case 'child_removed':
            return current.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.payload.key !== payload.key; }));
        case 'child_changed':
            return current.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.payload.key === key ? action : x; }));
        case 'child_moved':
            if (currentKeyPosition > -1) {
                /** @type {?} */
                var data = current.splice(currentKeyPosition, 1)[0];
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, data);
                return current;
            }
            return current;
        // default will also remove null results
        default:
            return current;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L2NoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxLQUFLLEVBQWlCLE1BQU0sTUFBTSxDQUFDO0FBRzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFFdkUsTUFBTSxVQUFVLFdBQVcsQ0FBUSxHQUFrQixFQUFFLE1BQW9CLEVBQUUsU0FBeUI7SUFDcEcsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNsRCxTQUFTOzs7O0lBQUMsVUFBQSxjQUFjOztZQUNoQixXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQXRELENBQXNELEVBQUMsQ0FBQztRQUNoRixPQUFPLEtBQUssd0JBQUksV0FBVyxHQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDeEQsQ0FBQyxFQUFDLEVBQ0Ysb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLFdBQVcsQ0FBSSxPQUE0QixFQUFFLEdBQUc7O1FBQ2pELEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTTtJ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TyxDQUFDLEdBQUcsRUFBN0IsQ0FBNkIsRUFBQyxDQUFDO1FBQzVELEtBQUssZUFBZTtZQUNsQixPQUFPLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFsQyxDQUFrQyxFQUFDLENBQUM7UUFDOUQsS0FBSyxhQUFhO1lBQ2hCLElBQUcsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O29CQUNwQixJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ2pCLHdDQUF3QztRQUN4QztZQUNFLE9BQU8sT0FBTyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21SZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIG1lcmdlLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFiYXNlUXVlcnksIENoaWxkRXZlbnQsIFNuYXBzaG90QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IHsgc3dpdGNoTWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RDaGFuZ2VzPFQ9YW55PihyZWY6IERhdGFiYXNlUXVlcnksIGV2ZW50czogQ2hpbGRFdmVudFtdLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxTbmFwc2hvdEFjdGlvbjxUPltdPiB7XG4gIHJldHVybiBmcm9tUmVmKHJlZiwgJ3ZhbHVlJywgJ29uY2UnLCBzY2hlZHVsZXIpLnBpcGUoXG4gICAgc3dpdGNoTWFwKHNuYXBzaG90QWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRXZlbnQkID0gW29mKHNuYXBzaG90QWN0aW9uKV07XG4gICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiBjaGlsZEV2ZW50JC5wdXNoKGZyb21SZWYocmVmLCBldmVudCwgJ29uJywgc2NoZWR1bGVyKSkpO1xuICAgICAgcmV0dXJuIG1lcmdlKC4uLmNoaWxkRXZlbnQkKS5waXBlKHNjYW4oYnVpbGRWaWV3LCBbXSkpXG4gICAgfSksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvbkZvcjxUPihjaGFuZ2VzOiBTbmFwc2hvdEFjdGlvbjxUPltdLCBrZXkpIHtcbiAgY29uc3QgbGVuID0gY2hhbmdlcy5sZW5ndGg7XG4gIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG4gICAgaWYoY2hhbmdlc1tpXS5wYXlsb2FkLmtleSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvbkFmdGVyPFQ+KGNoYW5nZXM6IFNuYXBzaG90QWN0aW9uPFQ+W10sIHByZXZLZXk/OiBzdHJpbmcpIHtcbiAgaWYoaXNOaWwocHJldktleSkpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpID0gcG9zaXRpb25Gb3IoY2hhbmdlcywgcHJldktleSk7XG4gICAgaWYoIGkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gY2hhbmdlcy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpICsgMTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRWaWV3KGN1cnJlbnQsIGFjdGlvbikge1xuICBjb25zdCB7IHBheWxvYWQsIHR5cGUsIHByZXZLZXksIGtleSB9ID0gYWN0aW9uO1xuICBjb25zdCBjdXJyZW50S2V5UG9zaXRpb24gPSBwb3NpdGlvbkZvcihjdXJyZW50LCBrZXkpO1xuICBjb25zdCBhZnRlclByZXZpb3VzS2V5UG9zaXRpb24gPSBwb3NpdGlvbkFmdGVyKGN1cnJlbnQsIHByZXZLZXkpO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAndmFsdWUnOlxuICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkICYmIGFjdGlvbi5wYXlsb2FkLmV4aXN0cygpKSB7XG4gICAgICAgIGxldCBwcmV2S2V5ID0gbnVsbDtcbiAgICAgICAgYWN0aW9uLnBheWxvYWQuZm9yRWFjaChwYXlsb2FkID0+IHtcbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSB7cGF5bG9hZCwgdHlwZTogJ3ZhbHVlJywgcHJldktleSwga2V5OiBwYXlsb2FkLmtleX07XG4gICAgICAgICAgcHJldktleSA9IHBheWxvYWQua2V5O1xuICAgICAgICAgIGN1cnJlbnQgPSBbLi4uY3VycmVudCwgYWN0aW9uXTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgY2FzZSAnY2hpbGRfYWRkZWQnOlxuICAgICAgaWYgKGN1cnJlbnRLZXlQb3NpdGlvbiA+IC0xKSB7XG4gICAgICAgIC8vIGNoZWNrIHRoYXQgdGhlIHByZXZpb3Vza2V5IGlzIHdoYXQgd2UgZXhwZWN0LCBlbHNlIHJlb3JkZXJcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBjdXJyZW50W2N1cnJlbnRLZXlQb3NpdGlvbiAtIDFdO1xuICAgICAgICBpZiAoKHByZXZpb3VzICYmIHByZXZpb3VzLmtleSB8fCBudWxsKSAhPSBwcmV2S2V5KSB7XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuZmlsdGVyKHggPT4geC5wYXlsb2FkLmtleSAhPT0gcGF5bG9hZC5rZXkpO1xuICAgICAgICAgIGN1cnJlbnQuc3BsaWNlKGFmdGVyUHJldmlvdXNLZXlQb3NpdGlvbiwgMCwgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcmV2S2V5ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFthY3Rpb24sIC4uLmN1cnJlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuc2xpY2UoKVxuICAgICAgICBjdXJyZW50LnNwbGljZShhZnRlclByZXZpb3VzS2V5UG9zaXRpb24sIDAsIGFjdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICBjYXNlICdjaGlsZF9yZW1vdmVkJzpcbiAgICAgIHJldHVybiBjdXJyZW50LmZpbHRlcih4ID0+IHgucGF5bG9hZC5rZXkgIT09IHBheWxvYWQua2V5KTtcbiAgICBjYXNlICdjaGlsZF9jaGFuZ2VkJzpcbiAgICAgIHJldHVybiBjdXJyZW50Lm1hcCh4ID0+IHgucGF5bG9hZC5rZXkgPT09IGtleSA/IGFjdGlvbiA6IHgpO1xuICAgIGNhc2UgJ2NoaWxkX21vdmVkJzpcbiAgICAgIGlmKGN1cnJlbnRLZXlQb3NpdGlvbiA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjdXJyZW50LnNwbGljZShjdXJyZW50S2V5UG9zaXRpb24sIDEpWzBdO1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5zbGljZSgpXG4gICAgICAgIGN1cnJlbnQuc3BsaWNlKGFmdGVyUHJldmlvdXNLZXlQb3NpdGlvbiwgMCwgZGF0YSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgLy8gZGVmYXVsdCB3aWxsIGFsc28gcmVtb3ZlIG51bGwgcmVzdWx0c1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgfVxufVxuIl19