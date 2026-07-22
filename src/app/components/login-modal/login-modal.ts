import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: 'login-modal.html',
  styleUrl: 'login-modal.scss',
})
export class LoginModal {
  loginData = { username: '', password: '' };

  constructor(private dialogRef: MatDialogRef<LoginModal>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onLogin() {
    this.dialogRef.close();
  }
}
