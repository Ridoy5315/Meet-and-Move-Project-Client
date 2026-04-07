"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { becomeHost } from "@/services/host/becomeHost";

import Image from "next/image";
import { useActionState, useEffect,  useRef,  useState, useTransition } from "react";
import { toast } from "sonner";
import { UserProfile } from "@/types/user.interface";

// interface UserInfo {
//   UserProfile: UserProfile;
//   email: string;
// }

type BecomeHostFormProps = {
  userInfo: UserProfile;
};

const BecomeHostForm = ({ userInfo }: BecomeHostFormProps) => {
  console.log(userInfo);
  const [, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(becomeHost, null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [formData, setFormData] = useState({
    username: "",
    contactNumber: "",
    gender: "",
    dateOfBirth: "",
    organization: "",
    experienceLevel: "",
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (state && !state.success && state.message) {
      if (state.message === "Validation failed") {
        toast.error("Some required information is missing or invalid.");
      } else {
        toast.error(state.message);
      }
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    } else if (state?.success) {
      startTransition(() => {
        setFormData({
          username: "",
          contactNumber: "",
          gender: "",
          dateOfBirth: "",
          organization: "",
          experienceLevel: "",
          bio: "",
          address: "",
        });
        setSelectedFile(null);
      });

      toast.success(
        "Host application submitted successfully! We will review your profile."
      );
    }
  }, [state, selectedFile]);

  return (
    <div className={cn("flex flex-col gap-3")}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-xl">Basic Information</CardTitle>
          <CardDescription>Tell us who you are</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              {/* BASIC INFO */}

              <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center pb-6">
                <div className="grid-cols-1 space-y-5">
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      value={userInfo?.name}
                      readOnly
                    />
                    <InputFieldError field="name" state={state} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      placeholder="john_host"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                    <InputFieldError field="username" state={state} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userInfo?.email}
                      readOnly
                    />
                    <InputFieldError field="email" state={state} />
                  </Field>
                </div>

                <Separator orientation="vertical" className="h-full" />

                {/* Profile Photo (Create Mode Only)  */}
                <Field>
                  {/* <FieldLabel htmlFor="file">Profile Photo</FieldLabel> */}
                  {selectedFile && (
                    <div className="mb-2 flex justify-center">
                      <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Profile Photo Preview"
                        width={150}
                        height={150}
                        className="rounded-full object-cover"
                      />
                    </div>
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
                    Upload your profile photo
                  </p>
                  <InputFieldError field="profilePhoto" state={state} />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Field>
                  <FieldLabel htmlFor="contactNumber">
                    Contact Number
                  </FieldLabel>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="+880 1XXXXXXXXX"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </Field>
                {/* ✅ Date of Birth */}
                <Field>
                  <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Field>
                  <FieldLabel htmlFor="organization">
                    Organization / Community
                  </FieldLabel>
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Club, Community, or Company"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organization: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="experienceLevel">
                    Experience Level (Years)
                  </FieldLabel>
                  <Input
                    id="experienceLevel"
                    name="experienceLevel"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>

              {/* BIO & ADDRESS */}
              <Field>
                <FieldLabel htmlFor="bio">Bio / About You</FieldLabel>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Tell participants about your hosting style..."
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="address">Location / Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  placeholder="City, Area"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Field>

              {/* SUBMIT */}
              <Field>
                {/* <Button type="submit">Submit Host Application</Button> */}
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? "Submitting Application..."
                    : "Submit Host Application"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By submitting, you agree to our <a href="#">Host Guidelines</a> and{" "}
        <a href="#">Community Rules</a>.
      </FieldDescription>
    </div>
  );
};

export default BecomeHostForm;
