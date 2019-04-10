import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptedCommandsPage } from './accepted-commands';

@NgModule({
  declarations: [
    AcceptedCommandsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptedCommandsPage),
  ],
})
export class AcceptedCommandsPageModule {}
