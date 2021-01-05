import type { NextApiRequest, NextApiResponse } from 'next';
// import Nightmare from 'nightmare';
// import cheerio from 'cheerio';
import { jsonToCSV } from 'react-papaparse';
import Xray from 'x-ray';

// const url = `https://pitchfork.com/features/lists-and-guides/the-50-best-albums-of-2017/`;
// const url = `https://pitchfork.com/features/lists-and-guides/best-albums-2020/`;
// const url = `https://pitchfork.com/features/lists-and-guides/best-albums-2019/`;
// const url = `https://pitchfork.com/features/lists-and-guides/9980-the-50-best-albums-of-2016/`;
// const url = `https://pitchfork.com/features/lists-and-guides/9764-the-50-best-albums-of-2015/`;
const url = `https://pitchfork.com/features/lists-and-guides/the-50-best-albums-of-2018/`;
function getData(req: NextApiRequest, res: NextApiResponse) {
  const x = Xray();
  return x(url, `.list-blurb.blurb-container > .row > .inner`, [
    {
      Rank: `.blurb > .rank`,
      Title: `.list-blurb__work-title`,
      Artist: `.artist-list.list-blurb__artists`,
      'Album Art': `.list-blurb__artwork img@src`,
      Review: `.blurb > .blurb-text > .contents`,
      Listen: `.blurb > .blurb-text > .contents > p:last-child > a@href`,
    },
  ])
    .paginate(
      `.fts-pagination__list-item--active + .fts-pagination__list-item > a@href`,
    )
    .limit(5)
    .then((e: any[]) => {
      const csv = jsonToCSV(e.reverse());
      res.setHeader(`Content-disposition`, `attachment; filename=data.csv`);
      res.setHeader(`Content-Type`, `text/csv`);
      res.send(csv);
      res.status(200).end();
    });
}

export default getData;
