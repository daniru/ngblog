import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Blog } from '../models/blog';

@Injectable()
export class BlogService {

  public get page(): number {
    return this._page;
  }

  public get pages(): number[] {
    return Array(Math.ceil(this._count / this._blogsByPage)).fill(null).map((x, i) => i + 1);
  }

  private _count: number;
  private _page: number;
  private _blogsByPage: number;

  private _localCache: Blog[] = [];
  private _blogSubject: Subject<Blog[]>;


  constructor(private http: Http) {
    this._page = 1;
    this._count = 0;
    this._blogsByPage = 3;

    this._blogSubject = new Subject<Blog[]>();
    this.http.get('./assets/data/data.json')
      .map((res) =>  this._convertObjectToArray(res.json().blog))
      .do((x) => {
        this._localCache = x;
        this._blogSubject.next(x);
      })
      .subscribe();
  }

  getBlogs(): Observable<Blog[]> {
    return Observable.of(this._localCache)
      .merge(this._blogSubject.asObservable())
      .map((res) => {
        this._count = res.length;
        return res.reverse().slice((this._page - 1) * this._blogsByPage, (this._page) * this._blogsByPage);
      });
  }

  getBlog(key: string): Observable<Blog> {
    return Observable.of(this._localCache.filter(x => x.key === key))
      .merge( this._blogSubject.asObservable())
      .map(res => { return res.find(x => x.key === key); });
  }

  setPage(num: number) {
    this._page = num;
    this._blogSubject.next(this._localCache);
  }

  private _convertObjectToArray(data: any): Blog[] {
    return Object.keys(data).map((key: string) => {
      return <Blog>data[key];
    });
  }
}
