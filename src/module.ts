import { FieldConfigProperty, PanelPlugin } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';
import { standardOptionsCompat } from 'grafana-plugin-support';

const buildStandardOptions = (): any => {
  const options = [FieldConfigProperty.Unit, FieldConfigProperty.Color];
  return standardOptionsCompat(options);
};

export const plugin = new PanelPlugin<MapOptions>(MapPanel)
  .useFieldConfig({
    standardOptions: buildStandardOptions(),
  })
  .setPanelOptions((builder) => {
    return builder
      .addColorPicker({
        path: 'color',
        name: 'Color',
        defaultValue: 'black',
      })
      .addTextInput({
        path: 'mapjson',
        name: 'Map data (json)',
        defaultValue: '',
      });
  });
