import AverageStatusCard from "@/components/dashboard/AverageStatusCard";
import { SocialGraph } from "@/components/dashboard/SocialGraph";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ThumbUpOutlined } from "@mui/icons-material";
import { MessageSquare, File } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* <ConnectAccountDropdown isCollapsed={false} /> */}
      {/* First layer */}
      <div className="border w-full rounded px-6 py-6 flex flex-col gap-8">
        <div className="flex lg:flex-wrap justify-center lg:flex- flex-col gap-5">
          <div className="flex-grow text-center relative">
            <h4 className="md:text-2xl text-xl mb-6 font-bold">Mighty ones</h4>
            <h1 className="lg:text-7xl md:text-6xl text-xl font-bold mb-1">
              <NumberTicker value={20535} />
            </h1>
            <p className="text-sm">
              <span className=" dark:text-green-500 text-green-700">+488 </span>
              in last 28 days
            </p>

            {/* <ConnectedSocialIcon /> */}
          </div>

          <SocialGraph />
        </div>
      </div>

      {/* Total post, average likes, average comments stats */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <AverageStatusCard
          icon={<File className="w-4 h-4" />}
          title={"Posts"}
          number={"2.5 k"}
          lastTwoMonthCondition={"200"}
          lastMonthCondition={"100"}
        />
        <AverageStatusCard
          icon={<ThumbUpOutlined className="w-4 h-4" />}
          title={"Average Likes"}
          number={"244 k"}
          lastTwoMonthCondition={"20"}
          lastMonthCondition={"100"}
        />
        <AverageStatusCard
          icon={<MessageSquare className="w-4 h-4" />}
          title={"Average Comments"}
          number={"18 k"}
          lastTwoMonthCondition={"430"}
          lastMonthCondition={"500"}
        />
      </div>
    </div>
  );
};

export default page;
