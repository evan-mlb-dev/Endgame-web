import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { LoginAction } from '../login-action/login-action';
import { Logo } from '../logo/logo';
import { MainNav } from '../main-nav/main-nav';
import { ThemeSwitch } from '../theme-switch/theme-switch';

@Component({
  selector: 'app-header',
  imports: [MainNav, LoginAction, Logo, Dashboard, ThemeSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {}
