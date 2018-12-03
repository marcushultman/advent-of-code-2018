const readFile = require('util').promisify(require('fs').readFile);

const makeClaim = (id, left, top, width, height) => ({ left, top, width, height });
const parseClaim = str => {
  const match = str.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  return makeClaim(match[1], ...match.slice(2).map(Number));
};
const fabricIndices = ({ left, top, width, height }) => {
  let indices = [];
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      indices.push((top + y) * 1000 + (left + x));
    }
  }
  return indices;
};

(async () => {
  const fabric = {};
  const claims = (await readFile('input', 'utf8')).trim().split('\n').map(parseClaim);
  claims.forEach(claim => fabricIndices(claim).forEach(i => fabric[i] = (fabric[i] || 0) + 1));
  console.log(Object.values(fabric).filter(count => count >= 2).length);
})();
