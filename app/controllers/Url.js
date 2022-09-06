const shortid = require("shortid");
const Url = require("../models/Url");
const urlUtils = require("../lib/url");
module.exports = {
  getUrls: async function (query, pageNumber = 0, perPage = 20) {
    return {};
  },
  createShortUrl: async function (body) {
    let { url } = body;
    const urlId = shortid.generate();
    if (urlUtils.validateUrl(url)) {
      let wasUrlFound = await Url.query().findOne({ original_url: url });
      if (wasUrlFound) {
        return wasUrlFound;
      } else {
        const shortUrl = `${process.env.BASE_URL}/${urlId}`;

        let newUrl = await Url.query().insert({
          original_url: url,
          short_url: shortUrl,
          url_id: urlId,
        });
        return newUrl;
      }
    } else {
      throw {
        message: "invalid Original Url",
        statusCode: 400,
      };
    }
  },
  getUrlById: async function (urlId, res) {
    const url = await Url.query().findOne({ url_id: urlId });
    if (url) {
      await Url.query().patchAndFetchById(url.id, { clicks: url.clicks + 1 });
      return url;
    } else {
      throw {
        statusCode: 400,
        message: "Url not found",
      };
    }
  },
};
