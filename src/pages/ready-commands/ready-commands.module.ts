import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadyCommandsPage } from './ready-commands';

@NgModule({
  declarations: [
    ReadyCommandsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadyCommandsPage),
  ],
})
export class ReadyCommandsPageModule {}
