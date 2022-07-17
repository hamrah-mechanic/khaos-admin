import React, { useState } from 'react';
import { Modal, ModalProps, Select, Tabs, TabsProps } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

//STYLES
import './tabsSelect.scss';

//TYPES
interface TabOptionsType {
  key: number;
  title: string;
  name: string;
  options: OptionType[];
  placeholder?: string;
  searchable?: boolean;
  icon?: React.ReactNode;
}

interface OptionType {
  label: string;
  value: number;
  englishLabel?: string;
}

export interface TabsSelectProps extends ModalProps, TabsProps {
  open: boolean;
  onClose: () => void;
  title: string;
  tabsOptions: TabOptionsType[];
  handleSelectedOption: (name: string, value: number, label: string) => void;
}

const TabsSelect: React.FC<TabsSelectProps> = ({
  open = false,
  onClose,
  title,
  tabsOptions,
  handleSelectedOption,
  ...props
}) => {
  const [formStep, setFormStep] = useState('1');
  return (
    <Modal title={title} visible={open} onCancel={onClose} {...props}>
      <Tabs {...props} activeKey={formStep} onChange={index => (formStep > index ? setFormStep(index) : null)}>
        {tabsOptions.map(tab => (
          <TabPane tab={tab.title} key={tab.key}>
            <Select
              options={tab.options}
              showSearch={tab.searchable}
              suffixIcon={tab.icon}
              optionFilterProp="children"
              filterOption={(input, option: OptionType) =>
                option.englishLabel?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder={tab.placeholder || tab.title}
              onSelect={(value, option: OptionType) => {
                handleSelectedOption?.(tab.name, value, option.label);
                const newStep = (Number(formStep) + 1).toString();
                if (Number(newStep) <= tabsOptions.length) {
                  setFormStep(newStep);
                } else {
                  onClose();
                }
              }}
            >
              {tab.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default TabsSelect;
