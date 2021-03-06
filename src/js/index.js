// Global App Controller
import OfficeList from './models/OfficeList';
import * as officeListView from './views/officeListView';
import OfferList from './models/OfferList';
import * as offerListView from './views/offerListView';
import Offer from './models/Offer';
import * as offerView from './views/offerView';

import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - OfficeList object
 * - OfferList object
 * - Offer object (includes Reviews)
 */
const state = {
	offerListLoaded: false
};

/**
 * OFFICELIST CONTROLLER
 */
const controlOfficeList = async () => {
	// 1. New OfficeList object and add to state
	state.officeList = new OfficeList();

	// 2. Prepare UI for Offices results
	officeListView.clearOffices();
	offerListView.clearOffers();
	offerView.clearOffer();
	renderLoader(elements.officesRes);
	try {
		// 3. Get offices
		//await state.officeList.getDefaultResults();
		await state.officeList.getResults();

		// 4. Render offices
		clearLoader();
		officeListView.renderOffices(state.officeList.result);
	} catch (error) {
		alert('Something went wrong when rendering offices data...');
		console.log(error);
		clearLoader();
	}
};

window.addEventListener('load', controlOfficeList);

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
});

elements.officesResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		officeListView.clearOffices();
		officeListView.renderOffices(state.officeList.result, goToPage);
	}
});

/**
 * OFFERLIST CONTROLLER
 */
const controlOfferList = async () => {
	// 1. Get Office Id from URL
	const id = window.location.hash.replace('#?officeId=', '').slice(0, 7);

	// 2. New OfferList object and add to state
	state.offerList = new OfferList();

	// 3. Prepare UI for Offers results
	offerListView.clearOffers();
	offerView.clearOffer();
	renderLoader(elements.offersRes);

	try {
		// 4. Get offers
		//await state.offerList.getDefaultResults();
		await state.offerList.getResults(id);

		// 5. Render offices
		clearLoader();
		offerListView.renderOffers(state.offerList.result);

		// 6. Highlight selected office
		if (state.officeList) officeListView.highlightSelected(id);
	} catch (error) {
		alert('Something went wrong when rendering offers data...');
		console.log(error);
		clearLoader();
	}
};

elements.offersResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		offerListView.clearOffers();
		offierListView.renderOffers(state.offerList.result, goToPage);
	}
});

/**
 * OFFER CONTROLLER
 */
const controlOffer = async () => {
	// 1. Get Id from URL
	const id = window.location.hash.slice(26, 33);

	if (id) {
		// 2. Prepare UI for changes
		offerView.clearOffer();
		renderLoader(elements.offer);

		// 3. Create new offer object
		state.offer = new Offer(id);

		try {
			// 4. Get Offer data
			//await state.offer.getDefaultOffer();
			await state.offer.getOffer(id);

			// 5. Render Offer
			clearLoader();
			offerView.renderOffer(state.offer.result);

			// 6. Highlight selected offer item
			if (state.offerList) offerListView.highlightSelected(id);
		} catch (error) {
			alert('Something went wrong when rendering offer...');
			console.log(error);
		}
	}
};

['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, async () => {
		var regexOffices = /officeId=/;
		var regexOffers = /offerId=/;
		const hash = window.location.hash;

		if (hash.match(regexOffices) && !hash.match(regexOffers)) {
			await controlOfferList();
			state.offerListLoaded = true;
		} else if (window.location.hash.match(regexOffers)) {
			if (!state.offerListLoaded) {
				await controlOfferList();
			}
			controlOffer();
		}
	})
);

const acceptReview = async id => {
	// id from event
	try {
		// 1. Send accepted request to API, wait for response
		await state.offer.acceptReview(id);

		if (!state.offer.acceptReviewStatus)
			throw new Error(`Server responded with: ${state.offer.acceptReviewStatus}`);

		// 2. Accept state value
		state.offer.result.reviews.forEach(review => {
			if (review.id == id) review.accepted = true;
		});

		// 3. Render changes on UI (change icon to green, adjust our price)
		offerView.acceptReview(id);
		console.log(state.offer);
		offerView.adjustOurPrice(state.offer.result);
	} catch (error) {
		alert('Could not update review status on the server...');
		console.log(error);
	}
};

elements.offer.addEventListener('click', e => {
	const btn = e.target.closest('.btn-tiny');

	if (btn) {
		if (!btn.classList.contains('reviev__accept--accepted') ? true : false) {
			const reviewId = btn.dataset.revid;
			acceptReview(reviewId);
		}
	}
});
