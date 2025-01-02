

import { DEFAULT_GALLERY } from "../../interfaces/IGallery";
import { ActionType } from "../../types/Action";
import { RGalleryState } from "../../types/RGalleryState";
import { ReduxActionKeys } from "../Types";

const initialState: RGalleryState = {
    gallery: [],
    selectedMedia: DEFAULT_GALLERY
};

export const GalleryReducer = (state = initialState, action: ActionType): RGalleryState => {
    switch (action.type) {
        case ReduxActionKeys.Media_Library:
            return {
                ...state,
                gallery: action.payload,
            };
        case ReduxActionKeys.Selected_Media:
            return {
                ...state,
                selectedMedia: action.payload,
            };
        default:
            return state;
    }
}



