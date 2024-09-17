export const esmapCss = `
#\${instanceId} .leaflet-pane svg path.edge {
    pointer-events: stroke;
}
#\${instanceId} .leaflet-pane svg path.control {
    pointer-events: stroke;
}

#\${instanceId} .map-panel {
  position: relative;
}

#\${instanceId} svg path.edge-az {
  marker-start: url("#arrow");
}

#\${instanceId} svg path.edge-za {
  marker-start: url("#arrow");
}

#\${instanceId} svg circle.node {
        /* fill: #999; */
        stroke: #777;
        stroke-width: 1;
        pointer-events: all;
}

#\${instanceId} svg path.edge {
        stroke-linecap: butt;
        fill:  none;
        pointer-events: visiblePainted !important;
}

#\${instanceId} svg path.animated-edge.edge-az {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}

#\${instanceId} svg path.animated-edge.edge-za {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}

#\${instanceId} svg path.animated-edge.edge-az.selected {
}

#\${instanceId} svg path.animated-edge.edge-za.selected {
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}


#\${instanceId} svg path.control {
        stroke-dasharray: 8 1;
        stroke-width: 6;
        stroke: #f808;
        fill:  none;
    cursor: crosshair;
}

#\${instanceId} svg circle.controlPoint {
    stroke: black;
    stroke-width: 1;
        fill: #f80;
        cursor: move;
}

#\${instanceId} div.tooltip-hover {
  position:absolute;
  border-radius:4px;
  padding:10px;
  margin:10px;
  max-width:250px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
}

#\${instanceId} div.tooltip-hover p:first-of-type {
  margin-top:0;
}

#\${instanceId} div.tooltip-hover p {
  margin-top: 6px;
  margin-bottom:0;
}

#\${instanceId} .legend-text {
  padding-left: 5px;
  vertical-align: middle;
}



#\${instanceId} .home-overlay {
    position: absolute;
    margin-top: 12px;
    margin-left: 57px;
}
#\${instanceId} .home-overlay > .button {
   border-radius: 4px;
   padding: 5px 10px;
   margin-right: 5px;
   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
   display: inline-block;
   cursor: pointer;
}

#\${instanceId} .legend {
    position: absolute;
    padding: 1em 1em 0.3em 1em;
    margin: 0.8em;
    box-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
    border-radius: 3px;
}

#\${instanceId} .legend.topright {
  top: 0;
  right: 0;
}

#\${instanceId} .legend.bottomright {
  bottom: 0;
  right: 0;
  margin: 0.8em 0.8em 1.8em 0.8em;
}

#\${instanceId} .legend.bottomleft {
  bottom: 0;
  left: 0;
}

#\${instanceId} .color-sample {
  height:1.5em;
  width:1.5em;
  margin-right:0.5em;
  border:1px solid rgba(0,0,0,0.2);
  display: inline-block;
  vertical-align: middle;
  border-radius: 2px;
}

#\${instanceId} .legend p {
    vertical-align: text-top;
    margin-bottom: 0.6em;
}

#\${instanceId} .legend h4 {
  font-weight:600;
  font-size:1.1em;
  padding: 0;
  margin: 0 0.4em 0.4em 0;
  display: inline-block;
}

#\${instanceId} .legend .minimize {
  float:right;
}

#\${instanceId} .legend .minimize .circle-background {
  fill: rgba(128,128,128,0.3); cursor: pointer;
}

#\${instanceId} .legend .minimize .circle-background:hover {
  fill: rgba(128,128,128,0.5);
}

#\${instanceId} .legend-column {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}

#\${instanceId} .legend-column:last-child {
  margin-right:0;
}

/* a 0-specificity class selector. Allows override for background elements by grafana's version of this class */
div:where(.tight-form-func) { background: #FFF; }
a:where(.tight-form-func) { background: #FFF; }

#\${instanceId} .animated-node { 
  transform: scale(1.5, 1.5);
}

#\${instanceId} svg .control.control-selected { 
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}

@keyframes pulse {
  0% { opacity:1.0 }
  80% { opacity:0.0 }
  100% { opacity:1.0 }
}

#\${instanceId} .loading-overlay, .error-overlay { background-color:rgba(0,0,0,0.7); position:absolute; height:100%; width: 100%; color:white; font-weight: bold; justify-content: center; align-items: center; z-index:20000; }

`
