import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/dom';
import { CustomTextArea, CustomTextAreaSettings } from '../../src/components/CustomTextArea';
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
});