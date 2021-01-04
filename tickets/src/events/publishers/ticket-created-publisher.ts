import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@shawnlkqtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
