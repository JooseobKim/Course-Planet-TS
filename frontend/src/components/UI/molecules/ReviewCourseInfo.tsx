import { Link } from 'react-router-dom';
import config from '../../../utils/config/config';
import configStyle from '../../../utils/config/config.style';
import { ImgAtom, TextAtom } from '../atoms';
import { ReviewCourseInfoProps } from './interfaces';
import { StyledReviewCourseInfo } from './styles';

const ReviewCourseInfo = (props: ReviewCourseInfoProps) => {
  const { courseId, cssStyle } = props;

  let image;
  let title;
  let _id;

  if (courseId) {
    image = courseId.image;
    title = courseId.title;
    _id = courseId._id;
  }

  return (
    <StyledReviewCourseInfo cssStyle={cssStyle}>
      <ImgAtom
        src={image || config.noImage}
        cssStyle={{ width: '100px', marginBottom: '10px' }}
      />
      <Link
        to={`/course/${_id}`}
        style={{ color: configStyle.black, textAlign: 'center' }}
      >
        <TextAtom tag="span" text={title || '정보 없음'} />
      </Link>
    </StyledReviewCourseInfo>
  );
};

export default ReviewCourseInfo;
