import { DataFrameView } from '@grafana/data';

export function parseData(data: { series: any[] }) {
  const series = data.series[0];
  const frame = new DataFrameView(series);

  // initialize arrays

  let parsedData: Array<{ in: any; out: any; value: number }> = [];
  let infIn: Array<{ name: any; value: number }> = [];
  let infOut: Array<{ name: any; value: number }> = [];

  // hardcoded right now!!! group by src and dst

  // Retrieve panel data from panel
  frame.forEach((row) => {
    parsedData.push({ in: row[0], out: row[1], value: row[2] });

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

  // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by
  return [parsedData, infIn, infOut];
}
