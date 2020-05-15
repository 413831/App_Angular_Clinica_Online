/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { queueScheduler, asyncScheduler } from 'rxjs';
import { subscribeOn, observeOn, tap } from 'rxjs/operators';
/**
 * @return {?}
 */
function noop() { }
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
var /**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
ɵZoneScheduler = /** @class */ (function () {
    function ɵZoneScheduler(zone, delegate) {
        if (delegate === void 0) { delegate = queueScheduler; }
        this.zone = zone;
        this.delegate = delegate;
    }
    /**
     * @return {?}
     */
    ɵZoneScheduler.prototype.now = /**
     * @return {?}
     */
    function () {
        return this.delegate.now();
    };
    /**
     * @param {?} work
     * @param {?=} delay
     * @param {?=} state
     * @return {?}
     */
    ɵZoneScheduler.prototype.schedule = /**
     * @param {?} work
     * @param {?=} delay
     * @param {?=} state
     * @return {?}
     */
    function (work, delay, state) {
        /** @type {?} */
        var targetZone = this.zone;
        // Wrap the specified work function to make sure that if nested scheduling takes place the
        // work is executed in the correct zone
        /** @type {?} */
        var workInZone = (/**
         * @this {?}
         * @param {?} state
         * @return {?}
         */
        function (state) {
            var _this = this;
            targetZone.runGuarded((/**
             * @return {?}
             */
            function () {
                work.apply(_this, [state]);
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
    };
    return ɵZoneScheduler;
}());
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
export { ɵZoneScheduler };
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
var /**
 * @template T
 */
ɵBlockUntilFirstOperator = /** @class */ (function () {
    function ɵBlockUntilFirstOperator(zone) {
        this.zone = zone;
        this.task = null;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    ɵBlockUntilFirstOperator.prototype.call = /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    function (subscriber, source) {
        /** @type {?} */
        var unscheduleTask = this.unscheduleTask.bind(this);
        this.task = this.zone.run((/**
         * @return {?}
         */
        function () { return Zone.current.scheduleMacroTask('firebaseZoneBlock', noop, {}, noop, noop); }));
        return source.pipe(tap(unscheduleTask, unscheduleTask, unscheduleTask)).subscribe(subscriber).add(unscheduleTask);
    };
    /**
     * @private
     * @return {?}
     */
    ɵBlockUntilFirstOperator.prototype.unscheduleTask = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // maybe this is a race condition, invoke in a timeout
        // hold for 10ms while I try to figure out what is going on    
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.task != null && _this.task.state === 'scheduled') {
                _this.task.invoke();
                _this.task = null;
            }
        }), 10);
    };
    return ɵBlockUntilFirstOperator;
}());
/**
 * @template T
 */
export { ɵBlockUntilFirstOperator };
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
var ɵAngularFireSchedulers = /** @class */ (function () {
    function ɵAngularFireSchedulers(ngZone) {
        this.ngZone = ngZone;
        this.outsideAngular = ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return new ɵZoneScheduler(Zone.current); }));
        this.insideAngular = ngZone.run((/**
         * @return {?}
         */
        function () { return new ɵZoneScheduler(Zone.current, asyncScheduler); }));
    }
    return ɵAngularFireSchedulers;
}());
export { ɵAngularFireSchedulers };
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
var noopFunctions = ['ngOnDestroy'];
// INVESTIGATE should we make the Proxy revokable and do some cleanup?
//             right now it's fairly simple but I'm sure this will grow in complexity
/** @type {?} */
export var ɵlazySDKProxy = (/**
 * @param {?} klass
 * @param {?} observable
 * @param {?} zone
 * @return {?}
 */
function (klass, observable, zone) {
    return new Proxy(klass, {
        get: (/**
         * @param {?} _
         * @param {?} name
         * @return {?}
         */
        function (_, name) { return zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            if (klass[name]) {
                return klass[name];
            }
            if (noopFunctions.includes(name)) {
                return (/**
                 * @return {?}
                 */
                function () { });
            }
            /** @type {?} */
            var promise = observable.toPromise().then((/**
             * @param {?} mod
             * @return {?}
             */
            function (mod) {
                /** @type {?} */
                var ret = mod && mod[name];
                // TODO move to proper type guards
                if (typeof ret == 'function') {
                    return ret.bind(mod);
                }
                else if (ret && ret.then) {
                    return ret.then((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) { return zone.run((/**
                     * @return {?}
                     */
                    function () { return res; })); }));
                }
                else {
                    return zone.run((/**
                     * @return {?}
                     */
                    function () { return ret; }));
                }
            }));
            // recurse the proxy
            return new Proxy((/**
             * @return {?}
             */
            function () { return undefined; }), {
                get: (/**
                 * @param {?} _
                 * @param {?} name
                 * @return {?}
                 */
                function (_, name) { return promise[name]; }),
                // TODO handle callbacks as transparently as I can 
                apply: (/**
                 * @param {?} self
                 * @param {?} _
                 * @param {?} args
                 * @return {?}
                 */
                function (self, _, args) { return promise.then((/**
                 * @param {?} it
                 * @return {?}
                 */
                function (it) { return it && it.apply(void 0, __spread(args)); })); })
            });
        })); })
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmZpcmUyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXIvZmlyZS8iLCJzb3VyY2VzIjpbImFuZ3VsYXJmaXJlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBNEQsY0FBYyxFQUF1QyxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckosT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFN0QsU0FBUyxJQUFJLEtBQUssQ0FBQzs7OztBQUtuQjs7OztJQUNFLHdCQUFvQixJQUFTLEVBQVUsUUFBOEI7UUFBOUIseUJBQUEsRUFBQSx5QkFBOEI7UUFBakQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFVLGFBQVEsR0FBUixRQUFRLENBQXNCO0lBQUksQ0FBQzs7OztJQUUxRSw0QkFBRzs7O0lBQUg7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUVELGlDQUFROzs7Ozs7SUFBUixVQUFTLElBQXVELEVBQUUsS0FBYyxFQUFFLEtBQVc7O1lBQ3JGLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSTs7OztZQUd0QixVQUFVOzs7OztRQUFHLFVBQXNDLEtBQVU7WUFBaEQsaUJBSWxCO1lBSEMsVUFBVSxDQUFDLFVBQVU7OztZQUFDO2dCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFFRCxzR0FBc0c7UUFDdEcsaUdBQWlHO1FBQ2pHLCtHQUErRzs7UUFGL0csc0dBQXNHO1FBQ3RHLGlHQUFpRztRQUNqRywrR0FBK0c7UUFDL0csT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pE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QWEsQ0FBQTs7Z0JBRS9CLEtBQUs7Ozs7OztnQkFBRSxVQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLElBQUksRUFBRSx3QkFBSSxJQUFJLEVBQUMsRUFBakIsQ0FBaUIsRUFBQyxFQUFyQyxDQUFxQyxDQUFBO2FBQ2hFLENBQ0YsQ0FBQTtRQUNILENBQUMsRUFBQyxFQXJCdUIsQ0FxQnZCLENBQUE7S0FDSCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgU2NoZWR1bGVyTGlrZSwgU2NoZWR1bGVyQWN0aW9uLCBxdWV1ZVNjaGVkdWxlciwgT3BlcmF0b3IsIFN1YnNjcmliZXIsIFRlYXJkb3duTG9naWMsIGFzeW5jU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdWJzY3JpYmVPbiwgb2JzZXJ2ZU9uLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7IH1cblxuLyoqXG4gKiBTY2hlZHVsZXMgdGFza3Mgc28gdGhhdCB0aGV5IGFyZSBpbnZva2VkIGluc2lkZSB0aGUgWm9uZSB0aGF0IGlzIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyDJtVpvbmVTY2hlZHVsZXIgaW1wbGVtZW50cyBTY2hlZHVsZXJMaWtlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBhbnksIHByaXZhdGUgZGVsZWdhdGU6IGFueSA9IHF1ZXVlU2NoZWR1bGVyKSB7IH1cblxuICBub3coKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubm93KCk7XG4gIH1cblxuICBzY2hlZHVsZSh3b3JrOiAodGhpczogU2NoZWR1bGVyQWN0aW9uPGFueT4sIHN0YXRlPzogYW55KSA9PiB2b2lkLCBkZWxheT86IG51bWJlciwgc3RhdGU/OiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHRhcmdldFpvbmUgPSB0aGlzLnpvbmU7XG4gICAgLy8gV3JhcCB0aGUgc3BlY2lmaWVkIHdvcmsgZnVuY3Rpb24gdG8gbWFrZSBzdXJlIHRoYXQgaWYgbmVzdGVkIHNjaGVkdWxpbmcgdGFrZXMgcGxhY2UgdGhlXG4gICAgLy8gd29yayBpcyBleGVjdXRlZCBpbiB0aGUgY29ycmVjdCB6b25lXG4gICAgY29uc3Qgd29ya0luWm9uZSA9IGZ1bmN0aW9uICh0aGlzOiBTY2hlZHVsZXJBY3Rpb248YW55Piwgc3RhdGU6IGFueSkge1xuICAgICAgdGFyZ2V0Wm9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICAgICAgd29yay5hcHBseSh0aGlzLCBbc3RhdGVdKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNjaGVkdWxpbmcgaXRzZWxmIG5lZWRzIHRvIGJlIHJ1biBpbiB6b25lIHRvIGVuc3VyZSBzZXRJbnRlcnZhbCBjYWxscyBmb3IgYXN5bmMgc2NoZWR1bGluZyBhcmUgZG9uZVxuICAgIC8vIGluc2lkZSB0aGUgY29ycmVjdCB6b25lLiBUaGlzIHNjaGVkdWxlciBuZWVkcyB0byBzY2hlZHVsZSBhc3luY2hyb25vdXNseSBhbHdheXMgdG8gZW5zdXJlIHRoYXRcbiAgICAvLyBmaXJlYmFzZSBlbWlzc2lvbnMgYXJlIG5ldmVyIHN5bmNocm9ub3VzLiBTcGVjaWZ5aW5nIGEgZGVsYXkgY2F1c2VzIGlzc3VlcyB3aXRoIHRoZSBxdWV1ZVNjaGVkdWxlciBkZWxlZ2F0ZS5cbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zY2hlZHVsZSh3b3JrSW5ab25lLCBkZWxheSwgc3RhdGUpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIMm1QmxvY2tVbnRpbEZpcnN0T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHByaXZhdGUgdGFzazogTWFjcm9UYXNrIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBhbnkpIHsgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgY29uc3QgdW5zY2hlZHVsZVRhc2sgPSB0aGlzLnVuc2NoZWR1bGVUYXNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy50YXNrID0gdGhpcy56b25lLnJ1bigoKSA9PiBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soJ2ZpcmViYXNlWm9uZUJsb2NrJywgbm9vcCwge30sIG5vb3AsIG5vb3ApKTtcblxuICAgIHJldHVybiBzb3VyY2UucGlwZShcbiAgICAgIHRhcCh1bnNjaGVkdWxlVGFzaywgdW5zY2hlZHVsZVRhc2ssIHVuc2NoZWR1bGVUYXNrKVxuICAgICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpLmFkZCh1bnNjaGVkdWxlVGFzayk7XG4gIH1cblxuICBwcml2YXRlIHVuc2NoZWR1bGVUYXNrKCkge1xuICAgIC8vIG1heWJlIHRoaXMgaXMgYSByYWNlIGNvbmRpdGlvbiwgaW52b2tlIGluIGEgdGltZW91dFxuICAgIC8vIGhvbGQgZm9yIDEwbXMgd2hpbGUgSSB0cnkgdG8gZmlndXJlIG91dCB3aGF0IGlzIGdvaW5nIG9uICAgIFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFzayAhPSBudWxsICYmIHRoaXMudGFzay5zdGF0ZSA9PT0gJ3NjaGVkdWxlZCcpIHtcbiAgICAgICAgdGhpcy50YXNrLmludm9rZSgpO1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMge1xuICBwdWJsaWMgcmVhZG9ubHkgb3V0c2lkZUFuZ3VsYXI6IMm1Wm9uZVNjaGVkdWxlcjtcbiAgcHVibGljIHJlYWRvbmx5IGluc2lkZUFuZ3VsYXI6IMm1Wm9uZVNjaGVkdWxlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLm91dHNpZGVBbmd1bGFyID0gbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IG5ldyDJtVpvbmVTY2hlZHVsZXIoWm9uZS5jdXJyZW50KSk7XG4gICAgdGhpcy5pbnNpZGVBbmd1bGFyID0gbmdab25lLnJ1bigoKSA9PiBuZXcgybVab25lU2NoZWR1bGVyKFpvbmUuY3VycmVudCwgYXN5bmNTY2hlZHVsZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIE9wZXJhdG9yIHRvIGJsb2NrIHRoZSB6b25lIHVudGlsIHRoZSBmaXJzdCB2YWx1ZSBoYXMgYmVlbiBlbWl0dGVkIG9yIHRoZSBvYnNlcnZhYmxlXG4gKiBoYXMgY29tcGxldGVkL2Vycm9yZWQuIFRoaXMgaXMgdXNlZCB0byBtYWtlIHN1cmUgdGhhdCB1bml2ZXJzYWwgd2FpdHMgdW50aWwgdGhlIGZpcnN0XG4gKiB2YWx1ZSBmcm9tIGZpcmViYXNlIGJ1dCBkb2Vzbid0IGJsb2NrIHRoZSB6b25lIGZvcmV2ZXIgc2luY2UgdGhlIGZpcmViYXNlIHN1YnNjcmlwdGlvblxuICogaXMgc3RpbGwgYWxpdmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtWtlZXBVbnN0YWJsZVVudGlsRmlyc3RGYWN0b3J5KFxuICBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgcGxhdGZvcm1JZDogT2JqZWN0XG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtlZXBVbnN0YWJsZVVudGlsRmlyc3Q8VD4ob2JzJDogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4ge1xuICAgIG9icyQgPSBvYnMkLmxpZnQoXG4gICAgICBuZXcgybVCbG9ja1VudGlsRmlyc3RPcGVyYXRvcihzY2hlZHVsZXJzLm5nWm9uZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG9icyQucGlwZShcbiAgICAgIC8vIFJ1biB0aGUgc3Vic2NyaWJlIGJvZHkgb3V0c2lkZSBvZiBBbmd1bGFyIChlLmcuIGNhbGxpbmcgRmlyZWJhc2UgU0RLIHRvIGFkZCBhIGxpc3RlbmVyIHRvIGEgY2hhbmdlIGV2ZW50KVxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICAvLyBSdW4gb3BlcmF0b3JzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lIChlLmcuIHNpZGUgZWZmZWN0cyB2aWEgdGFwKCkpXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKVxuICAgICAgLy8gSU5WRVNUSUdBVEUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhcmZpcmUvcHVsbC8yMzE1XG4gICAgICAvLyBzaGFyZSgpXG4gICAgKTtcbiAgfVxufVxuXG50eXBlIEZ1bmN0aW9uUHJvcGVydHlOYW1lczxUPiA9IHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBGdW5jdGlvbiA/IEsgOiBuZXZlciB9W2tleW9mIFRdO1xudHlwZSBQcm9taXNlUmV0dXJuaW5nRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+ID0geyBbSyBpbiBGdW5jdGlvblByb3BlcnR5TmFtZXM8VD5dOiBSZXR1cm5UeXBlPFRbS10+IGV4dGVuZHMgUHJvbWlzZTxhbnk+ID8gSyA6IG5ldmVyIH1bRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+XTtcbnR5cGUgTm9uUHJvbWlzZVJldHVybmluZ0Z1bmN0aW9uUHJvcGVydHlOYW1lczxUPiA9IHsgW0sgaW4gRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+XTogUmV0dXJuVHlwZTxUW0tdPiBleHRlbmRzIFByb21pc2U8YW55PiA/IG5ldmVyIDogSyB9W0Z1bmN0aW9uUHJvcGVydHlOYW1lczxUPl07XG50eXBlIE5vbkZ1bmN0aW9uUHJvcGVydHlOYW1lczxUPiA9IHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBGdW5jdGlvbiA/IG5ldmVyIDogSyB9W2tleW9mIFRdO1xuXG5leHBvcnQgdHlwZSDJtVByb21pc2VQcm94eTxUPiA9IHsgW0sgaW4gTm9uRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+XTogUHJvbWlzZTxUW0tdPiB9ICZcbiAgeyBbSyBpbiBOb25Qcm9taXNlUmV0dXJuaW5nRnVuY3Rpb25Qcm9wZXJ0eU5hbWVzPFQ+XTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VFtLXT4pID0+IFByb21pc2U8UmV0dXJuVHlwZTxUW0tdPj4gfSAmXG4gIHsgW0sgaW4gUHJvbWlzZVJldHVybmluZ0Z1bmN0aW9uUHJvcGVydHlOYW1lczxUPiAgIF06ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFRbS10+KSA9PiBSZXR1cm5UeXBlPFRbS10+IH07XG5cblxuLy8gREVCVUcgcXVpY2sgZGVidWdnZXIgZnVuY3Rpb24gZm9yIGlubGluZSBsb2dnaW5nIHRoYXQgdHlwZXNjcmlwdCBkb2Vzbid0IGNvbXBsYWluIGFib3V0XG4vLyAgICAgICB3cm90ZSBpdCBmb3IgZGVidWdnaW5nIHRoZSDJtWxhenlTREtQcm94eSwgY29tbWVudGluZyBvdXQgZm9yIG5vdzsgc2hvdWxkIGNvbnNpZGVyIGV4cG9zaW5nIGFcbi8vICAgICAgIHZlcmJvc2UgbW9kZSBmb3IgQW5ndWxhckZpcmUgaW4gYSBmdXR1cmUgcmVsZWFzZSB0aGF0IHVzZXMgc29tZXRoaW5nIGxpa2UgdGhpcyBpbiBtdWx0aXBsZSBwbGFjZXNcbi8vICAgICAgIHVzYWdlOiAoKSA9PiBsb2coJ3NvbWV0aGluZycpIHx8IHJldHVyblZhbHVlXG4vLyBjb25zdCBsb2cgPSAoLi4uYXJnczogYW55W10pOiBmYWxzZSA9PiB7IGNvbnNvbGUubG9nKC4uLmFyZ3MpOyByZXR1cm4gZmFsc2UgfVxuXG4vLyBUaGUgcHJvYmxlbSBoZXJlIGFyZSB0aGluZ3MgbGlrZSBuZ09uRGVzdHJveSBhcmUgbWlzc2luZywgdGhlbiB0cmlnZ2VyaW5nIHRoZSBzZXJ2aWNlXG4vLyByYXRoZXIgdGhhbiBkaWcgdG9vIGZhcjsgSSdtIGNhcHR1cmluZyB0aGVzZSBhcyBJIGdvLlxuY29uc3Qgbm9vcEZ1bmN0aW9ucyA9IFsnbmdPbkRlc3Ryb3knXTtcblxuLy8gSU5WRVNUSUdBVEUgc2hvdWxkIHdlIG1ha2UgdGhlIFByb3h5IHJldm9rYWJsZSBhbmQgZG8gc29tZSBjbGVhbnVwP1xuLy8gICAgICAgICAgICAgcmlnaHQgbm93IGl0J3MgZmFpcmx5IHNpbXBsZSBidXQgSSdtIHN1cmUgdGhpcyB3aWxsIGdyb3cgaW4gY29tcGxleGl0eVxuZXhwb3J0IGNvbnN0IMm1bGF6eVNES1Byb3h5ID0gKGtsYXNzOiBhbnksIG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55Piwgem9uZTogTmdab25lKSA9PiB7XG4gIHJldHVybiBuZXcgUHJveHkoa2xhc3MsIHtcbiAgICBnZXQ6IChfLCBuYW1lOnN0cmluZykgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAoa2xhc3NbbmFtZV0pIHsgcmV0dXJuIGtsYXNzW25hbWVdIH1cbiAgICAgIGlmIChub29wRnVuY3Rpb25zLmluY2x1ZGVzKG5hbWUpKSB7IHJldHVybiAoKSA9PiB7fSB9XG4gICAgICBsZXQgcHJvbWlzZSA9IG9ic2VydmFibGUudG9Qcm9taXNlKCkudGhlbihtb2QgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSBtb2QgJiYgbW9kW25hbWVdO1xuICAgICAgICAvLyBUT0RPIG1vdmUgdG8gcHJvcGVyIHR5cGUgZ3VhcmRzXG4gICAgICAgIGlmICh0eXBlb2YgcmV0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gcmV0LmJpbmQobW9kKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXQgJiYgcmV0LnRoZW4pIHtcbiAgICAgICAgICByZXR1cm4gcmV0LnRoZW4oKHJlczphbnkpID0+IHpvbmUucnVuKCgpID0+IHJlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB6b25lLnJ1bigoKSA9PiByZXQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIHJlY3Vyc2UgdGhlIHByb3h5XG4gICAgICByZXR1cm4gbmV3IFByb3h5KCgpID0+IHVuZGVmaW5lZCwge1xuICAgICAgICAgIGdldDogKF8sIG5hbWUpID0+IHByb21pc2VbbmFtZV0sXG4gICAgICAgICAgLy8gVE9ETyBoYW5kbGUgY2FsbGJhY2tzIGFzIHRyYW5zcGFyZW50bHkgYXMgSSBjYW4gXG4gICAgICAgICAgYXBwbHk6IChzZWxmLCBfLCBhcmdzKSA9PiBwcm9taXNlLnRoZW4oaXQgPT4gaXQgJiYgaXQoLi4uYXJncykpXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9KVxuICB9KVxufTsiXX0=