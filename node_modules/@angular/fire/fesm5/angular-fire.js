import { __spread } from 'tslib';
import { queueScheduler, asyncScheduler } from 'rxjs';
import { tap, subscribeOn, observeOn } from 'rxjs/operators';
import { InjectionToken, Version, NgZone, Optional, VERSION as VERSION$1, NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { apps, initializeApp, registerVersion } from 'firebase/app';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function noop() { }
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
var  /**
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
var  /**
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
function ɵkeepUnstableUntilFirstFactory(schedulers, platformId) {
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
var ɵlazySDKProxy = (/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FirebaseOptions() { }
;
/**
 * @record
 */
function FirebaseAppConfig() { }
;
/** @type {?} */
var FIREBASE_OPTIONS = new InjectionToken('angularfire2.app.options');
/** @type {?} */
var FIREBASE_APP_NAME = new InjectionToken('angularfire2.app.nameOrConfig');
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
var  
// Have to implement as we need to return a class from the provider, we should consider exporting
// this in the firebase/app types as this is our highest risk of breaks
FirebaseApp = /** @class */ (function () {
    function FirebaseApp() {
    }
    return FirebaseApp;
}());
if (false) {
    /** @type {?} */
    FirebaseApp.prototype.name;
    /** @type {?} */
    FirebaseApp.prototype.options;
    /** @type {?} */
    FirebaseApp.prototype.analytics;
    /** @type {?} */
    FirebaseApp.prototype.auth;
    /** @type {?} */
    FirebaseApp.prototype.database;
    /** @type {?} */
    FirebaseApp.prototype.messaging;
    /** @type {?} */
    FirebaseApp.prototype.performance;
    /** @type {?} */
    FirebaseApp.prototype.storage;
    /** @type {?} */
    FirebaseApp.prototype.delete;
    /** @type {?} */
    FirebaseApp.prototype.firestore;
    /** @type {?} */
    FirebaseApp.prototype.functions;
    /** @type {?} */
    FirebaseApp.prototype.remoteConfig;
}
/** @type {?} */
var VERSION = new Version('6.0.0');
/**
 * @param {?} options
 * @param {?} zone
 * @param {?=} nameOrConfig
 * @return {?}
 */
function ɵfirebaseAppFactory(options, zone, nameOrConfig) {
    /** @type {?} */
    var name = typeof nameOrConfig === 'string' && nameOrConfig || '[DEFAULT]';
    /** @type {?} */
    var config = typeof nameOrConfig === 'object' && nameOrConfig || {};
    config.name = config.name || name;
    // Added any due to some inconsistency between @firebase/app and firebase types
    /** @type {?} */
    var existingApp = (/** @type {?} */ (apps.filter((/**
     * @param {?} app
     * @return {?}
     */
    function (app) { return app && app.name === config.name; }))[0]));
    // We support FirebaseConfig, initializeApp's public type only accepts string; need to cast as any
    // Could be solved with https://github.com/firebase/firebase-js-sdk/pull/1206
    return (/** @type {?} */ ((existingApp || zone.runOutsideAngular((/**
     * @return {?}
     */
    function () { return initializeApp(options, (/** @type {?} */ (config))); })))));
}
/** @type {?} */
var FirebaseAppProvider = {
    provide: FirebaseApp,
    useFactory: ɵfirebaseAppFactory,
    deps: [
        FIREBASE_OPTIONS,
        NgZone,
        [new Optional(), FIREBASE_APP_NAME]
    ]
};
var AngularFireModule = /** @class */ (function () {
    function AngularFireModule(platformId) {
        registerVersion('angularfire', VERSION.full, platformId.toString());
        registerVersion('angular', VERSION$1.full);
    }
    /**
     * @param {?} options
     * @param {?=} nameOrConfig
     * @return {?}
     */
    AngularFireModule.initializeApp = /**
     * @param {?} options
     * @param {?=} nameOrConfig
     * @return {?}
     */
    function (options, nameOrConfig) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: FIREBASE_OPTIONS, useValue: options },
                { provide: FIREBASE_APP_NAME, useValue: nameOrConfig }
            ]
        };
    };
    AngularFireModule.decorators = [
        { type: NgModule, args: [{
                    providers: [FirebaseAppProvider],
                },] }
    ];
    /** @nocollapse */
    AngularFireModule.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return AngularFireModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS, FirebaseApp, VERSION, ɵAngularFireSchedulers, ɵBlockUntilFirstOperator, ɵZoneScheduler, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory, ɵlazySDKProxy };
//# sourceMappingURL=angular-fire.js.map
