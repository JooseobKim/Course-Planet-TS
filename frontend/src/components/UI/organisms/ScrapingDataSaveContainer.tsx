import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { ScrapingDataButtons, CourseSwiper } from '../molecules';
import { ScrapingDataSaveContainerProps } from './interfaces';
import { StyledScrapingDataSaveContainer } from './styles';

const ScrapingDataSaveContainer = (props: ScrapingDataSaveContainerProps) => {
  const { platform, cssStyle } = props;
  const { inflearCourses, fastcampusCourses, auth } = useSelector(
    (state: RootState) => ({
      inflearCourses: state.course.inflearn_courses,
      fastcampusCourses: state.course.fastcampus_courses,
      auth: state.auth,
    }),
    shallowEqual
  );

  const [inflearnCheckState, setInflearnCheckState] = useState<boolean[]>([]);
  // eslint-disable-next-line prettier/prettier
  const [fastcampusCheckState, setFastcampusCheckState] = useState<boolean[]>([]);

  useEffect(() => {
    if (platform === 'inflearn') {
      setInflearnCheckState(inflearCourses.map(() => false));
      return;
    }
    setFastcampusCheckState(fastcampusCourses.map(() => false));
  }, [fastcampusCourses, inflearCourses, platform]);

  const courses = platform === 'inflearn' ? inflearCourses : fastcampusCourses;
  const checkState =
    platform === 'inflearn' ? inflearnCheckState : fastcampusCheckState;
  const setCheckState =
    platform === 'inflearn' ? setInflearnCheckState : setFastcampusCheckState;

  return (
    <StyledScrapingDataSaveContainer cssStyle={cssStyle}>
      <ScrapingDataButtons
        platform={platform}
        courses={courses}
        auth={auth}
        checkState={checkState}
        setCheckState={setCheckState}
        cssStyle={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0',
          flexWrap: 'wrap',
        }}
      />
      <CourseSwiper
        courses={courses}
        dataCheckbox={true}
        checkState={checkState}
        setCheckState={setCheckState}
      />
    </StyledScrapingDataSaveContainer>
  );
};

export default ScrapingDataSaveContainer;
