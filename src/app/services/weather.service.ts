import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
	readonly WEATHER_ENDPOINT = 'weather';

	constructor(private apiService: ApiService) {}

	getDailyWeather(params: any) {
		params.appid = environment.weatherApiKey;
		return this.apiService.get(`${environment.weatherDataApi}${this.WEATHER_ENDPOINT}`, params);
	}
}
