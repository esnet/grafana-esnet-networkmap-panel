import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

import { StandardEditorProps, StringFieldConfigSettings } from '@grafana/data';
import { TextArea } from '@grafana/ui';

interface Props extends StandardEditorProps<string, StringFieldConfigSettings> {
  suffix?: ReactNode;
}

export const CustomTextArea: React.FC<Props> = ({ value, onChange, item, suffix }) => {
  var textareaRef = useRef<HTMLTextAreaElement>(null);

  const onValueChange = useCallback(
    (e: React.SyntheticEvent) => {
      let nextValue = value ?? '';
      if (e.hasOwnProperty('key')) {
        // handling keyboard event
        const evt = e as React.KeyboardEvent<HTMLInputElement>;
        if (evt.key === 'Enter' && !item.settings?.useTextarea) {
          nextValue = evt.currentTarget.value.trim();
        }
      } else {
        // handling form event
        const evt = e as React.FormEvent<HTMLInputElement>;
        nextValue = evt.currentTarget.value.trim();
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
        textareaRef.current.value = textareaRef.current.innerHTML;
      }
    }
  });

  return (
    <TextArea
      placeholder={item.settings?.placeholder}
      defaultValue={value || ''}
      rows={(item.settings?.useTextarea && item.settings.rows) || 5}
      onBlur={onValueChange}
      onKeyDown={onValueChange}
      ref={textareaRef}
    />
  );
};