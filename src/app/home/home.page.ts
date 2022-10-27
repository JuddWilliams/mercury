import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IonLoaderService } from '../ion-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentJoke: string;
  currentJokePunchLine: string;
  showPunchline = false;
  buttonText: string;
  count = 0;
  constructor(
    public http: HttpClient,
    private toastController: ToastController,
    private ionLoaderService: IonLoaderService
  ) {}

  ngOnInit() {
    this.getJoke();
  }

  public getJoke(): void {
    this.ionLoaderService.simpleLoader();
    this.showPunchline = false;
    this.buttonText = 'Show Punchline';

    this.getJokeFromAPI().subscribe(
      (result) => {
        console.log('getJoke', result);
        this.count++;
        this.currentJoke = `${result.setup}`;
        this.currentJokePunchLine = ` - ${result.punchline}`;
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: `Error retrieve Joke: [ ${error} ]`,
          duration: 4000,
          position: 'top',
          color: 'warning',
        });
        toast.present();
      },
      () => {
        this.ionLoaderService.dismissLoader();
      }
    );

    return;
  }

  public getPunchline(): void {
    this.showPunchline = !this.showPunchline;
    if (this.showPunchline) {
      this.buttonText = 'Hide Punchline';
    } else {
      this.buttonText = 'Show Punchline';
    }
  }

  getJokeFromAPI(): Observable<any> {
    return this.http.get('https://official-joke-api.appspot.com/jokes/random');
  }
}
