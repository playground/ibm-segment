# ibm-segment

Testing tool for auto firing events by providing a list of events in json format.

## Usage:
Import the package

```import SegmentTracker from 'ibm-segment';```

Instantiate the SegmentTracker with your Segment Write Key

```const segmentTracker = new SegmentTracker('YOUR_SEGMENT_WRITE_KEY');```

Load and track events from your JSON file

```segmentTracker.loadAndTrackEventsFromFile('/path/to/your/json.json');```

## JSON file structure
Your JSON file should define events like so:
```{
  "Admin Panel": {
    "path": "/admin",
    "events": [
      {"event": "Logged In", "props": {"action": "Login attempt", "objectType": "button"}}
    ]
  }


