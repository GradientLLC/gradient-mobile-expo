import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from 'react-native-document-picker'
import { createThumbnail } from "react-native-create-thumbnail";

class mediaProvider {
    selectPhoto = async (crop = false, type = 'photo') => {
        return new Promise((resolve, reject) => {
            ImagePicker.openPicker({
                mediaType: 'any',
                width: 1000,
                height: 1000,
                cropping: crop,
                includeBase64: true,
                includeExif: true,
                // compressImageQuality: 0.5,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    selectVideo = async () => {
        return new Promise((resolve, reject) => {
            ImagePicker.openPicker({
                mediaType: "video",
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
        });
    };


    selectAudio = async () => {

        return new Promise(async (resolve, reject) => {
            await DocumentPicker.pick({
                type: [
                    // DocumentPicker.types.pdf,
                    //   DocumentPicker.types.docx,
                    //   DocumentPicker.types.doc,
                    //   DocumentPicker.types.ppt,
                    //   DocumentPicker.types.xls,
                    DocumentPicker.types.audio,
                    //   DocumentPicker.types.images,
                    //   DocumentPicker.types.allFiles,
                    //   DocumentPicker.types.plainText,
                    //   DocumentPicker.types.video,
                ],
                copyTo: "cachesDirectory"
            }).then((res) => {
                resolve(res);
            })
                .catch((error) => {
                    reject(error);
                });
        })

    };

    createVideoThumbnail = async (Url) => {
        try {
            const response = await createThumbnail({
                url: Url,
                timeStamp: 500,
                format: 'png'
            });
            return response;
        } catch (err) {
            console.log({ createVideoThumbnail: err });
        }
    }
}

export const mediaprovider = new mediaProvider();
