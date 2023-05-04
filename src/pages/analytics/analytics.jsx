import React, { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import ProfileHeader from "../../components/profile/ProfileHeader";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import ServiceList from "../../components/analytics/ServiceList";
import Spinner from "../../components/common/Spinner";
import { getEngagements } from "../../services/analytics";
import { Dropdown } from "flowbite-react";
import { nFormatter } from "../../utils/common";

const TIME_FRAMES = [
  { name: "Last Day", value: "LAST_DAY" },
  { name: "Last Week", value: "LAST_WEEK" },
  { name: "All Time", value: "ALL_TIME" },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        className=" text-[12px] "
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="text-[12px] text-center "
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      className="font-light text-[12px]"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Analytics = () => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [analytics, setAnalytics] = useState();
  const [timeFrameType, setTimeFrameType] = useState(TIME_FRAMES[0]);
  const [pieChartData, setPieChartData] = useState();
  const [services, setServices] = useState();
  const [pieActiveIndex, setActiveIndex] = useState(0);
  // const [messages, setMessages] = useState();
  const { user: userProfile } = useSelector((state) => state.userReducer);
  const getAnalytics = async () => {
    try {
      const analyticsResponse = await getEngagements({
        type: timeFrameType.value,
      });
      const analyticsData = analyticsResponse.data;
      setServices(analyticsData?.clicks);
      const chartData = [];
      let othersPercentage = 0;
      analyticsData?.clicks.length &&
        analyticsData?.clicks.forEach((item) => {
          if (item.percentage > 0.05) {
            chartData.push({
              name: item.name,
              value: item.percentage,
            });
          } else {
            othersPercentage += item.percentage;
          }
        });
      if (othersPercentage > 0) {
        setPieChartData([
          ...chartData,
          { name: "Others", value: othersPercentage },
        ]);
      } else {
        setPieChartData(chartData);
      }

      setAnalytics(analyticsData);
    } catch (error) {
      return;
    }
  };
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    getAnalytics();
  }, [timeFrameType]);

  return (
    <div id="dashboard">
      <Container>
        <div className="flex flex-col font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
          <ProfileHeader
            showSidebar={showSidebar}
            setshowSidebar={setshowSidebar}
            showMenu={true}
            userProfile={userProfile}
            isProfileCard={false}
            isPublic={false}
          />
          <div className="flex flex-col flex-1 p-3 justify-center items-center ">
            <h1 className="mb-2 text-center text-2xl font-bold">Analytics</h1>
            {analytics ? (
              <>
                <div class="p-6 max-w mb-10 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <dl class="grid grid-cols-2 gap-5">
                    <div class="flex flex-col items-center">
                      <dt class="mb-2 text-xl font-extrabold">
                        {nFormatter(analytics?.views?.lastDay, 1)}
                      </dt>
                      <dd class="font-light text-gray-500 dark:text-gray-400 text-center text-sm">
                        Today Profile Views
                      </dd>
                    </div>
                    <div class="flex flex-col items-center">
                      <dt class="mb-2 text-xl font-extrabold">
                        {nFormatter(analytics?.views?.lastWeek, 1)}
                      </dt>
                      <dd class="font-light text-gray-500 dark:text-gray-400 text-center text-sm">
                        Last Week Profile Views
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex w-full justify-end">
                  <Dropdown
                    class="shadow-md bg-brand-brown rounded-md"
                    label={timeFrameType.name}
                    dismissOnClick={true}
                  >
                    {TIME_FRAMES.map((item) => (
                      <Dropdown.Item onClick={() => setTimeFrameType(item)}>
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>

                <PieChart width={500} height={350} className="max-w">
                  <Pie
                    activeIndex={pieActiveIndex}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                  >
                    {pieChartData.map((entry, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          values={`${entry.value}%`}
                        />
                      );
                    })}
                  </Pie>
                  <Legend
                    fontSizeAdjust={10}
                    iconSize={10}
                    verticalAlign="top"
                    height={40}
                    iconType=""
                    fontSize={12}
                    className="font-light"
                  />
                </PieChart>
                <ServiceList services={services} />
              </>
            ) : (
              <Spinner />
            )}
          </div>
          <Navbar />
        </div>
      </Container>
      {showSidebar && (
        <Sidebar
          closeSidebar={() => setshowSidebar(false)}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default Analytics;
