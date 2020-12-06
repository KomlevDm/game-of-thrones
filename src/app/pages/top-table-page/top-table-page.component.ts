import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { GameService } from 'src/app/services/game.service';

export interface ITableItem {
  name: string;
  score: number;
  date: Date;
}

@Component({
  selector: 'top-table-page',
  templateUrl: './top-table-page.component.html',
  styleUrls: ['./top-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTablePageComponent implements OnInit {
  constructor(private _router: Router, private _gameService: GameService, private _soundsService: SoundsService) {}

  public sortByNameState: 'desc' | 'asc' = null;
  public sortByScoreState: 'desc' | 'asc' = null;
  public sortByDateState: 'desc' | 'asc' = null;
  public tableData: ITableItem[] = [];

  ngOnInit() {
    const topTableData: ITableItem[] = JSON.parse(localStorage.getItem(ELocalStorageKey.TopTableData));

    if (topTableData !== null) {
      this.tableData = topTableData
        .map((elem) => ({
          ...elem,
          date: new Date(elem.date),
        }))
        .sort((a, b) => b.score - a.score);
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this._gameService.navigateToMainMenu();
  }

  public sortByName(): void {
    this._soundsService.past.restart();

    this.sortByScoreState = null;
    this.sortByDateState = null;

    if (this.sortByNameState === null || this.sortByNameState === 'desc') {
      this.tableData.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameState = 'desc';
    }
  }

  public sortByScore(): void {
    this._soundsService.past.restart();

    this.sortByNameState = null;
    this.sortByDateState = null;

    if (this.sortByScoreState === null || this.sortByScoreState === 'desc') {
      this.tableData.sort((a, b) => a.score - b.score);
      this.sortByScoreState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.score - a.score);
      this.sortByScoreState = 'desc';
    }
  }

  public sortByDate(): void {
    this._soundsService.past.restart();

    this.sortByNameState = null;
    this.sortByScoreState = null;

    if (this.sortByDateState === null || this.sortByDateState === 'desc') {
      this.tableData.sort((a, b) => a.date.getTime() - b.date.getTime());
      this.sortByDateState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.date.getTime() - a.date.getTime());
      this.sortByDateState = 'desc';
    }
  }
}
