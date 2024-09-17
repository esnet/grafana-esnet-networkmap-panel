import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { CustomTextArea, CustomTextAreaSettings } from '../src/components/CustomTextArea';
import { StandardEditorContext, StandardEditorsRegistryItem } from '@grafana/data';

const mockItem: StandardEditorsRegistryItem<string, CustomTextAreaSettings> = {
    editor: CustomTextArea,
    id: 'some-mock-id',
    name: 'custom-text-area-mock-item'
};
const mockContext: StandardEditorContext<{}, {}> = {
    data: []
};

describe('CustomTextArea', () => {
    it('renders no data when none provided', () => {
        const onChangeCb = jest.fn();
        render(
            <CustomTextArea value={'Some default value'} onChange={onChangeCb}
                item={mockItem}
                context={mockContext}
            />
        );

        expect(screen.getByText('Some default value')).not.toBeUndefined();
    });
});