import { FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';

const FieldsCategory = ['Choose Fields'];
const LayersCategory = ['Layer options'];
const LegendCategory = ['Legend options'];
const QueryCategory = ['Ad-hoc Query Variable Bindings'];

export const plugin = new PanelPlugin<MapOptions>(MapPanel);
const layer1Bool = (layer1: boolean) => (config: MapOptions) => config.layer1 === layer1;
const layer2Bool = (layer2: boolean) => (config: MapOptions) => config.layer2 === layer2;
const layer3Bool = (layer3: boolean) => (config: MapOptions) => config.layer3 === layer3;

// -------------------- Network Map Panel Options --------------------
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

  // -------------------- Layer Options -------------------
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
    settings: { useTextarea: true, rows: 10 },
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
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer1Bool(true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL1',
    name: 'Layer 1 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer1Bool(true),
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
    settings: { useTextarea: true, rows: 10 },
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
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer2Bool(true),
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
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer2Bool(true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  // Layer 3
  builder.addBooleanSwitch({
    path: 'layer3',
    name: 'Layer 3 on',
    category: LayersCategory,
    defaultValue: false,
  });
  builder.addTextInput({
    path: 'mapjsonL3',
    name: 'Layer 3 Map data (json)',
    category: LayersCategory,
    description: 'JSON with edges and nodes of network map',
    showIf: layer3Bool(true),
    defaultValue: '',
    settings: { useTextarea: true, rows: 10 },
  });
  builder.addColorPicker({
    path: 'color3',
    name: 'Layer 3 Default color',
    category: LayersCategory,
    showIf: layer3Bool(true),
    description: 'The default color for nodes and links on Layer 3',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL3',
    name: 'Layer 3 Endpoint Identifier',
    category: LayersCategory,
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: layer3Bool(true),
    defaultValue: 'router',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL3',
    name: 'Layer 3 Node highlight color',
    category: LayersCategory,
    description: 'The color to highlight nodes that match the query',
    showIf: layer3Bool(true),
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL3',
    name: 'Layer 3 Node Size',
    category: LayersCategory,
    showIf: layer3Bool(true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL3',
    name: 'Layer 3 Edge Width',
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer3Bool(true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL3',
    name: 'Layer 3 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: LayersCategory,
    showIf: layer3Bool(true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  // -------------------- Choose Fields --------------------
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
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
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
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'inboundValueFieldL1',
    name: 'Layer 1 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: layer1Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL1',
    name: 'Layer 1 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: layer1Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
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
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
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
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'inboundValueFieldL2',
    name: 'Layer 2 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: layer2Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL2',
    name: 'Layer 2 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: layer2Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'srcFieldL3',
    name: 'Layer 3 Source Field',
    description: 'Select the field to match source nodes',
    category: FieldsCategory,
    showIf: layer3Bool(true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'dstFieldL3',
    name: 'Layer 3 Destination Field',
    description: 'Select the field to match destination nodes',
    category: FieldsCategory,
    showIf: layer3Bool(true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'inboundValueFieldL3',
    name: 'Layer 3 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: layer3Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL3',
    name: 'Layer 3 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: layer3Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        const options: any[] = [];
        if (context && context.data) {
          for (const frame of context.data) {
            const frameName = frame.refId;
            for (const field of frame.fields) {
              const name = getFieldDisplayName(field, frame, context.data);
              const value = name;
              options.push({ value, label: '[' + frameName + '] ' + name });
            }
          }
        }
        return Promise.resolve(options);
      },
    },
  });
  // -------------------- Ad-Hoc Query Variable Bindings --------------------
  builder.addTextInput({
    path: 'dashboardVarL1',
    name: 'Layer 1 Dashboard Variable',
    showIf: layer1Bool(true),
    category: QueryCategory,
    defaultValue: 'l1edge',
  });
  builder.addTextInput({
    path: 'srcVarL1',
    name: 'Binding: Edge "Source" Layer 1',
    showIf: layer1Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.device_info.loc_name',
  });
  builder.addTextInput({
    path: 'dstVarL1',
    name: 'Binding: Edge "Destination" Layer 1',
    showIf: layer1Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.remote.loc_name',
  });
  builder.addTextInput({
    path: 'dashboardVarL2',
    name: 'Layer 2 Dashboard Variable',
    showIf: layer2Bool(true),
    category: QueryCategory,
    defaultValue: 'l2edge',
  });
  builder.addTextInput({
    path: 'srcVarL2',
    name: 'Binding: Edge "Source" Layer 2',
    showIf: layer2Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.device',
  });
  builder.addTextInput({
    path: 'dstVarL2',
    name: 'Binding: Edge "Destination" Layer 2',
    showIf: layer2Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.org.short_name',
  });
  builder.addTextInput({
    path: 'dashboardVarL3',
    name: 'Layer 3 Dashboard Variable',
    showIf: layer3Bool(true),
    category: QueryCategory,
    defaultValue: 'l3edge',
  });
  builder.addTextInput({
    path: 'srcVarL3',
    name: 'Binding: Edge "Source" Layer 3',
    showIf: layer3Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.device_info.loc_name',
  });
  builder.addTextInput({
    path: 'dstVarL3',
    name: 'Binding: Edge "Destination" Layer 3',
    showIf: layer3Bool(true),
    category: QueryCategory,
    defaultValue: 'meta.remote.loc_name',
  });

  // -------------------- Legend Options --------------------
  builder.addBooleanSwitch({
    path: 'legendL1',
    name: 'Show Layer 1 toggle',
    category: LegendCategory,
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName1',
    name: 'Layer 1 Display Name',
    category: LegendCategory,
    defaultValue: 'layer 1',
  });
  builder.addBooleanSwitch({
    path: 'legendL2',
    name: 'Show Layer 2 toggle',
    category: LegendCategory,
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName2',
    name: 'Layer 2 Display Name',
    category: LegendCategory,
    defaultValue: 'layer 2',
  });
  builder.addBooleanSwitch({
    path: 'legendL3',
    name: 'Show Layer 3 toggle',
    category: LegendCategory,
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName3',
    name: 'Layer 3 Display Name',
    category: LegendCategory,
    defaultValue: 'layer 3',
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
