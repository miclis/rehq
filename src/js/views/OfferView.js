import { elements } from './base';
import { formatPrice } from './offerListView';

export const clearOffer = () => {
	elements.offer.innerHTML = '';
};

export const renderOffer = offer => {
	const markup = `
        <figure class="offer__fig">
            <img src="${offer.imageUrl}" alt="${offer.name}" class="offer__img" />
            <h1 class="offer__name">
                <span>${offer.name}</span>
            </h1>
        </figure>
        <div class="offer__container">
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-contacts-filled"></use>
                </svg>
                <span class="offer__info-data offer__info-data--owner">${offer.owner}</span>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-rating"></use>
                </svg>
                <span class="offer__info-data offer__info-data--id">${offer.id}</span>
            </div>
            <div class="offer__info">
                <svg class="offer__info-icon">
                    <use href="img/ext-icons.svg#icon-home"></use>
                </svg>
                <span class="offer__info-data offer__info-data--address"
                    >${offer.street}</span
                >
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-owners"
                    >$</span
                >
                <span
                    class="offer__info-data offer__info-data--price offer__info-data--price-owners"
                    >${formatPrice(offer.ownersPrice)}</span
                >
            </div>
            <div class="offer__info">
                <span
                    class="offer__info-data offer__info-data--price-sign offer__info-data--price offer__info-data--price-sign-ours"
                    >$</span
                >
                <span
                    class="offer__info-data offer__info-data--price offer__info-data--price-ours"
                    >${formatPrice(offer.ourPrice)}</span
                >
            </div>
        </div>
        <div class="reviews">
            <h2 class="heading-2 heading-left">REVIEWS</h2>
        </div>
    `;
	elements.offer.insertAdjacentHTML('afterbegin', markup);
};