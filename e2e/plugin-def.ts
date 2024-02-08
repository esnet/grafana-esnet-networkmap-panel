import { PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, TestType, test as base } from '@playwright/test';
import { ITargets } from './interfaces/Targets.interface';

export type PluginTestOptions = {
    targets: ITargets;
  };

export type PluginTest = TestType<PlaywrightTestArgs & PlaywrightTestOptions & PluginTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>

export const pluginTest: PluginTest = base.extend<PluginTestOptions>({
    targets: [{
      targetDashboardUid: '',
      targetFolderUid: '',
      targetDashboard: '',
      targetFolder: '',
      targetPanel: undefined,
      targetPanelId: -1,
    }, {option: true} ]
});
