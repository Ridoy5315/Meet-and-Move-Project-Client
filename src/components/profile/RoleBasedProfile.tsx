/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileSection } from "./ProfileSection";
import { ProfileField } from "./ProfileField";
import { BaseProfile } from "@/types/user.interface";
import { formatValue } from "@/lib/ProfileValueFormatter";
import { getFriendlyLabel } from "@/lib/profileFieldFormatters";
import { getVisibleFields } from "@/lib/profileVisibleFields";
import { formatDate, formatRelativeTime } from "@/lib/profileDateFormatter";
import { StatusBadge } from "./StatusBadge";

export function RoleBasedProfile({ data }: { data: BaseProfile }) {
  const profile = data.profile;

  if (!profile) {
    return (
      <ProfileSection title="Profile Status">
        <ProfileField
          label="Message"
          value="Profile information not completed yet"
        />
      </ProfileSection>
    );
  }

  // ✅ MUST be here (not inside JSX)
  const visibleFields = getVisibleFields(data.role);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-start md:justify-between gap-8">
        <div className="flex-1 ">
          <ProfileSection title="Account Information">
            <ProfileField label="Email" value={data.email} />

            <ProfileField
              label="Verification Status"
              value={
                <StatusBadge
                  status={data.isVerified ? "VERIFIED" : "NOT_VERIFIED"}
                />
              }
            />

            <ProfileField
              label="Account Status"
              value={<StatusBadge status={data.status} />}
            />
          </ProfileSection>
        </div>

        <div className="w-40 shrink-0 flex justify-center md:justify-end">
          <ProfileAvatar
            src={(profile as any).profilePhoto}
            name={(profile as any).name}
          />
        </div>
      </div>

      {/* ================= PROFILE DETAILS ================= */}
      <ProfileSection title="Profile Details">
        {visibleFields.map((field) => {
          const value = (profile as any)[field];

          // ✅ Host Status → Badge
          if (field === "hostStatus") {
            return (
              <ProfileField
                key={field}
                label={getFriendlyLabel(field)}
                value={<StatusBadge status={value} />}
              />
            );
          }

          return (
            <ProfileField
              key={field}
              label={getFriendlyLabel(field)}
              value={formatValue(value)}
            />
          );
        })}
      </ProfileSection>
      <div className="">
        {/* ✅ ADD THIS BLOCK HERE */}
        <ProfileSection title="Account Timeline">
          <ProfileField
            label="Joined"
            value={`${formatDate(data.createdAt)}`}
          />
          <ProfileField
            label="Last Updated"
            value={formatRelativeTime(data.updatedAt)}
          />
        </ProfileSection>
      </div>
    </>
  );
}
