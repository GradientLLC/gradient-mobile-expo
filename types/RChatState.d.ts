import { IMessageRoom } from "../interfaces/IChatRoom"

export type RChatState = {
    rooms: null | Array<IMessageRoom>,
    gymRooms: null | Array<IMessageRoom>,
    roomId:  string | undefined
}