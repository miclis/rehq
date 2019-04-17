import axios from 'axios';
import { key } from '../config';

export default class OfficeList {
	constructor() {
	}

	async getAllResults() {
		try {
			const res = await axios(`https://my-json-server.typicode.com/miclis/offices`);//axios(`https://www.ourapi.com/api/search?key=${key}&q=${query}`);
			this.result = res.data.offices;
		} catch (error) {
			console.log(error);
			alert('Something went wrong getting offices :(');
		}
	}
}
