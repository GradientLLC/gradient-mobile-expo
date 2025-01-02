import { useCallback } from 'react';
import { useColorScheme } from 'react-native';

const colors = {
  Primary: '#61B0ED',
  AccentPrimary: '#5266eb',
  LightBlue: '#E3F2FB',
  DarkBlue: '#4398D8',
  Secondary: '#333333',
  White: '#FFFFFF',
  OffWhite: '#F2F2F7',
  LightBlack: '#262626',
  Black: '#000000',
  Grey: '#EEEEEE',
  TextGrey: '#8E8E93',
  LightGrey: '#b0b0b0',
  LightGreyOne: '#F4F6FA',
  DarkGrey: '#67778E',
  DarkGreyOne: '#818181',
  MediumGrey: '#dcdcde',
  Highlight: '#E2E7EE82',
  Background: '#DAFDFF',
  Border: '#CAD6EA',
  InputBack: "#EEF4FD",
  LightWhite: '#F2F2F2',
  Red: '#DD4747',
  Disable: '#9e9e9e',
  Green: '#30D240',
  SlateBlue: '#4f46e5',
  Gradient: 'linear-gradient(270deg, #60A5FA 0%, #5D44C8 100%)',
  Link:  '#60A5FA',
  InputBack2: '#F3F3F3',
  IcyBack: '#f2fafc'
};

export type ColorKeys = keyof typeof colors;
export type ColorTypes = typeof colors; 

export const getColor = (colorKey: ColorKeys) => colors[colorKey];

const useColors = () => {
  const scheme = useColorScheme();

  const getDynamicColor = useCallback(
  (lightColor: string, darkColor?: string) => {
      return scheme === 'light' ? lightColor : darkColor || lightColor;
    },
    [scheme],
  );

  const colorValues: ColorTypes = {
    ...colors,
    Grey: getDynamicColor(colors.Grey),
    DarkGrey: getDynamicColor(colors.DarkGrey),
    MediumGrey: getDynamicColor(colors.MediumGrey),
    Gradient: colors.Gradient,
  };

  return { scheme, colors: colorValues };
};

export default useColors;
