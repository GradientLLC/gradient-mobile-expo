import { IGallery } from "../interfaces/IGallery";

export type RGalleryState = {
    gallery: [] | Array<IGallery>,
    selectedMedia: IGallery,
}