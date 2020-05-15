import { NgZone, InjectionToken } from '@angular/core';
import { PathReference, QueryFn, AngularFireList, AngularFireObject } from './interfaces';
import { FirebaseOptions, FirebaseAppConfig, ɵAngularFireSchedulers } from '@angular/fire';
import { Observable } from 'rxjs';
import { database } from 'firebase/app';
import 'firebase/database';
export declare const URL: InjectionToken<string>;
export declare class AngularFireDatabase {
    readonly database: database.Database;
    readonly schedulers: ɵAngularFireSchedulers;
    readonly keepUnstableUntilFirst: <T>(obs$: Observable<T>) => Observable<T>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, databaseURL: string | null, platformId: Object, zone: NgZone);
    list<T>(pathOrRef: PathReference, queryFn?: QueryFn): AngularFireList<T>;
    object<T>(pathOrRef: PathReference): AngularFireObject<T>;
    createPushId(): string;
}
export { PathReference, DatabaseSnapshot, ChildEvent, ListenEvent, QueryFn, AngularFireList, AngularFireObject, AngularFireAction, Action, SnapshotAction } from './interfaces';
