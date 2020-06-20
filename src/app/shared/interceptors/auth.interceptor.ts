import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly headerAuthorizationName = 'Authorization';
    private readonly headerTokenName = 'token';
    private readonly authScheme = 'Bearer';

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
                [this.headerAuthorizationName]: `${this.authScheme} ${token}`,
                [this.headerTokenName]: `${token}`,
            }
        });
        return next.handle(req);
    }
}
