import {first, map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {ActivatedRouteSnapshot, CanDeactivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class CloseDialogOnRouteService implements CanDeactivate<any> {

    constructor(private dialog: MatDialog,
                private readonly location: Location,
                private readonly router: Router,
    ) { }

    canDeactivate(_: any, currentRoute: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.dialog.openDialogs.length === 0) {
            return true;
        }

        this.dialog.closeAll();
        return this.dialog.afterAllClosed.pipe(first(), map(() => {
            const currentUrlTree = this.router.createUrlTree([], currentRoute);
            const currentUrl = currentUrlTree.toString();
            this.location.go(currentUrl);
            return false;
        }));
    }
}

