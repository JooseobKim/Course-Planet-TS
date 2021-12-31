import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { CourseData } from '../../../utils/interfaces';
import { ButtonAtom, TextAtom } from '../atoms';
import { ScrapingDataButtonsProps } from './interfaces';
// eslint-disable-next-line prettier/prettier
import { defaultScrapingDataButtonsStyle, StyledScrapingDataButtons } from './styles';

const ScrapingDataButtons = (props: ScrapingDataButtonsProps) => {
  const { platform, courses, auth, checkState, setCheckState, cssStyle } =
    props;
  const dispatch = useDispatch();

  // eslint-disable-next-line prettier/prettier
  const { scrapingDataSave, clearScrapingData } = bindActionCreators(actionCreators, dispatch);

  const handleDisabled = (
    scarpingSiteCourses: CourseData[],
    notExistCheckedData?: boolean
  ) => {
    if (scarpingSiteCourses.length === 0 || notExistCheckedData) return true;
    return false;
  };

  const notExistCheckedData = checkState.every(item => item === false);

  return (
    <StyledScrapingDataButtons cssStyle={cssStyle}>
      <ButtonAtom
        onClick={() => scrapingDataSave({ data: courses, auth })}
        cssStyle={{ ...defaultScrapingDataButtonsStyle }}
        disabled={handleDisabled(courses)}
      >
        <TextAtom tag="span" text="스크래핑 데이터 모두 저장" />
      </ButtonAtom>
      <ButtonAtom
        onClick={() =>
          scrapingDataSave({
            data: courses.filter((_, idx) => checkState[idx]),
            auth,
          })
        }
        cssStyle={{ ...defaultScrapingDataButtonsStyle }}
        disabled={handleDisabled(courses, notExistCheckedData)}
      >
        <TextAtom tag="span" text="체크된 데이터 저장" />
      </ButtonAtom>
      <ButtonAtom
        onClick={() => setCheckState(prev => prev.map(() => true))}
        cssStyle={{ ...defaultScrapingDataButtonsStyle }}
        disabled={handleDisabled(courses)}
      >
        <TextAtom tag="span" text="모든 데이터 체크 설정" />
      </ButtonAtom>
      <ButtonAtom
        onClick={() => setCheckState(prev => prev.map(() => false))}
        cssStyle={{ ...defaultScrapingDataButtonsStyle }}
        disabled={handleDisabled(courses)}
      >
        <TextAtom tag="span" text="모든 데이터 체크 해제" />
      </ButtonAtom>
      <ButtonAtom
        onClick={() => clearScrapingData({ platform })}
        cssStyle={{ ...defaultScrapingDataButtonsStyle }}
        disabled={handleDisabled(courses)}
      >
        <TextAtom tag="span" text="스크래핑 데이터 초기화" />
      </ButtonAtom>
    </StyledScrapingDataButtons>
  );
};

export default ScrapingDataButtons;
