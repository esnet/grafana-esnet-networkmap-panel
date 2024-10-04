import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/dom';
import { CustomTextArea, CustomTextAreaSettings } from '../src/components/CustomTextArea';
import { StandardEditorsRegistryItem } from '@grafana/data';

const mockItem: StandardEditorsRegistryItem<string, CustomTextAreaSettings> = {
  editor: CustomTextArea,
  id: 'some-mock-id',
  name: 'custom-text-area-mock-item',
  settings: {
    isMonospaced: true,
    fontSize: '12pt'
  }
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

  it("invokes the onChange callback without transforming the argument's symbols into HTML entities upon the change event", async () => {
    const onChangeCb = jest.fn();
    const unEscapedText = "Git's diffs are known for using <<< & >>> as tokens.";
    const component = render(
      // @ts-ignore: bad typing from React.FC or React.VFC; potentially resolved with React 18
      <CustomTextArea
        value={""}
        onChange={onChangeCb}
        item={mockItem}
      />
    );

    const inputEl: HTMLElement = await component.findByRole('textbox');
    expect(inputEl.tagName.toLowerCase()).toBe('textarea');
    const textareaEl: HTMLTextAreaElement = inputEl as HTMLTextAreaElement;

    fireEvent.change(textareaEl, { target: { value: unEscapedText }});
    fireEvent.blur(textareaEl);

    expect(onChangeCb).toHaveBeenCalled();
    expect(onChangeCb).toHaveBeenCalledWith(unEscapedText);
  });

  it.skip("invokes the onChange callback without transforming the argument's symbols into HTML entities upon the keyDown event", async () => {
    const user = userEvent.setup();
    let i = 0;
    const onKeyDownCb = jest.fn((arg) => {
      console.log(`Jest.fn Invocation #${i++} with arg = ${arg}`);
    });
    const unEscapedText = "Git's diffs are known for using <<< & >>> as tokens.";
    const unEscapedTextLen = unEscapedText.length;
    const component = render(
      // @ts-ignore: bad typing from React.FC or React.VFC; potentially resolved with React 18
      <CustomTextArea
        value={""}
        onChange={onKeyDownCb}
        item={mockItem}
      />
    );

    const inputEl: HTMLElement = await component.findByRole('textbox');
    expect(inputEl.tagName.toLowerCase()).toBe('textarea');
    const textareaEl: HTMLTextAreaElement = inputEl as HTMLTextAreaElement;

    await user.type(textareaEl, unEscapedText);
    await fireEvent.blur(textareaEl);

    expect(onKeyDownCb).toHaveBeenCalled();
    for (let i = 0; i < unEscapedTextLen; i++) {
      expect(onKeyDownCb).toHaveBeenNthCalledWith(i + 1, unEscapedText.substring(0, i + 1));
    }
  })
});