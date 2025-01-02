import { DEFAULT_MESSAGE, DEFAULT_MESSAGE_ROOM, IMessage, IMessageRoom } from "../../interfaces/IChatRoom"

type MessageType = {
    Milliseconds: Number,
    SenderID: String,
    ReceiverID: String,
    SenderName: String,
    ReceiverName: String,
    isRead: Boolean,
    SYSTEM: Boolean,
    NumChars: Number,
    Shown: Boolean,
    DateTime: Date,
    Body: String,
    ImagePaths: Array<String>,
    DocPaths: Array<String>,
}

export class Message {
    MessageDetails: IMessage

    constructor(Message: IMessage) {
        if (Message) this.MessageDetails = Message
        else this.MessageDetails = DEFAULT_MESSAGE
    }
}

export class MessageRoom {
    MessageRoomDetails: IMessageRoom

    constructor(MessageRoomResponse: IMessageRoom) {
        if (MessageRoomResponse) this.MessageRoomDetails = MessageRoomResponse
        else this.MessageRoomDetails = DEFAULT_MESSAGE_ROOM
    }
}
