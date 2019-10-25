const axios = require('axios');
const mapIdsToRequestString = require('../utils/mapIdsToRequestString');

class Igdb {
  constructor() {
    this.base = 'https://api-v3.igdb.com';
  }

  async makeRequest(url, requestData) {
    const result = await axios({
      url,
      data: requestData,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'user-key': process.env.IGDB_KEY,
      },
    });

    return result.data;
  }

  async getCoverUrls(coverIds) {
    const idsUndefinedFiltered = coverIds.filter((id) => typeof id !== 'undefined');

    const ids = mapIdsToRequestString(idsUndefinedFiltered);
    const url = `${this.base}/covers`;
    const requestData = `fields url; where id = ${ids};`;
    const covers = await this.makeRequest(url, requestData);

    return covers;
  }

  async searchGame(gameName) {
    const url = `${this.base}/games`;
    const requestData = `search "${gameName}"; fields name, cover;`;
    const games = await this.makeRequest(url, requestData);
    const coverIds = games.map((game) => game.cover);

    const coverUrls = await this.getCoverUrls(coverIds);
    const result = [];

    games.forEach((game) => {
      const gameCover = coverUrls.find((cover) => cover.id === game.cover);
      result.push({
        igdbKey: game.id,
        name: game.name,
        cover: gameCover && gameCover.url,
      });
    });

    return result;
  }
}

module.exports = new Igdb();
