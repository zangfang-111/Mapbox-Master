import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BasicSelect from 'components/common/BaseSelect';

export default {
  title: 'Base Select',
  component: BasicSelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BasicSelect>;

const Template: ComponentStory<typeof BasicSelect> = (args) => (
  <BasicSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  options: ['option1', 'option2'],
  value: 'value',
  setValue: action('changed'),
};
