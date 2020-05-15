import { InjectionToken, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseOptions, FirebaseAppConfig, ɵAngularFireSchedulers } from '@angular/fire';
import { UploadMetadata } from './interfaces';
import { storage } from 'firebase/app';
import 'firebase/storage';
import * as ɵngcc0 from '@angular/core';
export declare const BUCKET: InjectionToken<string>;
/**
 * AngularFireStorage Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for uploading and downloading binary files from Cloud Storage for
 * Firebase.
 */
export declare class AngularFireStorage {
    readonly storage: storage.Storage;
    readonly keepUnstableUntilFirst: <T>(obs: Observable<T>) => Observable<T>;
    readonly schedulers: ɵAngularFireSchedulers;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, storageBucket: string | null, platformId: Object, zone: NgZone);
    ref(path: string): import("./ref").AngularFireStorageReference;
    upload(path: string, data: any, metadata?: UploadMetadata): import("./task").AngularFireUploadTask;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFireStorage, [null, { optional: true; }, { optional: true; }, null, null]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5kLnRzIiwic291cmNlcyI6WyJzdG9yYWdlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucywgRmlyZWJhc2VBcHBDb25maWcsIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBVcGxvYWRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCAnZmlyZWJhc2Uvc3RvcmFnZSc7XG5leHBvcnQgZGVjbGFyZSBjb25zdCBCVUNLRVQ6IEluamVjdGlvblRva2VuPHN0cmluZz47XG4vKipcbiAqIEFuZ3VsYXJGaXJlU3RvcmFnZSBTZXJ2aWNlXG4gKlxuICogVGhpcyBzZXJ2aWNlIGlzIHRoZSBtYWluIGVudHJ5IHBvaW50IGZvciB0aGlzIGZlYXR1cmUgbW9kdWxlLiBJdCBwcm92aWRlc1xuICogYW4gQVBJIGZvciB1cGxvYWRpbmcgYW5kIGRvd25sb2FkaW5nIGJpbmFyeSBmaWxlcyBmcm9tIENsb3VkIFN0b3JhZ2UgZm9yXG4gKiBGaXJlYmFzZS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQW5ndWxhckZpcmVTdG9yYWdlIHtcbiAgICByZWFkb25seSBzdG9yYWdlOiBzdG9yYWdlLlN0b3JhZ2U7XG4gICAgcmVhZG9ubHkga2VlcFVuc3RhYmxlVW50aWxGaXJzdDogPFQ+KG9iczogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgICByZWFkb25seSBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsIG5hbWVPckNvbmZpZzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLCBzdG9yYWdlQnVja2V0OiBzdHJpbmcgfCBudWxsLCBwbGF0Zm9ybUlkOiBPYmplY3QsIHpvbmU6IE5nWm9uZSk7XG4gICAgcmVmKHBhdGg6IHN0cmluZyk6IGltcG9ydChcIi4vcmVmXCIpLkFuZ3VsYXJGaXJlU3RvcmFnZVJlZmVyZW5jZTtcbiAgICB1cGxvYWQocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIG1ldGFkYXRhPzogVXBsb2FkTWV0YWRhdGEpOiBpbXBvcnQoXCIuL3Rhc2tcIikuQW5ndWxhckZpcmVVcGxvYWRUYXNrO1xufVxuIl19