import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  loadingUsers = true;
  loadingPosts = true;
  errorUsers: string | null = null;
  errorPosts: string | null = null;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
  }

  loadUsers(): void {
    this.dataService.getApi1().subscribe({
      next: (data) => {
        this.users = data;
        this.loadingUsers = false;
      },
      error: (err) => {
        this.errorUsers = 'Failed to load users';
        this.loadingUsers = false;
        console.error('Error loading users:', err);
      }
    });
  }

  loadPosts(): void {
    this.dataService.getApi2().subscribe({
      next: (data) => {
        this.posts = data;
        this.loadingPosts = false;
      },
      error: (err) => {
        this.errorPosts = 'Failed to load posts';
        this.loadingPosts = false;
        console.error('Error loading posts:', err);
      }
    });
  }
}