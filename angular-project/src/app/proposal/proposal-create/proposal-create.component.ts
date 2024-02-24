import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  styleUrls: ['./proposal-create.component.scss']
})
export class ProposalCreateComponent {

  proposalCreateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    activities: new FormControl(<unknown>[])
  });

  apiUrl: string = environment.apiUrl;
  footerMessage = 'Proposal Creator';
  selectedActivities: string[] = [];

  errorMessage: string = '';
  errorStatus: boolean = false;

  successMessage: string = '';
  success: boolean = false;

  constructor(
    private proposalService: ProposalService,
    private errorResponseService: ErrorResponseService,
    private localStorageService: LocalStorageService,
    private location: Location
  ) { }

  createProposal(formData: any) {
    const { name, description, activities } = formData;
    const createdBy = this.localStorageService.getUser().id;

    console.log({ name, description, activities, createdBy })
    this.proposalService.createProposal({ name, description, createdBy, activities }).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Proposal created successfully! Redirecting to proposal manager...';
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

  recieveSelectedActivities(selectedActivities: string[]) {
    this.selectedActivities = selectedActivities;
    this.proposalCreateForm.patchValue({
      activities: this.selectedActivities
    });
  }
}
