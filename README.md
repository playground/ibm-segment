# ibm-segment

A command-line interface (CLI) tool designed for seamless integration with Segment, enabling the tracking of events directly from your terminal. This tool simplifies the process of sending event data to Segment by allowing users to load events from a JSON file or input them manually.

<img width="712" alt="image" src="https://media.github.ibm.com/user/438814/files/78e44f69-71bf-44df-b546-85e092857954">

## Features:
- ***API Key Configuration:*** Configure your Segment Write Key directly through the CLI.
- ***Event File Loading:*** Load and track events in bulk from a JSON file.Update the events variable in index.js with your events.
- ***Manual Event Tracking:*** Track additional events manually through interactive prompts.
- ***User-Friendly Prompts:*** Easy-to-use prompts powered by Inquirer.js for manual event entry.

## Installation
``` npm install -g ibm-segment```

## Usage
### Configuration Options
The CLI supports the following options:
- `--apikey`: Your Segment Write Key (optional if provided during runtime).
- `--file`: Path to the JSON file containing events (optional if provided during runtime).
- `--payload`: JSON string to override event properties (optional).

If you've installed the CLI globally, you can run it from anywhere:
``` ibm-segment --apikey YOUR_SEGMENT_WRITE_KEY --file PATH_TO_YOUR_EVENTS_FILE.json```


### Overriding Event Properties
You can override specific properties of the events by providing a JSON string with the `--payload` option. This is useful for setting or modifying properties like `userId` or `instanceId` directly from the command line.

Example:
```bash
ibm-segment --apikey YOUR_SEGMENT_WRITE_KEY --file PATH_TO_YOUR_EVENTS_FILE.json --payload '{"userId":"joe@doe.com", "instanceId":"abc"}'
```
**Note:** Ensure your JSON string is correctly formatted. Incorrect JSON formats will result in an error, and the CLI will not proceed with tracking the events.


From here you can select which events to fire from the JSON file. If no events are selected, all will be added.

<img width="564" alt="image" src="https://media.github.ibm.com/user/438814/files/2e8d3db4-32cb-453f-a3e4-212ce40c2551">
 After processing the events from the file, you will be asked if you want to track more events manually: 
 
``` > Would you like to track another event? (Y/n) ```

## Manual Event Tracking
To manually track an event, provide the event name, properties (as a JSON string), and user ID when prompted.

