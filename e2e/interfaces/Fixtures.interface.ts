import { IDashboard, IPanel } from "../plugin-def";

export interface IFixtures {
    targetFolderUid: string;
    targetDashboardUid: string;
    targetFolder: string;
    targetDashboard?: IDashboard;
    targetPanel?: IPanel;
    targetPanelId: number;
    orgId?: number;
}
