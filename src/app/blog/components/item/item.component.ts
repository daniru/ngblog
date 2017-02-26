import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'dr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  public blog: Blog;
  private _blogSubscription: Subscription;

  constructor(public route: ActivatedRoute, public blogService: BlogService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const key = params['key'];
      this._blogSubscription = this.blogService.getBlog(key).subscribe(data => this.blog = data);
    });
  }

  ngOnDestroy() {
    if (this._blogSubscription) { this._blogSubscription.unsubscribe(); }
  }
}
