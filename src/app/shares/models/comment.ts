
export interface Comment {
  CommentID: string;
  ParentID: number | null;
  CreatedBy: string;
  UserName: string;
  CreatedOn: string;
  Comments: string;
  Attachment: string;
  NewsID: string;
  NumHasReply:number;
  nestedComments?: Comment[];
  visibleComments?: Comment[];
  NumLike:number;
  NumHeart:number;
  NumVuiVe:number;
  NumNgacNhien:number;
  NumBuon:number;
  NumTucGian:number;
  NumRating:number;
  MyRating?:string | null;
  showAllNestedComments?: boolean;
  Level:number
}
