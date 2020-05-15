/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    snapshotAction => {
        /** @type {?} */
        const childEvent$ = [of(snapshotAction)];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        event => childEvent$.push(fromRef(ref, event, 'on', scheduler))));
        return merge(...childEvent$).pipe(scan(buildView, []));
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
    const len = changes.length;
    for (let i = 0; i < len; i++) {
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
        const i = positionFor(changes, prevKey);
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
    const { payload, type, prevKey, key } = action;
    /** @type {?} */
    const currentKeyPosition = positionFor(current, key);
    /** @type {?} */
    const afterPreviousKeyPosition = positionAfter(current, prevKey);
    switch (action.type) {
        case 'value':
            if (action.payload && action.payload.exists()) {
                /** @type {?} */
                let prevKey = null;
                action.payload.forEach((/**
                 * @param {?} payload
                 * @return {?}
                 */
                payload => {
                    /** @type {?} */
                    const action = { payload, type: 'value', prevKey, key: payload.key };
                    prevKey = payload.key;
                    current = [...current, action];
                    return false;
                }));
            }
            return current;
        case 'child_added':
            if (currentKeyPosition > -1) {
                // check that the previouskey is what we expect, else reorder
                /** @type {?} */
                const previous = current[currentKeyPosition - 1];
                if ((previous && previous.key || null) != prevKey) {
                    current = current.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x.payload.key !== payload.key));
                    current.splice(afterPreviousKeyPosition, 0, action);
                }
            }
            else if (prevKey == null) {
                return [action, ...current];
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
            x => x.payload.key !== payload.key));
        case 'child_changed':
            return current.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.payload.key === key ? action : x));
        case 'child_moved':
            if (currentKeyPosition > -1) {
                /** @type {?} */
                const data = current.splice(currentKeyPosition, 1)[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UvIiwic291cmNlcyI6WyJsaXN0L2NoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsRUFBRSxFQUFFLEtBQUssRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFHNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQUV2RSxNQUFNLFVBQVUsV0FBVyxDQUFRLEdBQWtCLEVBQUUsTUFBb0IsRUFBRSxTQUF5QjtJQUNwRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ2xELFNBQVM7Ozs7SUFBQyxjQUFjLENBQUMsRUFBRTs7Y0FDbkIsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDaEYsT0FBTyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUMsRUFBQyxFQUNGLG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7QUFDSixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUksT0FBNEIsRUFBRSxHQUFHOztVQUNqRCxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU07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LENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUMsQ0FBQztRQUM1RCxLQUFLLGVBQWU7WUFDbEIsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQzlELEtBQUssYUFBYTtZQUNoQixJQUFHLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUFFOztzQkFDcEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxPQUFPLENBQUM7YUFDaEI7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNqQix3Q0FBd0M7UUFDeEM7WUFDRSxPQUFPLE9BQU8sQ0FBQztLQUNsQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBtZXJnZSwgU2NoZWR1bGVyTGlrZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhYmFzZVF1ZXJ5LCBDaGlsZEV2ZW50LCBTbmFwc2hvdEFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCB7IHN3aXRjaE1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0Q2hhbmdlczxUPWFueT4ocmVmOiBEYXRhYmFzZVF1ZXJ5LCBldmVudHM6IENoaWxkRXZlbnRbXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8U25hcHNob3RBY3Rpb248VD5bXT4ge1xuICByZXR1cm4gZnJvbVJlZihyZWYsICd2YWx1ZScsICdvbmNlJywgc2NoZWR1bGVyKS5waXBlKFxuICAgIHN3aXRjaE1hcChzbmFwc2hvdEFjdGlvbiA9PiB7XG4gICAgICBjb25zdCBjaGlsZEV2ZW50JCA9IFtvZihzbmFwc2hvdEFjdGlvbildO1xuICAgICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4gY2hpbGRFdmVudCQucHVzaChmcm9tUmVmKHJlZiwgZXZlbnQsICdvbicsIHNjaGVkdWxlcikpKTtcbiAgICAgIHJldHVybiBtZXJnZSguLi5jaGlsZEV2ZW50JCkucGlwZShzY2FuKGJ1aWxkVmlldywgW10pKVxuICAgIH0pLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Gb3I8VD4oY2hhbmdlczogU25hcHNob3RBY3Rpb248VD5bXSwga2V5KSB7XG4gIGNvbnN0IGxlbiA9IGNoYW5nZXMubGVuZ3RoO1xuICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKykge1xuICAgIGlmKGNoYW5nZXNbaV0ucGF5bG9hZC5rZXkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25BZnRlcjxUPihjaGFuZ2VzOiBTbmFwc2hvdEFjdGlvbjxUPltdLCBwcmV2S2V5Pzogc3RyaW5nKSB7XG4gIGlmKGlzTmlsKHByZXZLZXkpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaSA9IHBvc2l0aW9uRm9yKGNoYW5nZXMsIHByZXZLZXkpO1xuICAgIGlmKCBpID09PSAtMSkge1xuICAgICAgcmV0dXJuIGNoYW5nZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaSArIDE7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVmlldyhjdXJyZW50LCBhY3Rpb24pIHtcbiAgY29uc3QgeyBwYXlsb2FkLCB0eXBlLCBwcmV2S2V5LCBrZXkgfSA9IGFjdGlvbjtcbiAgY29uc3QgY3VycmVudEtleVBvc2l0aW9uID0gcG9zaXRpb25Gb3IoY3VycmVudCwga2V5KTtcbiAgY29uc3QgYWZ0ZXJQcmV2aW91c0tleVBvc2l0aW9uID0gcG9zaXRpb25BZnRlcihjdXJyZW50LCBwcmV2S2V5KTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCAmJiBhY3Rpb24ucGF5bG9hZC5leGlzdHMoKSkge1xuICAgICAgICBsZXQgcHJldktleSA9IG51bGw7XG4gICAgICAgIGFjdGlvbi5wYXlsb2FkLmZvckVhY2gocGF5bG9hZCA9PiB7XG4gICAgICAgICAgY29uc3QgYWN0aW9uID0ge3BheWxvYWQsIHR5cGU6ICd2YWx1ZScsIHByZXZLZXksIGtleTogcGF5bG9hZC5rZXl9O1xuICAgICAgICAgIHByZXZLZXkgPSBwYXlsb2FkLmtleTtcbiAgICAgICAgICBjdXJyZW50ID0gWy4uLmN1cnJlbnQsIGFjdGlvbl07XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIGNhc2UgJ2NoaWxkX2FkZGVkJzpcbiAgICAgIGlmIChjdXJyZW50S2V5UG9zaXRpb24gPiAtMSkge1xuICAgICAgICAvLyBjaGVjayB0aGF0IHRoZSBwcmV2aW91c2tleSBpcyB3aGF0IHdlIGV4cGVjdCwgZWxzZSByZW9yZGVyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gY3VycmVudFtjdXJyZW50S2V5UG9zaXRpb24gLSAxXTtcbiAgICAgICAgaWYgKChwcmV2aW91cyAmJiBwcmV2aW91cy5rZXkgfHwgbnVsbCkgIT0gcHJldktleSkge1xuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmZpbHRlcih4ID0+IHgucGF5bG9hZC5rZXkgIT09IHBheWxvYWQua2V5KTtcbiAgICAgICAgICBjdXJyZW50LnNwbGljZShhZnRlclByZXZpb3VzS2V5UG9zaXRpb24sIDAsIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJldktleSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbYWN0aW9uLCAuLi5jdXJyZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnNsaWNlKClcbiAgICAgICAgY3VycmVudC5zcGxpY2UoYWZ0ZXJQcmV2aW91c0tleVBvc2l0aW9uLCAwLCBhY3Rpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgY2FzZSAnY2hpbGRfcmVtb3ZlZCc6XG4gICAgICByZXR1cm4gY3VycmVudC5maWx0ZXIoeCA9PiB4LnBheWxvYWQua2V5ICE9PSBwYXlsb2FkLmtleSk7XG4gICAgY2FzZSAnY2hpbGRfY2hhbmdlZCc6XG4gICAgICByZXR1cm4gY3VycmVudC5tYXAoeCA9PiB4LnBheWxvYWQua2V5ID09PSBrZXkgPyBhY3Rpb24gOiB4KTtcbiAgICBjYXNlICdjaGlsZF9tb3ZlZCc6XG4gICAgICBpZihjdXJyZW50S2V5UG9zaXRpb24gPiAtMSkge1xuICAgICAgICBjb25zdCBkYXRhID0gY3VycmVudC5zcGxpY2UoY3VycmVudEtleVBvc2l0aW9uLCAxKVswXTtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuc2xpY2UoKVxuICAgICAgICBjdXJyZW50LnNwbGljZShhZnRlclByZXZpb3VzS2V5UG9zaXRpb24sIDAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIC8vIGRlZmF1bHQgd2lsbCBhbHNvIHJlbW92ZSBudWxsIHJlc3VsdHNcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiJdfQ==