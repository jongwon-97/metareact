import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Filler } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import DashboardCards from "../components/DashboardCard";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import DataTable from "../components/DataTable";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
Chart.register(Filler);

function Dashboard() {
  return (
    
        <div className="container mt-4">
          <h1>Dashboard</h1>
          <DashboardCards />
          <div className="row mt-4">
            <div className="col-md-6">
              <AreaChart />
            </div>
            <div className="col-md-6">
              <BarChart />
            </div>
          </div>
          <div className="mt-4">
            <h2>Data Table</h2>
            <DataTable />
          </div> 
        </div>
      
  );
}

export default Dashboard;
