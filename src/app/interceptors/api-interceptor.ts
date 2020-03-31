import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpHandler} from "@angular/common/http";
import {Request} from "express";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(protected request?: Request) {}

    intercept(req, next: HttpHandler) {
        let serverReq = req;
        if (this.request && !this.request.url.startsWith("http")) {
            let newUrl = `${this.request.protocol}://${this.request.get("host")}`;
            if (!req.url.startsWith("/")) {
                newUrl += "/";
            }
            newUrl += req.url;
            serverReq = req.clone({url: newUrl});
        }
        return next.handle(serverReq);
    }
}

