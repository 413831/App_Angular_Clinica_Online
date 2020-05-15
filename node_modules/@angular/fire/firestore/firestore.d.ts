import { InjectionToken, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings, PersistenceSettings, CollectionReference, DocumentReference, QueryFn, QueryGroupFn, AssociatedReference } from './interfaces';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
import { AngularFirestoreCollectionGroup } from './collection-group/collection-group';
import { FirebaseOptions, FirebaseAppConfig, ɵAngularFireSchedulers } from '@angular/fire';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
/**
 * The value of this token determines whether or not the firestore will have persistance enabled
 */
import * as ɵngcc0 from '@angular/core';
export declare const ENABLE_PERSISTENCE: InjectionToken<boolean>;
export declare const PERSISTENCE_SETTINGS: InjectionToken<firestore.PersistenceSettings>;
export declare const SETTINGS: InjectionToken<firestore.Settings>;
/**
 * A utility methods for associating a collection reference with
 * a query.
 *
 * @param collectionRef - A collection reference to query
 * @param queryFn - The callback to create a query
 *
 * Example:
 * const { query, ref } = associateQuery(docRef.collection('items'), ref => {
 *  return ref.where('age', '<', 200);
 * });
 */
export declare function associateQuery(collectionRef: CollectionReference, queryFn?: (ref: any) => any): AssociatedReference;
/**
 * AngularFirestore Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for creating Collection and Reference services. These services can
 * then be used to do data updates and observable streams of the data.
 *
 * Example:
 *
 * import { Component } from '@angular/core';
 * import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
 * import { Observable } from 'rxjs/Observable';
 * import { from } from 'rxjs/observable';
 *
 * @Component({
 *   selector: 'app-my-component',
 *   template: `
 *    <h2>Items for {{ (profile | async)?.name }}
 *    <ul>
 *       <li *ngFor="let item of items | async">{{ item.name }}</li>
 *    </ul>
 *    <div class="control-input">
 *       <input type="text" #itemname />
 *       <button (click)="addItem(itemname.value)">Add Item</button>
 *    </div>
 *   `
 * })
 * export class MyComponent implements OnInit {
 *
 *   // services for data operations and data streaming
 *   private readonly itemsRef: AngularFirestoreCollection<Item>;
 *   private readonly profileRef: AngularFirestoreDocument<Profile>;
 *
 *   // observables for template
 *   items: Observable<Item[]>;
 *   profile: Observable<Profile>;
 *
 *   // inject main service
 *   constructor(private readonly afs: AngularFirestore) {}
 *
 *   ngOnInit() {
 *     this.itemsRef = afs.collection('items', ref => ref.where('user', '==', 'davideast').limit(10));
 *     this.items = this.itemsRef.valueChanges().map(snap => snap.docs.map(data => doc.data()));
 *     // this.items = from(this.itemsRef); // you can also do this with no mapping
 *
 *     this.profileRef = afs.doc('users/davideast');
 *     this.profile = this.profileRef.valueChanges();
 *   }
 *
 *   addItem(name: string) {
 *     const user = 'davideast';
 *     this.itemsRef.add({ name, user });
 *   }
 * }
 */
