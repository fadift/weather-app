import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  get(url: string, params: any = null) {
		params = params ? params : {};
		params.where ? params.where.publish_to_mobile = true : params.where = { publish_to_mobile: true };
		params.where = JSON.stringify(params.where);

		return this.http.get(url, { params: params });
	}
}
