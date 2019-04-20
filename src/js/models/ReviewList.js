import axios from 'axios';
import { key, proxy } from '../config';

export default class ReviewList {
	constructor() {
	}

	async getReviewList() {
		try {
            const res = await axios(`http://www.mocky.io/v2/5cbb8ec6310000b8284d7522`);
            this.result = res.data.reviews;
		} catch (error) {
			alert('Something went wrong when getting reviews...');
			console.log(error);
		}
	}
}