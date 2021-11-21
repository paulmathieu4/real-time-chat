export interface Channel {
  _id: string;
  geoReferenceId: number;
  orderId: number;
  userId: string;
}

export interface Comment {
  channelId: string;
  text: string;
  userId: string;
  date: Date;
}
