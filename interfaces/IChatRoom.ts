import moment from "moment"
import { DEFAULT_USER, IUser } from "./IUser"

interface MyData {
    ID: string | undefined,
    Name: string | undefined,
    Image: string | undefined,
    IsTyping: Boolean,
    FCM?: string | undefined,
    Unread: number,
}

interface OpponentUserData {
    ID: string | undefined,
    Name: string | undefined,
    Image: string | undefined,
    IsTyping: Boolean,
    FCM?: string | undefined,
    Unread: number,
}

export interface IMessage {
    Milliseconds: number,
    SenderID: string | undefined,
    ReceiverID?: string,
    SenderName?: string,
    ReceiverName?: string,
    isRead: Boolean,
    SYSTEM: Boolean,
    NumChars: number,
    Shown: Boolean,
    DateTime: Date,
    Body: string,
    ImagePaths: Array<string>,
    DocPaths: Array<string>,
    isMine: boolean,
    MediaType?: string,
    Thumbnail?: string,
    userData?: IUser
}

export const DEFAULT_MESSAGE = {
    Milliseconds: moment().valueOf(),
    SenderID: '',
    ReceiverID: '',
    SenderName: '',
    ReceiverName: '',
    isRead: false,
    SYSTEM: false,
    NumChars: 0,
    Shown: false,
    DateTime: new Date(),
    Body: '',
    ImagePaths: [],
    DocPaths: [],
    isMine: false,
    MediaType: '',
    Thumbnail: '',
    userData: DEFAULT_USER
} as IMessage


export type ChatRoomType = 'Personal' | 'Trainer' | 'GymChat' | 'Group'

export interface IMessageRoom {
    Created: Date,
    Expired: Boolean,
    LastOpened: Date,
    ID: string,
    Name?: string,
    LastMessage: IMessage,
    Me?: MyData | null,
    Opponent?: OpponentUserData | null,
    Messages: Array<IMessage>
    Members?: Array<string>
    UserData?: IUser
    BannedUsers?: Array<string>,
    SubChats?: Array<any>
    ChatRoomType?: ChatRoomType,
    ParentRoomId?: string
    profileImage?: string
}


export const DEFAULT_MESSAGE_ROOM = {
    Created: new Date(),
    Expired: false,
    LastOpened: new Date(),
    ID: '',
    LastMessage: DEFAULT_MESSAGE,
    Me: null,
    Opponent: null,
    Messages: [],
    Members: [],
    BannedUsers: [],
    userData: DEFAULT_USER,
    SubChats: [],
    ChatRoomType: 'Personal',
} as IMessageRoom

