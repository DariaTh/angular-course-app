import { Component , Input, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from "@angular/material";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
// posts = [
//   { title: "First post", content: "This is first post"},
//   { title: "Second post", content: "This is first post"},
//   { title: "Third post", content: "This is first post"}
// ];
posts: Post[] = [];
isLoading = false;
totalPosts = 10;
postsPerPage = 2;
currentPage = 1;
pageSizeOption = [1,2,5,10];
private postsSub: Subscription;


constructor (public postsService: PostsService){}

ngOnInit(){
  this.isLoading = true;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
  this.postsSub = this.postsService.getPostUpdateListener()
  .subscribe((postData: {posts: Post[], postCount: number})=>{
    this.isLoading = false;
    this.totalPosts = postData.postCount;
    this.posts = postData.posts;
  });
}

onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

onDelete(postId: string){
  this.postsService.deletePost(postId).subscribe(() => {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  });
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
}
}