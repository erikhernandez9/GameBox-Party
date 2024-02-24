import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ErrorResponseService } from '../../services/utils/error-response.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-activity-index',
  templateUrl: './activity-index.component.html',
  styleUrls: ['./activity-index.component.scss']
})
export class ActivityIndexComponent {
  apiUrl: string = environment.apiUrl;
  activities: any[] = [];
  filter: string = '';
  filteredActivities: any[] = [];
  selectedOption: string = 'both';
  errorMessage: string = '';
  selectedActivities: string[] = [];
  
  @Output() selectedActivitiesChange = new EventEmitter<string[]>();
  @Input() proposalViewConfig: boolean = false;
  @Input() proposalActivities: string[] = [];

  constructor(
    private activityService: ActivityService,
    private errorResponseService: ErrorResponseService
  ) { }

  ngOnInit() {
    this.activityService.getActivities().subscribe({
      next: (res) => {
        this.activities = res;
        this.filteredActivities = res;
      },
      error: (error) => this.errorMessage = this.errorResponseService.getErrorResponse()
    });
  }

  updateFilteredActivities() {
    this.filteredActivities = this.activities.filter(activity => {
      const nameFilterPassed = activity.name.toLowerCase().includes(this.filter.toLowerCase());
      if (this.selectedOption === 'images') {
        return nameFilterPassed && activity.image !== undefined;
      } else if (this.selectedOption === 'text') {
        return nameFilterPassed && activity.image === undefined;
      } else {
        return nameFilterPassed;
      }
    });
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
    this.updateFilteredActivities();
  }

  toggleSelectedActivity(activityId: string) {
    const index = this.proposalActivities.indexOf(activityId);
    if (index === -1) {
      // Add activity to selected activities
      this.proposalActivities.push(activityId);
    } else {
      // Remove activity from selected activities
      this.proposalActivities.splice(index, 1);
    }

    this.selectedActivitiesChange.emit(this.proposalActivities);
  }

  isActivitySelected(activityId: string): boolean {
    if (this.proposalActivities === undefined) {
      return false;
    }
    return this.proposalActivities.includes(activityId);
  }
}
