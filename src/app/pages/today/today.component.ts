import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from 'src/environments/environment';
import { Address } from 'src/models/address';

@Component({
	selector: 'app-today',
	templateUrl: './today.component.html',
	styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
	weatherData: any;
	weatherForm = new FormGroup({
		searchQuery: new FormControl('', [Validators.maxLength(200)])
	});
	today = new Date();

	constructor(private weatherService: WeatherService) {}

	ngOnInit(): void {
	}

	fetchWeatherData(address: Address) {
		if (address.validLength) {
			this.weatherService.getDailyWeather(address).subscribe((data) => {
				console.log(data);
				this.weatherData = data;
				this.weatherData.icon = `${environment.weatherAssetsUrl}${this.weatherData.weather[0].icon}@2x.png`;
			});
		}
	}


}
