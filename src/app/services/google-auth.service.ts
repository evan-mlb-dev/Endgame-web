import { inject, Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './authService';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private authService = inject(AuthService);
  private ngZone = inject(NgZone);

  private readonly googleClientId = environment['google.client.id'];

  /**
   * Initialise le SDK Google et affiche le bouton officiel dans l'élément HTML ciblé
   * @param elementId L'identifiant de la div hôte (ex: 'google-btn')
   * @param onSuccess Callback exécuté en cas de connexion réussie
   * @param onError Callback exécuté en cas d'erreur
   */

  public renderButton(
    elementId: string,
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ): void {
    if (typeof google === 'undefined' || !google.accounts) {
      onError("Le SDK Google N'est pas disponible.");
      return;
    }

    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: (googleResponse: any) => {
        this.ngZone.run(() => {
          this.authService
            .loginWithGoogle(googleResponse.credential)
            .subscribe({
              next: (res) => onSuccess(res),
              error: (err) => onError(err),
            });
        });
      },
    });
  }
}
