import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ErrorResponseService } from 'src/app/services/utils/error-response.service';
import { RoomService } from 'src/app/services/room.service';
import { LocalStorageService } from 'src/app/services/utils/local-storage.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent {
  roomCreateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    proposalId: new FormControl('', Validators.required),
  });

  apiUrl: string = environment.apiUrl;
  footerMessage: string = "Create a room to play with your friends!";
  
  proposals: any[] = [];
  filter: string = '';
  filteredProposals: any[] = [];
  selectedProposal: string = '';
  selectedProposalName: string = '';
  selectedOption: string = 'all';
  selectedCard: string | null = null;
  isActive: boolean = false; 

  errorMessage: string = '';
  errorStatus: boolean = false;

  successMessage: string = '';
  success: boolean = false;

  constructor(
    private errorResponseService: ErrorResponseService,
    private localStorageService: LocalStorageService,
    private roomService: RoomService,
    private proposalService: ProposalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.proposalService.getProposals().subscribe({
      next: (res) => {
        this.proposals = res
        this.filteredProposals = this.proposals
      },
      error: (error) => this.errorMessage = this.errorResponseService.getErrorResponse()
    });
  }

  createRoom(formData: any) {
    const { name, proposalId } = formData;
    const hostedBy = this.localStorageService.getUser().id;

    this.roomService.createRoom({ name, proposalId, hostedBy }).subscribe({
      next: (res) => {
        this.errorStatus = false;
        this.success = true;
        this.successMessage = 'Room created successfully! Preparing your game...';
        setTimeout(() => {
          const roomId = res._id;
          const redirectUrl = `/room/waiting/${roomId}`;
          this.router.navigate([redirectUrl]);
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

  toggleSelectedActivity(proposalId: string, proposalName: string) {
    if (this.selectedProposal != proposalId) {
      this.selectedProposal = proposalId;
      this.selectedProposalName = proposalName;
      this.selectedCard = proposalId;
      this.isActive = true;
    } else {
      this.selectedProposal = '';
      this.selectedProposalName = '';
      this.selectedCard = null;
      this.isActive = false;
    }
    this.roomCreateForm.patchValue({
      proposalId: this.selectedProposal
    });
  }

  updateFilteredProposals() {
    this.filteredProposals = this.proposals.filter(proposal => {
      const nameFilterPassed = proposal.name.toLowerCase().includes(this.filter.toLowerCase());
      if (this.selectedOption === 'mine') {
        return nameFilterPassed && proposal.createdByUsername == this.localStorageService.getUser().username;
      }
      return nameFilterPassed;
    });
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
    this.updateFilteredProposals();
  }
}
