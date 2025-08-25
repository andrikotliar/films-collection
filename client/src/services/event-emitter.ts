export type Event = 'toaster-message';

type Listener = (...args: any[]) => void;

export class EventEmitter {
  private events: Map<Event, Set<Listener>> = new Map();

  on(event: Event, listener: Listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(listener);

    return () => this.off(event, listener);
  }

  off(event: Event, listener: Listener) {
    if (!this.events.has(event)) {
      return;
    }

    this.events.get(event)?.delete(listener);

    if (!this.events.get(event)?.size) {
      this.events.delete(event);
    }
  }

  emit(event: Event, ...args: any[]) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)!) {
        listener(...args);
      }
    }
  }

  once(event: Event, listener: Listener) {
    const wrapper = (...args: any[]) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

export const eventEmitter = new EventEmitter();
