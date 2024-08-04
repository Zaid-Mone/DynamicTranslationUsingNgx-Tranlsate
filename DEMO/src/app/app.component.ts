import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocaizationService } from './Services/locaization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private locaizationService: LocaizationService) { }

  ngOnInit(): void {

    // for load the localization when the project starts
    //this.locaizationService.getTranslation();
    //this.locaizationService.getTranslationWithPromises();

  }

  ngOnDestroy(): void {
  }


  title = 'DEMO';
}
