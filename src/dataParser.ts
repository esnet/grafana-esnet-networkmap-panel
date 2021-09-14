import { DataFrameView } from '@grafana/data';

export function parseData(data: { series: any[] }, mapData, colors, fields) {
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

  const series = data.series[0];
  const frame = new DataFrameView(series);
  var srcKey = fields.srcField;
  var dstKey = fields.dstField;
  var valKey = fields.valField;

  // initialize arrays
  let parsedData: Array<{ in: any; out: any; azName: string; zaName: string; value: number }> = [];
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
  frame.forEach((row) => {
    parsedData.push({
      in: row[srcKey],
      out: row[dstKey],
      azName: `${row[srcKey]}---${row[dstKey]}`,
      zaName: `${row[dstKey]}---${row[srcKey]}`,
      value: row[2],
    });

    let indexIn = infIn.findIndex((e) => e.name === row[srcKey]);
    if (indexIn >= 0) {
      infIn[indexIn].value += row[2];
    } else {
      infIn.push({ name: row[srcKey], value: row[2] });
    }

    let indexOut = infOut.findIndex((e) => e.name === row[dstKey]);
    if (indexOut >= 0) {
      infOut[indexOut].value += row[2];
    } else {
      infOut.push({ name: row[dstKey], value: row[2] });
    }
  });

  const mapJson = JSON.parse(mapData);
  const endpointId = fields.endpointId;

  mapJson.edges.forEach((edge) => {
    // Find A and Z node
    let nodeA = edge.meta.endpoint_identifiers[endpointId][0];
    let nodeZ = edge.meta.endpoint_identifiers[endpointId][1];
    // create za name
    edge.AZname = `${nodeA}---${nodeZ}`;
    edge.ZAname = `${nodeZ}---${nodeA}`;
    let matchAZ = parsedData.find((d) => d.azName === edge.AZname);
    let matchZA = parsedData.find((d) => d.azName === edge.ZAname);

    if (matchAZ) {
      edge.AZvalue = matchAZ.value;
      edge.azColor = valueField[0].display(edge.AZvalue).color;
      let display = valueField[0].display(edge.AZvalue);
      edge.AZdisplayValue = `${display.text} ${display.suffix}`;
    } else {
      edge.azColor = colors.defaultColor;
      edge.AZdisplayValue = 'N/A';
      edge.AZvalue += null;
    }

    if (matchZA) {
      edge.ZAvalue = matchZA.value;
      edge.zaColor = valueField[0].display(edge.ZAvalue).color;
      let display = valueField[0].display(edge.ZAvalue);
      edge.ZAdisplayValue = `${display.text} ${display.suffix}`;
    } else {
      edge.zaColor = colors.defaultColor;
      edge.ZAdisplayValue = 'N/A';
      edge.ZAvalue = null;
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

  // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by
  return [parsedData, infIn, infOut, mapJson, srcKey, dstKey, valKey];
}
