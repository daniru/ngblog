import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './services/blog.service';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  providers: [BlogService],
  declarations: []
})
export class BlogModule { }
