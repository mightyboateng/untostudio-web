import React from "react";

const AverageStatusCard = ({
  icon,
  title,
  number,
  lastTwoMonthCondition,
  lastMonthCondition,
}: {
  icon: React.ReactNode;
  title: string;
  number: string;
  lastTwoMonthCondition: string;
  lastMonthCondition: string;
}) => {
  return (
    <div className="border rounded flex flex-col gap-6 md:p-6 p-4">
      <div className="border-b flex items-center gap-2 pb-2 text-sm">
        {icon}
        {title}
      </div>
      <h3 className="md:text-3xl text-xl font-bold">{number}</h3>
      <div className="text-xs">
        {lastMonthCondition > lastTwoMonthCondition && (
          <>
            <span className="rounded-full px-3 py-1 bg-green-500/25 mr-1">
              {(
                ((parseFloat(lastMonthCondition) -
                  parseFloat(lastTwoMonthCondition)) /
                  parseFloat(lastTwoMonthCondition)) *
                100
              ).toFixed(0)}
              %
            </span>{" "}
            more than last month
          </>
        )}
        {lastMonthCondition < lastTwoMonthCondition && (
          <>
            <span className="rounded-full px-3 py-1 bg-red-500/25 mr-1">
              {(
                ((parseFloat(lastMonthCondition) -
                  parseFloat(lastTwoMonthCondition)) /
                  parseFloat(lastTwoMonthCondition)) *
                100
              ).toFixed(0)}
              %
            </span>{" "}
            less than last month
          </>
        )}
      </div>
    </div>
  );
};

export default AverageStatusCard;
