import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { PostService } from 'libs/shared/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Component({
  selector: 'train-repo-trainpost',
  templateUrl: './trainpost.component.html',
  styleUrls: ['./trainpost.component.css']
})
export class TrainpostComponent implements OnInit {
  trainpostForm: FormGroup;
  imagePreview: string | undefined;
  trainId: string | null = null; 
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.trainpostForm = new FormGroup({
      description: new FormControl(''),
      isCommentable: new FormControl(false),
      picture: new FormControl(''),
      train: new FormControl(),
      owner: new FormControl()
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.trainId = params.get('id');
      
      if (this.trainId) {
        this.trainpostForm.patchValue({
          train: this.trainId
        });
      }

      this.authService.currentUser$.subscribe(user => {
        this.trainpostForm.patchValue({
          owner: user?._id
        });
      })
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.trainpostForm.patchValue({
          picture: this.imagePreview
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log(this.trainpostForm.value);
    this.postService.addTrain(this.trainpostForm.value).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/train']);
  }
}
