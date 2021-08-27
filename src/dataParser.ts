import { DataFrameView } from '@grafana/data';

export function parseData(data: { series: any[] }, mapData, colors) {
  const series = data.series[0];
  const frame = new DataFrameView(series);

  // initialize arrays

  let parsedData: Array<{ in: any; out: any; azName: string; zaName: string; value: number }> = [];
  let infIn: Array<{ name: any; value: number }> = [];
  let infOut: Array<{ name: any; value: number }> = [];

  // hardcoded right now!!! group by src and dst

  // Retrieve panel data from panel
  frame.forEach((row) => {
    parsedData.push({
      in: row[0],
      out: row[1],
      azName: `${row[0]}--${row[1]}`,
      zaName: `${row[1]}--${row[0]}`,
      value: row[2],
    });

    let indexIn = infIn.findIndex((e) => e.name === row[0]);
    if (indexIn >= 0) {
      infIn[indexIn].value += row[2];
    } else {
      infIn.push({ name: row[0], value: row[2] });
    }

    let indexOut = infOut.findIndex((e) => e.name === row[1]);
    if (indexOut >= 0) {
      infOut[indexOut].value += row[2];
    } else {
      infOut.push({ name: row[1], value: row[2] });
    }
  });

  const mapJson = JSON.parse(mapData);

  mapJson.edges.forEach((edge) => {
    let matchAZ = parsedData.find((d) => d.azName === edge.name);
    let matchZA = parsedData.find((d) => d.zaName === edge.name);
    if (matchAZ) {
      edge.azColor = 'red';
    } else {
      edge.azColor = colors.defaultColor;
    }
    if (matchZA) {
      edge.zaColor = 'red';
    } else {
      edge.zaColor = colors.defaultColor;
    }
  });

  mapJson.nodes.forEach((node) => {
    let match1 = infIn.find((d) => d.name === node.name);
    let match2 = infOut.find((d) => d.name === node.name);
    if (match1 || match2) {
      node.color = colors.nodeHighlight;
    } else {
      node.color = colors.defaultColor;
    }
  });

  // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by
  return [parsedData, infIn, infOut, mapJson];
}
