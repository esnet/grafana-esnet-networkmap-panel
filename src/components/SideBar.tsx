import React from 'react';
import '../css/esmap.css';
import '../css/leaflet.css';
// import { useTheme2 } from '@grafana/ui';

export const SideBar = (props) => {
  const layer2 = props.options.layer2;
  const layer1 = props.options.layer1;
  const layer3 = props.options.layer3;
  const toggleLayer = props.toggleLayer;
  const mapHeight = props.height - 25;
  const tooltipWidth = 150;

  return (
    <div style={{ height: mapHeight, width: tooltipWidth, background: '#B5B7BD', float: 'left', padding: '2px' }}>
      <br />
      <h3>Map Layers</h3>
      <div style={{ padding: '5px' }}>
        <label className="switch" id="layer1Switch">
          <input
            type="checkbox"
            name="layer1"
            checked={layer1}
            onChange={(e) => toggleLayer('layer1', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
        {props.options.layerName1}
      </div>
      <div style={{ padding: '5px' }}>
        <label className="switch">
          <input
            type="checkbox"
            name="layer2"
            checked={layer2}
            onChange={(e) => toggleLayer('layer2', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
        {props.options.layerName2}
      </div>
      <div style={{ padding: '5px' }}>
        <label className="switch">
          <input
            type="checkbox"
            name="layer3"
            checked={layer3}
            onChange={(e) => toggleLayer('layer3', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
        {props.options.layerName3}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <h3>Tooltip</h3>
        <div className={'tooltip'} id="tooltip"></div>
      </div>
    </div>
  );
};
