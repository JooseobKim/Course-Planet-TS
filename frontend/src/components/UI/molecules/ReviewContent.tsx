import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { ReviewContentProps } from './interfaces';
import { Dropdown } from '.';
import { ButtonAtom, TextAtom } from '../atoms';
// eslint-disable-next-line prettier/prettier
import { dropdownPositioin, dropdownReviewContentTxtStyle, StyledReviewContent } from './styles';
import configStyle from '../../../utils/config/config.style';
import { BsThreeDots } from 'react-icons/bs';

const ReviewContent = (props: ReviewContentProps) => {
  const { contentInfo, review, cssStyle } = props;
  const { auth } = useSelector(
    (state: RootState) => ({
      auth: state.auth,
    }),
    shallowEqual
  );
  const { merit, demerit } = contentInfo;

  const dispatch = useDispatch();

  const { deleteReview } = bindActionCreators(actionCreators, dispatch);

  const deleteMyReview = () => {
    if (review && window.confirm('리뷰를 삭제하시겠습니까?'))
      deleteReview({
        detailCourse: review.courseId,
        auth,
        reviewId: review?._id,
      });
  };

  const myReviewMenu = [
    <ButtonAtom onClick={deleteMyReview} cssStyle={{ padding: 0 }}>
      <TextAtom
        tag="span"
        text="리뷰 삭제"
        cssStyle={dropdownReviewContentTxtStyle}
      />
    </ButtonAtom>,
  ];

  const notMyReviewMenu = [
    <ButtonAtom cssStyle={{ padding: 0 }} onClick={() => window.alert('신고')}>
      <TextAtom
        tag="span"
        text="신고하기"
        cssStyle={{ ...dropdownReviewContentTxtStyle, cursor: 'pointer' }}
      />
    </ButtonAtom>,
  ];

  return (
    <StyledReviewContent cssStyle={cssStyle}>
      <TextAtom
        tag="span"
        text="장점"
        cssStyle={{ color: configStyle.blue, fontWeight: 500 }}
      />
      <TextAtom
        tag="p"
        text={merit}
        cssStyle={{ margin: '5px 0', lineHeight: 1.1, wordBreak: 'break-all' }}
      />
      <TextAtom
        tag="span"
        text="단점"
        cssStyle={{
          color: configStyle.red,
          fontWeight: 500,
          margin: '5px 0',
        }}
      />
      <TextAtom
        tag="p"
        text={demerit}
        cssStyle={{ lineHeight: 1.1, wordBreak: 'break-all' }}
      />
      {review?.owner ? (
        review?.owner?._id === auth.user?._id ? (
          <Dropdown
            dropdownIcon={<BsThreeDots />}
            submenuList={myReviewMenu}
            cssStyle={dropdownPositioin}
          />
        ) : (
          <Dropdown
            dropdownIcon={<BsThreeDots />}
            submenuList={notMyReviewMenu}
            cssStyle={dropdownPositioin}
          />
        )
      ) : (
        <Dropdown
          dropdownIcon={<BsThreeDots />}
          submenuList={notMyReviewMenu}
          cssStyle={dropdownPositioin}
        />
      )}
    </StyledReviewContent>
  );
};

export default ReviewContent;
