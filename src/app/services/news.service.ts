import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private API_KEY = environment.apiKey;
  private API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.API_KEY}`;

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  getNewsByKeyword(keyword: string): Observable<any> {
    return this.http.get<any>(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${this.API_KEY}`
    );
  }

  getNewsByCategory(category: string): Observable<any> {
    return this.http.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${this.API_KEY}`);
  }
  
}
