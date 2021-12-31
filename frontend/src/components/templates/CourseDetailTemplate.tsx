import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { StyledCourseDetailTemplate } from './style';
// eslint-disable-next-line prettier/prettier
import { CourseDetailLeftContainer, CourseDetailRightContainer } from '../UI/organisms';
import { DefaultProps } from '../../utils/interfaces';

const CourseDetailTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { get_course } = useSelector(
    (state: RootState) => ({
      get_course: state.course.get_course,
    }),
    shallowEqual
  );

  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();

  const { getCourse } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (get_course.every(course => course._id !== id)) getCourse({ id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledCourseDetailTemplate cssStyle={cssStyle}>
      {get_course.some(course => course._id === id) && (
        <>
          <CourseDetailLeftContainer
            id={id}
            get_course={get_course}
            cssStyle={{
              '@media (max-width: 1024px)': {
                flexDirection: 'row',
                width: '100%',
                maxHeight: '375px',
                justifyContent: 'center',
              },
              '@media (max-width: 640px)': {
                flexDirection: 'column',
                maxHeight: '100%',
              },
            }}
          />
          <CourseDetailRightContainer
            id={id}
            cssStyle={{
              marginLeft: '20px',
              '@media (max-width: 1024px)': {
                marginLeft: '0',
                marginBottom: '10px',
                minHeight: '250px',
              },
            }}
          />
        </>
      )}
    </StyledCourseDetailTemplate>
  );
};

export default CourseDetailTemplate;
