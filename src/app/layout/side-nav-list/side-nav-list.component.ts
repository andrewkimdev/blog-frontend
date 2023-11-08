import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent {
  navLinks = [
    { title: 'Posts', path: '/posts' },
    { title: 'About Me', path: '/about-me' },
  ];
}
