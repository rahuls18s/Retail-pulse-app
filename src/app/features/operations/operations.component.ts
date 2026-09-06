import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RetailDataService } from '../../core/services/retail-data.service';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule, ScrollingModule, PageHeaderComponent],
  templateUrl: './operations.component.html',
})
export class OperationsComponent {
  readonly route = inject(ActivatedRoute);
  readonly data = inject(RetailDataService);
  readonly mode = this.route.snapshot.data['mode'] as 'live' | 'performance';
  readonly liveEvent = this.data.liveEvents$;
  readonly events = this.data.transactions;
  readonly datasetSize = this.data.datasetSize;
}
