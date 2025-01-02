import { StyleSheet, Platform } from 'react-native';
import useColors from './useColors';
import useResponsive from './useResponsive';
import { windowWidth } from '../helpers/Constants';
import useFonts from './useFonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

const useStyles = () => {
  const insets = useSafeAreaInsets()
  const { colors } = useColors();
  const { dynamicSize, getFontSize, changedWindow } = useResponsive();
  const { FontSize, Fonts } = useFonts()

  const simpleStyles = useMemo(() => {
    return StyleSheet.create({

      Splash: {
        flex: 1,
        backgroundColor: colors.Background,
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainContainer: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: colors.White
      },
      Input: {
        borderTopLeftRadius: windowWidth / 80,
        borderTopRightRadius: windowWidth / 80,
        borderBottomLeftRadius: windowWidth / 80,
        borderBottomRightRadius: windowWidth / 80,
        borderWidth: 0.8,
        borderColor: colors.Border,
        paddingHorizontal: '2%',
        backgroundColor: colors.InputBack2,
        width: '100%',
        height: windowWidth / 8,
        marginVertical: windowWidth / 55,
        flexDirection: 'row',
        alignItems: 'center',
      },
      LoginLogo: {
        alignSelf: 'center',
        marginBottom: windowWidth / 8
      },
      Back: {
        position: 'absolute',
        top: Platform.OS == 'android' ? (insets.top + windowWidth / 10) : insets.top,
        left: 10,
        height: windowWidth / 10,
        width: windowWidth / 10,
        borderRadius: windowWidth / 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      },
      ActionButton: {
        borderRadius: windowWidth / 5,
        backgroundColor: colors.Primary,
        width: '100%',
        height: windowWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      ActionButtonSecondary: {
        borderRadius: windowWidth / 5,
        backgroundColor: colors.Black,
        color: colors.White,
        width: '100%',
        height: windowWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      forgotText: {
        fontSize: FontSize.small,
        fontFamily: Fonts.Medium,
        color: colors.Link,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end'
      },
      emptyList: {
        fontSize: FontSize.small,
        fontFamily: Fonts.Light,
        color: colors.DarkGrey,
        paddingHorizontal: '10%',
        textAlign: 'center'
      },
      btnTitle: {
        fontSize: FontSize.medium,
        fontFamily: Fonts.Medium,
        color: colors.White,
      },
      otherOption: {
        height: windowWidth / 10,
        width: '100%',
        justifyContent: 'center',
        marginBottom: windowWidth / 10

      },
      horizontalLine: {
        width: '100%',
        height: 0.75,
        backgroundColor: colors.DarkGrey
      },
      otherOptionText: {
        fontSize: FontSize.medium,
        fontFamily: Fonts.Light,
        color: colors.DarkGrey,
      },
      social: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      commonAuthText: {
        fontSize: FontSize.small,
      },
      onBoardContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: '5%'

      },
      contentProfile: {
        height: windowWidth / 10,
        width: windowWidth / 10,
        borderRadius: windowWidth / 10,
        backgroundColor: '#dcdcde',
      },
      contentName: {
        fontSize: FontSize.medium,
        fontFamily: Fonts.Medium,
        color: colors.Black
      },
      contentUserName: {
        fontSize: FontSize.xsmall,
        fontFamily: Fonts.Regular,
        color: colors.DarkGrey,
        marginLeft: '2.5%',
        marginTop: '1%'
      },
      places: {
        fontSize: FontSize.medium,
        fontFamily: Fonts.Regular,
        color: colors.Primary
      },
      about: {
        fontSize: FontSize.small,
        fontFamily: Fonts.Light,
        color: '#484848',
        marginTop: windowWidth / 30,
      },
      contentAddedTime: {
        fontSize: FontSize.xsmall,
        fontFamily: Fonts.Regular,
        color: colors.DarkGrey,
        marginTop: 3,
        marginLeft: '2.5%'
      },
      buttonBasic: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: colors.Primary,
      },
      buttonFont: {
        fontSize: FontSize.large,
        color: colors.White
      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    })
  }, [])


  const styles = { ...simpleStyles }

  return { styles, insets };
};

export default useStyles;
