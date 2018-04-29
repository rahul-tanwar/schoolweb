import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchoolInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userService = this.injector.get(UserService);
        if (!request.url.includes('http://schoolapi.anaghaenterprises.in/token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userService.currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}
