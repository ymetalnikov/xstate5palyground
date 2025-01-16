export function defineValue<E extends { type: string }, T extends E["type"]>(
  event: E,
  type: T
): Extract<E, { type: T }> {
  if (event.type === type) {
    return event as Extract<E, { type: T }>;
  }
  throw new Error(`Invalid event type: ${event.type}`);
}
