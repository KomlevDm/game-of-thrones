import { Component, HostListener } from '@angular/core';
import { getRandomMenuBgImage } from 'src/app/helpers/getRandomMenuBgImage';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { EKeyLocalStorage } from 'src/app/enums/EKeyLocalStorage';

interface ITableItem {
  name: string;
  score: number;
  date: Date;
}

@Component({
  selector: 'top-table',
  templateUrl: './top-table.component.html',
  styleUrls: ['./top-table.component.scss']
})
export class TopTableComponent {
  constructor(private _router: Router, public soundsService: SoundsService) {}

  public bgImageName = getRandomMenuBgImage();
  public sortByNameState: 'desc' | 'asc' = null;
  public sortByPointsState: 'desc' | 'asc' = null;
  public sortByDateState: 'desc' | 'asc' = null;
  public tableData = this.initTableData();

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this.soundsService.dragonStompy.restart();
    this._router.navigateByUrl('');
  }

  public sortByName(): void {
    this.soundsService.past.restart();

    this.sortByPointsState = null;
    this.sortByDateState = null;

    if (this.sortByNameState === null || this.sortByNameState === 'desc') {
      this.tableData.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameState = 'desc';
    }
  }

  public sortByPoints(): void {
    this.soundsService.past.restart();

    this.sortByNameState = null;
    this.sortByDateState = null;

    if (this.sortByPointsState === null || this.sortByPointsState === 'desc') {
      this.tableData.sort((a, b) => a.score - b.score);
      this.sortByPointsState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.score - a.score);
      this.sortByPointsState = 'desc';
    }
  }

  public sortByDate(): void {
    this.soundsService.past.restart();

    this.sortByNameState = null;
    this.sortByPointsState = null;

    if (this.sortByDateState === null || this.sortByDateState === 'desc') {
      this.tableData.sort((a, b) => a.date.getTime() - b.date.getTime());
      this.sortByDateState = 'asc';
    } else {
      this.tableData.sort((a, b) => b.date.getTime() - a.date.getTime());
      this.sortByDateState = 'desc';
    }
  }

  private initTableData(): ITableItem[] {
    const topTableDate = localStorage.getItem(EKeyLocalStorage.TopTableDate);

    return topTableDate === null ? [] : JSON.parse(topTableDate);
  }
}
