#!/usr/bin/env node
import fs from "fs";
import inquirer from "inquirer";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import SegmentTracker from "./index.js";

interface CommandLineOptions {
  apikey: string;
  file: string;
}

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 --apikey [string] --file [string]")
  .option("apikey", {
    describe: "Your Segment Write Key",
    type: "string",
    demandOption: true, // Making API key mandatory
  })
  .option("file", {
    describe: "Path to the JSON file containing events",
    type: "string",
    demandOption: true, // Making file path mandatory
  })
  .help("h")
  .alias("h", "help").argv as unknown as CommandLineOptions;

async function listEventGroups(filePath: string): Promise<string[]> {
  if (fs.lstatSync(filePath).isDirectory()) {
    throw new Error("The provided path is a directory, expected a file path.");
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const eventsData = JSON.parse(fileContent);
  return Object.keys(eventsData);
}

const initCLI = async () => {
  let { apikey, file } = argv;

  try {
    if (!fs.existsSync(file)) {
      console.error("File does not exist at the provided path.");
      return;
    }
  } catch (err) {
    console.error("An error occurred while checking the file path:", err);
    return;
  }

  const segmentTracker = new SegmentTracker(apikey);
  await segmentTracker.initialize(apikey);

  const eventGroups = await listEventGroups(file);
  const { selectedGroups } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedGroups",
      message: "Select event groups to trigger (select none to trigger all):",
      choices: eventGroups,
    },
  ]);

  let groupsToTrigger =
    selectedGroups.length > 0 ? selectedGroups : eventGroups;
  const fileContent = fs.readFileSync(file, "utf8");
  const eventsData = JSON.parse(fileContent);

  groupsToTrigger.forEach((group: string) => {
    segmentTracker.loadAndTrackEventsFromGroup(file, group).catch((error) => {
      console.error(
        `Failed to load or track events for group ${group}:`,
        error
      );
    });
  });

  let trackAnother = true;
  do {
    const response = await inquirer.prompt([
      {
        type: "confirm",
        name: "trackAnother",
        message: "Would you like to track another event?",
      },
    ]);

    trackAnother = response.trackAnother;

    if (!trackAnother) {
      return process.exit(1);
    }

    let event = "";
    let props = "";
    let userId = "defaultUserId";

    do {
      const eventResponse = await inquirer.prompt([
        {
          type: "input",
          name: "event",
          message: "Enter the event name:",
          validate: (input) => {
            if (input.trim() === '') {
              return 'Event name cannot be empty. Please enter a valid event name.';
            }
            return true;
          }
        },
      ]);
      event = eventResponse.event.trim();
    } while (!event);

    let validProps = false;
    do {
      const propsResponse = await inquirer.prompt([
        {
          type: "input",
          name: "props",
          message: "Enter the event properties (as a JSON string):",
          validate: (input) => {
            try {
              JSON.parse(input);
              validProps = true;
              return true;
            } catch (e) {
              validProps = false;
              return "This is not a valid JSON string. Please enter valid JSON properties.";
            }
          }
        },
      ]);
      props = propsResponse.props.trim();
    } while (!validProps);

    const userIdResponse = await inquirer.prompt([
      {
        type: "input",
        name: "userId",
        message: 'Enter the user ID (default is "defaultUserId"):',
        default: "defaultUserId",
      },
    ]);
    userId = userIdResponse.userId.trim();

    const parsedProps = JSON.parse(props);
    segmentTracker.track(event, parsedProps, userId);
  } while (trackAnother);
};

initCLI();
