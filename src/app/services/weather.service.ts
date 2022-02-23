import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from 'src/models/address';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
	readonly WEATHER_ENDPOINT = 'weather';

	constructor(private apiService: ApiService) {}

	getDailyWeather(address: Address) {
		const params = this.buildRequestParams(address);
		return this.apiService.get(`${environment.weatherDataApi}${this.WEATHER_ENDPOINT}`, params);
	}

	private buildRequestParams(address: Address) {
		let params: any = {
			appid: environment.weatherApiKey,
			units: 'metric'
		};

		if (Object.keys(address).length == 2 && address?.name && address.validLength) {
			params.q = address.name;
		} else if (address?.geometry) {
			params.lat = address.geometry.location.lat();
			params.lon = address.geometry.location.lng();
		}

		return params;
	}
}
