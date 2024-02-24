import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { ActivityService } from 'src/app/services/activity.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-proposal-update',
  templateUrl: './proposal-update.component.html',
  styleUrls: ['./proposal-update.component.scss']
})
export class ProposalUpdateComponent {

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
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.proposalId = this.route.snapshot.paramMap.get('id')!;
    this.proposalService.getProposalById(this.proposalId).subscribe({
      next: (res) => {
        this.proposal = res;
        this.proposalUpdateForm.patchValue({
          name: this.proposal.name,
          description: this.proposal.description
        });
        if (this.proposal.activities.length > 0) {
          this.addActvitiesToProposal(this.proposal.activities);
        }
      },
      error: (error) => this.location.back()
    });
  }

  recieveSelectedActivities(selectedActivities: string[]) {
    this.proposalActivities = [];
    this.addActvitiesToProposal(selectedActivities);
  }

  addActvitiesToProposal(activities: any[]) {
    if (activities.length > 0) {
      const activityObservables = activities.map((activity: any) => {
        return this.activityService.getActivityById(activity);
      });

      forkJoin(activityObservables).subscribe({
        next: (responses: any) => {
          responses.forEach((res: any) => {
            this.proposalActivities.push(res);
            this.proposalUpdateForm.patchValue({
              activities: this.proposalActivities.map((activity: any) => activity._id)
            });
          });
        },
        error: (error) => this.location.back()
      });
    } else {
      this.proposalUpdateForm.get('activities')?.setValue([]);
    }
  }

  updateProposalById(formData: any) {
    const { name, description, activities } = formData;
    this.proposalService.updateProposalById(this.proposalId, { name, description, activities }).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Proposal updated successfully!';
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

  deleteProposalById() {
    this.proposalService.deleteProposalById(this.proposalId).subscribe({
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
