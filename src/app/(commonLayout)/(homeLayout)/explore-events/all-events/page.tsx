import EventsCardPage from "@/components/modules/Events/EventsCards"
import { getAllPublicEvents } from "@/services/host/event"

export const dynamic = 'force-dynamic'; 

const AllEventsPage = async() => {
     const events = await getAllPublicEvents();
     
  return (
    <div className="w-11/12 mx-auto px-4 py-8 lg:py-12">
     <EventsCardPage events={events.data} />
    </div>
  )
}

export default AllEventsPage