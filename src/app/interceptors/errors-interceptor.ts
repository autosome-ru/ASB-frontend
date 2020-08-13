import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    isBrowser: boolean
    constructor(
        private router: Router,
        private toastr: ToastrService,
        @Inject(PLATFORM_ID) private platformId
    ) { this.isBrowser = isPlatformBrowser(platformId);}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status !== 404 && this.isBrowser) {
                    this.toastr.error(
                        `Database lookup failed. Please try again later.`,
                        `${error.statusText} ${error.status}`,
                    );
                }
                return throwError(error);
            })
        );
    }
}

