const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.system_generated/logs/transcript_full.jsonl';

const fileStream = fs.createReadStream(transcriptPath);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let stepsOfInterest = [591, 1238, 2146, 2147, 2195, 2199, 2201];

rl.on('line', (line) => {
  try {
    const parsed = JSON.parse(line);
    if (stepsOfInterest.includes(parsed.step_index)) {
      console.log(`=== STEP ${parsed.step_index} (${parsed.type}) ===`);
      console.log((parsed.content || '').substring(0, 1500));
    }
  } catch (e) {}
});
