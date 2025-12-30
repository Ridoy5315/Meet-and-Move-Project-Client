/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { BaseProfile } from "@/types/user.interface";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { getEditableFields } from "@/lib/profileEditableFields";
import { InterestInput } from "./InterestInput";
import { updateUserProfile } from "@/services/user/updateUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  data: BaseProfile;
}

const EditProfileDialog = ({
  open,
  onClose,
  onSuccess,
  data,
}: EditProfileDialogProps) => {
  // const router = useRouter();
  // const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handledRef = useRef(false);

  const editableFields = getEditableFields(data.role);
  const profile: any = data?.profile;

  const [interests, setInterests] = useState<string[]>(
    profile?.interests || []
  );

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    profile?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Profile photo must be smaller than 5MB");
      e.target.value = ""; // reset input
      setSelectedFile(null);
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const [state, formAction, isPending] = useActionState(
    updateUserProfile.bind(null, profile.id),
    null
  );

  const handleClose = () => {
    formRef.current?.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSelectedFile(null);
    setInterests(profile?.interests || []);
  };

  useEffect(() => {
  if (open) {
    handledRef.current = false;
  }
}, [open]);

  useEffect(() => {
     if (!open) return;
  if (!state) return;
  if (handledRef.current) return;

  handledRef.current = true;
    if (state?.success) {
      handledRef.current = true;
      toast.success(state.message || "Profile updated successfully");
      // if (formRef.current) {
      //   formRef.current.reset();
      // }
      handleClose();
      onClose();
      onSuccess();
    }
    if (state?.message && !state.success ) {
      handledRef.current = true;
      if (
        state?.message?.includes("Body exceeded") ||
        state?.statusCode === 413
      ) {
        toast.error("Profile image is too large. Max size is 5MB.");
      } else {
        toast.error(state.message || "Something went wrong");
      }
      // if (selectedFile && fileInputRef.current) {
      //   const dataTransfer = new DataTransfer();
      //   dataTransfer.items.add(selectedFile);
      //   fileInputRef.current.files = dataTransfer.files;
      // }
    }
  }, [state, onClose, onSuccess, open]);

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            {editableFields.includes("name") && (
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  defaultValue={state?.formData?.name || profile.name || ""}
                />
                <InputFieldError field="name" state={state} />
              </Field>
            )}

            {/* Username */}
            {editableFields.includes("username") && (
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  placeholder="john_12"
                  defaultValue={
                    state?.formData?.username || profile?.username || ""
                  }
                />
                <InputFieldError field="username" state={state} />
              </Field>
            )}

            {editableFields.includes("profilePhoto") && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                {selectedFile && (
                  <Image
                    //get from state if available
                    src={
                      typeof selectedFile === "string"
                        ? selectedFile
                        : URL.createObjectURL(selectedFile)
                    }
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full"
                  />
                )}
                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile photo for the doctor
                </p>
                <InputFieldError state={state} field="profilePhoto" />
              </Field>
            )}

            {/* Email */}
            {editableFields.includes("email") && (
              <Field>
                <FieldLabel htmlFor="username">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  defaultValue={state?.formData?.email || profile?.email || ""}
                />
                <InputFieldError field="email" state={state} />
              </Field>
            )}

            {/* Gender */}
            {editableFields.includes("gender") && (
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Input
                  id="gender"
                  name="gender"
                  placeholder="Select gender"
                  // defaultValue={profile.gender || ""}
                  // defaultValue={
                  //   state?.formData?.gender || (isEdit ? doctor?.gender : "")
                  // }
                  value={gender}
                  type="hidden"
                />
                <Select
                  value={gender}
                  defaultValue={profile.gender || "Select gender"}
                  onValueChange={(value) =>
                    setGender(value as "MALE" | "FEMALE")
                  }
                  // className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <InputFieldError field="gender" state={state} />
              </Field>
            )}

            {/* Date of Birth */}
            {editableFields.includes("dateOfBirth") && (
              <Field>
                <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  defaultValue={
                    profile.dateOfBirth ? profile.dateOfBirth.split("T")[0] : ""
                  }
                />
                <InputFieldError field="dateOfBirth" state={state} />
              </Field>
            )}

            {/* Contact Number */}
            {editableFields.includes("contactNumber") && (
              <Field>
                <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="number"
                  placeholder="+1234567890"
                  defaultValue={
                    state?.formData?.contactNumber ||
                    profile.contactNumber ||
                    ""
                  }
                />
                <InputFieldError field="contactNumber" state={state} />
              </Field>
            )}

            {/* Bio */}
            {editableFields.includes("bio") && (
              <Field>
                <FieldLabel htmlFor="bio">About</FieldLabel>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={state?.formData?.bio || profile.bio || ""}
                />
                <InputFieldError field="bio" state={state} />
              </Field>
            )}

            {/* Address */}
            {editableFields.includes("address") && (
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  defaultValue={
                    state?.formData?.address || profile.address || ""
                  }
                />
                <InputFieldError field="address" state={state} />
              </Field>
            )}

            {/* Interests (USER only) */}
            {editableFields.includes("interests") && (
              <Field>
                <FieldLabel>Interests</FieldLabel>
                <InterestInput value={interests} onChange={setInterests} />

                {/* Hidden input for FormData */}
                <Input
                  type="hidden"
                  name="interests"
                  value={JSON.stringify(interests)}
                />

                <InputFieldError field="interests" state={state} />
              </Field>
            )}

            {editableFields.includes("organization") && (
              <Field>
                <FieldLabel htmlFor="organization">Organization</FieldLabel>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Company / Community / Club"
                  defaultValue={
                    state?.formData?.organization || profile.organization || ""
                  }
                />
                <InputFieldError field="organization" state={state} />
              </Field>
            )}

            {editableFields.includes("experienceLevel") && (
              <Field>
                <FieldLabel htmlFor="experienceLevel">
                  Experience Level (Years)
                </FieldLabel>
                <Input
                  id="experienceLevel"
                  name="experienceLevel"
                  type="number"
                  min={0}
                  max={50}
                  placeholder="e.g. 3"
                  defaultValue={
                    state?.formData?.experienceLevel ??
                    profile.experienceLevel ??
                    ""
                  }
                />
                <InputFieldError field="experienceLevel" state={state} />
              </Field>
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
            {/* <Button>Save</Button> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
