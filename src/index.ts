import Analytics from "analytics-node";
import fs from "fs";

interface EventProps {
  [key: string]: any;
}

interface TrackedEvent {
  event: string;
  props: EventProps;
}

class SegmentTracker {
  private segmentAnalytics: Analytics | null = null;

  private async verifySegmentAPIKey(apiKey: string): Promise<void> {
    const analytics = new Analytics(apiKey);
    const testEvent = {
      userId: "testUserId",
      event: "Test Event",
      properties: {
        test: true,
        timestamp: new Date(),
      },
    };

    return new Promise((resolve, reject) => {
      analytics.track(testEvent, (err) => {
        if (err) {
          console.error("API Key verification failed:", err);
          reject(err);
        } else {
          console.log(
            "API Key verified successfully. Check your Segment dashboard to confirm the test event."
          );
          resolve();
        }
      });
    });
  }

  constructor(apiKey?: string) {
    if (apiKey) {
      this.segmentAnalytics = new Analytics(apiKey);
      console.log("Analytics initialized with writeKey:", apiKey);
    } else {
      console.error(
        "Segment API Key is required to initialize analytics tracking."
      );
    }
  }

  public async initialize(apiKey: string): Promise<void> {
    try {
      await this.verifySegmentAPIKey(apiKey);
      this.segmentAnalytics = new Analytics(apiKey);
      console.log("Analytics initialized with writeKey:", apiKey);
    } catch (error) {
      console.error(
        "Segment API Key verification failed. Please check the API Key.",
        error
      );
      throw new Error(
        "Segment API Key verification failed. Please check the API Key."
      );
    }
  }

  public track(
    event: string,
    props: EventProps,
    userId: string = "defaultUserId"
  ) {
    if (!this.segmentAnalytics) {
      console.error("Analytics not initialized");
      return;
    }
    this.segmentAnalytics.track({
      event,
      properties: props,
      userId,
    });
    console.log(`Tracking event: ${event}`, props);
  }

  public loadAndTrackEventsFromFile(filePath: string) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const eventsData = JSON.parse(fileContent);

      Object.keys(eventsData).forEach((key) => {
        const { path, events: eventList } = eventsData[key];
        eventList.forEach((event: TrackedEvent) => {
          this.track(event.event, { ...event.props, path }, "userId"); 
        });
      });
    } catch (error) {
      console.error("Failed to load or process events file", error);
    }
  }

  public async loadAndTrackEventsFromGroup(
    filePath: string,
    groupName: string
  ): Promise<void> {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const eventsData = JSON.parse(fileContent);

      const groupData = eventsData[groupName];
      if (!groupData || !Array.isArray(groupData.events)) {
        console.error(
          `No events found for group ${groupName} or 'events' is not an array`
        );
        return;
      }

      groupData.events.forEach((event: TrackedEvent) => {
        if (event.event) {
          this.track(event.event, event.props, "userId");
        } else {
          console.error(
            "Invalid event object, missing 'event' property:",
            event
          );
        }
      });
    } catch (error) {
      console.error("Failed to load or process events file", error);
    }
  }
}

export default SegmentTracker;
