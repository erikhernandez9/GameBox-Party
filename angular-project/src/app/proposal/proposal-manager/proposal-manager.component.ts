import { Component } from '@angular/core';
import { ProposalService } from 'src/app/services/proposal.service';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proposal-manager',
  templateUrl: './proposal-manager.component.html',
  styleUrls: ['./proposal-manager.component.scss']
})
export class ProposalManagerComponent {

  apiUrl: string = environment.apiUrl;
  proposals: any[] = [];
  filter: string = '';
  filteredProposals: any[] = [];
  selectedOption: string = 'all';
  errorMessage: string = '';
  footerMessage: string = 'Proposal Manager';

  constructor(
    private proposalService: ProposalService,
    private errorResponseService: ErrorResponseService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const userId = this.localStorageService.getUser().id;
    if (this.isAdmin()) {
      this.proposalService.getProposals().subscribe({
        next: (res) => {
          this.proposals = res
          this.filteredProposals = this.proposals
        },
        error: (error) => this.errorMessage = this.errorResponseService.getErrorResponse()
      });
    } else if (this.isUser()) {
      this.proposalService.getProposalsByIdUser(userId).subscribe({
        next: (res) => {
          this.proposals = res
          this.filteredProposals = this.proposals
        },
        error: (error) => this.errorMessage = this.errorResponseService.getErrorResponse()
      });
    }
  }

  updateFilteredProposals() {
    this.filteredProposals = this.proposals.filter(proposal => {
      const nameFilterPassed = proposal.name.toLowerCase().includes(this.filter.toLowerCase());
      if (this.selectedOption === 'mine' && this.isAdmin()) {
        return nameFilterPassed && proposal.createdByUsername == this.localStorageService.getUser().username;
      }
      return nameFilterPassed;
    });
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
    this.updateFilteredProposals();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }
}
