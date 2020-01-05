const readFile = require('util').promisify(require('fs').readFile);
const { parseSample, findOp } = require('./common');

const parseOp = str => str.split(' ').map(s => parseInt(s));

const ops = new Map();

(async () => {
  const input = await readFile('input', 'utf8');
  const [sampleInput, program] = input.trim().split('\n\n\n\n');
  const samples = sampleInput.split('\n\n').map(parseSample);
  while (ops.size < 16) {
    console.log(ops);
    ops.set(...findOp(samples, ops));
  }
  console.log(ops);
  // const instructions = program.split('\n').map(parseOp); // .filter(hasOpcodes(3));
  // console.log(instructions);
})();
