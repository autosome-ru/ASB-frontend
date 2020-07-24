import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toastr: ToastrService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status !== 404) {
                    if (error.status === 0) {
                        this.toastr.error(
                            `Database lookup failed. Please try again later.`,
                            `No internet connection`,
                        );
                    } else {
                        this.toastr.error(
                            `Database lookup failed. Please try again later.`,
                            `${error.statusText} ${error.status}`,
                        );
                    }
                }
                return throwError(error);
            })
        );
    }
}

