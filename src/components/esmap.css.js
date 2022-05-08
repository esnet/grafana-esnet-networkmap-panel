export const esmapCss = `.leaflet-pane > svg path {
    pointer-events: all;
}

.map-panel {
  position: relative;
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

svg path.animated-edge {
    stroke-linecap: butt;
        stroke-width: 5;
        /* stroke: #aaa; */
        fill:  none;
    cursor: crosshair;

        stroke-dasharray:  90 10 ;
        stroke-dashoffset: 100;
        animation-name: dash;
        animation-duration: 5s;
        animation-timing-function: steps(25,start);
        animation-delay: 0s;
        animation-direction: forwards;
        animation-iteration-count: infinite;
        animation-play-state: running;

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

/* this is to bring grafana panel header on top leaflet layers */
.panel-header:hover {
  z-index: 1000;
}
`