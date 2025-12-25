import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

const UserDashboardPage = () => {
  return <div className="flex items-center gap-5">
  <Link href="/">
  <Button><ArrowLeftFromLine />Home</Button>
  </Link>
  <div>User Dashboard Page</div>
  </div>;
};

export default UserDashboardPage;
