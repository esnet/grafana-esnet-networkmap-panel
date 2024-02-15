import React, { ReactNode } from 'react';
import { StandardEditorProps, StringFieldConfigSettings } from '@grafana/data';
interface CustomTextAreaSettings extends StringFieldConfigSettings {
    isMonospaced: boolean;
    fontSize: string;
}
interface Props extends StandardEditorProps<string, CustomTextAreaSettings> {
    suffix?: ReactNode;
}
export declare const CustomTextArea: React.FC<Props>;
export {};
//# sourceMappingURL=CustomTextArea.d.ts.map