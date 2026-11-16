const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.system_generated/logs/transcript_full.jsonl';

const fileStream = fs.createReadStream(transcriptPath);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  try {
    const parsed = JSON.parse(line);
    if (parsed.step_index === 2200) {
      console.log('STEP 2200 TOOL CALLS:');
      console.log(JSON.stringify(parsed.tool_calls, null, 2));
    }
    if (parsed.step_index === 2145) {
      console.log('STEP 2145 TOOL CALLS:');
      console.log(JSON.stringify(parsed.tool_calls, null, 2));
    }
  } catch (e) {}
});
