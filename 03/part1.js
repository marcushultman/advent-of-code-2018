const { getFabricAndClaims } = require('./common');

(async () => {
  const { fabric } = await getFabricAndClaims();
  console.log(Object.values(fabric).filter(count => count >= 2).length);
})();
