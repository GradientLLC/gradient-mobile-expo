
export interface IGallery {
    path?: string,
    tempPath?: string,
    name: string | null,
    type: string | null,
    uri: string | null,
    thumbnail: string | null,
}


export const DEFAULT_GALLERY = {
    path: '',
    tempPath: '',
    name: '',
    type: '',
    uri: '',
    thumbnail: '',
} as IGallery;
