/* global google */

import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'


export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  }
  render() {
    console.log("asjfoasjfa",this.props.google)
    return <input ref="input" {...this.props} type="text"/>;
  }
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }
  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
}