import { Component, OnInit } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, cloudIcon, cogIcon } from '@cds/core/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'personal-blog-kbi';

  ngOnInit() {
    ClarityIcons.addIcons(cloudIcon, cogIcon);
  }
}
