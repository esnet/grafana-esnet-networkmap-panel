import { IPanel } from "./Panel.inteface";

export interface ITargets {
    targetFolderUid: string;
    targetDashboardUid: string;
    targetFolder: string;
    targetDashboard: string;
    targetPanel: IPanel | undefined;
    targetPanelId: number;
}
