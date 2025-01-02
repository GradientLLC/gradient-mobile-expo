import { windowWidth } from "../helpers/Constants";


const Fonts = {
    Thin: 'Inter-Thin',
    ExtraLight: 'Inter-ExtraLight',
    Light: 'Inter-Light',
    Regular: 'Inter-Regular',
    Medium: 'Inter-Medium',
    SemiBold: 'Inter-SemiBold',
    Bold: 'Inter-Bold',
    ExtraBold: 'Inter-ExtraBold',
    GrotesqueThin: 'DarkerGrotesque-Thin',
    GrotesqueExtraLight: 'DarkerGrotesque-ExtraLight',
    GrotesqueLight: 'DarkerGrotesque-Light',
    GrotesqueRegular: 'DarkerGrotesque-Regular',
    GrotesqueMedium: 'DarkerGrotesque-Medium',
    GrotesqueSemiBold: 'DarkerGrotesque-SemiBold',
    GrotesqueBold: 'DarkerGrotesque-Bold',
    GrotesqueExtraBold: 'DarkerGrotesque-ExtraBold',

}

const FontSize = {
    xsmall: (windowWidth * 2.67) / 100,  //----10
    small: (windowWidth * 3.2) / 100,  //----12
    medium: (windowWidth * 3.7) / 100,  //----14
    large: (windowWidth * 3.9) / 100,  //----14
    xlarge: (windowWidth * 4.2) / 100,  //----16
    xxlarge: (windowWidth * 4.7) / 100,  //----18
    xxxlarge: (windowWidth * 5) / 100,  //----20
    xxxxLarge: (windowWidth * 7) / 100,
}

type FontKeys = keyof typeof Fonts;
type FontSizeKeys = keyof typeof FontSize;

export const getFontSize = (sizeKey: FontSizeKeys) => FontSize[sizeKey];
export const getFontStyle = (fontKey: FontKeys) => Fonts[fontKey];

const useFonts = () => {
    return { Fonts, FontSize };
}


export default useFonts;