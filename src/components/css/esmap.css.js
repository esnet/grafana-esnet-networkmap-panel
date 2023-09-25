export const esmapCss = `
.leaflet-pane svg path.edge {
    pointer-events: stroke;
}
.leaflet-pane svg path.control {
    pointer-events: stroke;
}

.map-panel {
  position: relative;
}

.flow-direction-tooltip, .flow-amount-element {
  display: flex;
  align-items: center;
  grid-gap: 8px;
}
.flow-direction-tooltip svg, .flow-amount-element svg {
  height: 12px;
  width: 12px;
}

svg path.edge-az {
  marker-start: url("#arrow");
}

svg path.edge-za {
  marker-start: url("#arrow");
}

svg circle.node {
        /* fill: #999; */
        stroke: #777;
        stroke-width: 1;
        pointer-events: all;
}

svg path.edge {
        stroke-linecap: butt;
        fill:  none;
        pointer-events: visiblePainted !important;
}

svg path.animated-edge.edge-az {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}

svg path.animated-edge.edge-za {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}
svg path.animated-edge.edge-az.selected {
}

svg path.animated-edge.edge-za.selected {
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}


svg path.control {
        stroke-dasharray: 8 1;
        stroke-width: 6;
        stroke: #f808;
        fill:  none;
    cursor: crosshair;
}

svg circle.controlPoint {
    stroke: black;
    stroke-width: 1;
        fill: #f80;
        cursor: move;
}

div.tooltip-hover {
  position:absolute;
  border-radius:4px;
  padding:10px;
  margin:10px;
  max-width:250px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
}

div.tooltip-hover p:first-of-type {
  margin-top:0;
}

div.tooltip-hover p {
  margin-top: 6px;
  margin-bottom:0;
}

div.sidebar-tooltip {   
    position: absolute;         
    text-align: left;
    height: auto;                   
    font: sans-serif;
    pointer-events: none;   
    line-height: 0.9;
}

.legend-text {
  padding-left: 5px;
  vertical-align: middle;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 26px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  margin-top: 5px;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4EC1E0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4EC1E0;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

.home-overlay {
    position: absolute;
    margin-top: 12px;
    margin-left: 57px;
}
.home-overlay > .button {
   border-radius: 4px;
   padding: 5px 10px;
   margin-right: 5px;
   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
   display: inline-block;
   cursor: pointer;
}

.legend {
    position: absolute;
    padding: 1em 1em 0.3em 1em;
    margin: 0.8em;
    box-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
    border-radius: 3px;
}

.legend.topright {
  top: 0;
  right: 0;
}

.legend.bottomright {
  bottom: 0;
  right: 0;
  margin: 0.8em 0.8em 1.8em 0.8em;
}

.legend.bottomleft {
  bottom: 0;
  left: 0;
}

.color-sample {
  height:1.5em;
  width:1.5em;
  margin-right:0.5em;
  border:1px solid rgba(0,0,0,0.2);
  display: inline-block;
  vertical-align: middle;
  border-radius: 2px;
}

.legend p {
    vertical-align: text-top;
    margin-bottom: 0.6em;
}

.legend h4 {
  font-weight:600;
  font-size:1.1em;
  padding: 0;
  margin: 0 0.4em 0.4em 0;
  display: inline-block;
}

.legend .minimize {
  float:right;
}

.legend .minimize .circle-background {
  fill: rgba(128,128,128,0.3); cursor: pointer;
}

.legend .minimize .circle-background:hover {
  fill: rgba(128,128,128,0.5);
}

.legend-column {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}

.legend-column:last-child {
  margin-right:0;
}

/* a 0-specificity class selector. Allows override for background elements by grafana's version of this class */
div:where(.tight-form-func) { background: #FFF; }
a:where(.tight-form-func) { background: #FFF; }

.animated-node { 
  transform: scale(1.5, 1.5);
}

svg .control.control-selected { 
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

`
