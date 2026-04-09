import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

import { StandardEditorProps, StringFieldConfigSettings } from '@grafana/data';
import { TextArea } from '@grafana/ui';
import { monospacedFontSize } from '../options';

interface CustomTextAreaSettings extends StringFieldConfigSettings {
  isMonospaced: boolean;
  fontSize: string;
}

interface Props extends StandardEditorProps<string, CustomTextAreaSettings> {
  suffix?: ReactNode;
}

function unescape(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

export const CustomTextArea: React.FC<Props> = ({ value, onChange, item, suffix }) => {
  let textareaRef = useRef<HTMLTextAreaElement>(null);

  const onValueChange = useCallback(
    (e: React.SyntheticEvent) => {
      let nextValue = value ?? '';
      if (e.hasOwnProperty('key')) {
        // handling keyboard event
        const evt = e as React.KeyboardEvent<HTMLInputElement>;
        if (evt.key === 'Enter' && !item.settings?.useTextarea) {
          nextValue = unescape(evt.currentTarget.value.trim());
        }
      } else {
        // handling form event
        const evt = e as React.FormEvent<HTMLInputElement>;
        nextValue = unescape(evt.currentTarget.value.trim());
      }
      if (nextValue === value) {
        return; // no change
      }
      onChange(nextValue === '' ? undefined : nextValue);
    },
    [value, item.settings?.useTextarea, onChange]
  );

  useEffect(() => {
    if (!!textareaRef.current) {
      // ensure that the js 'value' property stays in sync with the actual DOM value
      if (textareaRef.current.innerHTML !== textareaRef.current.value) {
        textareaRef.current.value = unescape(textareaRef.current.innerHTML);
      }
    }
  });

  const attribs = {};
  if (item.settings?.isMonospaced) {
    attribs['style'] = {
      fontFamily: "monospace",
      fontSize: item.settings?.fontSize || monospacedFontSize
    };
  }

  const TA = TextArea as any;

  return (
    <TA
      {...(attribs)}
      placeholder={item.settings?.placeholder}
      defaultValue={value || ''}
      rows={(item.settings?.useTextarea && item.settings.rows) || 5}
      onBlur={onValueChange}
      onKeyDown={onValueChange}
      ref={textareaRef}
    />
  );
};
