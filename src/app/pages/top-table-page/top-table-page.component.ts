import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { SoundsService } from 'src/app/services/sounds.service';
import { ESort } from '../../enums/ESort';
import { SortFunctionType } from '../../types/SortFunctionType';
import { ESortName } from './enums/ESortName';
import { ITableItem } from './interfaces/ITableItem';

@Component({
  selector: 'top-table-page',
  templateUrl: './top-table-page.component.html',
  styleUrls: ['./top-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTablePageComponent implements OnInit {
  constructor(private soundsService: SoundsService) {}

  public tableData: ITableItem[] = [];
  public sortRange = {
    [ESortName.Name]: ESort.None,
    [ESortName.Score]: ESort.Desk,
    [ESortName.Date]: ESort.None,
  };

  ngOnInit() {
    const topTableData: ITableItem[] = JSON.parse(localStorage.getItem(ELocalStorageKey.TopTableData));

    if (topTableData) {
      this.tableData = topTableData
        .map((elem) => ({
          ...elem,
          date: new Date(elem.date),
        }))
        .sort((a, b) => b.score - a.score);
    }
  }

  public sortByName(): void {
    const sortDescFn = (a, b) => b.name.localeCompare(a.name);
    const sortAscFn = (a, b) => a.name.localeCompare(b.name);
    this.sortBy(ESortName.Name, sortDescFn, sortAscFn);
  }

  public sortByScore(): void {
    const sortDescFn = (a, b) => b.score - a.score;
    const sortAscFn = (a, b) => a.score - b.score;
    this.sortBy(ESortName.Score, sortDescFn, sortAscFn);
  }

  public sortByDate(): void {
    const sortDescFn = (a, b) => b.date.getTime() - a.date.getTime();
    const sortAscFn = (a, b) => a.date.getTime() - b.date.getTime();
    this.sortBy(ESortName.Date, sortDescFn, sortAscFn);
  }

  public trackByRowIndex: TrackByFunction<ITableItem> = (index) => index;

  private sortBy(sortName: ESortName, sortDescFn: SortFunctionType, sortAscFn: SortFunctionType): void {
    this.soundsService.past.restart();

    Object.keys(this.sortRange).forEach((key) => {
      if (key !== sortName) {
        this.sortRange[key] = ESort.None;
        return;
      }

      if (this.sortRange[key] === ESort.None || this.sortRange[key] === ESort.Desk) {
        this.tableData.sort(sortAscFn);
        this.sortRange[key] = ESort.Ask;
        return;
      }

      this.tableData.sort(sortDescFn);
      this.sortRange[key] = ESort.Desk;
    });
  }
}
