import React from 'react';

const SearchBox = () => (
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new window.google.maps.places.Autocomplete(input,
        { componentRestrictions: { country: 'sg' } });
    this.searchBox.addListener('place_changed', this.inputChangeHandler);
);

export default SearchBox;
