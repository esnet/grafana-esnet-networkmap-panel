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
  builder.addTextInput({
    path: 'endpointId',
    name: 'Endpoint Identifier',
    description: 'The endpoint identifier in the meta data to match to the query',
    defaultValue: 'router',
  });
  builder.addColorPicker({
    path: 'nodeHighlight',
    name: 'Node highlight color',
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidth',
    name: 'Node Size',
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 1,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidth',
    name: 'Edge Width',
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 1,
    },
  });
  builder.addSliderInput({
    path: 'pathOffset',
    name: 'Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 1,
    },
  });
  builder.addNumberInput({
    path: 'startLat',
    name: 'Starting Latitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    defaultValue: 42,
  });
  builder.addNumberInput({
    path: 'startLng',
    name: 'Starting Longitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    defaultValue: -105,
  });
  builder.addSliderInput({
    path: 'startZoom',
    name: 'Starting zoom level of map',
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 1,
    },
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
