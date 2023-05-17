import { Component, OnInit } from '@angular/core';
import mockupProgressData from './mockup/progress-data.mockup';

interface ProgressBarData {
  title: string;
  percentage: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web-atrio-test';

  progressData!: ProgressBarData[];

  ngOnInit(): void {
    this.progressData = mockupProgressData;
  }
}
