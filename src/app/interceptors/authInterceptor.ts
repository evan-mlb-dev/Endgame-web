import { HttpInterceptorFn } from '@angular/common/http';
import { Session } from '@app/models/session';

function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;

    const decodedPayload = JSON.parse(
      atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')),
    );

    if (!decodedPayload.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch {
    return true;
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const rawJson = localStorage.getItem('userSession');

  if (!rawJson) {
    console.warn('No session found in localStorage');
  } else {
    const session: Session | null = Session.fromRawJson(rawJson);
    const token = session?.token;

    if (token) {
      if (isTokenExpired(token)) {
        console.warn('Token JWT expiré. Nettoyage de la session.');
        localStorage.removeItem('userSession');

        return next(req);
      }

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
