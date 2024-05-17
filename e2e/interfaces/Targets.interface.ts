import { IDashboard } from "../plugin-def";
import { IPanel } from "./Panel.inteface";

export interface ITargets {
    targetFolderUid: string;
    targetDashboardUid: string;
    targetFolder: string;
    targetDashboard?: IDashboard;
    targetPanel: IPanel | undefined;
    targetPanelId: number;
    orgId: number | undefined;
}
