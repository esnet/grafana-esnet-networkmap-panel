import { DataFrameView } from '@grafana/data';
import { config } from '@grafana/runtime';
import { getTheme } from '@grafana/ui';

const ENDPOINT_DELIMITER = '--';
let initialParseDone = false;

/**
 *
 * @param {PanelData} data
 * @param {{[layerName: string]: any}} mapData
 * @param {*} colors
 * @param {*} fields
 * @param {string} layer
 * @param {import('@grafana/data').ThemeVisualizationColors} vizTheme
 * @returns
 */
export function parseData(data, mapData, colors, fields, layer, vizTheme) {

  function thresholdLookup(thresholds, value){
    if(!Array.isArray(thresholds) || thresholds.length === 0){ return null }
    let output = thresholds[0].color;
    // begin by assigning the base color, but don't iterate over it
    thresholds.forEach((threshold)=>{
      if(threshold.value <= value){
        output = threshold.color
      }
    })
    return output;
  }
  // fix the colors
  colors.defaultColor = vizTheme.getColorByName(colors.defaultColor);
  colors.nodeThresholds = colors.nodeThresholds.map((step)=>{
    return {
      value: step.value,
      color: vizTheme.getColorByName(step.color)
    }
  });

  let dataFrameViews = [];

  data.series.forEach(function (series) {
    dataFrameViews.push(new DataFrameView(series));
  });
  var srcKey = fields.srcField;
  var dstKey = fields.dstField;
  var inboundKey = fields.inboundValueField;
  var outboundKey = fields.outboundValueField;
  var nodeNameMatchKey = fields.nodeNameMatchField;
  var nodeValueKey = fields.nodeValueField;

  // initialize arrays
  let parsedData = [];
  let infIn = [];
  let infOut = [];
  let nodeValues = [];

  // const valueField = valKey
  //   ? data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { name: any }) => field.name === valKey)
  //     )
  //   : data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { type: string }) => field.type === 'number')
  //     );

  const valueField = data.series.map((series) =>
    series.fields.find((field) => field.type === 'number')
  );

  // set defaults if fields were not chosen
  if (srcKey === undefined) {
    srcKey = 0;
  }
  if (dstKey === undefined) {
    dstKey = 1;
  }
  // if (valKey === undefined) {
  //   valKey = series.fields.findIndex((field: { type: string }) => field.type === 'number');
  // }

  // Retrieve panel data from panel
  dataFrameViews.forEach(
    /**
     * @param {DataFrameView} frameView
     **/
    (frameView) => {
      frameView.forEach((row) => {
        // if we have both inbound and outbound values defined
        if (inboundKey !== null && outboundKey !== null) {
          parsedData.push({
            in: row[srcKey],
            out: row[dstKey],
            azName: `${row[srcKey]}${ENDPOINT_DELIMITER}${row[dstKey]}`,
            inboundValue: row[inboundKey],
            outboundValue: row[outboundKey],
          });
          // if we only have an outbound value defined
        } else if (inboundKey === null && outboundKey !== null) {
          parsedData.push({
            in: row[srcKey],
            out: row[dstKey],
            azName: `${row[dstKey]}${ENDPOINT_DELIMITER}${row[srcKey]}`, // assemble the edge name backwards
            // this will cause us to have a situation where we match on the reverse of the
            // normal edge. our outbound key becomes the inbound value for the z-a edge
            inboundValue: row[outboundKey],
            outboundValue: null,
          });
        } else if (inboundKey !== null && outboundKey === null) {
          parsedData.push({
            in: row[srcKey],
            out: row[dstKey],
            azName: `${row[srcKey]}${ENDPOINT_DELIMITER}${row[dstKey]}`,
            inboundValue: row[inboundKey],
            outboundValue: null,
          });
        }

        let indexIn = infIn.findIndex((e) => e.name === row[srcKey]);
        if (indexIn >= 0) {
          infIn[indexIn].value += row[inboundKey];
        } else {
          infIn.push({ name: row[srcKey], value: row[inboundKey] });
        }

        let indexOut = infOut.findIndex((e) => e.name === row[dstKey]);
        if (indexOut >= 0) {
          infOut[indexOut].value += row[outboundKey];
        } else {
          infOut.push({ name: row[dstKey], value: row[outboundKey] });
        }


        if(row.hasOwnProperty(nodeNameMatchKey) && row.hasOwnProperty(nodeValueKey)){
          nodeValues.push({ name: row[nodeNameMatchKey], value: row[nodeValueKey] })
        }
      });
    }
  );

  const mapJson = JSON.parse(mapData);
  const endpointId = fields.endpointId;

  mapJson.edges.forEach((edge) => {
    // first, color all edges with their default "dead link" values
    edge.azColor = colors.defaultColor;
    edge.zaColor = colors.defaultColor;
    edge.AZdisplayValue = 'no data';
    edge.ZAdisplayValue = 'no data';
    edge.AZvalue += null;
    edge.ZAvalue += null;
  });

  function getDisplayName(nodeName){
    var displayName = nodeName;
    mapJson.nodes.forEach((node)=>{
      if(node.name == nodeName && node.meta.display_name){
        displayName = node.meta.display_name;
      }
    });
    return displayName;
  }

  mapJson.edges.forEach((edge) => {
    // set up the layer number so the edge "knows" which layer it's in.
    edge.layer = layer;
    // Find A and Z node
    let nodeA = edge.meta.endpoint_identifiers[endpointId][0];
    let nodeZ = edge.meta.endpoint_identifiers[endpointId][1];
    // create names
    edge.nodeA = getDisplayName(nodeA);
    edge.nodeZ = getDisplayName(nodeZ);
    edge.AZname = `${nodeA}${ENDPOINT_DELIMITER}${nodeZ}`;
    edge.ZAname = `${nodeZ}${ENDPOINT_DELIMITER}${nodeA}`;
    // TODO: resolve such that matchAZ and matchZA are found with additional criteria (parsedData)
    let matchAZData = parsedData.filter((d) => d.azName === edge.AZname);
    let matchZAData = parsedData.filter((d) => d.azName === edge.ZAname);

    if (matchAZData.length > 0) {
      // for each a-z match, assign inbound and outbound "normally"
      for (const matchAZ of matchAZData) {
        edge.azValue = matchAZ.inboundValue;
        let azDisplay = valueField[0].display(edge.azValue);
        edge.azColor = azDisplay.color;
        edge.azDisplayValue = `${azDisplay.text} ${azDisplay.suffix || ''}`.trim();
        if (matchAZ.outboundValue) {
          edge.zaValue = matchAZ.outboundValue;
          let zaDisplay = valueField[0].display(edge.zaValue);
          edge.zaColor = zaDisplay.color;
          edge.zaDisplayValue = `${zaDisplay.text} ${zaDisplay.suffix || ''}`.trim();
        }
      }
    }
    if (matchZAData.length > 0) {
      // if we get a z-a match, flip-flop inbound and outbound
      for (const matchZA of matchZAData) {
        edge.zaValue = matchZA.inboundValue;
        edge.zaColor = valueField[0].display(edge.zaValue).color;
        let zaDisplay = valueField[0].display(edge.zaValue);
        edge.zaDisplayValue = `${zaDisplay.text} ${zaDisplay.suffix || ''}`.trim();
        if (matchZA.outboundValue) {
          edge.azValue = matchZA.outboundValue;
          edge.azColor = valueField[0].display(edge.azValue).color;
          let azDisplay = valueField[0].display(edge.azValue);
          edge.azDisplayValue = `${azDisplay.text} ${azDisplay.suffix || ''}`.trim();
        }
      }
    }
  });

  mapJson.nodes.forEach((node) => {
    let match1 = infIn.find((d) => d.name === node.name);
    let match2 = infOut.find((d) => d.name === node.name);
    node.inValue = 'N/A';
    node.outValue = 'N/A';
    node.color = colors.defaultColor;
    if (match1 || match2) {
      if (match1) {
        node.inValue = `${valueField[0].display(match1.value).text} ${valueField[0].display(match1.value).suffix}`;
      }
      if (match2) {
        node.outValue = `${valueField[0].display(match2.value).text} ${valueField[0].display(match2.value).suffix}`;
      }
    }

    let nodeMatch = nodeValues.find((d) => d.name == node.name);
    let nodeMatchValue = nodeMatch ? nodeMatch.value : 0;
    let output = thresholdLookup(colors.nodeThresholds, nodeMatchValue);
    if(output){
      node.color = output;
    }
  });

  //take this out later
  mapJson.aTest = 0;

  // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by
  return mapJson;
}
