import CreateEventForm from '@/components/modules/host/CreateEventForm'
import { getUserInfo } from '@/services/auth/getUserInfo';
import React from 'react'

const CreateEventPage = async() => {
  const data = await getUserInfo();
  return (
    <div className="space-y-6">
      {/* Page header (dashboard-like, not auth-like) */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Event</h1>
          <p className="text-sm text-muted-foreground">
            Publish a professional event/activity with image, time, location, and capacity.
          </p>
        </div>
      </div>

      <CreateEventForm data={data} />
    </div>
  )
}

export default CreateEventPage