const { v4: uuidv4 } = require("uuid");
const Url = require("../models/Url");
const urlUtils = require("../lib/url");
module.exports = {
  getUrls: async function (query, pageNumber = 0, perPage = 20) {
    let urls = await Url.query()
      .where({ is_deleted: false })
      .orderBy("id", "desc");
    return { results: urls };
  },
  getUniqueIds: function () {
    console.log(uuidv4().split("-"));
    return uuidv4().split("-")[0];
  },
  createShortUrl: async function (body) {
    let { url } = body;
    const urlId = module.exports.getUniqueIds();
    if (urlUtils.validateUrl(url)) {
      let wasUrlFound = await Url.query().findOne(
        { original_url: url, is_deleted: false },
        (qb) => {
          qb.query().orWhere({ url_id: urlId });
        }
      );
      if (wasUrlFound && wasUrlFound.url_id === urlId) {
        module.exports.createShortUrl(body);
      }
      if (wasUrlFound) {
        throw {
          message: "This URL already exists!",
        };
      } else {
        const shortUrl = `${process.env.BASE_URL}/${urlId}`;

        let newUrl = await Url.query().insert({
          original_url: url,
          short_url: shortUrl,
          url_id: urlId,
        });
        newUrl.clicks = 0;
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
