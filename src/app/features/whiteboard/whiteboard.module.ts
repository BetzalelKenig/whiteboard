import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WhiteboardRoutingModule } from './whiteboard-routing.module';
import { WhiteboardComponent } from './whiteboard.component';

@NgModule({
  declarations: [WhiteboardComponent],
  imports: [CommonModule, WhiteboardRoutingModule, RouterModule, SharedModule],
})
export class WhiteboardModule {}
