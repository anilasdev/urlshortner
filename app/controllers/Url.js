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
    console.log(urlUtils.validateUrl(url));
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
};
