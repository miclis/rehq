// Global App Controller
import OfficeList from './models/OfficeList';
import * as officeListView from './views/officeListView';

import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - OfficeList object
 * - OfferList object
 * - Offer object
 * - ReviewList object
 */
const state = {};

/**
 * OFFICELIST CONTROLLER
 */
const controlOfficeList = async () => {
	// 1. New OfficeList object and add to state
	state.officeList = new OfficeList();

	// 2. Prepare UI for Offices results
	officeListView.clearResults();
	renderLoader(elements.officesRes);
	try {
		// 3. Get offices
        await state.officeList.getAllResults();
        
        // 4. Render offices
        officeListView.renderOffices(state.officeList.result);
	} catch (error) {
		alert('Something went wrong when getting offices data');
		clearLoader();
	}
};
