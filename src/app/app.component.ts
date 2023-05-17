import { Component, OnInit } from '@angular/core';
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
})
export class AppComponent implements OnInit {
  title = 'web-atrio-test';

  progressData!: ProgressBarData[];
  testDate: number = MY_TIMESTAMP;
  candidate: Candidate = new Candidate(CANDIDATE.name, CANDIDATE.lastName);

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
}
