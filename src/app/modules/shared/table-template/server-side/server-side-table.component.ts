import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";


export class AsbBackendDataSource<T> implements DataSource<T> {

    constructor(
        private subjects: Observable<T[]>,
    ) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.subjects;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

}
