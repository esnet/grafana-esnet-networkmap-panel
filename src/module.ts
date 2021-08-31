import { FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';

const OptionsCategory = ['Choose Fields'];

export const plugin = new PanelPlugin<MapOptions>(MapPanel);

plugin.setPanelOptions((builder) => {
  builder.addColorPicker({
    path: 'color',
    name: 'Default color',
    description: 'The default color for nodes and links',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'mapjson',
    name: 'Map data (json)',
    description: 'JSON with edges and nodes of network map',
    defaultValue: '',
  });
  builder.addColorPicker({
    path: 'nodeHighlight',
    name: 'Node highlight color',
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red',
  });
  builder.addSelect({
    path: 'srcField',
    name: 'Source Field',
    description: 'Select the field to match source nodes',
    category: OptionsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'dstField',
    name: 'Destination Field',
    description: 'Select the field to match destination nodes',
    category: OptionsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'valField',
    name: 'Value Field',
    description: 'Select the field to use for data values',
    category: OptionsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
});

plugin.useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.NoValue,
    FieldConfigProperty.Max,
    FieldConfigProperty.Min,
    FieldConfigProperty.DisplayName,
  ],
});
