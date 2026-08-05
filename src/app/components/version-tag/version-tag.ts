import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-version-tag',
  imports: [],
  templateUrl: './version-tag.html',
  styleUrl: './version-tag.scss',
})
export class VersionTag {
  versionTag = environment.version_tag;
}
