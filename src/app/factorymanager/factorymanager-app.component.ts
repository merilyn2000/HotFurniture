import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factorymanager-app',
  template: `
    <p>
      <app-tree></app-tree>
    </p>
  `,
  styles: [
  ]
})
export class FactorymanagerAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
