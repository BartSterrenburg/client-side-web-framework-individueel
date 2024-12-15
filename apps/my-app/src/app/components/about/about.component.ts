import { Component } from '@angular/core';
import { ImageLibrary} from './../../../assets/imagedata'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  erd = ImageLibrary.erd;
  requirements = ImageLibrary.requirements;
}
