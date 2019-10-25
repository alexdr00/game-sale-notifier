const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const querystring = require('querystring');
const constants = require('../../consts');

class PsnCrawler {
  async getGameDetails(game, attempts = 5) {
    if (attempts === 0) {
      const crawlError = {
        message: constants.error.unableToGetPrice,
      };
      throw crawlError;
    }

    const gameEscaped = querystring.escape(game);
    const url = `https://store.playstation.com/es-co/grid/search-game/1?query=${gameEscaped}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const allItemsFound = $('.grid-cell__left-detail.grid-cell__left-detail--detail-2').toArray();
    const itemFound = allItemsFound.find((item) => this.isPlayable(item));

    if (!itemFound) {
      const notFoundError = {
        message: constants.error.gameNotFoundInPsn.body + game,
        statusCode: 404,
      };
      throw notFoundError;
    }

    const gameId = itemFound.parent.parent.parent.parent.parent.parent.parent.parent.attribs.id;

    await page.click(`#${gameId}`);
    const gameContent = await page.content();
    const price = $('.price-display__price', gameContent).html();

    if (price === null) {
      const oneAttemptLess = attempts - 1;
      return this.getGameDetails(game, oneAttemptLess);
    }

    const priceNumber = Number(price.substring(3));
    await browser.close();

    return { price: priceNumber, psnUrl: page.url() };
  }

  isPlayable(item) {
    if (!item.children[0]) {
      return false;
    }

    const playableContent = [
      'Juego completo',
      'Nivel',
      'Juego de PSN',
      'Paquete',
    ];

    const itemType = item.children[0].data;
    return playableContent.includes(itemType);
  }
}

module.exports = new PsnCrawler();
