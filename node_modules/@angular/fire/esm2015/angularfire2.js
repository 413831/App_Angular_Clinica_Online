/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { queueScheduler, asyncScheduler } from 'rxjs';
import { subscribeOn, observeOn, tap } from 'rxjs/operators';
/**
 * @return {?}
 */
function noop() { }
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
export class ɵZoneScheduler {
    /**
     * @param {?} zone
     * @param {?=} delegate
     */
    constructor(zone, delegate = queueScheduler) {
        this.zone = zone;
        this.delegate = delegate;
    }
    /**
     * @return {?}
     */
    now() {
        return this.delegate.now();
    }
    /**
     * @param {?} work
     * @param {?=} delay
     * @param {?=} state
     * @return {?}
     */
    schedule(work, delay, state) {
        /** @type {?} */
        const targetZone = this.zone;
        // Wrap the specified work function to make sure that if nested scheduling takes place the
        // work is executed in the correct zone
        /** @type {?} */
        const workInZone = (/**
         * @this {?}
         * @param {?} state
         * @return {?}
         */
        function (state) {
            targetZone.runGuarded((/**
             * @return {?}
             */
            () => {
                work.apply(this, [state]);
            }));
        })
        // Scheduling itself needs to be run in zone to ensure setInterval calls for async scheduling are done
        // inside the correct zone. This scheduler needs to schedule asynchronously always to ensure that
        // firebase emissions are never synchronous. Specifying a delay causes issues with the queueScheduler delegate.
        ;
        // Scheduling itself needs to be run in zone to ensure setInterval calls for async scheduling are done
        // inside the correct zone. This scheduler needs to schedule asynchronously always to ensure that
        // firebase emissions are never synchronous. Specifying a delay causes issues with the queueScheduler delegate.
        return this.delegate.schedule(workInZone, delay, state);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ɵZoneScheduler.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    ɵZoneScheduler.prototype.delegate;
}
/**
 * @template T
 */
export class ɵBlockUntilFirstOperator {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
        this.task = null;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        /** @type {?} */
        const unscheduleTask = this.unscheduleTask.bind(this);
        this.task = this.zone.run((/**
         * @return {?}
         */
        () => Zone.current.scheduleMacroTask('firebaseZoneBlock', noop, {}, noop, noop)));
        return source.pipe(tap(unscheduleTask, unscheduleTask, unscheduleTask)).subscribe(subscriber).add(unscheduleTask);
    }
    /**
     * @private
     * @return {?}
     */
    unscheduleTask() {
        // maybe this is a race condition, invoke in a timeout
        // hold for 10ms while I try to figure out what is going on    
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.task != null && this.task.state === 'scheduled') {
                this.task.invoke();
                this.task = null;
            }
        }), 10);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ɵBlockUntilFirstOperator.prototype.task;
    /**
     * @type {?}
     * @private
     */
    ɵBlockUntilFirstOperator.prototype.zone;
}
export class ɵAngularFireSchedulers {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.outsideAngular = ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => new ɵZoneScheduler(Zone.current)));
        this.insideAngular = ngZone.run((/**
         * @return {?}
         */
        () => new ɵZoneScheduler(Zone.current, asyncScheduler)));
    }
}
if (false) {
    /** @type {?} */
    ɵAngularFireSchedulers.prototype.outsideAngular;
    /** @type {?} */
    ɵAngularFireSchedulers.prototype.insideAngular;
    /** @type {?} */
    ɵAngularFireSchedulers.prototype.ngZone;
}
/**
 * Operator to block the zone until the first value has been emitted or the observable
 * has completed/errored. This is used to make sure that universal waits until the first
 * value from firebase but doesn't block the zone forever since the firebase subscription
 * is still alive.
 * @param {?} schedulers
 * @param {?} platformId
 * @return {?}
 */
