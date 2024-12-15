import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'libs/shared/services/post/post.service';
import { Post } from 'libs/shared/services/post/post.model';
import { Train } from 'libs/shared/services/train/train.model';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IComment } from '@train-repo/shared/api';
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Component({
  selector: 'train-repo-trainpost-details',
  templateUrl: './trainpost-details.component.html',
  styleUrls: ['./trainpost-details.component.css']
})
export class TrainpostDetailsComponent implements OnInit {
  post: Post | undefined;
  train: Train | null = null;
  comments: IComment[] | undefined = [];
  
  // FormGroup voor nieuwe commentaar
  newCommentForm: FormGroup;

  constructor(
    private postService: PostService,
    private trainService: TrainService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.newCommentForm = new FormGroup({
      comment: new FormControl('')
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.postService.getPostById(postId).subscribe((post) => {
        this.post = post;
        this.comments = post?.comments;
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

addComment(): void {
  const commentText = this.newCommentForm.value.comment;
  const postId = this.post?._id;

  if (commentText.trim() && postId) {
    this.postService.addComment(postId, commentText).subscribe(
      () => {
        // Haal de post opnieuw op om de nieuwste gegevens (inclusief comments) te krijgen
        this.postService.getPostById(postId).subscribe((updatedPost) => {
          this.post = updatedPost; 
          this.comments = updatedPost?.comments || [];
        });
        
        // Reset het formulier na succesvolle comment
        this.newCommentForm.reset();
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }
}

deletePost(id: string): void {
  this.postService.deletePost(id).subscribe(data => {
    console.log(data);
  });
  this.router.navigate(['/train']);
}

}
