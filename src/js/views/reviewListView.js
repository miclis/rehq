import { elements } from './base';

const renderReviewsHeader = () => {
		const markup = `
            <h2 class="heading-2 heading-left heading--reviews">REVIEWS</h2>
        `;
		elements.reviewsRes.insertAdjacentHTML('afterbegin', markup);

};

const renderReview = review => {
	const markup = `
        <li class="review__item">
            <ul>
                <li class="review__info-item">
                    <div class="review__info">
                        <svg class="offer__info-icon review__info-icon--reviewer">
                            <use
                                href="img/ext-icons.svg#icon-contacts-filled"
                            ></use>
                        </svg>
                        <span class="offer__info-data offer__info-data--owner"
                            >${review.author}</span
                        >
                    </div>
                </li>
                <li>
                    <div class="review__info">
                        <span
                            class="review__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-ours"
                            >$</span
                        >
                        <span
                            class="offer__info-data offer__info-data--price offer__info-data--price-ours"
                            >${review.ourPrice}</span
                        >
                        <button class="review__accept btn-tiny">
                            <svg class="offer__info-icon">
                                <use href="img/ext-icons.svg#icon-checked"></use>
                            </svg>
                        </button>
                    </div>
                </li>
                <li>
                    <p class="review__description">${review.notes}</p>
                </li>
            </ul>
        </li>
    `;
	elements.reviewsResList.insertAdjacentHTML('beforeend', markup);
};

export const renderReviews = reviews => {
    renderReviewsHeader();
	reviews.forEach(renderReview);
};
