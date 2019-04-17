import axios from 'axios';
import { key, proxy } from '../config';

export default class Offer {
	constructor(id) {
		this.id = id;
	}

	async getOffer() {
		try {
            const res = await axios(`http://www.mocky.io/v2/5cb7922d4c00005500d3d1f8`);
            this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
	}
}
