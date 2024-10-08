import React, { useCallback, useEffect, useRef, useState } from 'react';

import { StandardEditorsRegistryItem, StringFieldConfigSettings } from '@grafana/data';
import { TextArea } from '@grafana/ui';
import { monospacedFontSize } from '../options';
import "./css/CustomTextArea.css";

export interface CustomTextAreaSettings extends StringFieldConfigSettings {
  isMonospaced: boolean;
  fontSize: string;
}

function unescape(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, "'");
}

function validateMapJsonStr(inStr: string, currentValidationState: ValidationState): ValidationState {
  let isValid = true;
  let validationFailedMsg: null | string = null;
  try {
    const parsedObj = JSON.parse(inStr);
    if (typeof(parsedObj) != 'object') {
      throw new Error("Bad topology object");
    }
    if (!Array.isArray(parsedObj.edges) || !Array.isArray(parsedObj.nodes)) {
      throw new Error("Missing or bad edges or nodes from topology object");
    }
    for (const edge of parsedObj.edges) {
      const { name, meta, coordinates, children } = edge;
      if (
        !name || typeof(name) != 'string' ||
        (!!meta && typeof(meta) != 'object') ||
        !coordinates || !Array.isArray(coordinates) || coordinates.some(coordinate => !Array.isArray(coordinate)) ||
        !children || !Array.isArray(children)
      ) {
        throw new Error("Bad edge definition");
      }
    }
    for (const node of parsedObj.nodes) {
      const { name, meta, coordinate } = node;
      if (
        !name || typeof(name) != 'string' ||
        (!!meta && typeof(meta) != 'object') ||
        !coordinate || !Array.isArray(coordinate)
      ) {
        throw new Error("Bad node definition");
      }
    }
  } catch (e: any) {
    isValid = false;
    if (e instanceof Error) {
      validationFailedMsg = e.message;
    }
  }
  const newValidationState: ValidationState = {
    isPristine: isValid ? currentValidationState.isPristine : false,
    isTouched: isValid ? currentValidationState.isTouched : false,
    isValid,
  };
  if (!isValid && validationFailedMsg) {
    newValidationState.errorMessage = validationFailedMsg;
  }
  return newValidationState;
}

const CONTROL_KEYS: (string | RegExp)[] = [
  'unidentified',
  /alt.*/i,
  'control',
  /fn.*/i,
  'hyper',
  'meta',
  /.*lock/i,
  /symbol.*/i,
  'shift',
  'super',
  'symbol',
  'os'
];
const NAVIGATION_KEYS: (string | RegExp)[] = [
  /arrow.*/i,
  'end',
  'home',
  /page.*/i
];

const doInsert = (currentInput: string, evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { value } = evt.currentTarget;
  const selectionStart = evt.currentTarget.selectionStart ?? value.length;
  const selectionEnd   = evt.currentTarget.selectionEnd ?? value.length;

  let newInChar = evt.key;
  if (evt.key === 'Enter') {
    newInChar = '\n';
  }

  if (selectionStart == selectionEnd) {
    const insertPos = selectionStart;
    return `${currentInput.substring(0, insertPos)}${unescape(newInChar)}${currentInput.substring(insertPos + 1)}`;
  } else {
    const lowerBoundSelection = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const upperBoundSelection = selectionStart > selectionEnd ? selectionStart : selectionEnd;
    return `${currentInput.substring(0, lowerBoundSelection)}${unescape(newInChar)}${currentInput.substring(upperBoundSelection)}`;
  }
};

/**
 * Modifies a currentInput string based on an evt KeyboardEvent such that if a selection is noted in the event,
 * the string returned is the currentInput string with the selection within removed.
 *
 * If a selection is not present in the event, then a single character is removed relative to the position of
 * the cursor, with a 'backspace' KeyboardEvent removing the character before the cursor and 'delete' removing
 * the chracter at the cursor's position.
 *
 * @param {string} currentInput
 * @param {React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>} evt
 * @return The modified string
 */
const doDelete = (currentInput: string, evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const lcKey = evt.key.toLowerCase();
  const { value } = evt.currentTarget;
  const selectionStart = evt.currentTarget.selectionStart ?? value.length;
  const selectionEnd   = evt.currentTarget.selectionEnd ?? value.length;

  if (selectionStart == selectionEnd) {
    if (lcKey == 'backspace') {
      return `${currentInput.substring(0, Math.max(selectionStart - 1, 0))}${currentInput.substring(selectionEnd)}`;
    } else if (lcKey == 'delete') {
      return `${currentInput.substring(0, selectionStart)}${currentInput.substring(Math.min(selectionEnd + 1, value.length - 1))}`;
    } else {
      throw new Error(`CustomTextArea.doDelete: Unsupported key event "${lcKey}"}`);
    }
  } else {
    const lowerBoundSelection = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const upperBoundSelection = selectionStart > selectionEnd ? selectionStart : selectionEnd;
    return `${currentInput.substring(0, lowerBoundSelection)}${currentInput.substring(upperBoundSelection)}`;
  }
}

