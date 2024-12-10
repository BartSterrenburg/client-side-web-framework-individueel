import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; // Importeer FormGroup en FormControl
import { PostService } from 'libs/shared/services/post/post.service'

@Component({
  selector: 'train-repo-trainpost',
  templateUrl: './trainpost.component.html',
  styleUrls: ['./trainpost.component.css']
})
export class TrainpostComponent {
  trainpostForm: FormGroup;

  imagePreview: string | undefined;

  constructor(private postService: PostService) {
    this.trainpostForm = new FormGroup({
      description: new FormControl(''),
      isCommentable: new FormControl(false),
      picture: new FormControl('')
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
  }
}
