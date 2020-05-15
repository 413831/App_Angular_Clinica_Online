/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromCollectionRef } from '../observable/fromRef';
import { map, scan } from 'rxjs/operators';
/**
 * Return a stream of document changes on a query. These results are not in sort order but in
 * order of occurence.
 * @template T
 * @param {?} query
 * @param {?=} scheduler
 * @return {?}
 */
export function docChanges(query, scheduler) {
    return fromCollectionRef(query, scheduler)
        .pipe(map((/**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return action.payload.docChanges()
            .map((/**
         * @param {?} change
         * @return {?}
         */
        function (change) { return ((/** @type {?} */ ({ type: change.type, payload: change }))); }));
    })));
}
/**
 * Return a stream of document changes on a query. These results are in sort order.
 * @template T
 * @param {?} query
 * @param {?} events
 * @param {?=} scheduler
 * @return {?}
 */
export function sortedChanges(query, events, scheduler) {
    return fromCollectionRef(query, scheduler)
        .pipe(map((/**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { return changes.payload.docChanges(); })), scan((/**
     * @param {?} current
     * @param {?} changes
     * @return {?}
     */
    function (current, changes) { return combineChanges(current, changes, events); }), []), map((/**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { return changes.map((/**
     * @param {?} c
     * @return {?}
     */
    function (c) { return ((/** @type {?} */ ({ type: c.type, payload: c }))); })); })));
}
/**
 * Combines the total result set from the current set of changes from an incoming set
 * of changes.
 * @template T
 * @param {?} current
 * @param {?} changes
 * @param {?} events
 * @return {?}
 */
