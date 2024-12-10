import { Component, OnInit } from '@angular/core';
import { PostService } from 'libs/shared/services/post/post.service';
import { Post } from 'libs/shared/services/post/post.model';
import { ActivatedRoute, Router } from '@angular/router';  

@Component({
    selector: 'train-repo-trainpost-list',
    templateUrl: './trainpost-list.component.html',
    styleUrls: ['./trainpost-list.component.css']
})
export class TrainpostListComponent implements OnInit {
    posts: Post[] = [];
    trainId: string | null = null; 

    constructor(
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute  
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.trainId = params.get('id'); 

            if (this.trainId) {
                this.postService.getPostsFromTrain(this.trainId).subscribe(posts => {
                    this.posts = posts;
                    console.log(posts);
                });
            }
        });
    }

    // Klikken op een post container
    onPostClick(post: Post): void {
        console.log(`Post clicked: ${post._id}`);
        // Je kunt hier bijvoorbeeld een detailpagina of modal openen
        this.router.navigate([`/trainpost/${post._id}`])
    }

}
