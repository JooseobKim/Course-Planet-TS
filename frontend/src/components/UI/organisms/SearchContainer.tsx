import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, InputAtom, LabelAtom, TextAtom } from '../atoms';
import { FaSearch } from 'react-icons/fa';
import { StyledSearchContainer, StyledSearchContainerForm } from './styles';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { sendSearchKeyword } = bindActionCreators(actionCreators, dispatch);

  const [searchValue, setSearchValue] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;

    sendSearchKeyword(searchValue);

    history.push('/courses');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledSearchContainer>
      <DisplayFlexAtom cssStyle={{ padding: '0 30px' }}>
        <TextAtom
          tag="span"
          text="리뷰를 작성하고 싶은 강좌의 이름을 검색해주세요."
          cssStyle={{ letterSpacing: '1.3px', fontWeight: 500 }}
        />
      </DisplayFlexAtom>
      <StyledSearchContainerForm onSubmit={handleOnSubmit}>
        <LabelAtom
          htmlFor="search_icon"
          center={true}
          cssStyle={{
            backgroundColor: '#fff',
            width: '40px',
            minWidth: '40px',
            height: '100%',
            borderRadius: 0,
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <FaSearch />
        </LabelAtom>
        <InputAtom
          id="search_icon"
          placeholder="검색어를 입력해주세요"
          value={searchValue}
          onChange={handleOnChange}
          cssStyle={{
            width: '600px',
            padding: '10.5px 7px',
            margin: '0 2px',
            backgroundColor: '#fff',
            borderRadius: 0,
            border: 'none',
          }}
        />
        <ButtonAtom
          type="submit"
          cssStyle={{
            minWidth: '60px',
            padding: '8px 15px',
            borderRadius: 0,
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
          }}
        >
          <TextAtom tag="span" text="검색" cssStyle={{ fontWeight: 300 }} />
        </ButtonAtom>
      </StyledSearchContainerForm>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
