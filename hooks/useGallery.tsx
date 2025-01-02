// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
// import {useCallback, useState} from 'react';
// import RNFS from 'react-native-fs';

// import moment from 'moment';
// import {useDispatch, useSelector} from 'react-redux';
// import {DEFAULT_GALLERY, IGallery} from '../interfaces/IGallery';
// import {MediaLibrary} from '../redux/Actions';
// import {RState} from '../types/RState';

// interface GalleryOptions {
//   pageSize: number;
//   // supportedMimeTypesByTheBackEnd?: Array<string>;
// }

// interface GalleryLogic {
//   media?: IGallery[];
//   loadNextPagePictures: () => void;
//   isLoading: boolean;
//   isLoadingNextPage: boolean;
//   isReloading: boolean;
//   hasNextPage: boolean;
// }

// const supportedMimeTypesByTheBackEnd = [
//   'image/jpeg',
//   'image/png',
//   'image/heif',
//   'image/heic',
//   'image/heif-sequence',
//   'image/heic-sequence',
//   'mp4',
//   'mov',
//   'MPEG-4',
//   'M4V',
// ];

// const useGallery = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isReloading, setIsReloading] = useState(false);
//   const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [nextCursor, setNextCursor] = useState<string>();

//   const dispatch = useDispatch();
//   const {gallery} = useSelector(({gallery}: RState) => gallery);

//   const convertPHUriToFilePath = async (
//     mediaUri: string,
//     mediaType: string | null,
//   ) => {
//     const cacheDirectory = RNFS.CachesDirectoryPath;
//     const videoFileName = moment().format('x');

//     // RNFS.unlink(cacheDirectory)
//     //     .then(() => {
//     //         console.log('Cache cleared successfully.');
//     //     })
//     //     .catch((error) => {
//     //         console.error('Error clearing cache:', error);
//     //     });
//     try {
//       await RNFS.copyFile(mediaUri, `${cacheDirectory}/${videoFileName}`);

//       const cachedVideoPath = `${cacheDirectory}/${videoFileName}`;

//       return cachedVideoPath;
//     } catch (error) {
//       console.error('Error copying video to cache:', error);
//     }

//     // try {
//     //     if (Platform.OS === 'ios') {
//     //         // const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.${extension}`;
//     //         // photoPATH = encodeURI(photoPATH);

//     //         // await RNFS.copyAssetsFileIOS(photoPATH, dest, 500, 500, 1.0, 1.0, 'contain');
//     //         // return dest;

//     //         const destination = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.mp4`;
//     //         try {
//     //             let absolutePath = await RNFS.copyAssetsFileIOS(mediaUri, destination, 0, 0);

//     //             return absolutePath

//     //         } catch (error) {
//     //             console.log(error)
//     //         }

//     //     } else {
//     //         // Handle non-iOS platforms if needed
//     //         return null;
//     //     }
//     // } catch (error) {
//     //     console.error('Error converting PH URI to file path:', error);
//     //     return null;
//     // }
//   };

//   const getMedia = useCallback(async (page: number) => {
//     try {
//       nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
//       // (gallery?.length == 0) && setIsLoading(true);
//       const {edges, page_info} = await CameraRoll.getPhotos({
//         first: 500,
//         // after: nextCursor,
//         assetType: 'All',
//         // mimeTypes: supportedMimeTypesByTheBackEnd,
//         // include: Platform.OS == 'android' ? ['fileSize', 'filename'] : []
//       });

//       const promises = edges.map(async item => {
//         const mediaUri = item.node.image.uri;
//         // const assetURI = `assets-library://asset/asset.mp4?id=${mediaUri.slice(5, 41)}&ext=mp4`;

//         // const realPath = await CameraRoll.iosGetImageDataById(mediaUri);
//         // const thumbnail = item.node.type.includes('image') ? '' : await mediaprovider.createVideoThumbnail(realPath.node.image.filepath)

//         const data = {
//           path: mediaUri,
//           tempPath: '',
//           name: item.node.image.filename,
//           type: item.node.type,
//           uri: '',
//           thumbnail: '',
//         } as IGallery;
//         return data;
//       });

//       const AllMedia = await Promise.all(promises);
//       dispatch(MediaLibrary([DEFAULT_GALLERY, ...AllMedia]));

//       setNextCursor(page_info.end_cursor);
//       setHasNextPage(page_info.has_next_page);
//     } catch (error) {
//       console.error('useGallery getPhotos error:', error);
//     } finally {
//       setIsLoading(false);
//       setIsLoadingNextPage(false);
//     }
//   }, []);

//   // useEffect(() => {

//   //     if (!media) {
//   //         getMedia();
//   //     }
//   // }, [getMedia, media]);

//   return {
//     getMedia,
//     isLoading,
//     isLoadingNextPage,
//     // isReloading,
//     hasNextPage,
//     convertPHUriToFilePath,
//   };
// };

// export default useGallery;
