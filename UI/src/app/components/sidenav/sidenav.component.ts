import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

const SMALL_BREAKPOINT_WIDTH = 650;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav, { static: false }) sidenav: MatSidenav;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_BREAKPOINT_WIDTH}px)`);
  constructor(private route: Router) { }

  ngOnInit() {
    this.route.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
