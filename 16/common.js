exports.parseSample = str => {
  const [before, op, after] = str.split('\n');
  return {
    before: JSON.parse(before.substr(8)),
    op: op.split(' ').map(s => parseInt(s)),
    after: JSON.parse(after.substr(8)),
  };
};

const ops = [
  (reg, [_, a, b, c]) => (reg[c] = reg[a] + reg[b], reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] + b, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] * reg[b], reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] * b, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] & reg[b], reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] & b, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] | reg[b], reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] | b, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a], reg),
  (reg, [_, a, b, c]) => (reg[c] = a, reg),
  (reg, [_, a, b, c]) => (reg[c] = a > reg[b] ? 1 : 0, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] > b ? 1 : 0, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] > reg[b] ? 1 : 0, reg),
  (reg, [_, a, b, c]) => (reg[c] = a === reg[b] ? 1 : 0, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] === b ? 1 : 0, reg),
  (reg, [_, a, b, c]) => (reg[c] = reg[a] === reg[b] ? 1 : 0, reg),
];

const eq = (lhs, rhs) =>
    lhs[0] === rhs[0] && lhs[1] === rhs[1] && lhs[2] === rhs[2] && lhs[3] === rhs[3];

exports.hasOpcodes = (min) => (sample) => Object.values(ops)
    .filter(op => eq(op(sample.before.slice(), sample.op), sample.after)).length >= min;

exports.findOp = (samples, map) => {
  for (let sample of samples) {
    console.log(sample, map);
    const candidates = ops.filter(op => !map.get(sample.op[0]) && eq(op(sample.before.slice(), sample.op), sample.after));
    if (candidates.length === 1) {
      return [sample.op[0], ops.indexOf(candidates[0])];
    }
  }
};