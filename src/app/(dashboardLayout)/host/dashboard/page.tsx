import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import React from "react";

const HostOverviewPage = () => {
  return (
    <>
      <Link href="/">
        <Button>
          <ArrowLeftFromLine />
          Home
        </Button>
      </Link>
      <div>HostOverviewPage</div>
    </>
  );
};

export default HostOverviewPage;
