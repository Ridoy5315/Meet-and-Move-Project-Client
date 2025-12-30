"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";

import { BaseProfile } from "@/types/user.interface";
import EditProfileDialog from "./EditProfileDialog";
import { useRouter } from "next/navigation";

interface ProfileActionsProps {
  data: BaseProfile;
}

export function ProfileActions({ data }: ProfileActionsProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

const handleClose = () => {
    setOpen(false);
    setDialogKey((k) => k + 1); // 🔥 RESET action state
  };
  return (
    <div className="flex justify-end gap-3">
      <Button onClick={() => setOpen(true)}>Edit Profile</Button>

      <EditProfileDialog
      key={dialogKey} 
        open={open}
        onClose={handleClose}
        onSuccess={handleSuccess}
        data={data}
      />

      {(data?.role === "ADMIN" || data?.role === "SUPER_ADMIN") && (
        <Link href="/dashboard">
          <Button variant="outline">Manage Platform</Button>
        </Link>
      )}
    </div>
  );
}
