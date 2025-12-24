"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputFieldError from "./shared/InputFieldError";
import { useActionState, useEffect, useState, useTransition } from "react";
import { registerUser } from "@/services/auth/registerUser";
import { toast } from "sonner";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (state && !state.success && state.message) {
      if (state.message === "Duplicate Key Error") {
        toast.error(
          <div>
            <strong className="text-base">Email Already Registered!</strong>
            <div>
              The email you entered is already in use. Please use a different
              email or log in.
            </div>
          </div>
        );
      } else {
        toast.error(state.message);
      }
    } else if (state?.success) {
      startTransition(() => {
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      });
      toast.success("Registration successful! Please verify your email.");
    }
  }, [state]);
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Join us by creating your account below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name} // controlled value
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <InputFieldError field="name" state={state} />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">User Name</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="john123"
                  value={formData.username} // controlled value
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
                  placeholder="meet&move@example.com"
                  value={formData.email} // controlled value
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <InputFieldError field="email" state={state} />
              </Field>
              {/* password */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password} // controlled value
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <InputFieldError field="password" state={state} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword} // controlled value
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <InputFieldError field="confirmPassword" state={state} />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldSeparator className="my-1">
                  Or continue with
                </FieldSeparator>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default RegisterForm;
