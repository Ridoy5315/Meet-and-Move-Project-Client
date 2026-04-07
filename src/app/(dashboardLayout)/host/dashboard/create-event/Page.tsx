import CreateEventForm from "@/components/modules/host/CreateEventForm";
import PageHeader from "@/components/shared/page/PageHeader";
import PageLayout from "@/components/shared/page/PageLayout";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { CalendarPlus } from "lucide-react";

const CreateEventPage = async () => {
  const data = await getUserInfo();
  return (
    <PageLayout
      header={
        <PageHeader
          title="Create Event"
          description="Fill in the details to create a new event or activity."
          icon={<CalendarPlus className="h-6 w-6" />}
          actions={<Button variant="outline">Back</Button>}
        />
      }
    >
      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <CreateEventForm data={data} />
      </div>
    </PageLayout>
  );
};

export default CreateEventPage;
