import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/dom';
import { CustomTextArea, CustomTextAreaSettings } from '../src/components/CustomTextArea';
import { StandardEditorContext, StandardEditorsRegistryItem } from '@grafana/data';

const mockItem: StandardEditorsRegistryItem<string, CustomTextAreaSettings> = {
  editor: CustomTextArea,
  id: 'some-mock-id',
  name: 'custom-text-area-mock-item',
  settings: {
    isMonospaced: true,
    fontSize: '12pt'
  }
};
const mockContext: StandardEditorContext<{}, {}> = {
  data: []
};

describe('CustomTextArea', () => {
  it('renders just the text field with the default data', () => {
    const onChangeCb = jest.fn();
    render(
      // @ts-ignore: bad typing from React.FC or React.VFC; potentially resolved with React 18
      <CustomTextArea
        value={'Some default value'}
        onChange={onChangeCb}
        item={mockItem}
      />
    );

    expect(screen.getByText('Some default value')).not.toBeUndefined();
  });

  it('passes the data entered wtih', async () => {
    const onChangeCb = jest.fn((result?: string) => { });
    // Text would render as "Git's diffs are known for using <<< & >>> as tokens."
    // const nonEscapedText = 'Git&apos; diffs are known for using &lt;&lt;&lt; &amp; &gt;&gt;&gt; as tokens.';
    const unEscapedText = "Git's diffs are known for using <<< & >>> as tokens.";
    const component = render(
      // @ts-ignore: bad typing from React.FC or React.VFC; potentially resolved with React 18
      <CustomTextArea
        value={""}
        onChange={onChangeCb}
        item={mockItem}
      />
    )

    const inputEl: HTMLElement = await component.findByRole('input');
    expect(inputEl.tagName).toBe('textarea');
    const textareaEl: HTMLTextAreaElement = inputEl as HTMLTextAreaElement;

    const tokens = unEscapedText.split('');
    const lastToken = tokens.pop();
    for (const key of tokens) {
      fireEvent.keyDown(textareaEl, { key });
    }

    fireEvent.keyDown(textareaEl, { key: lastToken });
    if (Array.isArray(onChangeCb.mock.lastCall) && onChangeCb.mock.lastCall.length > 0) {
      expect(onChangeCb.mock.lastCall[0]).toBe(unEscapedText);
    } else {
      fail("CustomTextArea.spec: 'passes the data entered wtih' FAILED: Test Callback had no last call");
    }
  })
});