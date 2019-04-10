import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandDetailsPage } from './command-details';

@NgModule({
  declarations: [
    CommandDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandDetailsPage),
  ],
})
export class CommandDetailsPageModule {}
