import Analytics from 'analytics-node';
import eventsData from './events.json' assert { type: 'json' };

interface EventProps {
  [key: string]: any; 
}

interface Event {
  event: string;
  props: EventProps;
}

interface Events {
  [key: string]: {
    path: string;
    events: Event[];
  };
}

function createSegment(writeKey?: string) {
  let segmentAnalytics: Analytics | null = writeKey ? new Analytics(writeKey) : null;

  return {
    init: (newWriteKey: string) => {
      segmentAnalytics = new Analytics(newWriteKey);
      console.log('Analytics initialized with writeKey:', newWriteKey);
    },

    track: (event: string, props: EventProps) => {
      if (!segmentAnalytics) {
        console.error('Analytics not initialized');
        return;
      }
      segmentAnalytics.track({
        event,
        properties: props,
        userId: 'userId', // Ideally, this should be dynamically set based on your application's user context
      });
      console.log(`Tracking event: ${event}`, props);
    },

    page: (name: string, props: EventProps) => {
      if (!segmentAnalytics) {
        console.error('Analytics not initialized');
        return;
      }
      segmentAnalytics.page({
        name,
        properties: props,
        userId: 'userId', // Again, this should be dynamically set
      });
      console.log(`Page view: ${name}`, props);
    },

    automate: function (selected: string = 'All') {
      if (!segmentAnalytics) {
        console.error('Analytics not initialized');
        return;
      }
      console.log(`Automating events for selection: ${selected}`);
      const evtKeys = Object.keys(eventsData) as Array<keyof typeof eventsData>;

      evtKeys.forEach((key, index) => {
        if (key === selected || selected === 'All') {
          setTimeout(() => {
            this.page(key as string, { title: 'Hybrid Cloud Mesh', path: eventsData[key].path, productCode: 'WW1314', productCodeType: 'WWPC' });
            eventsData[key].events.forEach((evt, evtIndex) => {
              setTimeout(() => {
                this.track(evt.event, { ...evt.props, action: `${key}, ${evt.props.action}` });
              }, selected === 'All' ? 5000 * (evtIndex + 1) + 800 : (evtIndex + 1) * 3000 + 800);
            });
          }, selected === 'All' ? (index + 1) * 3000 + 300 : 300);
        }
      });
    },
  };
}

export default createSegment;
