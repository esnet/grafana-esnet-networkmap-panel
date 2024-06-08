import { PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, TestType, test as base } from '@playwright/test';
import { ITargets } from './interfaces/Targets.interface';
import { MapOptions } from '../src/types';
import { IDataSource } from './interfaces/DataSource.interface';

export type PluginTestOptions = {
  targets: ITargets;
};

export type PluginTest = TestType<PlaywrightTestArgs & PlaywrightTestOptions & PluginTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>;

/**
 * A generic interface for Grafana panel JSON model
 * @see https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/view-dashboard-json-model/
 */
export interface IPanel {
  type: string;
  title: string;
  gridPos: { x: number, y: number; w: number; h: number; };
  id: number;
  mode: string;
  content: string;
  targets?: ITarget[];
}

/**
 * The JSON model for Network Map Panel
 */
export interface INetworkMapPanel extends IPanel {
  options: MapOptions;
  datasource: Partial<IDataSource>;
}

export type TimeRange = { to: string; from: string; };

export interface ITimePicker {
  collapse: boolean;
  enable: boolean;
  notice: boolean;
  now: boolean;
  refresh_intervals: string[];
  status: string;
  type: "timepicker";
}

export interface ITemplateOption {
  selected: boolean;
  text: string;
  value: string;
}

export interface ITemplateVar {
  allFormat: string;
  current: { tags: string[]; text: string; value: string; };
  datasource: null | string;
  includeAll: boolean;
  name: string;
  options: ITemplateOption[];
  query: string;
  refresh: boolean;
  type: "custom" | "query" | "interval";
}

export interface ITemplating {
  enable?: boolean;
  list: ITemplateVar[];
}

export interface IDashboardResponse {
  dashboard: IDashboard;
  meta: {[metaKey: string]: any};
}

/**
 * A generic interface for Grafana Dashboard JSON model
 * @see https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/view-dashboard-json-model/
 */
export interface IDashboard {
  // [key: string]: any;
  id: number;
  uid: string;
  title: string;
  tags: string[];
  style: 'dark' | 'light';
  timezone: string;
  editable: boolean;
  graphTooltip: number;
  time: TimeRange;
  timepicker: ITimePicker;
  templating: ITemplating;
  annotations: any;
  refresh: string;
  schemaVersion: number;
  version: number;
  panels: IPanel[];
  targets: ITarget[];
}

export interface ITarget {
  columns?: string[];
  datasource: Partial<IDataSource>;
  decimalSeparator: string;
  delimiter: string;
  filters?: any[];
  format?: string;
  global_query_id?: string;
  header: boolean;
  ignoreUnknown: boolean;
  refId: string;
  root_selector?: string;
  schema: any[];
  skipRows?: number;
  source?: string;
  type?: string;
  url?: string;
  url_options?: {
    data: string;
    method: string;
  }
}

export interface IOrganization {
  [key: string]: any;
}

export const pluginTest: PluginTest = base.extend<PluginTestOptions>({
    targets: [{
      targetDashboardUid: '',
      targetFolderUid: '',
      targetDashboard: undefined,
      targetFolder: '',
      targetPanel: undefined,
      targetPanelId: -1,
      orgId: -1,
    }, {option: true} ]
});

export const makeDashboard = (dbParams?: Partial<IDashboard>): Partial<IDashboard>  => (
  {
    uid: dbParams?.uid || "",
    editable: true,
    graphTooltip: 0,
    title: dbParams?.title || 'network-map-test-dashboard',
    tags: [],
    panels: [],
    refresh: "",
    schemaVersion: 38,
    style: "dark",
    templating: {
        list: []
    },
    time: {
        from: "now-6h",
        to: "now"
    },
    timepicker: {
      collapse: false,
      enable: false,
      notice: false,
      now: false,
      refresh_intervals: [],
      status: '',
      type: 'timepicker'
    },
    annotations: {},
    timezone: "",
    version: 4,
    ...dbParams
  }
);