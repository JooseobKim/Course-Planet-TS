import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { CourseCard } from '.';
import { DisplayFlexAtom, InputAtom } from '../atoms';
import { CourseSkeleton } from './CourseSkeleton';
import { CourseSwiperProps } from './interfaces';
import { StyledCourseViewSwiper } from './styles';
import { CourseData } from '../../../utils/interfaces';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { useLocation } from 'react-router';

SwiperCore.use([Navigation, Pagination, A11y]);

const CourseSwiper = (props: CourseSwiperProps) => {
  const { courses, dataCheckbox, checkState, setCheckState, cssStyle } = props;
  const { loading } = useSelector(
    (state: RootState) => ({
      loading: state.alert.loading,
    }),
    shallowEqual
  );
  const location = useLocation();

  const sildesState = () => {
    if (window.innerWidth > 1500) return 1500 / 375;
    else if (window.innerWidth < 380) return 1;
    else return window.innerWidth / 375;
  };
  const [slidesPer, setSlidesPer] = useState(sildesState);

  const handleResize = () => {
    if (window.innerWidth > 1500) setSlidesPer(1500 / 375);
    else if (window.innerWidth < 380) setSlidesPer(1);
    else setSlidesPer(window.innerWidth / 375);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const skeletonArr = new Array(12).fill(null);

  return (
    <StyledCourseViewSwiper cssStyle={cssStyle}>
      <Swiper
        slidesPerView={Math.floor(slidesPer)}
        slidesPerGroup={Math.floor(slidesPer)}
        navigation
        pagination
      >
        {courses.length === 0
          ? skeletonArr.map((_, idx) => (
              <SwiperSlide key={idx}>
                <CourseSkeleton
                  loading={location.pathname === '/' ? true : Boolean(loading)}
                  cssStyle={{ margin: '0 5px', minHeight: '375px' }}
                />
              </SwiperSlide>
            ))
          : courses.map((course: CourseData, idx) => (
              <SwiperSlide key={course._id}>
                <DisplayFlexAtom
                  displayColumn={true}
                  cssStyle={{ alignItems: 'center' }}
                >
                  {dataCheckbox && (
                    <InputAtom
                      type="checkbox"
                      checked={checkState && checkState[idx]}
                      onChange={e => {
                        if (!setCheckState) return;
                        setCheckState(prev => {
                          const state = [...prev];
                          state[idx] = e.target.checked;
                          return state;
                        });
                      }}
                    />
                  )}
                  <CourseCard
                    course={course}
                    cssStyle={{ padding: '0 10px' }}
                  />
                </DisplayFlexAtom>
              </SwiperSlide>
            ))}
      </Swiper>
    </StyledCourseViewSwiper>
  );
};

export default CourseSwiper;
