import { SocialGraph } from "@/components/dashboard/SocialGraph";
import { NumberTicker } from "@/components/magicui/number-ticker";
import React from "react";
import ConnectedSocialIcon from "@/components/dashboard/ConnectedSocialIcon";
import { getYoutubeTotalNumber } from "@/lib/account-actions/connect-action";

const page = async () => {
  let number = 0;

  const youtubeTotalNumber = (await getYoutubeTotalNumber()) ?? 0;

  number += youtubeTotalNumber;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex lg:flex-wrap justify-center  lg:flex- flex-col gap-5 w-full pt-4 md:border md:shadow md:rounded">
        <div className="flex-grow text-center justify-center relative">
          <ConnectedSocialIcon />
          <h4 className="md:text-2xl text-sm md:mb-7 mb-2 md:font-bold">
            Mighty ones
          </h4>
          <h1 className="lg:text-8xl md:text-6xl text-2xl font-bold mb-1">
            <NumberTicker value={number === 0 ? 0 : number} />
          </h1>
        </div>

        <SocialGraph />
      </div>

      {/* Total post, average likes, average comments stats */}
      {/* <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
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
      </div> */}
    </div>
  );
};

export default page;
