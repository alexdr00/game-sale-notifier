const mapIdsToRequestString = (ids) => {
  let request = '(';
  ids.forEach((id, index) => {
    const isLastId = index + 1 === ids.length;

    if (!isLastId) {
      request += `${id}, `;
      return;
    }

    request += `${id})`;
  });

  return request;
};

module.exports = mapIdsToRequestString;
