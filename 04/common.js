const readFile = require('util').promisify(require('fs').readFile);

function parseEvent(str) {
  const date = new Date(str.substring(1, 17));
  const eventStr = str.substring(19);
  if (eventStr === 'falls asleep' || eventStr === 'wakes up') {
    return { date };
  }
  const id = eventStr.match(/^Guard #(\d+) begins shift$/)[1];
  return { date, id };
}

const sort = (lhs, rhs) => lhs.date.getTime() - rhs.date.getTime();

exports.solve = async (part) => {
  const input = await readFile('input', 'utf8');
  const events = input.trim().split('\n').map(parseEvent).sort(sort);
  const guards = {};
  for (let i = 0; i < events.length;) {
    const { id } = events[i];
    let awake = true, prev;
    guards[id] = guards[id] || { sleep: 0, sleeps: Array.from({ length: 60 }).fill(0) };
    while (events[++i] && !events[i].id) {
      if (awake = !awake) {
        for (let m = prev.date.getUTCMinutes(); m < events[i].date.getUTCMinutes(); ++m) {
          ++guards[id].sleeps[m];
        }
        if (part === 1) {
          guards[id].sleep += (events[i].date.getTime() - prev.date.getTime()) / 60000;
        }
      }
      prev = events[i];
    }
    if (part === 2) {
      guards[id].sleep = guards[id].sleeps.reduce((max, s) => Math.max(max, s), 0);
    }
  }
  const { id, sleeps } = Object.keys(guards).reduce((best, id) => {
    return guards[id].sleep > best.sleep ? { id, ...guards[id] } : best;
  }, { sleep: 0 });
  const topSleep = sleeps.reduce((max, s) => Math.max(max, s), 0);
  console.log(id * sleeps.indexOf(topSleep));
};
