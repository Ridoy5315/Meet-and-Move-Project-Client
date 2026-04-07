import { getEventById } from "@/services/host/event";
import { notFound } from "next/navigation";

interface AppointmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EventDetailsPage = async ({
  params,
}: AppointmentDetailPageProps) => {
  const { id } = await params;
  const response = await getEventById(id);
  console.log("response, ", response);

  if (!response?.success || !response?.data) {
    notFound();
  }
  return (
    <div>
      Event details page
    </div>
  )
}

export default EventDetailsPage