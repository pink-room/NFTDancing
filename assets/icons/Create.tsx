import React from 'react';
import {Svg, Path} from 'react-native-svg';

import {IIconsProps} from './types';

export default (props: IIconsProps): JSX.Element => (
    <Svg viewBox="0 0 24 24" width={props.size ?? 24} height={props.size ?? 24}>
        <Path
            fill={props.color ?? '#000'}
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
        />
    </Svg>
);
