import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import mockupProgressData from './mockup/progress-data.mockup';

interface ProgressBarData {
  title: string;
  percentage: number;
}

class Candidate {
  name: string;
  lastName: string;

  constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
  }
}

const MY_TIMESTAMP = 1684352816703;
const CANDIDATE = {
  name: 'Gonzalo',
  lastName: 'Diaz Ailan',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'web-atrio-test';

  progressData!: ProgressBarData[];
  testDate: number = MY_TIMESTAMP;
  candidate: Candidate = new Candidate(CANDIDATE.name, CANDIDATE.lastName);
  newBarConfig = {
    title: 'Nouvelle progress-bar',
    percentage: 5,
  };

  ngOnInit(): void {
    this.progressData = mockupProgressData;
  }

  resetControls(): void {
    this.progressData.forEach((progress) => {
      progress.percentage = 0;
    });
  }

  addToControls(ammount: number): void {
    const decimalAmmount = ammount / 100;
    this.progressData.forEach((progress) => {
      const isOvercharged = progress.percentage + decimalAmmount > 1;
      if (isOvercharged) {
        progress.percentage = 1;
      } else {
        progress.percentage += decimalAmmount;
      }
    });
  }

  addNewBar(): void {
    const decimalAmmount = this.newBarConfig.percentage / 100;
    if (decimalAmmount > 1) {
      alert('Maximum progress exceeded (100)');
    } else if (decimalAmmount < 0) {
      alert('Invalid minimum progress (No negative numbers allowed)');
    } else {
      const configToData = {
        ...this.newBarConfig,
        percentage: decimalAmmount,
      };
      this.progressData.push(configToData);
    }
  }

  onProgressBarChange(progress: number, index: number): void {
    this.progressData[index].percentage = progress > 1 ? 1 : progress;
  }

  deleteProgressBar(index: number): void {
    this.progressData.splice(index, 1);
  }
}
