import { Component } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  links = [
    { title: 'Posts', path: '/posts' },
    { title: 'About Me', path: '/about-me' },
  ];
}
