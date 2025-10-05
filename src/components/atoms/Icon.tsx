/*
 * Created by Asad on 04 OCT 2025
 */

import React from 'react';
import { Image, ImageSourcePropType, ImageProps } from 'react-native';

export const Icon: React.FC<{ source: ImageSourcePropType } & ImageProps> = ({ source, ...rest }) => {
  return <Image source={source} {...rest} />;
};
