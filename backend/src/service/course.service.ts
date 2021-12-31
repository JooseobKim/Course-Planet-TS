import Courses, { CourseDocument, ICourse } from '../models/course.model';
import axios from 'axios';
import cheerio, { Cheerio } from 'cheerio';
import type { Node } from 'domhandler';
import { Page } from 'puppeteer';
import { Platform } from '../controller/course.controller';
import { FilterQuery, LeanDocument } from 'mongoose';

const DATA_PER_PAGE = 12;

// export class QueryFeatures {
//   public query;
//   public queryString;

//   constructor(query: any, queryString: CourseQuery) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   paginating() {
//     const page = this.queryString.page * 1 || 1;

//     this.query = this.query
//       .skip(DATA_PER_PAGE * (page - 1))
//       .limit(DATA_PER_PAGE);

//     return this;
//   }

//   filteringPlatform() {
//     const platform = this.queryString.platform;

//     if (platform.inflearn && !platform.fastcampus)
//       this.query = this.query.find({ platform: 'inflearn' });
//     else if (!platform.inflearn && platform.fastcampus)
//       this.query = this.query.find({ platform: 'fastcampus' });
//     else this.query = this.query.find();

//     return this;
//   }
// }

export const inflearnGetHtml = async (
  search: string,
  order: string,
  page: number
) => {
  return await axios.get(
    `https://www.inflearn.com/courses?s=${encodeURI(search)}&order=${encodeURI(
      order
    )}&page=${page}`
  );
};

export const cheerioGetLoad = (htmlData: string) => cheerio.load(htmlData);

export const cheerioNodeList = (htmlData: string, node: string) => {
  const $ = cheerioGetLoad(htmlData);
  const nodeList = $(node);

  return nodeList;
};

export const inflearnGetCoursesData = (
  htmlData: string,
  nodeList: Cheerio<Node>
) => {
  const $ = cheerioGetLoad(htmlData);
  const scrapingCourses: Omit<ICourse, 'review'>[] = [];

  nodeList.each((_, node: Node) => {
    const BASE_URL = 'https://www.inflearn.com';
    const slicePrice = $(node).find('.price').text();
    const price = slicePrice.substring(
      slicePrice.indexOf('₩'),
      slicePrice.lastIndexOf('₩') === slicePrice.indexOf('₩')
        ? slicePrice.length
        : slicePrice.lastIndexOf('₩')
    );

    scrapingCourses.push({
      title: $(node).find('.card-content .course_title').text(),
      instructor: $(node).find('.instructor').text(),
      description: $(node).find('.course_description').text(),
      image: $(node).find('.card-image > figure > img').attr('src') as string,
      price,
      url: BASE_URL + $(node).find('.course_card_front').attr('href'),
      platform: 'inflearn',
    });
  });

  return scrapingCourses;
};

export const autoScroll = async (page: Page) => {
  await page.evaluate(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await new Promise<void>((resolve, _) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          setTimeout(() => {
            clearInterval(timer);
            resolve();
          }, 2000);
        }
      }, 100);
    });
  });
};

type ScrapingCourseData = Omit<ICourse, 'instructor' | 'price' | 'review'>;

export const fastcampusGetCoursesData = (
  htmlData: string,
  nodeList: Cheerio<Node>,
  category: string
) => {
  const $ = cheerioGetLoad(htmlData);
  const scrapingCourses: ScrapingCourseData[] = [];

  nodeList.each((_, node: Node) => {
    const BASE_URL = 'https://fastcampus.co.kr';
    /* urlRegex 함수는 과거 패스트캠퍼스 사이트에서 사진의 경로를 태그에 CSS 인라인 스타일을 통해 backgroun-image 속성을 부여하였을 때 만들어진 함수입니다. 현재는 img 태그의 src 속성에 경로를 부여하였기 때문에 사용 보류중인 함수입니다. 

    const urlRegex = (data) => {
      const re =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9()@:%_\+.~#?&//=]*)/gi;
      const urlData = data.match(re);

      return urlData;
    };
    */

    /* 주석 처리된 img 변수와 imgUrl 변수는 사진의 경로가 태그에 CSS 인라인 스타일을 통해 background-image 속성에 부여되었을 때 사용되었습니다. 주석 처리된 url 변수는 과거 패스트캠퍼스 사이트에서 강의의 경로를 a 태그의 href 속성에 부여하였으나 현재는 a 태그 자체가 사라져서 경로를 잡을 수 없으므로 주석처리 하였습니다.
     */
    const title = $(node).find('.card__title').text();
    const description = $(node).find('.card__content').text();
    // const img = $(node).find(".card__image").css("background-image");
    // const imgUrl = urlRegex(img);
    const img = $(node).find('.card__image').attr('src') as string;
    // const url = BASE_URL + $(node).find(".card__container").attr("href");
    const url = BASE_URL + '/' + category;

    scrapingCourses.push({
      title,
      description,
      // image: imgUrl[0],
      image: img,
      url,
      platform: 'fastcampus',
    });
  });

  return scrapingCourses;
};

