import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';

import { environment as ENV } from '../../environments/environment';

@Injectable()
export class AuthProvider {

	apiUrl = ENV.BASE_URL + '/users/space';

	constructor(public http: HttpClient,
		private storage: Storage) { }

	public login(_credentials) {
		const data = {
			email: _credentials.email,
			password: _credentials.password
		}
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl + '/login', data,
				{ headers: { 'Content-Type': 'application/json' } }).subscribe(async ata => {
					let _data = null;
					_data = ata;
					if (!_data.token) return resolve(null);
					await this.storage.set('currentUser', _data.user);
					await this.storage.set('token', _data.token);
					await this.storage.set('space', _data.space);
					return resolve(true)
				}, _err => {
					return reject(_err);
				})
		});
	}

	public async verifySession() {
		return new Promise(async (resolve, reject) => {
			const currentUser = await this.storage.get('currentUser');
			const token = await this.storage.get('token');
			const space = await this.storage.get('space');
			if (!currentUser || !token || !space) return resolve(false);
			return resolve(true);
		});		
	}

}
