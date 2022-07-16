import React from 'react';
import { Meta, Story } from '@storybook/react';
import TabsSelect, { TabsSelectProps } from '../components/TabsSelect';

export default {
  title: 'Select/TabsSelect',
  component: TabsSelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TabsSelectProps> = args => <TabsSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'select via tabs',
  footer: null,
  centered: true,
  tabsOptions: [
    {
      key: 1,
      options: [
        { label: 'option 1', value: 'option 1' },
        { label: 'option 2', value: 'option 2' },
        { label: 'option 3', value: 'option 3' },
      ],
      title: 'group 1',
      name: 'group options 1',
    },
    {
      key: 2,
      options: [
        { label: 'option 1', value: 'option 1' },
        { label: 'option 2', value: 'option 2' },
        { label: 'option 3', value: 'option 3' },
      ],
      title: 'group 2',
      name: 'group options 2',
    },
  ],
};
