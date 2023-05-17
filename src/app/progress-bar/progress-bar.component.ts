import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  // Let's avoid unwanted change detections for the sake of performance
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges {
  @Input() title!: string;
  @Input() percentage!: number;
  @Output() percentageChanged = new EventEmitter<number>();
  @Output() barDeleted = new EventEmitter<void>();

  graphClass!: 'low' | 'mid' | 'high' | 'full';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percentage'].currentValue) {
      this.renderPercentage();
    }
  }

  reset(): void {
    this.percentageChanged.emit(0);
  }

  add(ammount: number): void {
    const decimalAmmount = ammount / 100;
    this.percentageChanged.emit(this.percentage + decimalAmmount);
  }

  remove(): void {
    this.barDeleted.emit();
  }

  private renderPercentage(): void {
    /*
      Why this approach instead of a simple expression in the template?
      Well, I'd rather recalculate the value when needed than in every single
      onChanges trigger.
      Yeah, right now this won't be an issue but I think I'd rather stick to only
      do it when needed if the requirement evolves.
    */
    const thresholds = {
      mid: 0.25,
      high: 0.5,
      full: 0.75,
    };

    // Not my best algorithm, but it was the best I could figure out in a pinch
    if (this.percentage > thresholds.full) {
      this.graphClass = 'full';
    } else if (this.percentage > thresholds.high) {
      this.graphClass = 'high';
    } else if (this.percentage > thresholds.mid) {
      this.graphClass = 'mid';
    } else {
      this.graphClass = 'low';
    }
  }
}
