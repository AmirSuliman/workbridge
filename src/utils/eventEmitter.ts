import { EventEmitter } from 'events';
import { EventTypes } from '../types/events';

type EventMap = {
    [EventTypes.Toggle_Navbar]: { message: string };
  };

class TypedEventEmitter extends EventEmitter {
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): boolean {
    return super.emit(event, payload);
  }

  on<K extends keyof EventMap>(event: K, listener: (payload: EventMap[K]) => void): this {
    return super.on(event, listener);
  }

  off<K extends keyof EventMap>(event: K, listener: (payload: EventMap[K]) => void): this {
    return super.off(event, listener);
  }
}

const eventEmitter = new TypedEventEmitter();
export default eventEmitter;
