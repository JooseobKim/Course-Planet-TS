import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, FormAtom, LabelAtom, SelectAtom, TextareaAtom, TextAtom } from '../atoms';
import { ModalForm, Rating } from '../molecules';
import { ReviewModalTempProps } from './interfaces';
import { defaultModalTextareaStyle } from './styles';
import config from '../../../utils/config/config';
import configStyle from '../../../utils/config/config.style';

const optionValue = [
  { value: config.easy, text: '쉬움' },
  { value: config.normal, text: '보통' },
  { value: config.hard, text: '어려움' },
  { value: config.expert, text: '전문가' },
];

const ReviewModalTemp = (props: ReviewModalTempProps) => {
  const { id }: { id: string } = useParams();
  const { disabledBtn, togglerId, cssStyle } = props;
  const { myReview, detailCourse, auth } = useSelector(
    (state: RootState) => ({
      myReview: state.review.detail_course_reviews.find(item => {
        if (item.owner?._id === state.auth.user?._id) return item;
      }),
      detailCourse: state.course.get_course.find(item => {
        if (item._id === id) return item;
      }),
      auth: state.auth,
    }),
    shallowEqual
  );

  const initState = {
    difficulty: config.easy,
    merit: '',
    demerit: '',
    rating: 3,
  };
  const [reviewContent, setReviewContent] = useState(initState);
  const dispatch = useDispatch();
  const { difficulty, merit, demerit, rating } = reviewContent;

  // eslint-disable-next-line prettier/prettier
  const { updateReview, createReview } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const initState = {
      difficulty: myReview ? myReview.difficulty : config.easy,
      merit: myReview ? myReview.merit : '',
      demerit: myReview ? myReview.demerit : '',
      rating: myReview ? myReview.rating : 3,
    };
    setReviewContent(initState);
  }, [myReview]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (myReview && (name === 'difficulty' || name === 'rating')) return;

    setReviewContent({ ...reviewContent, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!detailCourse || !auth.user) return;

    if (myReview) {
      // eslint-disable-next-line prettier/prettier
      updateReview({ merit, demerit, detailCourse, auth, reviewId: myReview._id });
    } else {
      // eslint-disable-next-line prettier/prettier
      createReview({ difficulty, merit, demerit, rating, userId: auth.user._id, courseId: id, detailCourse, auth });
    }
  };

  return (
    <ModalForm
      togglerId={togglerId || 'reviewToggler'}
      modalWidth="500px"
      modalHeight="530px"
      btnText={myReview ? '리뷰 수정하기' : '리뷰 작성하기'}
      btnStyle={{ boxShadow: configStyle.boxShadow, minWidth: '125px' }}
      disabledBtn={disabledBtn}
      cssStyle={cssStyle}
    >
      {auth.token && (
        <DisplayFlexAtom
          displayColumn={true}
          cssStyle={{ width: '80%', justifyContent: 'center' }}
        >
          <TextAtom
            tag="h2"
            text={myReview ? '리뷰 수정하기' : '리뷰 작성하기'}
            cssStyle={{
              fontSize: '18px',
              fontWeight: 500,
              textAlign: 'center',
              marginBottom: '15px',
            }}
          />
          <FormAtom displayColumn={true} onSubmit={handleOnSubmit}>
            <DisplayFlexAtom
              cssStyle={{
                justifyContent: 'space-between',
                marginBottom: '7px',
              }}
            >
              <DisplayFlexAtom cssStyle={{ alignItems: 'center' }}>
                <TextAtom
                  tag="span"
                  text="평점"
                  cssStyle={{ marginRight: '5px' }}
                />
                <Rating
                  myRating={rating}
                  data={reviewContent}
                  setData={setReviewContent}
                  readOnly={Boolean(myReview?.rating)}
                />
              </DisplayFlexAtom>
              <DisplayFlexAtom cssStyle={{ alignItems: 'center' }}>
                <LabelAtom htmlFor="difficulty">
                  <TextAtom tag="span" text="강의 난이도" />
                </LabelAtom>
                <SelectAtom
                  id="difficulty"
                  name="difficulty"
                  value={difficulty}
                  onChange={handleOnChange}
                  optionValue={optionValue}
                  optionProps={{ disabled: myReview ? true : false }}
                  cssStyle={{
                    marginLeft: '3px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                />
              </DisplayFlexAtom>
            </DisplayFlexAtom>
            <DisplayFlexAtom displayColumn={true}>
              <DisplayFlexAtom displayColumn={true}>
                <TextAtom
                  tag="span"
                  text={`장점 ${merit.length} / 500`}
                  cssStyle={{ color: configStyle.blue, marginBottom: '10px' }}
                />
                <TextareaAtom
                  name="merit"
                  value={merit}
                  onChange={handleOnChange}
                  cols={70}
                  rows={6}
                  maxLength={500}
                  minLength={30}
                  placeholder="장점을 최소 30 글자 이상 500 글자 이하로 입력해주세요."
                  cssStyle={{
                    ...defaultModalTextareaStyle,
                    opacity: merit && 1,
                  }}
                />
              </DisplayFlexAtom>
              <DisplayFlexAtom displayColumn={true}>
                <TextAtom
                  tag="span"
                  text={`단점 ${demerit.length} / 500`}
                  cssStyle={{ color: configStyle.red, marginBottom: '10px' }}
                />
                <TextareaAtom
                  name="demerit"
                  value={demerit}
                  onChange={handleOnChange}
                  cols={70}
                  rows={6}
                  maxLength={500}
                  minLength={30}
                  placeholder="단점을 최소 30 글자 이상 500 글자 이하로 입력해주세요."
                  cssStyle={{
                    ...defaultModalTextareaStyle,
                    opacity: demerit && 1,
                  }}
                />
              </DisplayFlexAtom>
            </DisplayFlexAtom>
            <ButtonAtom
              type="submit"
              disabled={merit.length < 30 || demerit.length < 30 ? true : false}
              cssStyle={{
                backgroundColor: configStyle.mainDarkColor,
                color: configStyle.white,
              }}
            >
              {myReview ? (
                <TextAtom tag="span" text="리뷰 수정하기" />
              ) : (
                <TextAtom tag="span" text="리뷰 작성하기" />
              )}
            </ButtonAtom>
          </FormAtom>
        </DisplayFlexAtom>
      )}
    </ModalForm>
  );
};

export default ReviewModalTemp;
