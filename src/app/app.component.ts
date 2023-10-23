import { Component, OnInit } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, cloudIcon, cogIcon } from '@cds/core/icon';
import { vmBugIcon, userIcon, boltIcon, sadFaceIcon, bugIcon, shieldIcon, certificateIcon } from '@cds/core/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'personal-blog-kbi';

  collapsed = false;

  toggleCollapse() {
   this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    ClarityIcons.addIcons(cloudIcon, cogIcon);
    ClarityIcons.addIcons(userIcon, boltIcon, sadFaceIcon, bugIcon, shieldIcon, certificateIcon, vmBugIcon)
  }
}
