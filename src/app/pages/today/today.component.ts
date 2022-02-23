import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Address } from 'src/models/address';

@Component({
	selector: 'app-today',
	templateUrl: './today.component.html',
	styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
	weatherData: any;
	constructor(private weatherService: WeatherService) {}

	ngOnInit(): void {
	}

	fetchWeatherData(address: Address) {
		console.log('changed', address);
		this.weatherService.getDailyWeather({q: address.name}).subscribe((data) => {
			console.log(data);
		});
	}
}
