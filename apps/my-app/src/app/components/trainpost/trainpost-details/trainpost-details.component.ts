import { Component, OnInit } from '@angular/core';
import { PostService } from 'libs/shared/services/post/post.service';
import { Post } from 'libs/shared/services/post/post.model';
import { Train } from 'libs/shared/services/train/train.model';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';

@Component({
  selector: 'train-repo-trainpost-details',
  templateUrl: './trainpost-details.component.html',
  styleUrls: ['./trainpost-details.component.css']
})
export class TrainpostDetailsComponent implements OnInit {
  post: Post | undefined;
  train: Train | null = null;


  constructor(
    private postService: PostService,
    private trainService: TrainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the postId from the route parameters
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      // Fetch post details by post ID
      this.postService.getPostById(postId).subscribe((post) => {
        this.post = post;
      });
    }

    this.trainService.getTrains().subscribe((trains) => {
        const train = trains.find(t => t._id === this.post?.train);
        if (train) {
          this.train = train;
        } else {
          console.log("Train not found");
        }
      });
  }
}
