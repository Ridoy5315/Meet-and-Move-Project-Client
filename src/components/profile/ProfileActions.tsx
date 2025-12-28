import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/auth-utils";


export function ProfileActions({ role }: { role: UserRole }) {
  return (
    <div className="flex justify-end gap-3">
      <Link href="/profile/edit">
        <Button>Edit Profile</Button>
      </Link>

      {(role === "ADMIN" || role === "SUPER_ADMIN") && (
        <Link href="/dashboard">
          <Button variant="outline">Manage Platform</Button>
        </Link>
      )}
    </div>
  );
}
