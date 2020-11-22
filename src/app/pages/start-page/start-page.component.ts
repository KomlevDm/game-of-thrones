import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
