import { Component } from '@angular/core';
import { MainNav } from '../main-nav/main-nav';
import { LoginAction } from '../login-action/login-action';
import { Logo } from '../logo/logo';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-header',
  imports: [MainNav, LoginAction, Logo, Dashboard],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {}
