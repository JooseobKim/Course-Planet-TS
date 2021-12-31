import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { ReviewModal } from '.';
// eslint-disable-next-line prettier/prettier
import { DisplayFlexAtom, TextAtom, LabelAtom, SelectAtom } from '../atoms'
import { CourseDetailMenuProps } from './interfaces';
import { StyledCourseDetailMenu } from './styles';
import configStyle from '../../../utils/config/config.style';

const optionValue = [
  { value: 'recent', text: '최신순' },
  { value: 'oldest', text: '오래된순' },
  { value: 'likes', text: '좋아요순' },
];

const CourseDetailMenu = (props: CourseDetailMenuProps) => {
  // eslint-disable-next-line prettier/prettier
  const { myReview, disableCreateReview, handleSelectChange, cssStyle } = props;
  const { token } = useSelector((state: RootState) => ({
    token: state.auth.token,
  }));

  const menuButtonTxt = !token
    ? '* 리뷰는 로그인 후 작성하실 수 있습니다.'
    : myReview
    ? '* 리뷰를 이미 작성하였습니다.'
    : '';

  return (
    <StyledCourseDetailMenu cssStyle={cssStyle}>
      <DisplayFlexAtom cssStyle={{ alignItems: 'center' }}>
        <ReviewModal disabledBtn={disableCreateReview} />
        <TextAtom
          tag="span"
          text={menuButtonTxt}
          cssStyle={{ fontSize: '15px', marginLeft: '5px' }}
        />
      </DisplayFlexAtom>
      <LabelAtom htmlFor="select_order">
        <TextAtom tag="span" text="정렬기준" cssStyle={{ fontSize: '14px' }} />
        <SelectAtom
          id="select_order"
          optionValue={optionValue}
          onChange={handleSelectChange}
          cssStyle={{
            marginLeft: '5px',
            border: `1px solid ${configStyle.mainDarkColor}`,
          }}
        />
      </LabelAtom>
    </StyledCourseDetailMenu>
  );
};

export default CourseDetailMenu;
