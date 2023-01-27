declare type TypeReview = {
  id: string;
  contents: string;
  createdAt: string | number;
  userNickName: string;
  date: string | number;
  userId: string;
  photoUrl: string | undefined;
  isEdit: boolean;
};

export default TypeReview;
