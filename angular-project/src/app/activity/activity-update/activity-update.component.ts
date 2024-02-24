import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActivityService } from 'src/app/services/activity.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.scss']
})
export class ActivityUpdateComponent {

  activityUpdateForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  apiUrl: string = environment.apiUrl;
  footerMessage = 'Activity Updater';
  activity: any = {};
  activityId: string = '';
  imageUrl: string = '';

  errorMessage: string = '';
  errorStatus: boolean = false;

  successMessage: string = '';
  success: boolean = false;

  deleted: boolean = false;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private errorResponseService: ErrorResponseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activityId = this.route.snapshot.paramMap.get('id')!;

    this.activityService.getActivityById(this.activityId).subscribe({
      next: (res) => {
        this.activity = res;
        this.activityUpdateForm.patchValue({
          image : this.activity.image,
          name: this.activity.name,
          description: this.activity.description
        });
        if (this.activity.image) {
          this.imageUrl = `${this.apiUrl}/public/${this.activity.image}`;
        } else {
          this.imageUrl = '';
        };
      },
      error: (error) => this.location.back()
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      this.activityUpdateForm.patchValue({
        image: file
      });

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onDeleteImage() {
    this.imageUrl = '';
    this.activity.image = undefined;
    this.activityUpdateForm.patchValue({
      image: ''
    });

  }

  updateActivityById( formData: any) {
    const { name, description, image } = formData;
    console.log(image)

    this.activityService.updateActivityById(this.activityId, {name, description, image}).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Activity updated successfully!';
        setTimeout(() => {
          this.success = false;
        }, 2500);
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

  deleteActivityById() {
    this.activityService.deleteActivityById(this.activityId).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.deleted = true;
        this.successMessage = 'Activity deleted successfully! Redirecting to activity manager...';
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
