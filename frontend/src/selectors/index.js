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
            return (
                (filters.category.length
                    ? filters.category.includes(listing.category)
                    : true) &&
                (filters.varietal.length
                    ? filters.varietal.includes(listing.varietal)
                    : true) &&
                (filters.country.length
                    ? filters.country.includes(listing.country)
                    : true) &&
                (filters.winery.length
                    ? filters.winery.includes(listing.winery)
                    : true) &&
                (filters.price.length
                    ? listing.salePrice >= filters.price[0] &&
                      listing.salePrice <= filters.price[1]
                    : true) &&
                (filters.size.length
                    ? listing.size >= filters.size[0] &&
                      listing.size <= filters.size[1]
                    : true)
            );
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
                [
                    'category',
                    'varietal',
                    'country',
                    'winery',
                    'producer',
                ].forEach((property) => {
                    addToDictionary(property, availableFilters, product);
                });
            });
        }
        return availableFilters;
    }
);

export const getListing = (state, id) => {
    state.listings.find((listing) => listing.id === id);
};
