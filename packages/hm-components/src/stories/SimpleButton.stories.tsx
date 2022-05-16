import React from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import SimpleButton, { SimpleButtonProps } from '../components/buttons/SimpleButton';

export default {
  title: 'Buttons/SipmleButton',
  component: SimpleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SimpleButton>;

const Template: Story<SimpleButtonProps> = args => <SimpleButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  title: 'Button',
};
