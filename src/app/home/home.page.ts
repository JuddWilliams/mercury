import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentJoke: string;
  count = 0;
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getJoke();

    const i = setInterval(() => {
      this.getJoke();
    }, 10000);
  }

  public getJoke(): void {
    console.log('getJoke');

    this.getJokeFromAPI().subscribe((res) => {
      console.log('getJoke', res);

      this.count++;
      this.currentJoke = `${res.setup} ... ${res.punchline}`;
    });

    return;
  }

  getJokeFromAPI(): Observable<any> {
    return this.http.get('https://official-joke-api.appspot.com/jokes/random');
  }
}
