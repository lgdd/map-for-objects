import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import './styles/Leaflet.css';

const ELEMENT_ID = 'map-for-objects';

class WebComponent extends HTMLElement {
  connectedCallback() {
    this.root = ReactDOM.createRoot(this);
    const props = {
      objectDefinitionId: this.getAttribute('id'),
      objectDefinitionERC: this.getAttribute('erc'),
      objectDefinitionLat: this.getAttribute('lat'),
      objectDefinitionLng: this.getAttribute('lng'),
      objectDefinitionTooltip: this.getAttribute('tooltip'),
      mapZoom: this.getAttribute('zoom') || 4,
      mapTileURL: this.getAttribute('tileURL') ||  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      mapTileAttribution: this.getAttribute('tileAttribution') || '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      mapMarkerURL: this.getAttribute('markerURL'),
      mapMarkerSize: this.getAttribute('markerSize'),
      hideConfigHelper: this.getAttribute('hideConfigHelper') || false,
    };
   this.root.render(<App {...props} />);
  }
	disconnectedCallback() {
		this.root.unmount();
		delete this.root;
	}
}

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
