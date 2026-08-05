import { Component } from '@angular/core';
import { VersionTag } from '../version-tag/version-tag';

@Component({
  selector: 'app-footer',
  imports: [VersionTag],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