export declare class AngularFirestore {
    readonly firestore: firestore.Firestore;
    readonly persistenceEnabled$: Observable<boolean>;
    readonly schedulers: ɵAngularFireSchedulers;
    readonly keepUnstableUntilFirst: <T>(obs: Observable<T>) => Observable<T>;
    /**
     * Each Feature of AngularFire has a FirebaseApp injected. This way we
     * don't rely on the main Firebase App instance and we can create named
     * apps and use multiple apps.
     * @param app
     */
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, shouldEnablePersistence: boolean | null, settings: Settings | null, platformId: Object, zone: NgZone, persistenceSettings: PersistenceSettings | null);
    /**
     * Create a reference to a Firestore Collection based on a path or
     * CollectionReference and an optional query function to narrow the result
     * set.
     * @param pathOrRef
     * @param queryFn
     */
    collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T>;
    collection<T>(ref: CollectionReference, queryFn?: QueryFn): AngularFirestoreCollection<T>;
    /**
     * Create a reference to a Firestore Collection Group based on a collectionId
     * and an optional query function to narrow the result
     * set.
     * @param collectionId
     * @param queryGroupFn
     */
    collectionGroup<T>(collectionId: string, queryGroupFn?: QueryGroupFn): AngularFirestoreCollectionGroup<T>;
    /**
     * Create a reference to a Firestore Document based on a path or
     * DocumentReference. Note that documents are not queryable because they are
     * simply objects. However, documents have sub-collections that return a
     * Collection reference and can be queried.
     * @param pathOrRef
     */
    doc<T>(path: string): AngularFirestoreDocument<T>;
    doc<T>(ref: DocumentReference): AngularFirestoreDocument<T>;
    /**
     * Returns a generated Firestore Document Id.
     */
    createId(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AngularFirestore, [null, { optional: true; }, { optional: true; }, { optional: true; }, null, null, { optional: true; }]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLmQudHMiLCJzb3VyY2VzIjpbImZpcmVzdG9yZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFBlcnNpc3RlbmNlU2V0dGluZ3MsIENvbGxlY3Rpb25SZWZlcmVuY2UsIERvY3VtZW50UmVmZXJlbmNlLCBRdWVyeUZuLCBRdWVyeUdyb3VwRm4sIEFzc29jaWF0ZWRSZWZlcmVuY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50IH0gZnJvbSAnLi9kb2N1bWVudC9kb2N1bWVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uR3JvdXAgfSBmcm9tICcuL2NvbGxlY3Rpb24tZ3JvdXAvY29sbGVjdGlvbi1ncm91cCc7XG5pbXBvcnQgeyBGaXJlYmFzZU9wdGlvbnMsIEZpcmViYXNlQXBwQ29uZmlnLCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbi8qKlxuICogVGhlIHZhbHVlIG9mIHRoaXMgdG9rZW4gZGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZmlyZXN0b3JlIHdpbGwgaGF2ZSBwZXJzaXN0YW5jZSBlbmFibGVkXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IEVOQUJMRV9QRVJTSVNURU5DRTogSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj47XG5leHBvcnQgZGVjbGFyZSBjb25zdCBQRVJTSVNURU5DRV9TRVRUSU5HUzogSW5qZWN0aW9uVG9rZW48ZmlyZXN0b3JlLlBlcnNpc3RlbmNlU2V0dGluZ3M+O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgU0VUVElOR1M6IEluamVjdGlvblRva2VuPGZpcmVzdG9yZS5TZXR0aW5ncz47XG4vKipcbiAqIEEgdXRpbGl0eSBtZXRob2RzIGZvciBhc3NvY2lhdGluZyBhIGNvbGxlY3Rpb24gcmVmZXJlbmNlIHdpdGhcbiAqIGEgcXVlcnkuXG4gKlxuICogQHBhcmFtIGNvbGxlY3Rpb25SZWYgLSBBIGNvbGxlY3Rpb24gcmVmZXJlbmNlIHRvIHF1ZXJ5XG4gKiBAcGFyYW0gcXVlcnlGbiAtIFRoZSBjYWxsYmFjayB0byBjcmVhdGUgYSBxdWVyeVxuICpcbiAqIEV4YW1wbGU6XG4gKiBjb25zdCB7IHF1ZXJ5LCByZWYgfSA9IGFzc29jaWF0ZVF1ZXJ5KGRvY1JlZi5jb2xsZWN0aW9uKCdpdGVtcycpLCByZWYgPT4ge1xuICogIHJldHVybiByZWYud2hlcmUoJ2FnZScsICc8JywgMjAwKTtcbiAqIH0pO1xuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhc3NvY2lhdGVRdWVyeShjb2xsZWN0aW9uUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLCBxdWVyeUZuPzogKHJlZjogYW55KSA9PiBhbnkpOiBBc3NvY2lhdGVkUmVmZXJlbmNlO1xuLyoqXG4gKiBBbmd1bGFyRmlyZXN0b3JlIFNlcnZpY2VcbiAqXG4gKiBUaGlzIHNlcnZpY2UgaXMgdGhlIG1haW4gZW50cnkgcG9pbnQgZm9yIHRoaXMgZmVhdHVyZSBtb2R1bGUuIEl0IHByb3ZpZGVzXG4gKiBhbiBBUEkgZm9yIGNyZWF0aW5nIENvbGxlY3Rpb24gYW5kIFJlZmVyZW5jZSBzZXJ2aWNlcy4gVGhlc2Ugc2VydmljZXMgY2FuXG4gKiB0aGVuIGJlIHVzZWQgdG8gZG8gZGF0YSB1cGRhdGVzIGFuZCBvYnNlcnZhYmxlIHN0cmVhbXMgb2YgdGhlIGRhdGEuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUsIEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uLCBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XG4gKiBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbiAqIGltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzL29ic2VydmFibGUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ2FwcC1teS1jb21wb25lbnQnLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgPGgyPkl0ZW1zIGZvciB7eyAocHJvZmlsZSB8IGFzeW5jKT8ubmFtZSB9fVxuICogICAgPHVsPlxuICogICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zIHwgYXN5bmNcIj57eyBpdGVtLm5hbWUgfX08L2xpPlxuICogICAgPC91bD5cbiAqICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLWlucHV0XCI+XG4gKiAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAjaXRlbW5hbWUgLz5cbiAqICAgICAgIDxidXR0b24gKGNsaWNrKT1cImFkZEl0ZW0oaXRlbW5hbWUudmFsdWUpXCI+QWRkIEl0ZW08L2J1dHRvbj5cbiAqICAgIDwvZGl2PlxuICogICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgIC8vIHNlcnZpY2VzIGZvciBkYXRhIG9wZXJhdGlvbnMgYW5kIGRhdGEgc3RyZWFtaW5nXG4gKiAgIHByaXZhdGUgcmVhZG9ubHkgaXRlbXNSZWY6IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPEl0ZW0+O1xuICogICBwcml2YXRlIHJlYWRvbmx5IHByb2ZpbGVSZWY6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxQcm9maWxlPjtcbiAqXG4gKiAgIC8vIG9ic2VydmFibGVzIGZvciB0ZW1wbGF0ZVxuICogICBpdGVtczogT2JzZXJ2YWJsZTxJdGVtW10+O1xuICogICBwcm9maWxlOiBPYnNlcnZhYmxlPFByb2ZpbGU+O1xuICpcbiAqICAgLy8gaW5qZWN0IG1haW4gc2VydmljZVxuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFmczogQW5ndWxhckZpcmVzdG9yZSkge31cbiAqXG4gKiAgIG5nT25Jbml0KCkge1xuICogICAgIHRoaXMuaXRlbXNSZWYgPSBhZnMuY29sbGVjdGlvbignaXRlbXMnLCByZWYgPT4gcmVmLndoZXJlKCd1c2VyJywgJz09JywgJ2RhdmlkZWFzdCcpLmxpbWl0KDEwKSk7XG4gKiAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXNSZWYudmFsdWVDaGFuZ2VzKCkubWFwKHNuYXAgPT4gc25hcC5kb2NzLm1hcChkYXRhID0+IGRvYy5kYXRhKCkpKTtcbiAqICAgICAvLyB0aGlzLml0ZW1zID0gZnJvbSh0aGlzLml0ZW1zUmVmKTsgLy8geW91IGNhbiBhbHNvIGRvIHRoaXMgd2l0aCBubyBtYXBwaW5nXG4gKlxuICogICAgIHRoaXMucHJvZmlsZVJlZiA9IGFmcy5kb2MoJ3VzZXJzL2RhdmlkZWFzdCcpO1xuICogICAgIHRoaXMucHJvZmlsZSA9IHRoaXMucHJvZmlsZVJlZi52YWx1ZUNoYW5nZXMoKTtcbiAqICAgfVxuICpcbiAqICAgYWRkSXRlbShuYW1lOiBzdHJpbmcpIHtcbiAqICAgICBjb25zdCB1c2VyID0gJ2RhdmlkZWFzdCc7XG4gKiAgICAgdGhpcy5pdGVtc1JlZi5hZGQoeyBuYW1lLCB1c2VyIH0pO1xuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmUge1xuICAgIHJlYWRvbmx5IGZpcmVzdG9yZTogZmlyZXN0b3JlLkZpcmVzdG9yZTtcbiAgICByZWFkb25seSBwZXJzaXN0ZW5jZUVuYWJsZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHJlYWRvbmx5IHNjaGVkdWxlcnM6IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzO1xuICAgIHJlYWRvbmx5IGtlZXBVbnN0YWJsZVVudGlsRmlyc3Q6IDxUPihvYnM6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD47XG4gICAgLyoqXG4gICAgICogRWFjaCBGZWF0dXJlIG9mIEFuZ3VsYXJGaXJlIGhhcyBhIEZpcmViYXNlQXBwIGluamVjdGVkLiBUaGlzIHdheSB3ZVxuICAgICAqIGRvbid0IHJlbHkgb24gdGhlIG1haW4gRmlyZWJhc2UgQXBwIGluc3RhbmNlIGFuZCB3ZSBjYW4gY3JlYXRlIG5hbWVkXG4gICAgICogYXBwcyBhbmQgdXNlIG11bHRpcGxlIGFwcHMuXG4gICAgICogQHBhcmFtIGFwcFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucywgbmFtZU9yQ29uZmlnOiBzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZyB8IG51bGwgfCB1bmRlZmluZWQsIHNob3VsZEVuYWJsZVBlcnNpc3RlbmNlOiBib29sZWFuIHwgbnVsbCwgc2V0dGluZ3M6IFNldHRpbmdzIHwgbnVsbCwgcGxhdGZvcm1JZDogT2JqZWN0LCB6b25lOiBOZ1pvbmUsIHBlcnNpc3RlbmNlU2V0dGluZ3M6IFBlcnNpc3RlbmNlU2V0dGluZ3MgfCBudWxsKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgQ29sbGVjdGlvbiBiYXNlZCBvbiBhIHBhdGggb3JcbiAgICAgKiBDb2xsZWN0aW9uUmVmZXJlbmNlIGFuZCBhbiBvcHRpb25hbCBxdWVyeSBmdW5jdGlvbiB0byBuYXJyb3cgdGhlIHJlc3VsdFxuICAgICAqIHNldC5cbiAgICAgKiBAcGFyYW0gcGF0aE9yUmVmXG4gICAgICogQHBhcmFtIHF1ZXJ5Rm5cbiAgICAgKi9cbiAgICBjb2xsZWN0aW9uPFQ+KHBhdGg6IHN0cmluZywgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPjtcbiAgICBjb2xsZWN0aW9uPFQ+KHJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSwgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgQ29sbGVjdGlvbiBHcm91cCBiYXNlZCBvbiBhIGNvbGxlY3Rpb25JZFxuICAgICAqIGFuZCBhbiBvcHRpb25hbCBxdWVyeSBmdW5jdGlvbiB0byBuYXJyb3cgdGhlIHJlc3VsdFxuICAgICAqIHNldC5cbiAgICAgKiBAcGFyYW0gY29sbGVjdGlvbklkXG4gICAgICogQHBhcmFtIHF1ZXJ5R3JvdXBGblxuICAgICAqL1xuICAgIGNvbGxlY3Rpb25Hcm91cDxUPihjb2xsZWN0aW9uSWQ6IHN0cmluZywgcXVlcnlHcm91cEZuPzogUXVlcnlHcm91cEZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb25Hcm91cDxUPjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgRG9jdW1lbnQgYmFzZWQgb24gYSBwYXRoIG9yXG4gICAgICogRG9jdW1lbnRSZWZlcmVuY2UuIE5vdGUgdGhhdCBkb2N1bWVudHMgYXJlIG5vdCBxdWVyeWFibGUgYmVjYXVzZSB0aGV5IGFyZVxuICAgICAqIHNpbXBseSBvYmplY3RzLiBIb3dldmVyLCBkb2N1bWVudHMgaGF2ZSBzdWItY29sbGVjdGlvbnMgdGhhdCByZXR1cm4gYVxuICAgICAqIENvbGxlY3Rpb24gcmVmZXJlbmNlIGFuZCBjYW4gYmUgcXVlcmllZC5cbiAgICAgKiBAcGFyYW0gcGF0aE9yUmVmXG4gICAgICovXG4gICAgZG9jPFQ+KHBhdGg6IHN0cmluZyk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPjtcbiAgICBkb2M8VD4ocmVmOiBEb2N1bWVudFJlZmVyZW5jZSk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZ2VuZXJhdGVkIEZpcmVzdG9yZSBEb2N1bWVudCBJZC5cbiAgICAgKi9cbiAgICBjcmVhdGVJZCgpOiBzdHJpbmc7XG59XG4iXX0=