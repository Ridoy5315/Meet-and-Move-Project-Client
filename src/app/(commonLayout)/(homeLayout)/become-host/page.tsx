import BecomeHostForm from "@/components/modules/BecomeHost/BecomeHostForm"
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";

const BecomeHostPage = async() => {
  const userInfo = (await getUserInfo()) as UserInfo;
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-10 md:pt-10 md:pb-16">
        {/* Page Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Become a Host
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Create and manage events, connect with people, and grow your
            community on Meet & Move.
          </p>
        </div>

        {/* Form Container */}
        <div className="mx-auto max-w-4xl">
          <BecomeHostForm userInfo={userInfo}/>
        </div>
      </div>
    </div>
  )
}

export default BecomeHostPage