export function combineChanges(current, changes, events) {
    changes.forEach((/**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        // skip unwanted change types
        if (events.indexOf(change.type) > -1) {
            current = combineChange(current, change);
        }
    }));
    return current;
}
/**
 * Creates a new sorted array from a new change.
 * @template T
 * @param {?} combined
 * @param {?} change
 * @return {?}
 */
export function combineChange(combined, change) {
    switch (change.type) {
        case 'added':
            if (combined[change.newIndex] && combined[change.newIndex].doc.ref.isEqual(change.doc.ref)) {
                // Not sure why the duplicates are getting fired
            }
            else {
                combined.splice(change.newIndex, 0, change);
            }
            break;
        case 'modified':
            if (combined[change.oldIndex] == null || combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
                // When an item changes position we first remove it
                // and then add it's new position
                if (change.oldIndex !== change.newIndex) {
                    combined.splice(change.oldIndex, 1);
                    combined.splice(change.newIndex, 0, change);
                }
                else {
                    combined.splice(change.newIndex, 1, change);
                }
            }
            break;
        case 'removed':
            if (combined[change.oldIndex] && combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
                combined.splice(change.oldIndex, 1);
            }
            break;
    }
    return combined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiY29sbGVjdGlvbi9jaGFuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFTM0MsTUFBTSxVQUFVLFVBQVUsQ0FBSSxLQUFZLEVBQUUsU0FBeUI7SUFDbkUsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDO1NBQ3ZDLElBQUksQ0FDSCxHQUFHOzs7O0lBQUMsVUFBQSxNQUFNO1FBQ1IsT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTthQUN4QixHQUFHOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLG1CQUFBLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUEyQixDQUFDLEVBQW5FLENBQW1FLEVBQUM7SUFEckYsQ0FDcUYsRUFBQyxDQUFDLENBQUM7QUFDaEcsQ0FBQzs7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGFBQWEsQ0FBSSxLQUFZLEVBQUUsTUFBNEIsRUFBRSxTQUF5QjtJQUNwRyxPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7U0FDdkMsSUFBSSxDQUNILEdBQUc7Ozs7SUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQTVCLENBQTRCLEVBQUMsRUFDNUMsSUFBSTs7Ozs7SUFBQyxVQUFDLE9BQU8sRUFBRSxPQUFPLElBQUssT0FBQSxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBeEMsQ0FBd0MsR0FBRSxFQUFFLENBQUMsRUFDeEUsR0FBRzs7OztJQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsbUJBQUEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQTJCLENBQUMsRUFBekQsQ0FBeUQsRUFBQyxFQUEzRSxDQUEyRSxFQUFDLENBQUMsQ0FBQztBQUNuRyxDQUFDOzs7Ozs7Ozs7O0FBU0QsTUFBTSxVQUFVLGNBQWMsQ0FBSSxPQUE0QixFQUFFLE9BQTRCLEVBQUUsTUFBNEI7SUFDeEgsT0FBTyxDQUFDLE9BQU87Ozs7SUFBQyxVQUFBLE1BQU07UUFDcEIsNkJBQTZCO1FBQzdCLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7O0FBT0QsTUFBTSxVQUFVLGFBQWEsQ0FBSSxRQUE2QixFQUFFLE1BQXlCO0lBQ3ZGLFFBQU8sTUFBTSxDQUFDLElBQUksRUFBRTtRQUNsQixLQUFLLE9BQU87WUFDVixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxRixnREFBZ0Q7YUFDakQ7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM3QztZQUNELE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEcsbURBQW1EO2dCQUNuRCxpQ0FBaUM7Z0JBQ2pDLElBQUcsTUFBTSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdDO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7WUFDRCxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTTtLQUNUO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21Db2xsZWN0aW9uUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFNjaGVkdWxlckxpa2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUXVlcnksIERvY3VtZW50Q2hhbmdlVHlwZSwgRG9jdW1lbnRDaGFuZ2UsIERvY3VtZW50Q2hhbmdlQWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogUmV0dXJuIGEgc3RyZWFtIG9mIGRvY3VtZW50IGNoYW5nZXMgb24gYSBxdWVyeS4gVGhlc2UgcmVzdWx0cyBhcmUgbm90IGluIHNvcnQgb3JkZXIgYnV0IGluXG4gKiBvcmRlciBvZiBvY2N1cmVuY2UuXG4gKiBAcGFyYW0gcXVlcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvY0NoYW5nZXM8VD4ocXVlcnk6IFF1ZXJ5LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxUPltdPiB7XG4gIHJldHVybiBmcm9tQ29sbGVjdGlvblJlZihxdWVyeSwgc2NoZWR1bGVyKVxuICAgIC5waXBlKFxuICAgICAgbWFwKGFjdGlvbiA9PlxuICAgICAgICBhY3Rpb24ucGF5bG9hZC5kb2NDaGFuZ2VzKClcbiAgICAgICAgICAubWFwKGNoYW5nZSA9PiAoeyB0eXBlOiBjaGFuZ2UudHlwZSwgcGF5bG9hZDogY2hhbmdlIH0gYXMgRG9jdW1lbnRDaGFuZ2VBY3Rpb248VD4pKSkpO1xufVxuXG4vKipcbiAqIFJldHVybiBhIHN0cmVhbSBvZiBkb2N1bWVudCBjaGFuZ2VzIG9uIGEgcXVlcnkuIFRoZXNlIHJlc3VsdHMgYXJlIGluIHNvcnQgb3JkZXIuXG4gKiBAcGFyYW0gcXVlcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZENoYW5nZXM8VD4ocXVlcnk6IFF1ZXJ5LCBldmVudHM6IERvY3VtZW50Q2hhbmdlVHlwZVtdLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxUPltdPiB7XG4gIHJldHVybiBmcm9tQ29sbGVjdGlvblJlZihxdWVyeSwgc2NoZWR1bGVyKVxuICAgIC5waXBlKFxuICAgICAgbWFwKGNoYW5nZXMgPT4gY2hhbmdlcy5wYXlsb2FkLmRvY0NoYW5nZXMoKSksXG4gICAgICBzY2FuKChjdXJyZW50LCBjaGFuZ2VzKSA9PiBjb21iaW5lQ2hhbmdlcyhjdXJyZW50LCBjaGFuZ2VzLCBldmVudHMpLCBbXSksXG4gICAgICBtYXAoY2hhbmdlcyA9PiBjaGFuZ2VzLm1hcChjID0+ICh7IHR5cGU6IGMudHlwZSwgcGF5bG9hZDogYyB9IGFzIERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+KSkpKTtcbn1cblxuLyoqXG4gKiBDb21iaW5lcyB0aGUgdG90YWwgcmVzdWx0IHNldCBmcm9tIHRoZSBjdXJyZW50IHNldCBvZiBjaGFuZ2VzIGZyb20gYW4gaW5jb21pbmcgc2V0XG4gKiBvZiBjaGFuZ2VzLlxuICogQHBhcmFtIGN1cnJlbnRcbiAqIEBwYXJhbSBjaGFuZ2VzXG4gKiBAcGFyYW0gZXZlbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lQ2hhbmdlczxUPihjdXJyZW50OiBEb2N1bWVudENoYW5nZTxUPltdLCBjaGFuZ2VzOiBEb2N1bWVudENoYW5nZTxUPltdLCBldmVudHM6IERvY3VtZW50Q2hhbmdlVHlwZVtdKSB7XG4gIGNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgIC8vIHNraXAgdW53YW50ZWQgY2hhbmdlIHR5cGVzXG4gICAgaWYoZXZlbnRzLmluZGV4T2YoY2hhbmdlLnR5cGUpID4gLTEpIHtcbiAgICAgIGN1cnJlbnQgPSBjb21iaW5lQ2hhbmdlKGN1cnJlbnQsIGNoYW5nZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzb3J0ZWQgYXJyYXkgZnJvbSBhIG5ldyBjaGFuZ2UuXG4gKiBAcGFyYW0gY29tYmluZWRcbiAqIEBwYXJhbSBjaGFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVDaGFuZ2U8VD4oY29tYmluZWQ6IERvY3VtZW50Q2hhbmdlPFQ+W10sIGNoYW5nZTogRG9jdW1lbnRDaGFuZ2U8VD4pOiBEb2N1bWVudENoYW5nZTxUPltdIHtcbiAgc3dpdGNoKGNoYW5nZS50eXBlKSB7XG4gICAgY2FzZSAnYWRkZWQnOlxuICAgICAgaWYgKGNvbWJpbmVkW2NoYW5nZS5uZXdJbmRleF0gJiYgY29tYmluZWRbY2hhbmdlLm5ld0luZGV4XS5kb2MucmVmLmlzRXF1YWwoY2hhbmdlLmRvYy5yZWYpKSB7XG4gICAgICAgIC8vIE5vdCBzdXJlIHdoeSB0aGUgZHVwbGljYXRlcyBhcmUgZ2V0dGluZyBmaXJlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tYmluZWQuc3BsaWNlKGNoYW5nZS5uZXdJbmRleCwgMCwgY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21vZGlmaWVkJzpcbiAgICAgIGlmIChjb21iaW5lZFtjaGFuZ2Uub2xkSW5kZXhdID09IG51bGwgfHwgY29tYmluZWRbY2hhbmdlLm9sZEluZGV4XS5kb2MucmVmLmlzRXF1YWwoY2hhbmdlLmRvYy5yZWYpKSB7XG4gICAgICAgIC8vIFdoZW4gYW4gaXRlbSBjaGFuZ2VzIHBvc2l0aW9uIHdlIGZpcnN0IHJlbW92ZSBpdFxuICAgICAgICAvLyBhbmQgdGhlbiBhZGQgaXQncyBuZXcgcG9zaXRpb25cbiAgICAgICAgaWYoY2hhbmdlLm9sZEluZGV4ICE9PSBjaGFuZ2UubmV3SW5kZXgpIHtcbiAgICAgICAgICBjb21iaW5lZC5zcGxpY2UoY2hhbmdlLm9sZEluZGV4LCAxKTtcbiAgICAgICAgICBjb21iaW5lZC5zcGxpY2UoY2hhbmdlLm5ld0luZGV4LCAwLCBjaGFuZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbWJpbmVkLnNwbGljZShjaGFuZ2UubmV3SW5kZXgsIDEsIGNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlbW92ZWQnOlxuICAgICAgaWYgKGNvbWJpbmVkW2NoYW5nZS5vbGRJbmRleF0gJiYgY29tYmluZWRbY2hhbmdlLm9sZEluZGV4XS5kb2MucmVmLmlzRXF1YWwoY2hhbmdlLmRvYy5yZWYpKSB7XG4gICAgICAgIGNvbWJpbmVkLnNwbGljZShjaGFuZ2Uub2xkSW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGNvbWJpbmVkO1xufVxuIl19