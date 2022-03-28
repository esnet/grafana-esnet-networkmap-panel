import { DataFrameView } from '@grafana/data';

export function parseData(data: { series: any[] }, mapData, colors, fields, layer) {
  // helper function to parse grafana colors
  function fixColor(color: string) {
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

  // fix the colors
  colors.defaultColor = fixColor(colors.defaultColor);
  colors.nodeHighlight = fixColor(colors.nodeHighlight);

  let dataFrames: DataFrameView[] = [];

  data.series.forEach(function (series) {
    dataFrames.push(new DataFrameView(series));
  });
  var srcKey = fields.srcField;
  var dstKey = fields.dstField;
  var inboundKey = fields.inboundValueField;
  var outboundKey = fields.outboundValueField;

  // initialize arrays
  let parsedData: Array<{
    in: any;
    out: any;
    azName: any;
    inboundValue: any;
    outboundValue: any;
  }> = [];
  let infIn: Array<{ name: any; value: number }> = [];
  let infOut: Array<{ name: any; value: number }> = [];

  // const valueField = valKey
  //   ? data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { name: any }) => field.name === valKey)
  //     )
  //   : data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { type: string }) => field.type === 'number')
  //     );

  const valueField = data.series.map((series: { fields: any[] }) =>
    series.fields.find((field: { type: string }) => field.type === 'number')
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
          azName: `${row[srcKey]}---${row[dstKey]}`,
          inboundValue: row[inboundKey],
          outboundValue: row[outboundKey],
        });
        // if we only have an outbound value defined
      } else if (inboundKey === null && outboundKey !== null) {
        parsedData.push({
          in: row[srcKey],
          out: row[dstKey],
          azName: `${row[dstKey]}---${row[srcKey]}`, // assemble the edge name backwards
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
    });
  });

  const mapJson = JSON.parse(mapData);
  const endpointId = fields.endpointId;

  mapJson.edges.forEach((edge) => {
    // first, color all edges with their default "dead link" values
    edge.azColor = colors.defaultColor;
    edge.zaColor = colors.defaultColor;
    edge.AZdisplayValue = 'N/A';
    edge.ZAdisplayValue = 'N/A';
    edge.AZvalue += null;
    edge.ZAvalue += null;
  });

  mapJson.edges.forEach((edge) => {
    // set up the layer number so the edge "knows" which layer it's in.
    edge.layer = layer;
    // Find A and Z node
    let nodeA = edge.meta.endpoint_identifiers[endpointId][0];
    let nodeZ = edge.meta.endpoint_identifiers[endpointId][1];
    // create names
    edge.nodeA = nodeA;
    edge.nodeZ = nodeZ;
    edge.AZname = `${nodeA}---${nodeZ}`;
    edge.ZAname = `${nodeZ}---${nodeA}`;
    let matchAZ = parsedData.find((d) => d.azName === edge.AZname);
    let matchZA = parsedData.find((d) => d.azName === edge.ZAname);

    if (matchAZ) {
      // if we get an a-z match, assign inbound and outbound "normally"
      edge.AZvalue = matchAZ.inboundValue;
      edge.azColor = valueField[0].display(edge.AZvalue).color;
      let AZdisplay = valueField[0].display(edge.AZvalue);
      edge.AZdisplayValue = `${AZdisplay.text} ${AZdisplay.suffix}`;
      if (matchAZ.outboundValue) {
        edge.ZAvalue = matchAZ.outboundValue;
        edge.zaColor = valueField[0].display(edge.ZAvalue).color;
        let ZAdisplay = valueField[0].display(edge.ZAvalue);
        edge.ZAdisplayValue = `${ZAdisplay.text} ${ZAdisplay.suffix}`;
      }
    }
    if (matchZA) {
      // if we get a z-a match, flip-flop inbound and outbound
      edge.ZAvalue = matchZA.inboundValue;
      edge.zaColor = valueField[0].display(edge.ZAvalue).color;
      let ZAdisplay = valueField[0].display(edge.ZAvalue);
      edge.ZAdisplayValue = `${ZAdisplay.text} ${ZAdisplay.suffix}`;
      if (matchZA.outboundValue) {
        edge.AZvalue = matchZA.outboundValue;
        edge.azColor = valueField[0].display(edge.AZvalue).color;
        let AZdisplay = valueField[0].display(edge.AZvalue);
        edge.AZdisplayValue = `${AZdisplay.text} ${AZdisplay.suffix}`;
      }
    }
  });

  mapJson.nodes.forEach((node) => {
    let match1 = infIn.find((d) => d.name === node.name);
    let match2 = infOut.find((d) => d.name === node.name);
    node.inValue = 'N/A';
    node.outValue = 'N/A';
    if (match1 || match2) {
      node.color = colors.nodeHighlight;
      if (match1) {
        node.inValue = `${valueField[0].display(match1.value).text} ${valueField[0].display(match1.value).suffix}`;
      }
      if (match2) {
        node.outValue = `${valueField[0].display(match2.value).text} ${valueField[0].display(match2.value).suffix}`;
      }
    } else {
      node.color = colors.defaultColor;
    }
  });

  //take this out later
  mapJson.aTest = 0;

  // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by
  return [parsedData, infIn, infOut, mapJson, srcKey, dstKey, inboundKey, outboundKey];
}
