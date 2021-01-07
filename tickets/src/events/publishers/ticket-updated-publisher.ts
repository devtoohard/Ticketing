import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@shawnlkqtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
