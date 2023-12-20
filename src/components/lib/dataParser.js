import { DataFrameView } from '@grafana/data';

export function parseData(data, mapData, colors, fields, layer) {
  // helper function to parse grafana colors
  function fixColor(color) {
    switch (color) {
      case 'dark-green':
        color = '#1A7311';
        break;
      case 'semi-dark-green':
        color = '#36872D';
        break;
      case 'light-green':
        color = '#73BF68';
        break;
      case 'super-light-green':
        color = '#96D88C';
        break;
      case 'dark-yellow':
        color = 'rgb(207, 159, 0)';
        break;
      case 'semi-dark-yellow':
        color = 'rgb(224, 180, 0)';
        break;
      case 'light-yellow':
        color = 'rgb(250, 222, 42)';
        break;
      case 'super-light-yellow':
        color = 'rgb(255, 238, 82)';
        break;
      case 'dark-red':
        color = 'rgb(173, 3, 23)';
        break;
      case 'semi-dark-red':
        color = 'rgb(196, 22, 42)';
        break;
      case 'light-red':
        color = 'rgb(242, 73, 92)';
        break;
      case 'super-light-red':
        color = 'rgb(255, 115, 131)';
        break;
      case 'dark-blue':
        color = 'rgb(18, 80, 176)';
        break;
      case 'semi-dark-blue':
        color = 'rgb(31, 96, 196)';
        break;
      case 'light-blue':
        color = 'rgb(87, 148, 242)';
        break;
      case 'super-light-blue':
        color = 'rgb(138, 184, 255)';
        break;
      case 'dark-orange':
        color = 'rgb(229, 84, 0)';
        break;
      case 'semi-dark-orange':
        color = 'rgb(250, 100, 0)';
        break;
      case 'light-orange':
        color = 'rgb(255, 152, 48)';
        break;
      case 'super-light-orange':
        color = 'rgb(255, 179, 87)';
        break;
      case 'dark-purple':
        color = 'rgb(124, 46, 163)';
        break;
      case 'semi-dark-purple':
        color = 'rgb(143, 59, 184)';
        break;
      case 'light-purple':
        color = 'rgb(184, 119, 217)';
        break;
      case 'super-light-purple':
        color = 'rgb(202, 149, 229)';
        break;
      default:
        break;
    }
    return color;
  }

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
  colors.defaultColor = fixColor(colors.defaultColor);
  colors.nodeThresholds = colors.nodeThresholds.map((step)=>{
    return {
      value: step.value,
      color: fixColor(step.color)
    }
  });

  let dataFrames = [];

  data.series.forEach(function (series) {
    dataFrames.push(new DataFrameView(series));
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
  dataFrames.forEach((frame) => {
    frame.forEach((row) => {
      // if we have both inbound and outbound values defined
      if (inboundKey !== null && outboundKey !== null) {
        parsedData.push({
          in: row[srcKey],
          out: row[dstKey],
          azName: `${row[srcKey]}--${row[dstKey]}`,
          inboundValue: row[inboundKey],
          outboundValue: row[outboundKey],
        });
        // if we only have an outbound value defined
      } else if (inboundKey === null && outboundKey !== null) {
        parsedData.push({
          in: row[srcKey],
          out: row[dstKey],
          azName: `${row[dstKey]}--${row[srcKey]}`, // assemble the edge name backwards
          // this will cause us to have a situation where we match on the reverse of the
          // normal edge. our outbound key becomes the inbound value for the z-a edge
          inboundValue: row[outboundKey],
          outboundValue: null,
        });
      } else if (inboundKey !== null && outboundKey === null) {
        parsedData.push({
          in: row[srcKey],
          out: row[dstKey],
          azName: `${row[srcKey]}---${row[dstKey]}`,
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
  });

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
    edge.AZname = `${nodeA}--${nodeZ}`;
    edge.ZAname = `${nodeZ}--${nodeA}`;
    let matchAZ = parsedData.find((d) => d.azName === edge.AZname);
    let matchZA = parsedData.find((d) => d.azName === edge.ZAname);

    if (matchAZ) {
      // if we get an a-z match, assign inbound and outbound "normally"
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
    if (matchZA) {
      // if we get a z-a match, flip-flop inbound and outbound
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
