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
    action => action.payload.docChanges()
        .map((/**
     * @param {?} change
     * @return {?}
     */
    change => ((/** @type {?} */ ({ type: change.type, payload: change }))))))));
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
    changes => changes.payload.docChanges())), scan((/**
     * @param {?} current
     * @param {?} changes
     * @return {?}
     */
    (current, changes) => combineChanges(current, changes, events)), []), map((/**
     * @param {?} changes
     * @return {?}
     */
    changes => changes.map((/**
     * @param {?} c
     * @return {?}
     */
    c => ((/** @type {?} */ ({ type: c.type, payload: c }))))))));
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
    change => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiY29sbGVjdGlvbi9jaGFuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFTM0MsTUFBTSxVQUFVLFVBQVUsQ0FBSSxLQUFZLEVBQUUsU0FBeUI7SUFDbkUsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDO1NBQ3ZDLElBQUksQ0FDSCxHQUFHOzs7O0lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtTQUN4QixHQUFHOzs7O0lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFBLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUEyQixDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUM7QUFDaEcsQ0FBQzs7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGFBQWEsQ0FBSSxLQUFZLEVBQUUsTUFBNEIsRUFBRSxTQUF5QjtJQUNwRyxPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7U0FDdkMsSUFBSSxDQUNILEdBQUc7Ozs7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUMsRUFDNUMsSUFBSTs7Ozs7SUFBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsQ0FBQyxFQUN4RSxHQUFHOzs7O0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBQSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBMkIsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ25HLENBQUM7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsY0FBYyxDQUFJLE9BQTRCLEVBQUUsT0FBNEIsRUFBRSxNQUE0QjtJQUN4SCxPQUFPLENBQUMsT0FBTzs7OztJQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLDZCQUE2QjtRQUM3QixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDOzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxhQUFhLENBQUksUUFBNkIsRUFBRSxNQUF5QjtJQUN2RixRQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxPQUFPO1lBQ1YsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUYsZ0RBQWdEO2FBQ2pEO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDN0M7WUFDRCxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xHLG1EQUFtRDtnQkFDbkQsaUNBQWlDO2dCQUNqQyxJQUFHLE1BQU0sQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM3QztxQkFBTTtvQkFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM3QzthQUNGO1lBQ0QsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFGLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyQztZQUNELE1BQU07S0FDVDtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tQ29sbGVjdGlvblJlZiB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbVJlZic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFF1ZXJ5LCBEb2N1bWVudENoYW5nZVR5cGUsIERvY3VtZW50Q2hhbmdlLCBEb2N1bWVudENoYW5nZUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmVhbSBvZiBkb2N1bWVudCBjaGFuZ2VzIG9uIGEgcXVlcnkuIFRoZXNlIHJlc3VsdHMgYXJlIG5vdCBpbiBzb3J0IG9yZGVyIGJ1dCBpblxuICogb3JkZXIgb2Ygb2NjdXJlbmNlLlxuICogQHBhcmFtIHF1ZXJ5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb2NDaGFuZ2VzPFQ+KHF1ZXJ5OiBRdWVyeSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWYocXVlcnksIHNjaGVkdWxlcilcbiAgICAucGlwZShcbiAgICAgIG1hcChhY3Rpb24gPT5cbiAgICAgICAgYWN0aW9uLnBheWxvYWQuZG9jQ2hhbmdlcygpXG4gICAgICAgICAgLm1hcChjaGFuZ2UgPT4gKHsgdHlwZTogY2hhbmdlLnR5cGUsIHBheWxvYWQ6IGNoYW5nZSB9IGFzIERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+KSkpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBzdHJlYW0gb2YgZG9jdW1lbnQgY2hhbmdlcyBvbiBhIHF1ZXJ5LiBUaGVzZSByZXN1bHRzIGFyZSBpbiBzb3J0IG9yZGVyLlxuICogQHBhcmFtIHF1ZXJ5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0ZWRDaGFuZ2VzPFQ+KHF1ZXJ5OiBRdWVyeSwgZXZlbnRzOiBEb2N1bWVudENoYW5nZVR5cGVbXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWYocXVlcnksIHNjaGVkdWxlcilcbiAgICAucGlwZShcbiAgICAgIG1hcChjaGFuZ2VzID0+IGNoYW5nZXMucGF5bG9hZC5kb2NDaGFuZ2VzKCkpLFxuICAgICAgc2NhbigoY3VycmVudCwgY2hhbmdlcykgPT4gY29tYmluZUNoYW5nZXMoY3VycmVudCwgY2hhbmdlcywgZXZlbnRzKSwgW10pLFxuICAgICAgbWFwKGNoYW5nZXMgPT4gY2hhbmdlcy5tYXAoYyA9PiAoeyB0eXBlOiBjLnR5cGUsIHBheWxvYWQ6IGMgfSBhcyBEb2N1bWVudENoYW5nZUFjdGlvbjxUPikpKSk7XG59XG5cbi8qKlxuICogQ29tYmluZXMgdGhlIHRvdGFsIHJlc3VsdCBzZXQgZnJvbSB0aGUgY3VycmVudCBzZXQgb2YgY2hhbmdlcyBmcm9tIGFuIGluY29taW5nIHNldFxuICogb2YgY2hhbmdlcy5cbiAqIEBwYXJhbSBjdXJyZW50XG4gKiBAcGFyYW0gY2hhbmdlc1xuICogQHBhcmFtIGV2ZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUNoYW5nZXM8VD4oY3VycmVudDogRG9jdW1lbnRDaGFuZ2U8VD5bXSwgY2hhbmdlczogRG9jdW1lbnRDaGFuZ2U8VD5bXSwgZXZlbnRzOiBEb2N1bWVudENoYW5nZVR5cGVbXSkge1xuICBjaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAvLyBza2lwIHVud2FudGVkIGNoYW5nZSB0eXBlc1xuICAgIGlmKGV2ZW50cy5pbmRleE9mKGNoYW5nZS50eXBlKSA+IC0xKSB7XG4gICAgICBjdXJyZW50ID0gY29tYmluZUNoYW5nZShjdXJyZW50LCBjaGFuZ2UpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjdXJyZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc29ydGVkIGFycmF5IGZyb20gYSBuZXcgY2hhbmdlLlxuICogQHBhcmFtIGNvbWJpbmVkXG4gKiBAcGFyYW0gY2hhbmdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lQ2hhbmdlPFQ+KGNvbWJpbmVkOiBEb2N1bWVudENoYW5nZTxUPltdLCBjaGFuZ2U6IERvY3VtZW50Q2hhbmdlPFQ+KTogRG9jdW1lbnRDaGFuZ2U8VD5bXSB7XG4gIHN3aXRjaChjaGFuZ2UudHlwZSkge1xuICAgIGNhc2UgJ2FkZGVkJzpcbiAgICAgIGlmIChjb21iaW5lZFtjaGFuZ2UubmV3SW5kZXhdICYmIGNvbWJpbmVkW2NoYW5nZS5uZXdJbmRleF0uZG9jLnJlZi5pc0VxdWFsKGNoYW5nZS5kb2MucmVmKSkge1xuICAgICAgICAvLyBOb3Qgc3VyZSB3aHkgdGhlIGR1cGxpY2F0ZXMgYXJlIGdldHRpbmcgZmlyZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbWJpbmVkLnNwbGljZShjaGFuZ2UubmV3SW5kZXgsIDAsIGNoYW5nZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtb2RpZmllZCc6XG4gICAgICBpZiAoY29tYmluZWRbY2hhbmdlLm9sZEluZGV4XSA9PSBudWxsIHx8IGNvbWJpbmVkW2NoYW5nZS5vbGRJbmRleF0uZG9jLnJlZi5pc0VxdWFsKGNoYW5nZS5kb2MucmVmKSkge1xuICAgICAgICAvLyBXaGVuIGFuIGl0ZW0gY2hhbmdlcyBwb3NpdGlvbiB3ZSBmaXJzdCByZW1vdmUgaXRcbiAgICAgICAgLy8gYW5kIHRoZW4gYWRkIGl0J3MgbmV3IHBvc2l0aW9uXG4gICAgICAgIGlmKGNoYW5nZS5vbGRJbmRleCAhPT0gY2hhbmdlLm5ld0luZGV4KSB7XG4gICAgICAgICAgY29tYmluZWQuc3BsaWNlKGNoYW5nZS5vbGRJbmRleCwgMSk7XG4gICAgICAgICAgY29tYmluZWQuc3BsaWNlKGNoYW5nZS5uZXdJbmRleCwgMCwgY2hhbmdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21iaW5lZC5zcGxpY2UoY2hhbmdlLm5ld0luZGV4LCAxLCBjaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZW1vdmVkJzpcbiAgICAgIGlmIChjb21iaW5lZFtjaGFuZ2Uub2xkSW5kZXhdICYmIGNvbWJpbmVkW2NoYW5nZS5vbGRJbmRleF0uZG9jLnJlZi5pc0VxdWFsKGNoYW5nZS5kb2MucmVmKSkge1xuICAgICAgICBjb21iaW5lZC5zcGxpY2UoY2hhbmdlLm9sZEluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBjb21iaW5lZDtcbn1cbiJdfQ==