import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hideNav() {
    let closeBtn = document.getElementById("closeBtn") as HTMLElement;
    closeBtn.click();
  }

}
