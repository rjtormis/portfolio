"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Label, Pie, PieChart } from "recharts";

import React from "react";
import { DashboardData } from "../actions/dashboard";
import { months } from "@/lib/utils";

const chartConfigPie = {
  visitors: {
    label: "Visitors",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-1))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartLineConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Dashboard({ data }: { data: DashboardData }) {
  const currentYear = new Date().getFullYear();
  const chartDataLine = months.map((m) => {
    const find = data.months.find((d) => d.month === m);
    return { month: m, views: find ? find.totalViews : 0 };
  });

  const chartDataPie = [
    { browser: "mobile", visitors: data.totalMobileUserView, fill: "var(--color-mobile)" },
    { browser: "desktop", visitors: data.totalDesktopView, fill: "var(--color-desktop)" },
  ];

  return (
    <>
      <div className="my-4">
        <div className="my-">
          <h2 className=" font-bold text-3xl">Key Metrics</h2>
          <span className="text-muted-foreground text-xs">
            An overview of your portfolio's performance, highlighting the most important user
            activity and engagement statistics.
          </span>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-evenly">
        <div className="grid grid-cols-2 gap-5 ">
          <div className="flex gap-4">
            <p className="my-auto text-3xl">{data.totalVisitor}</p>
            <div>
              <h3 className="text-xl font-bold">Total Visitor</h3>
              <span className="text-muted-foreground text-xs">Number of users who visited.</span>
            </div>
          </div>

          {/* <div className="flex gap-4">
            <p className="my-auto text-3xl">{data.totalPageView}</p>
            <div>
              <h3 className="text-xl font-bold">Page views</h3>
              <span className="text-muted-foreground text-xs">Total views across all pages.</span>
            </div>
          </div> */}

          <div className="flex gap-4">
            <p className="my-auto text-3xl">{data.totalEmailsReceived}</p>
            <div>
              <h3 className="text-xl font-bold">Emails received</h3>
              <span className="text-muted-foreground text-xs">
                Number of emails sent via the contact form.
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="">
            <h3 className="text-xl font-bold">Visitor Trends Over Time</h3>
            <span className="text-muted-foreground text-xs">
              Show monthly visitor counts to track growth or activity spikes for year {currentYear}.
            </span>
            <ChartContainer config={chartLineConfig}>
              <LineChart
                accessibilityLayer
                data={chartDataLine}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="views"
                  type="linear"
                  stroke="var(--color-views)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>

          <div>
            <h3 className="text-xl font-bold">Device Breakdown</h3>
            <span className="text-muted-foreground text-xs">
              Percentage of users visiting from mobile, desktop, or tablet.
            </span>
            <ChartContainer config={chartConfigPie} className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartDataPie}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {data.totalDesktopView + data.totalMobileUserView}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
