const readFile = require('util').promisify(require('fs').readFile);
const { parseSample, hasOpcodes } = require('./common');

(async () => {
  const input = await readFile('input', 'utf8');
  let [sampleInput] = input.trim().split('\n\n\n\n');
  const samples = sampleInput.split('\n\n').map(parseSample).filter(hasOpcodes(3));
  console.log(samples.length);
})();
