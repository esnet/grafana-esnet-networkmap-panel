[![Build Status](https://api.travis-ci.com/esnet/grafana-esnet-networkmap-panel.svg?branch=main)](https://app.travis-ci.com/github/esnet/grafana-esnet-networkmap-panel)

![Network Map Screenshot](https://raw.githubusercontent.com/esnet/grafana-esnet-networkmap-panel/v3.0.0/src/img/networkmap.png "Network Map Screenshot")

For setting up in Grafana with an example: See [Introductory Tutorial](#introductory-tutorial)
For development: See [Development Notes](https://github.com/esnet/grafana-esnet-networkmap-panel/blob/main/docs/development.md)

# Network Map Panel

This panel displays a network topology.

The topology can be either geographically referenced against a geographic tileset, or purely logical.

The plugin will plot traffic information on the network topology, showing bi-directional traffic flow between nodes.

## Table of Contents

[Dashboard JSON](#Dashboard-JSON)

[Introductory Tutorial](#Introductory-Tutorial)

## Dashboard JSON

The Introductory Tutorial below is complete, but lengthy. In an effort to get to a demonstration state a bit more quickly, try using this Grafana Dashboard JSON snippet:

[Dashboard JSON Snippet](https://github.com/esnet/grafana-esnet-networkmap-panel/blob/v2.0.1/demonstration/dashboard.json)

## Introductory Tutorial

This (rather lengthy) tutorial will help you set up and color a map topology, and as a bonus step, show how it can be integrated with other plugins in your Grafana dashboard.

### Setup:

In a couple of places in this tutorial, we'll refer to this Google sheet:

https://docs.google.com/spreadsheets/d/1K_nZcu4yzPXBuOR3nO8NkbSCxMnvWtu37H9cGagkQgc/edit#gid=0

This Google sheet contains a set of mocked network data traffic that's always up to date for the last 7 days.

It also contains an example topology that will be used while setting up the Network Map Panel.

### Open Grafana

### 1. Setup a Google Sheets Data Source

- If not yet selected, click the tab labeled Data Sources.

- Click the Add New Data Source button.

- Type in Google Sheet in the search bar.

- Install the Google Sheet data source.

- Click the [Create a Google Sheets data source] button

- Get a Google Sheets API key (Google this if you don't have one)

- Input your Google Sheets API key into the "API Key" input

- Click [Test + Save]

### 2. Setup a Test Dashboard

- Create a new Dashboard

- Save your dashboard as "Test Dashboard"

### 3. Add the Network Map Panel

- Click [Add Visualization]

- In the visualization selector at the top right of the screen, search for and select "Network Map Panel"

- You'll now see a blank network map visualization

### 4. Set up the Visualization

- Now let's configure the options for the panel. There are many options.

### 5. Set up the Data Source Query

- At the bottom of the screen, select "Google Sheets"

- Into the Spreadsheet ID blank, enter "1K_nZcu4yzPXBuOR3nO8NkbSCxMnvWtu37H9cGagkQgc"

- Leave "Range" blank

- Leave Cache Time set to 5m

- Turn "Use Time Filter" on

### 6. Create Dashboard Variables

- Near the top right, select the Gear icon: "Dashboard settings"

- From the list at left, select "Variables"

- Click [Add Variable]

- From "Select Variable Type," select "Text box"

- Enter "source" into the "name" field

- At the top right, click [Save Dashboard]

- From the list at left, select "Variables"

- Click [Add Variable]

- From "Select Variable Type," select "Text box"

- Enter "destination" into the "name" field

- At the top right, click [Save Dashboard]

- At the top right, click [Close]

### 7. Configure the Visualization

- Now we'll enter all of the options that make the Network Map Panel render a full network visualization.
Follow the list below to enter all of the various options to enter a topology and link it with the spreadsheet data.

#### 8. Visualization Options

**Map Initial View Strategy**

This option designates how the viewport for the map will be set on map load. There are 3 strategies:
- Specify Static Center, No zoom on resize
- Specify Lat/Lng Viewport, Zoom to fit on resize
- Set Map Center from Variables, No zoom on resize

For our demo, we'll select "Specify Static Center, No zoom on resize"

This will give us an initial static center an zoom that reasonably fits the USA into the viewport.

**Map Background Color**

This option sets the map background color using the built-in Grafana color picker. We'll leave this one alone.

**Geographic Tileset**

This renders the geographic tileset layer for the map. Select "USGS Satellite Imagery" for this introduction

**Political Boundary Tileset**

This will render political boundaries onto the map. Select "Toner Political Boundaries" for this demo.

**Political Label Tileset**

Political labels will label each political boundary. Select "[No Political Labels]" for this introduction.

**Show View Controls**

This will optionally hide and show the zoom controls in the map panel. Leave this set to "on"

**Enable Map Scrolling on Drag**

This enables allowing the end user to scroll the viewport. Leave this set to "on"

**Enable Map Editing**

This optionally disables the built-in topology editor. Leave this set to "on"

**Enable Node Selection Animations**

This optionally disables node selection animations. Leave this set to "on"

**Enable Edge Traffic Direction Animations**

This optionally disables edge selection animations. Leave this set to "on"

**Layer 1 on**

This optionally hides Layer 1 of the topology information. Leave this set to "on"

**Fetch Layer 1 JSON from URL**

This will optionally fetch Layer 1's JSON topology from a URL instead of the provided text area. Leave this set to "off"

**Layer 1 Map Data (JSON)**

From the Google Sheet at https://docs.google.com/spreadsheets/d/1K_nZcu4yzPXBuOR3nO8NkbSCxMnvWtu37H9cGagkQgc/edit#gid=0, click the tab for the sheet named "Topology" along the bottom of the viewport and paste in the content in the most upper-left cell (A1).

**Layer 1 Default Color**

Leave this set to gray. It will help to show when we've correctly associated edge metadata.

**Layer 1 Endpoint Identifier**

This input specifies the attribute of "endpoint_identifiers" prop of each of the "edges" objects in your JSON topology. Each "endpoint_identifiers" entry in the JSON should have a key matching the value specified in this text box (although the assigned JSON value is an array of node names of length two, does not matter). The value for Grafana here should be left as the default "names".

**Layer 1 Node Highlight Color**

When your metrics data shows a match for a particular node, it will be highlighted this color. Set this to medium blue ("blue") for this introduction.

**Layer 1 Node Size**

This changes the diameter of the nodes in this topology layer. Leave this set to the default, 5.

**Layer 1 Edge Width**

This changes the width of all of the edges in this topology layer. Leave it set to the default, 3.

**Layer 1 Edge Offset**

This changes the space between the edges in this topology layer. Leave it set to the default, 3.

**Layer 2 on**

This will show another topology layer. Leave it set to "off" for now.

**Layer 3 on**

This will show another topology layer. Leave it set to "off" for now.

**Layer 1 Source Field Label**

This will change the "From:" label in the edge tooltips. Leave it set to "From:"

**Layer 1 Source Field**

This will specify the field from the query that we want to map to our edges. Choose "src" from the drop-down.

**Layer 1 Destination Field Label**

This will change the "To:" label in the edge tooltips. Leave it set to "To:"

**Layer 1 Destination Field**

This will specify the field from the query that we want to map to our destination. Choose "dst" from the drop-down.

**Layer 1 Data Field Label**

This will change the "Volume:" label in the edge tooltips. Leave it set to "Volume:"

**Layer 1 Inbound Value Field**

This will change the field from your query that represents traffic from the A end to the Z end of each edge. Select "in_bits" from the drop down.

**Layer 1 Outbound Value Field**

This will change the field from your query that represents traffic from the Z end to the A end of each edge. Select "out_bits" from the drop down.

**Binding: Node Layer 1**

This will change the dashboard variable that is set when a node is selected. The default of "node" is fine for this introduction.

**Binding: Edge "Source" Layer 1**

This will change the dashboard variable that is set to the edge 'source' when an edge is selected. Set this to "source".

**Binding: Edge "Destination" Layer 1**

This will change the dashboard variable that is set to the edge 'destination' when an edge is selected. Set this to "destination".

**Show map sidebar**

This shows and hides the sidebar at the right side of the map. Set this to "off" for this introduction.

**Show Map Legend**

This shows and hides the map legend. Set this to "on" for this introduction.

**Legend Items per Column**

This is the maximum number of legend entries per legend column. Leave this set to the default, 3, for this introduction.

**Legend Position**

This sets the position of the legend. Leave this set to the default, "Bottom Left" for this introduction.

**Legend Default Behavior**

This sets whether the legend is minimized or visible at page load time. Leave this set to the default, "visible" for this introduction.

**Unit**

This sets the units in a variety of places, including the legend and tooltips. Choose Data Rate > Bits / sec (SI)

**Decimals**

Leave this set to "auto"

**Color Scheme**

This should be set to "From thresholds (by value)"

**Thresholds**

This will set the color thresholds for different rates for your map. Add these entries:

- 1e10 (10 Gb/s)
- 5e10 (50 Gb/s)
- 1e11 (100 Gb/s)
- 4e11 (400 Gb/s)
- 8e11 (800 Gb/s)

You should see edges appropriately colored.

### Save your Dashboard

#### 9. Bonus: Dashboard Interaction via Variables

- Click [Apply]

You should now be looking at the main dashboard view. Let's add another panel:

- Click [Add]

- Select "Visualization" from the drop-down menu

- Select "Time Series" from the visualization drop down at the top right.

**Query**

- Select "Google Sheets" as the data source.

- Enter "1K_nZcu4yzPXBuOR3nO8NkbSCxMnvWtu37H9cGagkQgc" as the spreadsheet ID

- Enter "$source--$destination" as the Range

- Check "Use time filter"

**Transform**

- Select "Group by"

- src: Ignored

- dst: Ignored

- datetime: Group By

- in_bits: Calculate: Total

- out_bits: Calculate: Total

**Visualization Options**

- Select Data Rate > Bits / Sec (SI) from the Unit pull-down

### Save your Dashboard

You should now have a dashboard that visualizes a point-in-time snapshot of your network traffic, along with a line graph that shows the network traffic over the the selected Grafana time range.
