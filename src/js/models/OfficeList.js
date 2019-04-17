import axios from 'axios';
import { key } from '../config';

export default class OfficeList {
	constructor() {}

	async getAllResults() {
		try {
			const res = await axios(`http://www.mocky.io/v2/5cb765fc3200007747cd4ac2`); //axios(`https://www.ourapi.com/api/search?key=${key}&q=${query}`);
			this.result = res.data.offices;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offices :(');
		}
	}
}
