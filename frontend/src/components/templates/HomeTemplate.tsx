import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { CourseView } from '../UI/molecules';
import { SearchContainer } from '../UI/organisms';
import { StyledHomeTemplate } from './style';
import { CourseViewDataItem } from './interfaces';
import { DefaultProps } from '../../utils/interfaces';

const HomeTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { recentAdd, recentCreate, mostReview } = useSelector(
    (state: RootState) => ({
      recentAdd: state.course.get_courses_temp[0],
      recentCreate: state.course.get_courses_temp[1],
      mostReview: state.course.get_courses_temp[2],
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { getHomeCourses } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (
      recentAdd.length === 0 ||
      recentCreate.length === 0 ||
      mostReview.length === 0
    )
      getHomeCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mostReview.length, recentAdd.length, recentCreate.length]);

  const courseViewData = [
    { text: '최근에 추가된 강의', courseList: recentAdd, index: 0 },
    {
      text: '리뷰가 최근에 작성된 강의',
      courseList: recentCreate,
      index: 1,
    },
    {
      text: '가장 리뷰가 많은 강의',
      courseList: mostReview,
      index: 2,
    },
  ];

  return (
    <StyledHomeTemplate cssStyle={cssStyle}>
      <SearchContainer />
      {courseViewData.map((item: CourseViewDataItem) => (
        <CourseView
          key={item.index}
          text={item.text}
          courseList={item.courseList}
          cssStyle={{ maxWidth: '1500px', margin: '10px auto' }}
        />
      ))}
    </StyledHomeTemplate>
  );
};

export default HomeTemplate;
