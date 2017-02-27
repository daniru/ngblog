import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdButtonModule, MdTabsModule } from '@angular/material';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './services/blog.service';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemComponent } from './components/item/item.component';
import { ItemHeaderComponent } from './components/item-header/item-header.component';
import { ItemSectionComponent } from './components/item-section/item-section.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ItemFilesComponent } from './components/item-files/item-files.component';
import { PrettyfilePipe } from './pipes/prettyfile.pipe';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MdCardModule, MdButtonModule, MdTabsModule
  ],
  providers: [BlogService],
  declarations: [ListComponent, ListItemComponent, ItemComponent, ItemHeaderComponent, ItemSectionComponent, MarkdownPipe, ItemFilesComponent, PrettyfilePipe]
})
export class BlogModule { }
