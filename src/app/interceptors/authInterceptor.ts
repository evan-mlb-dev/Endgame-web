import { HttpInterceptorFn } from '@angular/common/http';
import { Session } from '@app/models/session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const rawJson = localStorage.getItem('userSession');

  if (!rawJson) {
    console.warn('No session found in localStorage');
  } else {
    const session: Session | null = Session.fromRawJson(rawJson);
    const token = session.token;

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authReq);
    }
  }

  return next(req);
};
