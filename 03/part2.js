const { getFabricAndClaims, fabricIndices } = require('./common');

(async () => {
  const { fabric, claims } = await getFabricAndClaims();
  const { id } = claims.find(claim => fabricIndices(claim).every(i => fabric[i] === 1));
  console.log(id);
})();
