import axios from 'axios';
// eslint-disable-next-line prettier/prettier
import { sendAlertMsg, pageReset, searchKeywordReset } from "../redux/action-creators";
import config from '../utils/config/config';

export const getCoursesByPage = async (condition: {
  checkedState: {
    inflearn: boolean;
    fastcampus: boolean;
  };
  page: number;
  search_keyword: string;
}) => {
  const { checkedState, page, search_keyword } = condition;

  const res = await axios.get(
    `${config.client_url}/api/courses?page=${page}&platform=${JSON.stringify(
      checkedState
    )}&search=${search_keyword ? encodeURI(search_keyword) : ''}`
  );

  if (res.data.totalPage < page || page <= 0) {
    const res = await axios.get(
      `${config.client_url}/api/courses?page=1&platform=${JSON.stringify(
        checkedState
      )}&search=${search_keyword ? encodeURI(search_keyword) : ''}`
    );

    sendAlertMsg(res.data.msg);
    pageReset();

    return res;
  }

  if (res.data.courses.length === 0) {
    sendAlertMsg(res.data.msg);
    pageReset();

    setTimeout(() => {
      searchKeywordReset();
    }, 2000);

    return res;
  }

  sendAlertMsg(res.data.msg);

  return res;
};
