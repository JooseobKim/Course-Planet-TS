import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CoursesPagination } from '.';
import { actionCreators } from '../../../redux';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, InputAtom, LabelAtom, TextAtom } from '../atoms';
import { CoursesNavbarProps } from './interfaces';
import { checkboxDefaultStyle, StyledCoursesNavbar } from './styles';
import config from '../../../utils/config/config';

const CoursesNavbar = (props: CoursesNavbarProps) => {
  const {
    page,
    pageNum,
    search_keyword,
    checkState: { checkedState, setCheckedState },
    cssStyle,
  } = props;

  const dispatch = useDispatch();

  // eslint-disable-next-line prettier/prettier
  const { pageReset, searchKeywordReset } = bindActionCreators(actionCreators, dispatch);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === config.inflearn || name === config.fastcampus) pageReset();

    setCheckedState({ ...checkedState, [name]: checked });
  };

  return (
    <StyledCoursesNavbar cssStyle={cssStyle}>
      <DisplayFlexAtom
        displayColumn={true}
        cssStyle={{
          '@media (max-width: 640px)': {
            flexDirection: 'row',
            justifyContent: 'center',
          },
        }}
      >
        <DisplayFlexAtom
          cssStyle={{
            alignItems: 'center',
            '@media (max-width: 640px)': { marginRight: '10px' },
          }}
        >
          <InputAtom
            type="checkbox"
            id="inflearn_checkbox"
            name="inflearn"
            checked={checkedState.inflearn}
            onChange={handleOnChange}
            cssStyle={{ ...checkboxDefaultStyle }}
          />
          <LabelAtom
            htmlFor="inflearn_checkbox"
            cssStyle={{ marginLeft: '4px', cursor: 'pointer' }}
          >
            <TextAtom tag="span" text="인프런" />
          </LabelAtom>
        </DisplayFlexAtom>
        <DisplayFlexAtom cssStyle={{ alignItems: 'center' }}>
          <InputAtom
            type="checkbox"
            id="fastcampus_checkbox"
            name="fastcampus"
            checked={checkedState.fastcampus}
            onChange={handleOnChange}
            cssStyle={{ ...checkboxDefaultStyle, marginTop: '5px' }}
          />
          <LabelAtom
            htmlFor="fastcampus_checkbox"
            cssStyle={{ marginLeft: '4px', cursor: 'pointer' }}
          >
            <TextAtom tag="span" text="패스트캠퍼스" />
          </LabelAtom>
        </DisplayFlexAtom>
      </DisplayFlexAtom>
      <TextAtom
        tag="span"
        text={`${page} 페이지`}
        cssStyle={{
          display: 'inline-block',
          width: '100%',
          margin: '15px 0',
          textAlign: 'center',
        }}
      />
      {search_keyword && (
        <ButtonAtom
          onClick={() => {
            pageReset();
            searchKeywordReset();
            window.scrollTo({ top: 0 });
          }}
          cssStyle={{
            width: '100%',
            marginBottom: '10px',
            ':hover': { backgroundColor: '#efefef' },
          }}
        >
          <TextAtom tag="span" text="검색 결과 초기화" />
        </ButtonAtom>
      )}
      <DisplayFlexAtom
        cssStyle={{
          '@media (max-width: 640px)': {
            marginBottom: '10px',
            justifyContent: 'center',
          },
        }}
      >
        <CoursesPagination page={page} pageNum={pageNum} />
      </DisplayFlexAtom>
    </StyledCoursesNavbar>
  );
};

export default CoursesNavbar;
