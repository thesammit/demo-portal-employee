import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1 class="errorMessage">Page Not Found</h1>
  `,
  styles: [`
    .errorMessage {
      margin-top: 150px;
      font-size: 170px;
      text-align: center;
    }
`]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
