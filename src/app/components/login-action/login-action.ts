import { Component, inject } from '@angular/core';
import { Session } from '@app/models/session';
import { AuthService } from '@app/services/authService';
import { ModalService } from '@app/services/modalService';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-action',
  standalone: true,
  templateUrl: 'login-action.html',
  styleUrl: 'login-action.scss',
})
export class LoginAction {
  // Service
  private authService = inject(AuthService);
  public modalService = inject(ModalService);

  private sessionSubscription!: Subscription;
  public currentSession: Session | null = null;

  ngOnInit(): void {
    this.sessionSubscription = this.authService.userSession$.subscribe({
      next: (session: Session | null) => {
        if (session) {
          this.currentSession = session;
        }
      },
      error: (err) => console.error('Error :', err),
    });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.currentSession = null;
  }
}
