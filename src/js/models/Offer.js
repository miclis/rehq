import axios from 'axios';
import { key, proxy } from '../config';

export default class Offer {
	constructor(id) {
		this.id = id;
	}

	async getOffer() {
		try {
            const res = await axios(`http://www.mocky.io/v2/5cbb9d8e3100006b284d7529`);
            this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
	}

	async acceptReview(id) {
		// Notify server that review {id} has been accepted
		try {
			const res = await axios.post(`https://www.mocky.io/v2/5185415ba171ea3a00704eed`, {
				"id": id,
				"accepted": true
			});
			this.acceptReviewStatus = res.status;
			console.log(this.acceptReviewStatus);
		} catch (error) {
			console.log(this.acceptReviewStatus);
			console.log(error);
		}
	}
}
