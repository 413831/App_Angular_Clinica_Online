/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { AngularFirestore, ENABLE_PERSISTENCE, PERSISTENCE_SETTINGS } from './firestore';
var AngularFirestoreModule = /** @class */ (function () {
    function AngularFirestoreModule() {
    }
    /**
     * Attempt to enable persistent storage, if possible
     */
    /**
     * Attempt to enable persistent storage, if possible
     * @param {?=} persistenceSettings
     * @return {?}
     */
    AngularFirestoreModule.enablePersistence = /**
     * Attempt to enable persistent storage, if possible
     * @param {?=} persistenceSettings
     * @return {?}
     */
    function (persistenceSettings) {
        return {
            ngModule: AngularFirestoreModule,
            providers: [
                { provide: ENABLE_PERSISTENCE, useValue: true },
                { provide: PERSISTENCE_SETTINGS, useValue: persistenceSettings },
            ]
        };
    };
    AngularFirestoreModule.decorators = [
        { type: NgModule, args: [{
                    providers: [AngularFirestore]
                },] }
    ];
    return AngularFirestoreModule;
}());
export { AngularFirestoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiZmlyZXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpGO0lBQUE7SUFnQkEsQ0FBQztJQVpDOztPQUVHOzs7Ozs7SUFDSSx3Q0FBaUI7Ozs7O0lBQXhCLFVBQXlCLG1CQUF5QztRQUNoRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDL0MsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO2FBQ2pFO1NBQ0YsQ0FBQTtJQUNILENBQUM7O2dCQWZGLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTtpQkFDaEM7O0lBY0QsNkJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQZXJzaXN0ZW5jZVNldHRpbmdzIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUsIEVOQUJMRV9QRVJTSVNURU5DRSwgUEVSU0lTVEVOQ0VfU0VUVElOR1MgfSBmcm9tICcuL2ZpcmVzdG9yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWyBBbmd1bGFyRmlyZXN0b3JlIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVzdG9yZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIGVuYWJsZSBwZXJzaXN0ZW50IHN0b3JhZ2UsIGlmIHBvc3NpYmxlXG4gICAqL1xuICBzdGF0aWMgZW5hYmxlUGVyc2lzdGVuY2UocGVyc2lzdGVuY2VTZXR0aW5ncz86IFBlcnNpc3RlbmNlU2V0dGluZ3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJGaXJlc3RvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBFTkFCTEVfUEVSU0lTVEVOQ0UsIHVzZVZhbHVlOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogUEVSU0lTVEVOQ0VfU0VUVElOR1MsIHVzZVZhbHVlOiBwZXJzaXN0ZW5jZVNldHRpbmdzIH0sXG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=