const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.system_generated/logs/transcript.jsonl';

const fileStream = fs.createReadStream(transcriptPath);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let matches = [];

rl.on('line', (line) => {
  if (line.toLowerCase().includes('client') && line.toLowerCase().includes('logo')) {
    try {
      const parsed = JSON.parse(line);
      matches.push({
        step_index: parsed.step_index,
        type: parsed.type,
        snippet: (parsed.content || '').substring(0, 300)
      });
    } catch (e) {
      matches.push({ raw: line.substring(0, 200) });
    }
  }
});

rl.on('close', () => {
  console.log(`Found ${matches.length} matches:`);
  matches.forEach(m => console.log(JSON.stringify(m)));
});
