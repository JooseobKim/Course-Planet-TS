import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { TextAtom, InputAtom, LabelAtom, SelectAtom, ButtonAtom } from "../atoms"
import { InflearnCondition, ScrapingDataProps } from './interfaces';
// eslint-disable-next-line prettier/prettier
import { defaultScrapingDataNumberInputStyle, StyledScrapingData } from './styles';
import configStyle from '../../../utils/config/config.style';
import { DefaultProps } from '../../../utils/interfaces';

const inflearnOptionValue = [
  { value: 'recent', text: '최신순' },
  { value: 'seq', text: '추천순' },
  { value: 'popular', text: '인기순' },
  { value: 'rating', text: '평점순' },
  { value: 'famous', text: '학생수순' },
];

const InflearnData = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { courses, auth } = useSelector((state: RootState) => ({
    courses: state.course.inflearn_courses,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  // eslint-disable-next-line prettier/prettier
  const { scrapingInflearnCourses } = bindActionCreators(actionCreators, dispatch);

  const [scrapingCondition, setScrapingCondition] = useState<InflearnCondition>(
    {
      order: 'recent',
      pageFrom: 1,
      pageTo: 1,
      search: '',
    }
  );
  const { order, pageFrom, pageTo, search } = scrapingCondition;

  useEffect(() => {
    const pageGap = pageTo - pageFrom;

    if (pageFrom > pageTo)
      setScrapingCondition({
        ...scrapingCondition,
        pageTo: pageFrom,
      });

    if (pageGap >= 4)
      setScrapingCondition({
        ...scrapingCondition,
        pageFrom,
        pageTo: pageTo - 1,
      });
  }, [pageFrom, pageTo, scrapingCondition]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'pageFrom' || name === 'pageTo')
      setScrapingCondition({
        ...scrapingCondition,
        [name]: Math.abs(parseInt(value)),
      });
    else setScrapingCondition({ ...scrapingCondition, [name]: value });
  };

  return (
    <StyledScrapingData cssStyle={cssStyle}>
      <TextAtom tag="span" text="페이지를 선택해주세요." />
      <InputAtom
        type="number"
        id="page_from"
        name="pageFrom"
        value={pageFrom}
        onChange={handleOnChange}
        cssStyle={{ ...defaultScrapingDataNumberInputStyle }}
      />
      <LabelAtom htmlFor="page_from">
        <TextAtom tag="span" text="페이지 부터" />
      </LabelAtom>
      <InputAtom
        type="number"
        id="page_to"
        name="pageTo"
        value={pageTo}
        onChange={handleOnChange}
        cssStyle={{ ...defaultScrapingDataNumberInputStyle }}
      />
      <LabelAtom htmlFor="page_to">
        <TextAtom tag="span" text="페이지 까지" />
      </LabelAtom>
      <SelectAtom
        optionValue={inflearnOptionValue}
        name="order"
        value={order}
        onChange={handleOnChange}
        cssStyle={{
          margin: '0 10px',
          border: 'none',
          borderBottom: '1px solid #111',
          height: '25px',
          cursor: 'pointer',
        }}
      >
        {search && <option value="search">검색순</option>}
      </SelectAtom>
      <InputAtom
        placeholder="인프런 검색 키워드"
        name="search"
        value={search}
        onChange={handleOnChange}
        cssStyle={{ borderBottom: 'none' }}
      />
      <ButtonAtom
        onClick={() =>
          scrapingInflearnCourses({
            order,
            pageFrom,
            pageTo,
            prev_courses: courses,
            auth,
            search,
          })
        }
        disabled={courses.length >= 96 ? true : false}
        cssStyle={{
          marginLeft: '10px',
          padding: '5px 15px',
          backgroundColor: configStyle.mainDarkColor,
          color: configStyle.white,
        }}
      >
        <TextAtom tag="span" text="인프런 스크래핑" />
      </ButtonAtom>
    </StyledScrapingData>
  );
};

const fastcampusOptionValue = [
  { value: 'category_online_programming', text: '프로그래밍 강의' },
  { value: 'category_online_datascience', text: '데이터 분석 강의' },
  { value: 'category_online_dgn', text: '디자인 강의' },
  { value: 'category_online_video', text: '영상/3D 강의' },
  { value: 'category_online_finance', text: '부동산/금융 강의' },
  { value: 'category_online_marketing', text: '마케팅 강의' },
  { value: 'category_online_biz', text: '업무 생산성 강의' },
  { value: 'category_online_invest', text: '투자/재테크 강의' },
];

const FastcampusData = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { courses, auth } = useSelector((state: RootState) => ({
    courses: state.course.fastcampus_courses,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  // eslint-disable-next-line prettier/prettier
  const { scrapingFastcampusCourses } = bindActionCreators(actionCreators, dispatch);

  const [scrapingCondition, setScrapingCondition] = useState({
    category: 'category_online_programming',
  });
  const { category } = scrapingCondition;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setScrapingCondition({ ...scrapingCondition, [name]: value });
  };

  return (
    <StyledScrapingData cssStyle={cssStyle}>
      <TextAtom tag="span" text="카테고리를 선택해주세요" />
      <SelectAtom
        optionValue={fastcampusOptionValue}
        name="category"
        value={category}
        onChange={handleOnChange}
        cssStyle={{
          margin: '0 10px',
          height: '25px',
          border: 'none',
          borderBottom: '1px solid #111',
          cursor: 'pointer',
        }}
      />
      <ButtonAtom
        onClick={() =>
          scrapingFastcampusCourses({
            category,
            prev_courses: courses,
            auth,
          })
        }
        disabled={courses.length >= 50 ? true : false}
        cssStyle={{
          padding: '5px 15px',
          backgroundColor: configStyle.mainDarkColor,
          color: configStyle.white,
        }}
      >
        <TextAtom tag="span" text="패스트캠퍼스 스크래핑" />
      </ButtonAtom>
    </StyledScrapingData>
  );
};

const ScrapingData = (props: ScrapingDataProps) => {
  const { platform, cssStyle } = props;

  if (platform === 'fastcampus') return <FastcampusData cssStyle={cssStyle} />;
  return <InflearnData cssStyle={cssStyle} />;
};

export default ScrapingData;
