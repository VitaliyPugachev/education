import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SelectCountry } from 'entities/Country';

export default {
    title: 'entities/CurrencySelect',
    component: SelectCountry,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof SelectCountry>;

const Template: ComponentStory<typeof SelectCountry> = (args) => <SelectCountry {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
