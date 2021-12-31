import config from './config/config';
import { ReviewData, CourseData, UserData } from './interfaces';

export const translateToKorean = (value: string) => {
  switch (value) {
    case config.easy:
      return '쉬움';
    case config.normal:
      return '보통';
    case config.hard:
      return '어려움';
    case config.expert:
      return '전문가';
    case config.inflearn:
      return '인프런';
    case config.fastcampus:
      return '패스트캠퍼스';
    default:
      return '자료 없음';
  }
};

type EditReviewData = {
  merit?: ReviewData['merit'];
  demerit?: ReviewData['demerit'];
  likes?: ReviewData['likes'];
};

export const editData = <T extends ReviewData | CourseData>(
  prev_data: T[],
  id: string,
  update_data: EditReviewData | CourseData
) => {
  const newData = prev_data.map((item: T) =>
    item._id === id ? { ...item, ...update_data } : item
  );

  return newData;
};

export const removeReviewLike = (
  prev_data: ReviewData['likes'],
  id: string
) => {
  const removeLikeData = prev_data.filter(item => item._id !== id);

  return removeLikeData;
};

export const updateLikes = (
  prev_data: ReviewData[],
  id: string,
  update_data: { likes: UserData }
) => {
  const newData = prev_data.map((item: ReviewData) =>
    item._id === id
      ? { ...item, likes: [...item.likes, update_data.likes] }
      : item
  );
  return newData;
};

export const deleteLikes = (
  prev_data: ReviewData[],
  reviewId: string,
  reviewLikesArr: ReviewData['likes'],
  authId: UserData
) => {
  const newLikesArr = reviewLikesArr.filter(like => like._id !== authId._id);
  const newData = prev_data.map((item: ReviewData) =>
    item._id === reviewId
      ? {
          ...item,
          likes: [...newLikesArr] || item.likes,
        }
      : item
  );
  return newData;
};

export const deleteData = (data: ReviewData[], id: string) => {
  const newData = data.filter((item: ReviewData) => item._id !== id);
  return newData;
};
