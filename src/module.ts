import { FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';

const FieldsCategory = ['Choose Fields'];
const LayersCategory = ['Layer options'];

export const plugin = new PanelPlugin<MapOptions>(MapPanel);
const layer2Bool = (layer2: boolean) => (config: MapOptions) => config.layer2 === layer2;
const layer1Bool = (layer1: boolean) => (config: MapOptions) => config.layer1 === layer1;

plugin.setPanelOptions((builder) => {
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
      step: 0.5,
    },
  });

  builder.addBooleanSwitch({
    path: 'layer1',
    name: 'Layer 1 on',
    category: LayersCategory,
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'mapjsonL1',
    name: 'Layer 1 Map data (json)',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '',
  });
  builder.addColorPicker({
    path: 'color1',
    name: 'Layer 1 Default color',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The default color for nodes and links on Layer 1',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL1',
    name: 'Layer 1 Endpoint Identifier',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The endpoint identifier in the meta data to match to the query',
    defaultValue: 'router',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL1',
    name: 'Layer 1 Node highlight color',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL1',
    name: 'Layer 1 Node Size',
    category: LayersCategory,
    showIf: layer1Bool(true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL1',
    name: 'Layer 1 Edge Width',
    category: LayersCategory,
    showIf: layer1Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL1',
    name: 'Layer 1 Edge Offset',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  builder.addBooleanSwitch({
    path: 'layer2',
    name: 'Layer 2 on',
    category: LayersCategory,
    defaultValue: false,
  });
  builder.addTextInput({
    path: 'mapjsonL2',
    name: 'Layer 2 Map data (json)',
    category: LayersCategory,
    description: 'JSON with edges and nodes of network map',
    showIf: layer2Bool(true),
    defaultValue: '',
  });
  builder.addColorPicker({
    path: 'color2',
    name: 'Layer 2 Default color',
    category: LayersCategory,
    showIf: layer2Bool(true),
    description: 'The default color for nodes and links on Layer 2',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL2',
    name: 'Layer 2 Endpoint Identifier',
    category: LayersCategory,
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: layer2Bool(true),
    defaultValue: 'router',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL2',
    name: 'Layer 2 Node highlight color',
    category: LayersCategory,
    description: 'The color to highlight nodes that match the query',
    showIf: layer2Bool(true),
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL2',
    name: 'Layer 2 Node Size',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL2',
    name: 'Layer 2 Edge Width',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL2',
    name: 'Layer 2 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  builder.addSelect({
    path: 'srcFieldL1',
    name: 'Layer 1 Source Field',
    description: 'Select the field to match source nodes',
    category: FieldsCategory,
    showIf: layer1Bool(true),
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
    path: 'dstFieldL1',
    name: 'Layer 1 Destination Field',
    description: 'Select the field to match destination nodes',
    category: FieldsCategory,
    showIf: layer1Bool(true),
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
    path: 'valFieldL1',
    name: 'Layer 1 Value Field',
    description: 'Select the field to use for data values',
    category: FieldsCategory,
    showIf: layer1Bool(true),
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
    path: 'srcFieldL2',
    name: 'Layer 2 Source Field',
    description: 'Select the field to match source nodes',
    showIf: layer2Bool(true),
    category: FieldsCategory,
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
    path: 'dstFieldL2',
    name: 'Layer 2 Destination Field',
    description: 'Select the field to match destination nodes',
    showIf: layer2Bool(true),
    category: FieldsCategory,
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
    path: 'valFieldL2',
    name: 'Layer 2 Value Field',
    description: 'Select the field to use for data values',
    showIf: layer2Bool(true),
    category: FieldsCategory,
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
