import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivityService } from 'src/app/services/activity.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-proposal-update-user',
  templateUrl: './proposal-update-user.component.html',
  styleUrls: ['./proposal-update-user.component.scss']
})
export class ProposalUpdateUserComponent {
  proposalUpdateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    activities: new FormControl(<unknown>[])
  });

  apiUrl: string = environment.apiUrl;
  footerMessage = 'Proposal Updater';
  proposal: any = {};
  proposalId: string = '';
  proposalActivities: any[] = [];
  unsavedChanges: boolean = false;

  selectedActivities: string[] = [];

  errorMessage: string = '';
  errorStatus: boolean = false;

  successMessage: string = '';
  success: boolean = false;

  deleted: boolean = false;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private errorResponseService: ErrorResponseService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.proposalId = this.route.snapshot.paramMap.get('id')!;
    this.proposalService.getProposalByIdUser(this.localStorageService.getUser().id, this.proposalId).subscribe({
      next: (res) => {
        this.proposal = res;
        this.proposalUpdateForm.patchValue({
          name: this.proposal.name,
          description: this.proposal.description
        });
        if (this.proposal.activities.length > 0) {
          const activityObservables = this.proposal.activities.map((activity: any) => {
            return this.activityService.getActivityById(activity);
          });

          forkJoin(activityObservables).subscribe({
            next: (responses: any) => {
              responses.forEach((res: any) => {
                this.proposalActivities.push(res);
              });
            },
            error: (error) => this.location.back()
          });
        }
      },
      error: (error) => this.location.back()
    });
  }


  recieveSelectedActivities(selectedActivities: string[]) {
    this.selectedActivities = selectedActivities;
    this.unsavedChanges = true;

    this.proposalUpdateForm.patchValue({
      activities: this.selectedActivities
    });
  }

  updateProposalById(formData: any) {
    const { name, description, activities } = formData;
    this.proposalService.updateProposalByIdUser(this.localStorageService.getUser().id, this.proposalId, { name, description, activities }).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Proposal updated successfully!';
        setTimeout(() => {
          this.success = false;
          window.location.reload();
        }, 1000);
      },
      error: (error) => {
        this.errorMessage = this.errorResponseService.getErrorResponse();
        if (this.errorMessage !== '') {
          this.errorStatus = true;
          this.success = false;
        }
      }
    });
  }

  deleteProposalById() {
    this.proposalService.deleteProposalByIdUser(this.localStorageService.getUser().id, this.proposalId).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.deleted = true;
        this.successMessage = 'Proposal deleted successfully! Redirecting to proposal manager...';
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
