export interface IEvent {
    id: string;
    name: string;
    location: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    attendees: {
        [userId: string]: {
            name: any;
            status: 'going' | 'maybe' | 'notGoing';
            timestamp: Date;
        }
    };
    maxAttendees?: number;
    roomId: string; // Reference to the group chat room
    createdAt: Date;
    updatedAt: Date;
}

export interface IEventFormData {
    name: string;
    location: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    maxAttendees?: number;
}