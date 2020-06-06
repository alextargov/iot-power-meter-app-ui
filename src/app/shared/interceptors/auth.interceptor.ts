import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly headerName = 'Authorization';
    private readonly authScheme = 'Bearer ';

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>> {
        const token = sessionStorage.getItem('access_token');
        const blacklistedRedirectRoutes = ['register', 'login'];
        const isUrlWhitelisted = !req.url.split('/').some((urlSegment) => blacklistedRedirectRoutes.includes(urlSegment));

        if (!token && isUrlWhitelisted) {
            location.href = '/login';
            return observableOf();
        }

        req = req.clone({
            setHeaders: {
                [this.headerName]: `${this.authScheme}${token}`,
                // ['Access-Control-Allow-Origin']: '*',
                // ['Allow-Control-Allow-Methods']: 'GET, POST',
                // ['Access-Control-Allow-Headers']: 'Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization'
            }
        });
        return next.handle(req);
    }
}

// {
//     Accept: application/json, text/plain, */*
//     Accept-Encoding: gzip, deflate, br
//     Accept-Language: bg-BG,bg;q=0.9,en-GB;q=0.8,en;q=0.7,und;q=0.6
//     Connection: keep-alive
//     Host: localhost:3200
//     Origin: http://localhost:4200
//     Referer: http://localhost:4200/
//     Sec-Fetch-Dest: empty
//     Sec-Fetch-Mode: cors
//     Sec-Fetch-Site: same-site
//     User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36
// }


// Accept: application/json, text/plain, */*
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE1OWRmNDc5NDMxODRhOTBmYTcxMDkiLCJ1c2VybmFtZSI6ImFsZXgiLCJwYXNzd29yZCI6IiQyYiQxMCRkL1JTRkZHa0d5NUI2QXRPR1JhL3d1ZkouRFFGM1c3ZDgyUnIweDJDbm9XQmpVWC9KN1h2MiIsImNyZWF0ZWRBdCI6IjIwMjAtMDQtMjZUMTQ6NDM6MDAuNDcyWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMjZUMTQ6NDM6MDAuNDcyWiIsIl9fdiI6MCwiaWF0IjoxNTg3OTI3NTQxfQ.ki0x-r_8B6TSmTHhT-Ruzgyl4_ZIlKyJQ9wdeV_JLD8
// Referer: http://localhost:4200/
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36
