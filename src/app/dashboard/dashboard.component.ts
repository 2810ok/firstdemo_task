import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    forkJoin([
      this.dataService.getApi1(),  // Get users
      this.dataService.getApi2()   // Get posts
    ]).subscribe({
      next: ([usersData, postsData]) => {
        this.users = usersData;
        this.posts = postsData;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }
}
