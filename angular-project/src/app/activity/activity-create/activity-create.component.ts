import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivityService } from 'src/app/services/activity.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent {

  activityCreateForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  footerMessage = 'Activity Creator';
  imageUrl: any = '';

  errorMessage: string = '';
  errorStatus: boolean = false;

  success: boolean = false;

  constructor(
    private location: Location,
    private activityService: ActivityService,
    private errorResponseService: ErrorResponseService
  ) { }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      this.activityCreateForm.patchValue({
        image: file
      });

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(): void {
    this.imageUrl = '';
    this.activityCreateForm.patchValue({
      image: ''
    });
  }

  onCreateActivity(formData: any): void {
    const { name, description, image } = formData;

    this.activityService.createActivity({ name, description, image }).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        setTimeout(() => {
          this.location.back();
        }, 1200);
      },
      error: (error) => {
        this.errorMessage = this.errorResponseService.getErrorResponse();
        if (this.errorMessage) {
          this.errorStatus = true;
          this.success = false;
        }
      }
    });
  }
}
