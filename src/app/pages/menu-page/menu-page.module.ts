import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoModule } from '../../components/logo/logo.module';
import { FooterPanelComponent } from './footer-panel/footer-panel.component';
import { MenuPageComponent } from './menu-page.component';
import { MenuPageRoutingModule } from './menu-page.routing.module';
import { ToggleLanguageDialogComponent } from './toggle-language-dialog/toggle-language-dialog.component';

@NgModule({
  declarations: [MenuPageComponent, FooterPanelComponent, ToggleLanguageDialogComponent],
  imports: [CommonModule, MenuPageRoutingModule, TranslateModule, LogoModule],
})
export class MenuPageModule {}
