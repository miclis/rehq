import axios from 'axios';
import { key } from '../config';

export default class OfferList {
	constructor() {}

	async getAllResults() {
		try {
			const res = await axios(`http://www.mocky.io/v2/5cb792074c00006c00d3d1f5`); //axios(`https://www.ourapi.com/api/search?key=${key}&q=${query}`);
			this.result = res.data.offers;
		} catch (error) {
			console.log(error);
			alert('Something went wrong when getting offers :(');
		}
	}
}