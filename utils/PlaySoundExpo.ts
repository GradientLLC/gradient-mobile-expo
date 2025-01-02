// if we ever switch to expo again you can use this :() <><

import { Audio } from "expo-av";

const enableAudio = async () => {
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
    });
};
const playSound = async (soundType: string) => {
    const soundPath = soundType === 'type' ? require('../../Assets/sounds/pop_1.mp3') : require('../../Assets/sounds/bloop_1.mp3');
    const { sound } = await Audio.Sound.createAsync(soundPath);
    await sound.playAsync();
}