 const tubeStations = require('./london_stations');
const alph = 'abcdefghijklmnopqrstuvwxyz';
const extractCharacterSet = term => new Set(term.toLowerCase().replace(/[^a-z]/g, ''));


function minimumStations(stations) {
  const seenChars = new Set();
  const subset = [];
  const spotted = {};

  //Map through Stations

  const formatted = stations.map(term => [term, extractCharacterSet(term)]);

  // Pre-populate characters counts
  formatted.forEach(([,set]) => {
    for (const char of set) {
      spotted[char] = (spotted[char] || 0) + 1;
    }
  });

  // Find rarity of word

  const rarity = set => Array.from(set).reduce((sum, char) => {
    const shouldBeCounted = !seenChars.has(char) && spotted[char];
    return sum + (shouldBeCounted ? 1 / spotted[char] : 0);
  }, 0);

  //Output minimum subset

  formatted.sort(([, s1], [, s2]) => rarity(s1) - rarity(s2));
  while (seenChars.size < alph.length && formatted.length > 0) {
    const [term, set] = formatted.pop();
    for (const char of set) seenChars.add(char);
    subset.push(term);
    formatted.sort(([, s1], [, s2]) => rarity(s1) - rarity(s2));
  }

  if (seenChars.size != alph.length) {
    throw new Error('Cannot cover the alphabet...');
  }
  return subset;
}

const res2 = minimumStations(tubeStations);
console.log(`A minimum number of ${res2.length} stations is required to cover all letters of the alphabet. These stations are: ${res2.join(', ')}`);