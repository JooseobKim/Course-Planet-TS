import { Request, Response } from 'express';
// eslint-disable-next-line prettier/prettier
import { inflearnGetHtml, cheerioNodeList, fastcampusGetCoursesData, filteringData, savingData, mostReview, recentReview, recentAdd, inflearnGetCoursesData, getTotalPage, findCoursesByQuery, autoScroll } from '../service/course.service';
import { findCourseById } from '../utils/mongoose.utils';
import puppeteer from 'puppeteer';

export const scrapingInflearnCourses = async (req: Request, res: Response) => {
  const { order, pageFrom, pageTo, search } = req.body;

  try {
    const inflearnScraping = async (
      search: string,
      order: string,
      page: number
    ) => {
      const html = await inflearnGetHtml(search, order, page);
      const $courseList = cheerioNodeList(html.data, '.course_card_item');

      return inflearnGetCoursesData(html.data, $courseList);
    };

    const scrapingLoop = async (
      search: string,
      order: string,
      pageFrom: number,
      pageTo: number
    ) => {
      const courses = [];

      for (let i = pageFrom; i <= pageTo; i++) {
        const coursesArr = await inflearnScraping(search, order, i);
        courses.push(...coursesArr);
      }

      return courses;
    };

    const inflearnCourses = await scrapingLoop(search, order, pageFrom, pageTo);

    res.json({
      inflearnCourses,
      msg: `${inflearnCourses.length}개의 인프런 강좌 데이터 스크래핑 성공.`,
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const scrapingFastcampusCourses = async (
  req: Request,
  res: Response
) => {
  const { category } = req.body;

  const fastcampusScraping = async (category: string) => {
    const url = `https://fastcampus.co.kr/${category}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });

    const page = await browser.newPage();
    await page.goto(url);
    await autoScroll(page);

    const html = await page.content();
    const $courseList = cheerioNodeList(html, '.card__container');

    return fastcampusGetCoursesData(html, $courseList, category);
  };

  const fastcampusCourses = await fastcampusScraping(category);

  res.json({
    fastcampusCourses,
    msg: `${fastcampusCourses.length}개의 패스트캠퍼스 강좌 데이터 스크래핑 성공.`,
  });
};

export const saveCourses = async (req: Request, res: Response) => {
  const { data } = req.body;

  try {
    const filteredData = await filteringData(data);
    const savedData = await savingData(filteredData);

    res.json({
      savedData,
      msg: `${savedData.length}개의 데이터 저장이 성공하였습니다.`,
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export type Platform = {
  inflearn: boolean;
  fastcampus: boolean;
};

export interface CourseQuery {
  platform: string;
  search: string;
  page: number;
}

export const getCourses = async (
  req: Request<unknown, unknown, unknown, CourseQuery>,
  res: Response
) => {
  const { search, page } = req.query;
  const platform: Platform = JSON.parse(req.query.platform);

  let filterPlatform;

  if (platform.inflearn && !platform.fastcampus) filterPlatform = 'inflearn';
  if (!platform.inflearn && platform.fastcampus) filterPlatform = 'fastcampus';

  try {
    const totalPage = await getTotalPage(platform, search);
    const courses = await findCoursesByQuery(search, page, filterPlatform);

    res.json({
      msg: '데이터 불러오기 성공.',
      courses,
      totalPage,
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let existsCourse = await findCourseById(id);
    if (!existsCourse)
      return res.status(400).json({ msg: '강의가 존재하지 않습니다.' });

    existsCourse = existsCourse.populate('review').populate({
      path: 'review',
      populate: {
        path: 'owner likes',
        select: '-password',
      },
    });

    res.json({
      msg: '데이터 찾기 성공.',
      course: existsCourse,
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const getMostReviewCourses = async (req: Request, res: Response) => {
  const result = await mostReview();
  if (!result.valid) return res.status(500).json({ msg: result.msg });

  res.json({
    msg: '데이터 불러오기 성공.',
    courses: result.courses,
  });
};

export const getRecentReviewCourses = async (req: Request, res: Response) => {
  const result = await recentReview();
  if (!result.valid) return res.status(500).json({ msg: result.msg });

  res.json({
    msg: '데이터 불러오기 성공',
    courses: result.courses,
  });
};

export const getRecentAddCourses = async (req: Request, res: Response) => {
  const result = await recentAdd();
  if (!result.valid) return res.status(500).json({ msg: result.msg });

  res.json({
    msg: '데이터 불러오기 성공',
    courses: result.courses,
  });
};
