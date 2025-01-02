import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import useStyles from '../hooks/useStyles';
import useColors from '../hooks/useColors';

interface ActionButtonGradientProps {
    title: string;
    onPress: () => void;
    style?: any;
    titleStyle?: any;
    loading?: boolean;
}

const ActionButtonGradient = React.memo(({
    title,
    onPress,
    style,
    titleStyle,
    loading
}: ActionButtonGradientProps) => {
    const { styles } = useStyles();
    const { colors } = useColors();

    const baseButtonStyle = styles.ActionButton;

    return (
        <TouchableOpacity
            disabled={loading}
            activeOpacity={0.6}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#60A5FA', '#5D44C8']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={[
                    baseButtonStyle,
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    },
                    style
                ]}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={colors.White} />
                ) : (
                    <Text allowFontScaling={false} style={[styles.btnTitle, titleStyle]}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
});

export default ActionButtonGradient;