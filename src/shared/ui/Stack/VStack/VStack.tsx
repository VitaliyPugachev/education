import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = memo((props: VStackProps) => {
    return (
        <Flex direction="column" {...props} />
    );
});
