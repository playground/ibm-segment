import Analytics from 'analytics-node';
import fs from 'fs';

interface EventProps {
  [key: string]: any;
}

interface TrackedEvent {
  event: string;
  props: EventProps;
}

class SegmentTracker {
  private segmentAnalytics: Analytics | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.segmentAnalytics = new Analytics(apiKey);
      console.log('Analytics initialized with writeKey:', apiKey);
    } else {
      console.error('Segment API Key is required to initialize analytics tracking.');
    }
  }

  public track(event: string, props: EventProps, userId: string = 'defaultUserId') {
    if (!this.segmentAnalytics) {
      console.error('Analytics not initialized');
      return;
    }
    this.segmentAnalytics.track({
      event,
      properties: props,
      userId: userId,
    });
    console.log(`Tracking event: ${event}`, props);
  }

  public loadAndTrackEventsFromFile(filePath: string) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const eventsData = JSON.parse(fileContent);

      Object.keys(eventsData).forEach((key) => {
        const { path, events: eventList } = eventsData[key];
        eventList.forEach((event: TrackedEvent) => { 
          this.track(event.event, { ...event.props, path }, 'userId'); // Assuming 'userId' is dynamically set elsewhere
        });
      });
    } catch (error) {
      console.error('Failed to load or process events file', error);
    }
  }
}

export default SegmentTracker;
