import { useEffect,useState } from "react";
import axios from "axios";
import { BarChart } from "@mantine/charts";
import { LS_KEYS, lsGet, lsSet } from "../../utils/localStorageHelper";
import "./TotalSales.css";

function TotalSales() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5001/sales/weekly")
        .then((res) => {
          // Save fresh data to localStorage for offline fallback
          lsSet(LS_KEYS.SALES_WEEKLY, res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
          // Backend unavailable — use localStorage fallback
          const cached = lsGet(LS_KEYS.SALES_WEEKLY) || [];
          setData(cached);
        })
    }, [])

    return(
        <div className="total-sales-page">
            <h2>Total Sales</h2>
            <p>Weekly revenue review</p>

            <div className="sales-chart-wrapper">
            <BarChart
        h={300}
        data={data}
        dataKey="week"
        series={[{ name: "total", color: "violet.6" }]}
        tickLine="y"
      />
            </div>
        </div>
    )
}

export default TotalSales
