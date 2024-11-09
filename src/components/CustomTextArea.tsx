import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { StandardEditorProps, StringFieldConfigSettings } from '@grafana/data';
import { monospacedFontSize } from '../options';

interface CustomTextAreaSettings extends StringFieldConfigSettings {
  isMonospaced: boolean;
  fontSize: string;
}

interface Props extends StandardEditorProps<string, CustomTextAreaSettings> {
  suffix?: ReactNode;
}

interface ValidationState {
  isPristine: boolean;
  isTouched: boolean;
  isValid: boolean;
  errorMessage?: string;
}

function unescape(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function validateMapJsonStr(inStr: string, currentValidationState: ValidationState): ValidationState {
  let isValid = true;
  let validationFailedMsg: null | string = null;
  try {
    const parsedObj = JSON.parse(inStr);
    if (typeof(parsedObj) !== 'object') {
      throw new Error("Bad topology object");
    }
    if (!Array.isArray(parsedObj.edges) || !Array.isArray(parsedObj.nodes)) {
      throw new Error("Missing or bad edges or nodes from topology object");
    }
    for (const edge of parsedObj.edges) {
      const { name, meta, coordinates } = edge;
      if (
        !name || typeof(name) !== 'string' ||
        (!!meta && typeof(meta) !== 'object') ||
        meta?.endpoint_identifiers !== 'object' ||
        !coordinates || !Array.isArray(coordinates) ||
        coordinates.some((coordinate) => {
          return !Array.isArray(coordinate)
          || coordinate.length != 2
          || coordinate.some((coord)=>{ return !Number.isFinite(coord)})
        })
      ) {
        throw new Error("Bad edge definition");
      }
    }
    for (const node of parsedObj.nodes) {
      const { name, meta, coordinate } = node;
      if (
        !name || typeof(name) !== 'string' ||
        (!!meta && typeof(meta) !== 'object') ||
        !coordinate || !Array.isArray(coordinate) ||
        coordinate.length !== 2 || !Number.isFinite(coordinate[0]) ||
        !Number.isFinite(coordinate[1])
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
  const newValidationState: any = {
    isPristine: isValid ? currentValidationState.isPristine : false,
    isTouched: isValid ? currentValidationState.isTouched : false,
    isValid: isValid,
    errorMessage: null,
  };
  if (!isValid && validationFailedMsg) {
    newValidationState.errorMessage = validationFailedMsg;
  }
  return newValidationState;
}

export const CustomTextArea: React.FC<Props> = ({ value, onChange, item, suffix }) => {
  let textareaRef = useRef<HTMLTextAreaElement>(null);
  let [validationState, setValidationState] = useState({
    isPristine: true,
    isTouched: false,
    isValid: false
  } as ValidationState);
  let [currentEditorValue, setCurrentEditorValue] = useState(value);

  const onValueChange = useCallback(
    (e: React.SyntheticEvent) => {
      let nextValue = value ?? '';
      if (e.hasOwnProperty('key')) {
        // handling keyboard event
        const evt = e as React.KeyboardEvent<HTMLInputElement>;
        // if we're not in a <textarea>, the enter key should trigger
        // essentially a blur equivalent
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
      const newValidationState = validateMapJsonStr(nextValue, {
        ...validationState,
        isPristine: false,
        isTouched: true,
      });
      setValidationState(newValidationState);
      setCurrentEditorValue(nextValue);
      if (!newValidationState.isValid){
        return; // invalid input; don't fire onchange
      }
      onChange(nextValue === '' ? undefined : nextValue);
    },
    [value, item.settings?.useTextarea, onChange]
  );

  // set component initial state
  useEffect(() => {
    if (!!textareaRef.current) {
      // ensure that the js 'value' property stays in sync with the actual DOM value
      if (textareaRef.current.innerHTML !== textareaRef.current.value) {
        textareaRef.current.value = unescape(textareaRef.current.innerHTML);
      }
    }
  });

  // when the value changes externally, update the component's initial state
  useEffect(()=>{
    setCurrentEditorValue(value);
  }, [value])

  let attribs = {
    style: {
      width: "100%",
      resize: "none",
    }
  } as any;
  if (item.settings?.isMonospaced) {
    attribs.style.fontFamily =  "monospace";
    attribs.style.fontSize = item.settings?.fontSize || monospacedFontSize;
  }

  return (
    <div>
      <textarea
        {...attribs}
        placeholder={item.settings?.placeholder}
        defaultValue={currentEditorValue || ''}
        rows={(item.settings?.useTextarea && item.settings.rows) || 5}
        onBlur={onValueChange}
        onChange={onValueChange}
        ref={textareaRef}
      />
      {
        !validationState.isValid ?
        <div className='validation-error' style={{ marginTop: "2px", fontSize:"10px", color: "red" }}>
          {validationState.errorMessage}
        </div>
        : null
      }
    </div>
  );
};
