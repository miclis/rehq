import axios from 'axios';
import { proxy, token, apiURL, offerURL, acceptReviewURL, reviewsURL } from '../config';

export default class Offer {
	constructor(id) {
		this.id = id;
	}

	async getOffer(id) {
		try {
			const res = await axios(`${apiURL}/${offerURL}?offerId=${id}`);
			this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
		try {
			const reviewRes = await axios(`${apiURL}/${reviewsURL}?offerId=${id}`);
			this.result.reviews = reviewRes.data;
		} catch (error) {
			alert('Something went wrong when getting reviews...');
			console.log(error);
			throw new Error('Failed to get reviews...');
		}
	}

	async getDefaultOffer() {
		try {
            const res = await axios(`${apiURL}/${offerURL}`);
            this.result = res.data;
		} catch (error) {
			alert('Something went wrong when getting offer info...');
			console.log(error);
			throw new Error('Failed to get offer...');
		}
	}

	async acceptReview(id) {
		this.acceptReviewStatus = false;
		console.log(id);
		try {
			const res = await axios.put(`${apiURL}/${acceptReviewURL}?reviewId=${id}`);
			this.acceptReviewStatus = res.status;
		} catch (error) {
			console.log(error);
		}
	}
}
