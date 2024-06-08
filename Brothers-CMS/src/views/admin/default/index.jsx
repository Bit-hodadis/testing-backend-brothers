import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import axiosInstance from "config/customAxios";

const Dashboard = () => {
  const [metaD, setMetaD] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const metadata = await axiosInstance.get("/metadata");
        setMetaD(metadata?.data);
      } catch (error) {}
    };
    fetch();
  }, []);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Product"}
          subtitle={
            metaD && metaD?.product?.length > 0
              ? metaD?.product[0]?.num_of_product
              : 0
          }
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Servces"}
          subtitle={
            metaD && metaD?.services?.length > 0
              ? metaD?.services[0]?.services
              : 0
          }
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"News"}
          subtitle={metaD && metaD?.news?.length > 0 ? metaD?.news[0]?.news : 0}
        />
      </div>
      {/* Charts */}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}
      {/* Tables & Charts */}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
      
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div> */}
      {/* Traffic chart & Pie Chart */}
      {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}
      {/* Complex Table , Task & Calendar */}
      {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      {/* Task chart & Calendar */}
    </div>
  );
};

export default Dashboard;
