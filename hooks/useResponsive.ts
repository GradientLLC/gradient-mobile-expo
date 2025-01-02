import {useCallback, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import useOrientation from './useOrientation';
const {width, height} = Dimensions.get('window');


const useResponsive = () => {
  const [standardWidth, setStandardWidth] = useState<number>(375);
  const [standardHeight, setStandardHeight] = useState<number>(812);
  const [shouldUseForBiggerSizes, setShouldUseForBiggerSizes] =
    useState<boolean>(true);

  const {orientation, changedWindow} = useOrientation()

  const K = useMemo(() => changedWindow?.width / standardWidth, [changedWindow?.width, standardWidth]);
  const KH = useMemo(() => height / standardHeight, [height, standardHeight]);

  const dynamicSize = useCallback(
    (size: number) => {
      return size * KH;
    },
    [K, orientation],
  );

  const getFontSize = useCallback(
    (size: number) => {
      if (shouldUseForBiggerSizes || changedWindow?.width < standardWidth) {
        return dynamicSize(size);
      }
      return size;
    },
    [shouldUseForBiggerSizes, changedWindow?.width, standardWidth, dynamicSize],
  );

  const getWidth = useCallback(
    (percentage: number) => {
      return width * percentage;
    },
    [width],
  );

  return {
    windowWidth: width,
    windowHeight: height,
    uiWidth: standardWidth,
    uiHeight: standardHeight,
    shouldUseForBiggerSizes,
    dynamicSize,
    getFontSize,
    getWidth,
    changedWindow: changedWindow,
    orientation
  };
};

export default useResponsive;
