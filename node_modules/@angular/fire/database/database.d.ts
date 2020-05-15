import { NgZone, InjectionToken } from '@angular/core';
import { PathReference, QueryFn, AngularFireList, AngularFireObject } from './interfaces';
import { FirebaseOptions, FirebaseAppConfig, ɵAngularFireSchedulers } from '@angular/fire';
import { Observable } from 'rxjs';
import { database } from 'firebase/app';
import 'firebase/database';
import * as ɵngcc0 from '@angular/core';
export declare const URL: InjectionToken<string>;
export declare class AngularFireDatabase {
    readonly database: database.Database;
    readonly schedulers: ɵAngularFireSchedulers;
    readonly keepUnstableUntilFirst: <T>(obs$: Observable<T>) => Observable<T>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, databaseURL: string | null, platformId: Object, zone: NgZone);
    list<T>(pathOrRef: PathReference, queryFn?: QueryFn): AngularFireList<T>;
    object<T>(pathOrRef: PathReference): AngularFireObject<T>;
    createPushId(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireDatabase, [null, { optional: true; }, { optional: true; }, null, null]>;
}
export { PathReference, DatabaseSnapshot, ChildEvent, ListenEvent, QueryFn, AngularFireList, AngularFireObject, AngularFireAction, Action, SnapshotAction } from './interfaces';

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuZC50cyIsInNvdXJjZXMiOlsiZGF0YWJhc2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXRoUmVmZXJlbmNlLCBRdWVyeUZuLCBBbmd1bGFyRmlyZUxpc3QsIEFuZ3VsYXJGaXJlT2JqZWN0IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkYXRhYmFzZSB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgJ2ZpcmViYXNlL2RhdGFiYXNlJztcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IFVSTDogSW5qZWN0aW9uVG9rZW48c3RyaW5nPjtcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFuZ3VsYXJGaXJlRGF0YWJhc2Uge1xuICAgIHJlYWRvbmx5IGRhdGFiYXNlOiBkYXRhYmFzZS5EYXRhYmFzZTtcbiAgICByZWFkb25seSBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcbiAgICByZWFkb25seSBrZWVwVW5zdGFibGVVbnRpbEZpcnN0OiA8VD4ob2JzJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIG5hbWVPckNvbmZpZzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLCBkYXRhYmFzZVVSTDogc3RyaW5nIHwgbnVsbCwgcGxhdGZvcm1JZDogT2JqZWN0LCB6b25lOiBOZ1pvbmUpO1xuICAgIGxpc3Q8VD4ocGF0aE9yUmVmOiBQYXRoUmVmZXJlbmNlLCBxdWVyeUZuPzogUXVlcnlGbik6IEFuZ3VsYXJGaXJlTGlzdDxUPjtcbiAgICBvYmplY3Q8VD4ocGF0aE9yUmVmOiBQYXRoUmVmZXJlbmNlKTogQW5ndWxhckZpcmVPYmplY3Q8VD47XG4gICAgY3JlYXRlUHVzaElkKCk6IHN0cmluZztcbn1cbmV4cG9ydCB7IFBhdGhSZWZlcmVuY2UsIERhdGFiYXNlU25hcHNob3QsIENoaWxkRXZlbnQsIExpc3RlbkV2ZW50LCBRdWVyeUZuLCBBbmd1bGFyRmlyZUxpc3QsIEFuZ3VsYXJGaXJlT2JqZWN0LCBBbmd1bGFyRmlyZUFjdGlvbiwgQWN0aW9uLCBTbmFwc2hvdEFjdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG4iXX0=