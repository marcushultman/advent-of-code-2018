const readFile = require('util').promisify(require('fs').readFile);

const parseSample = str => {
  const [before, op, after] = str.split('\n');
  return {
    before: JSON.parse(before.substr(8)),
    op: op.split(' ').map(s => parseInt(s)),
    after: JSON.parse(after.substr(8)),
  };
};

const ops = {
  addr: (reg, [_, a, b, c]) => (reg[c] = reg[a] + reg[b], reg),
  addi: (reg, [_, a, b, c]) => (reg[c] = reg[a] + b, reg),
  mulr: (reg, [_, a, b, c]) => (reg[c] = reg[a] * reg[b], reg),
  muli: (reg, [_, a, b, c]) => (reg[c] = reg[a] * b, reg),
  banr: (reg, [_, a, b, c]) => (reg[c] = reg[a] & reg[b], reg),
  bani: (reg, [_, a, b, c]) => (reg[c] = reg[a] & b, reg),
  borr: (reg, [_, a, b, c]) => (reg[c] = reg[a] | reg[b], reg),
  bori: (reg, [_, a, b, c]) => (reg[c] = reg[a] | b, reg),
  setr: (reg, [_, a, b, c]) => (reg[c] = reg[a], reg),
  seti: (reg, [_, a, b, c]) => (reg[c] = a, reg),
  gtir: (reg, [_, a, b, c]) => (reg[c] = a > reg[b] ? 1 : 0, reg),
  gtri: (reg, [_, a, b, c]) => (reg[c] = reg[a] > b ? 1 : 0, reg),
  gtrr: (reg, [_, a, b, c]) => (reg[c] = reg[a] > reg[b] ? 1 : 0, reg),
  eqir: (reg, [_, a, b, c]) => (reg[c] = a === reg[b] ? 1 : 0, reg),
  eqri: (reg, [_, a, b, c]) => (reg[c] = reg[a] === b ? 1 : 0, reg),
  eqrr: (reg, [_, a, b, c]) => (reg[c] = reg[a] === reg[b] ? 1 : 0, reg),
};

const eq = (lhs, rhs) =>
    lhs[0] === rhs[0] && lhs[1] === rhs[1] && lhs[2] === rhs[2] && lhs[3] === rhs[3];

function hasOpcodes(min) {
  return (sample) => Object.values(ops)
      .filter(op => eq(op(sample.before.slice(), sample.op), sample.after)).length >= min;
}

(async () => {
  const input = await readFile('input', 'utf8');
  let [sampleInput] = input.trim().split('\n\n\n\n');
  const samples = sampleInput.split('\n\n').map(parseSample).filter(hasOpcodes(3));
  console.log(samples.length);
})();