export const filteringData = async (data: ICourse[]) => {
  const filteredData = [];

  const findData = async (item: Pick<ICourse, 'title' | 'platform'>) => {
    const data = await Courses.findOne({
      title: item.title,
      platform: item.platform,
    });

    if (data) return true;
    return false;
  };

  for (const item of data) {
    const existsData = await findData(item);
    if (!existsData) filteredData.push(item);
  }

  return filteredData;
};

export const savingData = async (data: ICourse[]) => {
  const savedData = [];

  for (const saveObj of data) {
    const { title, instructor, description, image, price, url, platform } =
      saveObj;

    const newCourses = new Courses({
      title,
      instructor,
      description,
      image,
      price,
      url,
      platform,
    });

    await newCourses.save();

    savedData.push(newCourses);
  }

  return savedData;
};

export const getTotalPage = async (platform: Platform, search: string) => {
  let totalPage;

  if (platform.inflearn && !platform.fastcampus) {
    totalPage = await Courses.countDocuments({
      platform: 'inflearn',
      ...(search && {
        title: {
          $regex: search,
          $options: 'i',
        },
      }),
    });
  } else if (!platform.inflearn && platform.fastcampus) {
    totalPage = await Courses.countDocuments({
      platform: 'fastcampus',
      ...(search && {
        title: {
          $regex: search,
          $options: 'i',
        },
      }),
    });
  } else {
    totalPage = await Courses.countDocuments({
      ...(search && {
        title: {
          $regex: search,
          $options: 'i',
        },
      }),
    });
  }

  return Math.ceil(totalPage / DATA_PER_PAGE);
};

export const findCoursesByQuery = async (
  search: string,
  page: number,
  filterPlatform?: string
): Promise<LeanDocument<CourseDocument>[]> => {
  const findCourses = async (query?: FilterQuery<CourseDocument>) => {
    if (!query) {
      return await Courses.find()
        .skip(DATA_PER_PAGE * (page - 1))
        .limit(DATA_PER_PAGE)
        .sort({ createdAt: -1 })
        .lean();
    }

    return await Courses.find(query)
      .skip(DATA_PER_PAGE * (page - 1))
      .limit(DATA_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();
  };

  if (filterPlatform) {
    if (search)
      return await findCourses({
        title: { $regex: search, $options: 'i' },
        platform: filterPlatform,
      });

    if (!search) return await findCourses({ platform: filterPlatform });
  }

  if (search)
    return await findCourses({ title: { $regex: search, $options: 'i' } });

  return await findCourses();
};

interface ValidateCourseDB {
  valid: boolean;
  msg: string;
  courses: [] | CourseDocument[];
}

export const mostReview = async (): Promise<ValidateCourseDB> => {
  const result: ValidateCourseDB = { valid: false, msg: '', courses: [] };

  const filteringCourses = await Courses.aggregate([
    { $unwind: '$review' },
    {
      $group: {
        _id: '$_id',
        length: { $sum: 1 },
      },
    },
    { $sort: { length: -1 } },
    { $limit: 20 },
  ]).exec();

  const courses: CourseDocument[] = [];

  for (const course of filteringCourses) {
    const res = await Courses.findById(course._id);
    if (!res) continue;

    courses.push(res);
  }

  return {
    ...result,
    valid: true,
    msg: '데이터 불러오기 성공.',
    courses,
  };
};

export const recentReview = async (): Promise<ValidateCourseDB> => {
  const result: ValidateCourseDB = { valid: false, msg: '', courses: [] };

  try {
    const courses: CourseDocument[] = [];

    const coursesRes = await Courses.find().sort('-review').limit(15);

    for (const course of coursesRes) {
      if (course.review.length === 0) continue;
      courses.push(course);
    }

    return {
      ...result,
      valid: true,
      courses,
    };
  } catch (err) {
    return {
      ...result,
      msg: (err as Error).message,
    };
  }
};

export const recentAdd = async (): Promise<ValidateCourseDB> => {
  const result: ValidateCourseDB = { valid: false, msg: '', courses: [] };

  try {
    const courses = await Courses.find()
      .sort('-createdAt')
      .limit(15)
      .populate('review')
      .populate({
        path: 'review',
        populate: {
          path: 'owner likes',
          select: '-password',
        },
      });

    return {
      ...result,
      valid: true,
      courses,
    };
  } catch (err) {
    return {
      ...result,
      msg: (err as Error).message,
    };
  }
};
