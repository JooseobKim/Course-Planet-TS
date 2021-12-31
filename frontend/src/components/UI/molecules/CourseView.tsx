import { TextAtom } from '../atoms';
import { CourseSwiper } from '.';
import { StyledCourseView } from './styles';
import { CourseViewProps } from './interfaces';

const CourseView = (props: CourseViewProps) => {
  const { text, courseList, cssStyle } = props;

  return (
    <StyledCourseView cssStyle={cssStyle}>
      <TextAtom
        tag="p"
        text={text}
        cssStyle={{
          margin: '30px 0',
          textAlign: 'center',
          fontWeight: 500,
        }}
      />
      <CourseSwiper courses={courseList} />
    </StyledCourseView>
  );
};

export default CourseView;
