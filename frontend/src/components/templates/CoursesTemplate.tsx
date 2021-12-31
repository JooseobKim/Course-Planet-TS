import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { DisplayFlexAtom } from '../UI/atoms';
import { CourseCard, CoursesNavbar } from '../UI/molecules';
import { CoursePageData } from './interfaces';
import { StyledCoursesTemplate } from './style';
import { CourseData, DefaultProps } from '../../utils/interfaces';
import { getCoursesByPage } from '../../api';
import CourseSkeleton from '../UI/molecules/CourseSkeleton';

const CoursesTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { search_keyword, page, loading } = useSelector(
    (state: RootState) => ({
      search_keyword: state.course.search_keyword,
      page: state.course.page,
      loading: state.alert.loading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { pageReset } = bindActionCreators(actionCreators, dispatch);

  const [checkedState, setCheckedState] = useState({
    inflearn: true,
    fastcampus: true,
  });
  const [CoursesData, setCoursesData] = useState<CoursePageData>({
    totalPage: 1,
    coursesPerPage: [],
  });
  const { totalPage, coursesPerPage } = CoursesData;

  const pageNum = new Array(totalPage).fill(null).map((v, i) => i);

  useEffect(() => {
    if (page !== 1) pageReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const courses = async () => {
      const res = await getCoursesByPage({
        checkedState,
        page,
        search_keyword,
      });

      setCoursesData({
        totalPage: res.data.totalPage,
        coursesPerPage: res.data.courses,
      });
    };
    courses();
  }, [checkedState, page, search_keyword]);

  const skeletonArr = new Array(12).fill(null);

  return (
    <StyledCoursesTemplate cssStyle={cssStyle}>
      <DisplayFlexAtom
        displayColumn={true}
        cssStyle={{
          alignItems: 'flex-end',
          minWidth: '175px',
          flex: 0.1,
        }}
      >
        <CoursesNavbar
          page={page}
          pageNum={pageNum}
          search_keyword={search_keyword}
          checkState={{ checkedState, setCheckedState }}
          cssStyle={{
            width: '100%',
            position: 'sticky',
            top: '81px',
          }}
        />
      </DisplayFlexAtom>
      <DisplayFlexAtom
        displayGridOn={true}
        cssStyle={{
          flex: 0.9,
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: '10px',
        }}
      >
        {coursesPerPage.length === 0
          ? skeletonArr.map((_, idx) => (
              <CourseSkeleton
                key={idx}
                loading={Boolean(loading)}
                gridResponsive={true}
              />
            ))
          : coursesPerPage.map((course: CourseData) => (
              <CourseCard
                key={course._id}
                course={course}
                gridResponsive={true}
              />
            ))}
      </DisplayFlexAtom>
    </StyledCoursesTemplate>
  );
};

export default CoursesTemplate;
