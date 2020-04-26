import { createSelector } from 'reselect';
const getFilters = (state) => state.filters;
const getListings = (state) => state.listings;
const getTypeFilter = (state) => state.filters.type;

// export const getVisibleProducts = createSelector(
//     [getTypeFilter, getProducts, getIds],
//     (type, products, ids) => {
//         let result = ids.map((id) => products[id]);
//         if (type) {
//             result = result.filter((product) => product.type === type);
//         }
//         return result;
//     }
// );

const filtersList = ['manufacturer', 'model', 'title', 'course'];

const getVisibleListings = createSelector(
    [getListings, getTypeFilter],
    (listings, type) => {
        let result = listings;
        if (type) {
            result = result.filter((listing) => listing.type === type);
        }
        return result;
    }
);

export const getFilteredListings = createSelector(
    [getFilters, getVisibleListings],
    (filters, listings) => {
        return listings.filter((listing) => {
            for (let filter of filtersList) {
                if (
                    filters[filter].length &&
                    filters[filter].includes(listing[filter])
                ) {
                    return false;
                }
            }
            return true;
        });
    }
);

const addToDictionary = (property, dict, obj) => {
    const value = obj[property];
    if (value) {
        if (!dict[property]) {
            dict[property] = {};
        }
        if (dict[property][value]) {
            dict[property][value]++;
        } else {
            dict[property][value] = 1;
        }
    }
};

export const getAvailableFilters = createSelector(
    [getVisibleListings, getTypeFilter],
    (products, type) => {
        const availableFilters = {};
        if (type) {
            products.forEach((product) => {
                filtersList.forEach((property) => {
                    addToDictionary(property, availableFilters, product);
                });
            });
        }
        return availableFilters;
    }
);

export const getListing = (state, id) => {
    return state.listings.find((listing) => listing.listingId === id);
};
