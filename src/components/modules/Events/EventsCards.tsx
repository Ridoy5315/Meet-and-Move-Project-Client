
import { IEvent } from '@/types/event.interface';
import EventCardPage from './EventCard';

type EventsCardsPageProps = {
  events: IEvent[];
};

const EventsCardsPage = ({ events }: EventsCardsPageProps) => {
     console.log("events public", events);
  return (
    <div className='grid grid-cols-3 gap-4'>
     {events.map(event => (
        <EventCardPage key={event.id} event={event} />
     ))}
    </div>
  )
}

export default EventsCardsPage