export function ɵkeepUnstableUntilFirstFactory(schedulers, platformId) {
    return (/**
     * @template T
     * @param {?} obs$
     * @return {?}
     */
    function keepUnstableUntilFirst(obs$) {
        obs$ = obs$.lift(new ɵBlockUntilFirstOperator(schedulers.ngZone));
        return obs$.pipe(
        // Run the subscribe body outside of Angular (e.g. calling Firebase SDK to add a listener to a change event)
        subscribeOn(schedulers.outsideAngular), 
        // Run operators inside the angular zone (e.g. side effects via tap())
        observeOn(schedulers.insideAngular)
        // INVESTIGATE https://github.com/angular/angularfire/pull/2315
        // share()
        );
    });
}
// DEBUG quick debugger function for inline logging that typescript doesn't complain about
//       wrote it for debugging the ɵlazySDKProxy, commenting out for now; should consider exposing a
//       verbose mode for AngularFire in a future release that uses something like this in multiple places
//       usage: () => log('something') || returnValue
// const log = (...args: any[]): false => { console.log(...args); return false }
// The problem here are things like ngOnDestroy are missing, then triggering the service
// rather than dig too far; I'm capturing these as I go.
/** @type {?} */
const noopFunctions = ['ngOnDestroy'];
// INVESTIGATE should we make the Proxy revokable and do some cleanup?
//             right now it's fairly simple but I'm sure this will grow in complexity
/** @type {?} */
export const ɵlazySDKProxy = (/**
 * @param {?} klass
 * @param {?} observable
 * @param {?} zone
 * @return {?}
 */
(klass, observable, zone) => {
    return new Proxy(klass, {
        get: (/**
         * @param {?} _
         * @param {?} name
         * @return {?}
         */
        (_, name) => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            if (klass[name]) {
                return klass[name];
            }
            if (noopFunctions.includes(name)) {
                return (/**
                 * @return {?}
                 */
                () => { });
            }
            /** @type {?} */
            let promise = observable.toPromise().then((/**
             * @param {?} mod
             * @return {?}
             */
            mod => {
                /** @type {?} */
                const ret = mod && mod[name];
                // TODO move to proper type guards
                if (typeof ret == 'function') {
                    return ret.bind(mod);
                }
                else if (ret && ret.then) {
                    return ret.then((/**
                     * @param {?} res
                     * @return {?}
                     */
                    (res) => zone.run((/**
                     * @return {?}
                     */
                    () => res))));
                }
                else {
                    return zone.run((/**
                     * @return {?}
                     */
                    () => ret));
                }
            }));
            // recurse the proxy
            return new Proxy((/**
             * @return {?}
             */
            () => undefined), {
                get: (/**
                 * @param {?} _
                 * @param {?} name
                 * @return {?}
                 */
                (_, name) => promise[name]),
                // TODO handle callbacks as transparently as I can 
                apply: (/**
                 * @param {?} self
                 * @param {?} _
                 * @param {?} args
                 * @return {?}
                 */
                (self, _, args) => promise.then((/**
                 * @param {?} it
                 * @return {?}
                 */
                it => it && it(...args))))
            });
        })))
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmZpcmUyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS8iLCJzb3VyY2VzIjpbImFuZ3VsYXJmaXJlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUE0RCxjQUFjLEVBQXVDLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNySixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU3RCxTQUFTLElBQUksS0FBSyxDQUFDOzs7O0FBS25CLE1BQU0sT0FBTyxjQUFjOzs7OztJQUN6QixZQUFvQixJQUFTLEVBQVUsV0FBZ0IsY0FBYztRQUFqRCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7SUFBSSxDQUFDOzs7O0lBRTFFLEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUVELFFBQVEsQ0FBQyxJQUF1RCxFQUFFLEtBQWMsRUFBRSxLQUFXOztjQUNyRixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUk7Ozs7Y0FHdEIsVUFBVTs7Ozs7UUFBRyxVQUFzQyxLQUFVO1lBQ2pFLFVBQVUsQ0FBQyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVELHNHQUFzRztRQUN0RyxpR0FBaUc7UUFDakcsK0dBQStHOztRQUYvRyxzR0FBc0c7UUFDdEcsaUdBQWlHO1FBQ2pHLCtHQUErRztRQUMvRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDekQsQ0FBQztDQUNGOzs7Ozs7SUFyQmEsOEJB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QUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUMsQ0FBQTthQUNoRSxDQUNGLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBTY2hlZHVsZXJMaWtlLCBTY2hlZHVsZXJBY3Rpb24sIHF1ZXVlU2NoZWR1bGVyLCBPcGVyYXRvciwgU3Vic2NyaWJlciwgVGVhcmRvd25Mb2dpYywgYXN5bmNTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN1YnNjcmliZU9uLCBvYnNlcnZlT24sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZnVuY3Rpb24gbm9vcCgpIHsgfVxuXG4vKipcbiAqIFNjaGVkdWxlcyB0YXNrcyBzbyB0aGF0IHRoZXkgYXJlIGludm9rZWQgaW5zaWRlIHRoZSBab25lIHRoYXQgaXMgcGFzc2VkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIMm1Wm9uZVNjaGVkdWxlciBpbXBsZW1lbnRzIFNjaGVkdWxlckxpa2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IGFueSwgcHJpdmF0ZSBkZWxlZ2F0ZTogYW55ID0gcXVldWVTY2hlZHVsZXIpIHsgfVxuXG4gIG5vdygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5ub3coKTtcbiAgfVxuXG4gIHNjaGVkdWxlKHdvcms6ICh0aGlzOiBTY2hlZHVsZXJBY3Rpb248YW55Piwgc3RhdGU/OiBhbnkpID0+IHZvaWQsIGRlbGF5PzogbnVtYmVyLCBzdGF0ZT86IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3QgdGFyZ2V0Wm9uZSA9IHRoaXMuem9uZTtcbiAgICAvLyBXcmFwIHRoZSBzcGVjaWZpZWQgd29yayBmdW5jdGlvbiB0byBtYWtlIHN1cmUgdGhhdCBpZiBuZXN0ZWQgc2NoZWR1bGluZyB0YWtlcyBwbGFjZSB0aGVcbiAgICAvLyB3b3JrIGlzIGV4ZWN1dGVkIGluIHRoZSBjb3JyZWN0IHpvbmVcbiAgICBjb25zdCB3b3JrSW5ab25lID0gZnVuY3Rpb24gKHRoaXM6IFNjaGVkdWxlckFjdGlvbjxhbnk+LCBzdGF0ZTogYW55KSB7XG4gICAgICB0YXJnZXRab25lLnJ1bkd1YXJkZWQoKCkgPT4ge1xuICAgICAgICB3b3JrLmFwcGx5KHRoaXMsIFtzdGF0ZV0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2NoZWR1bGluZyBpdHNlbGYgbmVlZHMgdG8gYmUgcnVuIGluIHpvbmUgdG8gZW5zdXJlIHNldEludGVydmFsIGNhbGxzIGZvciBhc3luYyBzY2hlZHVsaW5nIGFyZSBkb25lXG4gICAgLy8gaW5zaWRlIHRoZSBjb3JyZWN0IHpvbmUuIFRoaXMgc2NoZWR1bGVyIG5lZWRzIHRvIHNjaGVkdWxlIGFzeW5jaHJvbm91c2x5IGFsd2F5cyB0byBlbnN1cmUgdGhhdFxuICAgIC8vIGZpcmViYXNlIGVtaXNzaW9ucyBhcmUgbmV2ZXIgc3luY2hyb25vdXMuIFNwZWNpZnlpbmcgYSBkZWxheSBjYXVzZXMgaXNzdWVzIHdpdGggdGhlIHF1ZXVlU2NoZWR1bGVyIGRlbGVnYXRlLlxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNjaGVkdWxlKHdvcmtJblpvbmUsIGRlbGF5LCBzdGF0ZSlcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgybVCbG9ja1VudGlsRmlyc3RPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgcHJpdmF0ZSB0YXNrOiBNYWNyb1Rhc2sgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IGFueSkgeyB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IE9ic2VydmFibGU8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBjb25zdCB1bnNjaGVkdWxlVGFzayA9IHRoaXMudW5zY2hlZHVsZVRhc2suYmluZCh0aGlzKTtcbiAgICB0aGlzLnRhc2sgPSB0aGlzLnpvbmUucnVuKCgpID0+IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzaygnZmlyZWJhc2Vab25lQmxvY2snLCBub29wLCB7fSwgbm9vcCwgbm9vcCkpO1xuXG4gICAgcmV0dXJuIHNvdXJjZS5waXBlKFxuICAgICAgdGFwKHVuc2NoZWR1bGVUYXNrLCB1bnNjaGVkdWxlVGFzaywgdW5zY2hlZHVsZVRhc2spXG4gICAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcikuYWRkKHVuc2NoZWR1bGVUYXNrKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zY2hlZHVsZVRhc2soKSB7XG4gICAgLy8gbWF5YmUgdGhpcyBpcyBhIHJhY2UgY29uZGl0aW9uLCBpbnZva2UgaW4gYSB0aW1lb3V0XG4gICAgLy8gaG9sZCBmb3IgMTBtcyB3aGlsZSBJIHRyeSB0byBmaWd1cmUgb3V0IHdoYXQgaXMgZ29pbmcgb24gICAgXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXNrICE9IG51bGwgJiYgdGhpcy50YXNrLnN0YXRlID09PSAnc2NoZWR1bGVkJykge1xuICAgICAgICB0aGlzLnRhc2suaW52b2tlKCk7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB7XG4gIHB1YmxpYyByZWFkb25seSBvdXRzaWRlQW5ndWxhcjogybVab25lU2NoZWR1bGVyO1xuICBwdWJsaWMgcmVhZG9ubHkgaW5zaWRlQW5ndWxhcjogybVab25lU2NoZWR1bGVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMub3V0c2lkZUFuZ3VsYXIgPSBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gbmV3IMm1Wm9uZVNjaGVkdWxlcihab25lLmN1cnJlbnQpKTtcbiAgICB0aGlzLmluc2lkZUFuZ3VsYXIgPSBuZ1pvbmUucnVuKCgpID0+IG5ldyDJtVpvbmVTY2hlZHVsZXIoWm9uZS5jdXJyZW50LCBhc3luY1NjaGVkdWxlcikpO1xuICB9XG59XG5cbi8qKlxuICogT3BlcmF0b3IgdG8gYmxvY2sgdGhlIHpvbmUgdW50aWwgdGhlIGZpcnN0IHZhbHVlIGhhcyBiZWVuIGVtaXR0ZWQgb3IgdGhlIG9ic2VydmFibGVcbiAqIGhhcyBjb21wbGV0ZWQvZXJyb3JlZC4gVGhpcyBpcyB1c2VkIHRvIG1ha2Ugc3VyZSB0aGF0IHVuaXZlcnNhbCB3YWl0cyB1bnRpbCB0aGUgZmlyc3RcbiAqIHZhbHVlIGZyb20gZmlyZWJhc2UgYnV0IGRvZXNuJ3QgYmxvY2sgdGhlIHpvbmUgZm9yZXZlciBzaW5jZSB0aGUgZmlyZWJhc2Ugc3Vic2NyaXB0aW9uXG4gKiBpcyBzdGlsbCBhbGl2ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnkoXG4gIHNjaGVkdWxlcnM6IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICBwbGF0Zm9ybUlkOiBPYmplY3Rcbikge1xuICByZXR1cm4gZnVuY3Rpb24ga2VlcFVuc3RhYmxlVW50aWxGaXJzdDxUPihvYnMkOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgb2JzJCA9IG9icyQubGlmdChcbiAgICAgIG5ldyDJtUJsb2NrVW50aWxGaXJzdE9wZXJhdG9yKHNjaGVkdWxlcnMubmdab25lKVxuICAgICk7XG5cbiAgICByZXR1cm4gb2JzJC5waXBlKFxuICAgICAgLy8gUnVuIHRoZSBzdWJzY3JpYmUgYm9keSBvdXRzaWRlIG9mIEFuZ3VsYXIgKGUuZy4gY2FsbGluZyBGaXJlYmFzZSBTREsgdG8gYWRkIGEgbGlzdGVuZXIgdG8gYSBjaGFuZ2UgZXZlbnQpXG4gICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIC8vIFJ1biBvcGVyYXRvcnMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmUgKGUuZy4gc2lkZSBlZmZlY3RzIHZpYSB0YXAoKSlcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpXG4gICAgICAvLyBJTlZFU1RJR0FURSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyZmlyZS9wdWxsLzIzMTVcbiAgICAgIC8vIHNoYXJlKClcbiAgICApO1xuICB9XG59XG5cbnR5cGUgRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+ID0geyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIEZ1bmN0aW9uID8gSyA6IG5ldmVyIH1ba2V5b2YgVF07XG50eXBlIFByb21pc2VSZXR1cm5pbmdGdW5jdGlvblByb3BlcnR5TmFtZXM8VD4gPSB7IFtLIGluIEZ1bmN0aW9uUHJvcGVydHlOYW1lczxUPl06IFJldHVyblR5cGU8VFtLXT4gZXh0ZW5kcyBQcm9taXNlPGFueT4gPyBLIDogbmV2ZXIgfVtGdW5jdGlvblByb3BlcnR5TmFtZXM8VD5dO1xudHlwZSBOb25Qcm9taXNlUmV0dXJuaW5nRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+ID0geyBbSyBpbiBGdW5jdGlvblByb3BlcnR5TmFtZXM8VD5dOiBSZXR1cm5UeXBlPFRbS10+IGV4dGVuZHMgUHJvbWlzZTxhbnk+ID8gbmV2ZXIgOiBLIH1bRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+XTtcbnR5cGUgTm9uRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+ID0geyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIEZ1bmN0aW9uID8gbmV2ZXIgOiBLIH1ba2V5b2YgVF07XG5cbmV4cG9ydCB0eXBlIMm1UHJvbWlzZVByb3h5PFQ+ID0geyBbSyBpbiBOb25GdW5jdGlvblByb3BlcnR5TmFtZXM8VD5dOiBQcm9taXNlPFRbS10+IH0gJlxuICB7IFtLIGluIE5vblByb21pc2VSZXR1cm5pbmdGdW5jdGlvblByb3BlcnR5TmFtZXM8VD5dOiAoLi4uYXJnczogUGFyYW1ldGVyczxUW0tdPikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPFRbS10+PiB9ICZcbiAgeyBbSyBpbiBQcm9taXNlUmV0dXJuaW5nRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+ICAgXTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VFtLXT4pID0+IFJldHVyblR5cGU8VFtLXT4gfTtcblxuXG4vLyBERUJVRyBxdWljayBkZWJ1Z2dlciBmdW5jdGlvbiBmb3IgaW5saW5lIGxvZ2dpbmcgdGhhdCB0eXBlc2NyaXB0IGRvZXNuJ3QgY29tcGxhaW4gYWJvdXRcbi8vICAgICAgIHdyb3RlIGl0IGZvciBkZWJ1Z2dpbmcgdGhlIMm1bGF6eVNES1Byb3h5LCBjb21tZW50aW5nIG91dCBmb3Igbm93OyBzaG91bGQgY29uc2lkZXIgZXhwb3NpbmcgYVxuLy8gICAgICAgdmVyYm9zZSBtb2RlIGZvciBBbmd1bGFyRmlyZSBpbiBhIGZ1dHVyZSByZWxlYXNlIHRoYXQgdXNlcyBzb21ldGhpbmcgbGlrZSB0aGlzIGluIG11bHRpcGxlIHBsYWNlc1xuLy8gICAgICAgdXNhZ2U6ICgpID0+IGxvZygnc29tZXRoaW5nJykgfHwgcmV0dXJuVmFsdWVcbi8vIGNvbnN0IGxvZyA9ICguLi5hcmdzOiBhbnlbXSk6IGZhbHNlID0+IHsgY29uc29sZS5sb2coLi4uYXJncyk7IHJldHVybiBmYWxzZSB9XG5cbi8vIFRoZSBwcm9ibGVtIGhlcmUgYXJlIHRoaW5ncyBsaWtlIG5nT25EZXN0cm95IGFyZSBtaXNzaW5nLCB0aGVuIHRyaWdnZXJpbmcgdGhlIHNlcnZpY2Vcbi8vIHJhdGhlciB0aGFuIGRpZyB0b28gZmFyOyBJJ20gY2FwdHVyaW5nIHRoZXNlIGFzIEkgZ28uXG5jb25zdCBub29wRnVuY3Rpb25zID0gWyduZ09uRGVzdHJveSddO1xuXG4vLyBJTlZFU1RJR0FURSBzaG91bGQgd2UgbWFrZSB0aGUgUHJveHkgcmV2b2thYmxlIGFuZCBkbyBzb21lIGNsZWFudXA/XG4vLyAgICAgICAgICAgICByaWdodCBub3cgaXQncyBmYWlybHkgc2ltcGxlIGJ1dCBJJ20gc3VyZSB0aGlzIHdpbGwgZ3JvdyBpbiBjb21wbGV4aXR5XG5leHBvcnQgY29uc3QgybVsYXp5U0RLUHJveHkgPSAoa2xhc3M6IGFueSwgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+LCB6b25lOiBOZ1pvbmUpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm94eShrbGFzcywge1xuICAgIGdldDogKF8sIG5hbWU6c3RyaW5nKSA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmIChrbGFzc1tuYW1lXSkgeyByZXR1cm4ga2xhc3NbbmFtZV0gfVxuICAgICAgaWYgKG5vb3BGdW5jdGlvbnMuaW5jbHVkZXMobmFtZSkpIHsgcmV0dXJuICgpID0+IHt9IH1cbiAgICAgIGxldCBwcm9taXNlID0gb2JzZXJ2YWJsZS50b1Byb21pc2UoKS50aGVuKG1vZCA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IG1vZCAmJiBtb2RbbmFtZV07XG4gICAgICAgIC8vIFRPRE8gbW92ZSB0byBwcm9wZXIgdHlwZSBndWFyZHNcbiAgICAgICAgaWYgKHR5cGVvZiByZXQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiByZXQuYmluZChtb2QpO1xuICAgICAgICB9IGVsc2UgaWYgKHJldCAmJiByZXQudGhlbikge1xuICAgICAgICAgIHJldHVybiByZXQudGhlbigocmVzOmFueSkgPT4gem9uZS5ydW4oKCkgPT4gcmVzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHpvbmUucnVuKCgpID0+IHJldCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gcmVjdXJzZSB0aGUgcHJveHlcbiAgICAgIHJldHVybiBuZXcgUHJveHkoKCkgPT4gdW5kZWZpbmVkLCB7XG4gICAgICAgICAgZ2V0OiAoXywgbmFtZSkgPT4gcHJvbWlzZVtuYW1lXSxcbiAgICAgICAgICAvLyBUT0RPIGhhbmRsZSBjYWxsYmFja3MgYXMgdHJhbnNwYXJlbnRseSBhcyBJIGNhbiBcbiAgICAgICAgICBhcHBseTogKHNlbGYsIF8sIGFyZ3MpID0+IHByb21pc2UudGhlbihpdCA9PiBpdCAmJiBpdCguLi5hcmdzKSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH0pXG4gIH0pXG59OyJdfQ==