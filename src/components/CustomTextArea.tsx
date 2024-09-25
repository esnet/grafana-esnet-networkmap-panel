import React, { useCallback, useEffect, useRef } from 'react';

import { StringFieldConfigSettings } from '@grafana/data';
import { TextArea } from '@grafana/ui';
import { monospacedFontSize } from '../options';

export interface CustomTextAreaSettings extends StringFieldConfigSettings {
  isMonospaced: boolean;
  fontSize: string;
}

function unescape(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

/**
 * This component renders a customized TextArea that accepts an item defined by Grafana's StandardEditorsRegistryItem
 * interface. The CustomTextArea differs from Grafana's TextArea in that changes containing HTML entities (for instance,
 * &amp; &lt; &gt;, etc) are unescaped and thus stored internally unchanged. This is intended for input that is not meant
 * to be rendered back to the page in HTML.
 *
 * Supports the setting 'isMonospaced' to render the text field using a monospaced font, as opposed to a proportional font.
 *
 * @prop {string} value                                           The current value of the standard registry item
 * @prop {(value?: any): void} onChange                           A callback invoked when the value in the text area changes.
 * @prop {StandardEditorsRegistryItem<TValue, TSettings>} item    The standard registry item to edit
 * @returns
 */
export const CustomTextArea = ({ value, onChange, item }) => {
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

  return (
    <TextArea
      {...attribs}
      placeholder={item.settings?.placeholder}
      defaultValue={value || ''}
      rows={(item.settings?.useTextarea && item.settings.rows) || 5}
      onBlur={onValueChange}
      onKeyDown={onValueChange}
      ref={textareaRef}
    />
  );
};
