#!/usr/bin/env node
import fs from 'fs';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import SegmentTracker from './index.js';

interface CommandLineOptions {
  apikey: string;
  file: string;
}

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --apikey [string] --file [string]')
  .option('apikey', {
    describe: 'Your Segment Write Key',
    type: 'string',
    demandOption: true, // Making API key mandatory
  })
  .option('file', {
    describe: 'Path to the JSON file containing events',
    type: 'string',
    demandOption: true, // Making file path mandatory
  })
  .help('h')
  .alias('h', 'help').argv as unknown as CommandLineOptions;
  
const initCLI = async () => {
  let { apikey, file } = argv;

  try {
    if (!fs.existsSync(file)) {
      console.error('File does not exist at the provided path.');
      return;
    }
  } catch (err) {
    console.error('An error occurred while checking the file path:', err);
    return;
  }

  // Initialize SegmentTracker and load events
  const segmentTracker = new SegmentTracker(apikey);
  segmentTracker.loadAndTrackEventsFromFile(file);

  // Loop for tracking additional events
  let trackMore = true;
  while (trackMore) {
    const { trackAnother } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'trackAnother',
        message: 'Would you like to track another event?',
      },
    ]);

    trackMore = trackAnother;

    if (trackMore) {
      const { event, props, userId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'event',
          message: 'Enter the event name:',
        },
        {
          type: 'input',
          name: 'props',
          message: 'Enter the event properties (as a JSON string):',
        },
        {
          type: 'input',
          name: 'userId',
          message: 'Enter the user ID (default is "defaultUserId"):',
          default: 'defaultUserId',
        },
      ]);

      try {
        const parsedProps = JSON.parse(props);
        segmentTracker.track(event, parsedProps, userId);
      } catch (error) {
        console.error('Error parsing event properties:', error);
      }
    }
  }
};

initCLI();
