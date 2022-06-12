import React from 'react';
import { Meta, Story } from '@storybook/react';
import SimpleButton, { SimpleButtonProps } from '../components/buttons/SimpleButton';

export default {
  title: 'Buttons/SipmleButton',
  component: SimpleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SimpleButtonProps> = args => <SimpleButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  title: 'Default Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'default',
  title: 'Disabled Button',
  disabled: true,
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: 'ghost',
  title: 'Ghost Button',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  title: 'Primary Button',
};

export const PrimaryGhost = Template.bind({});
PrimaryGhost.args = {
  type: 'primary',
  title: 'Primary Button',
  ghost: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  title: 'Secondary Button',
};

export const SecondaryGhost = Template.bind({});
SecondaryGhost.args = {
  type: 'secondary',
  title: 'Secondary Button',
  ghost: true,
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  title: 'Info Button',
};

export const InfoGhost = Template.bind({});
InfoGhost.args = {
  type: 'info',
  title: 'Info Button',
  ghost: true,
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  title: 'Success Button',
};

export const SuccessGhost = Template.bind({});
SuccessGhost.args = {
  type: 'success',
  title: 'Success Button',
  ghost: true,
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  title: 'Warning Button',
};

export const WarningGhost = Template.bind({});
WarningGhost.args = {
  type: 'warning',
  title: 'Warning Button',
  ghost: true,
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  title: 'Danger Button',
};

export const DangerGhost = Template.bind({});
DangerGhost.args = {
  type: 'danger',
  title: 'Danger Button',
  ghost: true,
};

export const Light = Template.bind({});
Light.args = {
  type: 'light',
  title: 'Light Button',
};

export const LightGhost = Template.bind({});
LightGhost.args = {
  type: 'light',
  title: 'Light Button',
  ghost: true,
};

export const Dark = Template.bind({});
Dark.args = {
  type: 'dark',
  title: 'Dark Button',
};

export const DarkGhost = Template.bind({});
DarkGhost.args = {
  type: 'dark',
  title: 'Dark Button',
  ghost: true,
};

export const Dashed = Template.bind({});
Dashed.args = {
  type: 'dashed',
  title: 'Dashed Button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  title: 'Link Button',
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  title: 'Text Button',
};
