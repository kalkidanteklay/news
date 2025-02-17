import { Component, OnInit  } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-list',
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit{
  breakingNews: any = {};
  newsArticles: any[] = [];
  trending: any = [];
  featured: any = [];
  searchResults: any[] = [];
  categories: string[] = ['General', 'Business', 'Technology', 'Sports', 'Science', 'Entertainment'];
  selectedCategory: string = 'General'; // Default category
  categoryNews: any[] = []; // Stores news for selected category
  loading: boolean = true;
  errorMessage: string = ''

  constructor(private newsService: NewsService) {}

  ngOnInit() {
   
    this.newsService.getNews().subscribe({
      next: (response) => {
        this.breakingNews = response.articles[0];
        this.newsArticles = response.articles.slice(1, 5);
        this.trending = response.articles.slice(4,9);
        this.featured = response.articles.slice(8);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching news!';
        this.loading = false;
      }
    });
  }

  searchNews(query: string){
    this.loading = true;
    this.newsService.getNewsByKeyword(query).subscribe({
      next: (response) => {
        this.searchResults = response.articles.slice(1, 10);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error fetching search results!';
        this.loading = false;
      }
      
    })
  }

  fetchCategoryNews(category: string) {
    this.selectedCategory = category; // Update selected category
    this.newsService.getNewsByCategory(category.toLowerCase()).subscribe({
      next: (response) => {
        this.categoryNews = response.articles;
      },
      error: (error) => {
        console.error('Error fetching category news:', error);
      }
    });
  }
}

