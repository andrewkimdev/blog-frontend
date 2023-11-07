import { Component, OnInit } from '@angular/core';
import {
  boltIcon,
  bugIcon,
  certificateIcon,
  ClarityIcons,
  cloudIcon,
  cogIcon,
  sadFaceIcon,
  shieldIcon,
  userIcon, vmBugIcon
} from '@cds/core/icon';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  collapsed = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    ClarityIcons.addIcons(cloudIcon, cogIcon);
    ClarityIcons.addIcons(userIcon, boltIcon, sadFaceIcon, bugIcon, shieldIcon, certificateIcon, vmBugIcon)
  }
}