interface CustomTextAreaProps {
  value: string;
  onChange: (newValue?: string) => void;
  item: StandardEditorsRegistryItem<any, any>;
}

interface ValidationState {
  isPristine: boolean;
  isTouched: boolean;
  isValid: boolean;
  errorMessage?: string;
}
const getDefaultValidationState: () => ValidationState = (isValid = true) => ({
  isPristine: true,
  isTouched: false,
  isValid,
} as ValidationState);

/**
 * This component renders a customized TextArea that accepts an item defined by Grafana's StandardEditorsRegistryItem
 * interface. The CustomTextArea differs from Grafana's TextArea in that changes containing HTML entities (for instance,
 * &amp; &lt; &gt;, etc) are unescaped and thus stored internally unchanged. This is intended for input that is not meant
 * to be rendered back to the page in HTML.
 *
 * Supports the setting 'isMonospaced' to render the text field using a monospaced font, as opposed to a proportional font.
 *
 * @prop {string} value                                           The current value of the standard registry item
 * @prop {(newValue?: string): void} onChange                     A callback invoked when the value in the text area changes.
 * @prop {StandardEditorsRegistryItem<string, CustomTextAreaSettings>} item    The standard registry item to edit
 * @returns
 */
export const CustomTextArea = ({ value, onChange, item }: CustomTextAreaProps) => {
    let textareaRef = useRef<HTMLTextAreaElement>(null);

    // default value set by state
    const [ content, setContent ] = useState(value);
    const [ validationState, setIsValidationState ] = useState(getDefaultValidationState());

  const onValueChange = useCallback(
    (e: React.SyntheticEvent) => {
      let nextValue = '';
      if (e.hasOwnProperty('key')) {
        // handling keyboard event
        const evt = e as React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>;
        const lcKey = evt.key.toLowerCase();

        // if a navigation or control key, we do not need to concern ourselves with it
        if (
          CONTROL_KEYS.find(ctKey => ctKey instanceof RegExp ? ctKey.test(lcKey) : lcKey == ctKey) ||
          NAVIGATION_KEYS.find(navKey => navKey instanceof RegExp ? navKey.test(lcKey) : lcKey == navKey)
        ) {
          // no changes
          return;
        }
        else {
          e.preventDefault();
          // if no selection, insert key value at cursor
          const { value } = evt.currentTarget;

          // handle editing keys
          if (['Backspace', 'Delete'].includes(evt.key.toLowerCase())) {
            nextValue = doDelete(value, evt);
          } else {
            nextValue = doInsert(value, evt);
          }
        }
      } else {
        // handling form event
        const evt = e as React.FormEvent<HTMLInputElement>;
        nextValue = unescape(evt.currentTarget.value.trim());
      }
      if (nextValue === value) {
        // no changes
        return;
      }
      setContent(nextValue);

      // check validity (only checks upon JSON and primary keys

      const newValidationState = validateMapJsonStr(nextValue, {
        ...validationState,
        isPristine: false,
        isTouched: true
      });
      setIsValidationState(newValidationState);
      onChange(nextValue === '' ? undefined : nextValue);
    },
    [value, item.settings?.useTextarea, onChange]
  );

  useEffect(() => {
    if (!!textareaRef.current) {
      // ensure that the js 'value' property stays in sync with the actual DOM value
      if (textareaRef.current.innerHTML !== textareaRef.current.value) {
        // textareaRef.current.value = unescape(textareaRef.current.innerHTML);
        setContent(unescape(textareaRef.current.innerHTML));
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
    <>
      <div className={`esnet-custom-text-area ${!validationState.isValid && 'invalid'}`}>
        <TextArea
          {...attribs}
          className={`esnet-custom-text-area ${attribs['className']}`}
          placeholder={item.settings?.placeholder}
          value={content}
          invalid={!validationState.isValid}
          rows={(item.settings?.useTextarea && item.settings.rows) || 5}
          onBlur={onValueChange}
          onChange={onValueChange}
          ref={textareaRef}
        />
      </div>
      <div className="errorMessage">{!validationState.isValid && validationState.errorMessage}</div>
    </>
  );
};
