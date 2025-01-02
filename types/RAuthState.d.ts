import { IUser } from "../interfaces/IUser"

export type RAuthState = {
    loggedInUserDetails: null | undefined | IUser,
    followers: null | undefined | Array<IUser>,
    following: null | undefined | Array<IUser>,
    shouldRemember: boolean,
}