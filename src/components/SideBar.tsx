import React from 'react';
import '../css/esmap.css';
import '../css/leaflet.css';
import { useTheme2 } from '@grafana/ui';
// import { urlUtil } from '@grafana/data';

export const SideBar = (props) => {
  const layer2 = props.options.layer2;
  const layer1 = props.options.layer1;
  const layer3 = props.options.layer3;
  const toggleLayer = props.toggleLayer;
  const mapHeight = props.height - 25;
  const tooltipWidth = props.width;

  const theme = useTheme2();
  const fontSize = theme.typography.fontSize;
  const headerFont = theme.typography.h5;
  const textColor = theme.colors.text.primary;

  return (
    <div
      style={{
        height: mapHeight,
        width: tooltipWidth,
        background: theme.colors.background.primary,
        float: 'left',
        padding: '10px 5px',
      }}
    >
      <div style={{ padding: '5px' }}>
        <p style={{ fontSize: headerFont.fontSize }}>Map Layers</p>
        <div style={{ padding: '5px' }} hidden={!props.options.legendL1}>
          <label className="switch">
            <input
              type="checkbox"
              name="layer1"
              checked={layer1}
              onChange={(e) => toggleLayer('layer1', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <text className="legend-text">{props.options.layerName1}</text>
          <div className="legend-text" style={{ fontSize: '12px', color: '#888' }} hidden={!props.options.editMode}>
            JSON Schema: {props.options.layerValid1}
          </div>
        </div>
        <div style={{ padding: '5px' }} hidden={!props.options.legendL2}>
          <label className="switch">
            <input
              type="checkbox"
              name="layer2"
              checked={layer2}
              onChange={(e) => toggleLayer('layer2', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <text className="legend-text">{props.options.layerName2}</text>
          <div className="legend-text" style={{ fontSize: '12px', color: '#888' }} hidden={!props.options.editMode}>
            JSON Schema: {props.options.layerValid2}
          </div>
        </div>
        <div style={{ padding: '5px' }} hidden={!props.options.legendL3}>
          <label className="switch">
            <input
              type="checkbox"
              name="layer3"
              checked={layer3}
              onChange={(e) => toggleLayer('layer3', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <text className="legend-text">{props.options.layerName3}</text>
          <div className="legend-text" style={{ fontSize: '12px', color: '#888' }} hidden={!props.options.editMode}>
            JSON Schema: {props.options.layerValid3}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 5px 5px 5px' }}>
        <p style={{ fontSize: headerFont.fontSize }}>Tooltip</p>
        <div
          className="sidebar-tooltip"
          id="sidebar-tooltip"
          style={{
            fill: textColor,
            fontSize: fontSize,
            paddingLeft: '10px',
          }}
        ></div>
      </div>
    </div>
  );
};
