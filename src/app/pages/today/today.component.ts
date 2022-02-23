import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
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

	constructor(private weatherService: WeatherService) {}

	ngOnInit(): void {
	}

	fetchWeatherData(address: Address) {
		if (address.validLength) {
			this.weatherService.getDailyWeather(address).subscribe((data) => {
				console.log(data);
			});
		}
	}


}
