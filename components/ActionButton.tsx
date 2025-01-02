import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import useStyles from '../hooks/useStyles';
import useColors from '../hooks/useColors';

//const { colors } = useColors();

//export type ColorKeys = keyof typeof colors;

interface ActionButtonProps {
    title: any;
    onPress: any;
    style?: any;
    titleStyle?: any;
    loading?: boolean;
    buttonColor?: string; // This can be any color
    styleOption?: 'primary' | 'secondary'; // Specific style options
}

const ActionButton = React.memo(({
    title,
    onPress,
    style,
    titleStyle,
    loading,
    buttonColor, // New prop for dynamic color
    styleOption = 'primary'
}: ActionButtonProps) => {
    const { styles } = useStyles();
    const { colors } = useColors();
    //const { colors } = useColors();

    // Determine button style based on styleOption
    const buttonStyle = styleOption === 'primary' 
        ? styles.ActionButton 
        : styles.ActionButtonSecondary;

    return (
        <TouchableOpacity
            disabled={loading}
            activeOpacity={0.6}
            onPress={onPress}
            style={[buttonStyle, style, { backgroundColor: buttonColor || buttonStyle.backgroundColor }]} // Apply custom color if provided
        >
            {loading ? (
                <ActivityIndicator size={'small'} color={colors.White} />
            ) : (
                <Text allowFontScaling={false} style={[styles.btnTitle, titleStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
});

export default ActionButton;