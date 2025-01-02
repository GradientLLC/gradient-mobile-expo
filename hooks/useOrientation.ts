import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>();
  const [changedWindow, setChangedWindow] = useState<{
    height: number;
    width: number;
    fontScale: number;
    scale: number;
  }>(Dimensions.get('window'));

  useEffect(() => {
    let listener = Dimensions.addEventListener('change', handler => {
      setOrientation(
        handler.screen.width > handler.screen.height ? 'landscape' : 'portrait',
      );
      setChangedWindow(handler.window);
    });
    return () => {
      listener.remove();
    };
  }, []);

  return {orientation, changedWindow};
};

export default useOrientation;
