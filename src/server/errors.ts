import { EventType } from "./typed";

export class UnsupportEventTypeError extends Error {
  eventType: EventType;

  constructor(eventType: EventType) {
    const message = `Unsupport 'EventType' value：${eventType}`
    super(message);
    this.name = "UnsupportEventTypeError";
    this.eventType = eventType;
  }
}