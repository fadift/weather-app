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

	checkAddress(address: Address) {
		this.validate(address);
		if (this.weatherForm.valid) {
			this.fetchWeatherData(address);
		}
	}

	fetchWeatherData(address: Address) {
		this.weatherService?.getDailyWeather(address).subscribe((data: any) => {
			console.log(data);
			this.weatherData = data;
			this.weatherData.icon = `${environment.weatherAssetsUrl}${this.weatherData.weather[0].icon}@2x.png`;
		});
	}

	private validate(place: any): void {
		this.weatherForm.get("searchQuery")?.clearValidators();

		let maxLength: number = 188;

		if (Object.keys(place).length == 1 && place?.name) {
			maxLength = this.isPostalCode(place.name) ? 10 : 188;
		} else if (place?.types && place?.types.includes('postal_code')) {
			maxLength = 10;
		}

		this.weatherForm.get("searchQuery")?.addValidators(Validators.maxLength(maxLength));
	}

	private isPostalCode(value: string): boolean {
		return /^\\d{5}(-{0,1}\\d{4})?$/.test(value) ||
		/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/.test(value) ||
		/^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/.test(value) ||
		/^\\d+$/.test(value);
	}


}
