import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./api.css";
const baseURL =
  "https://api.stackexchange.com/2.3/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=popular&filter=default";
function ApiResult() {
  const fetchResult = (pageSize, page, fromData, toDate) => {
    let url = baseURL;
    if (pageSize) {
      url += `&pagesize=${pageSize}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    if (fromData) {
      url += `&fromData=${fromData.valueOf()}`;
    }
    if (toDate) {
      url += `&toData=${toDate.valueOf()}`;
    }
    axios.get(url).then((response) => {
      const xValues = [];
      const yValues = [];
      response.data.items.forEach((item) => {
        xValues.push(item.name);
        yValues.push(item.count);
      });

      const newData = {
        labels: xValues,
        datasets: [{ data: yValues, label: "count" }],
      };

      setData(newData);
    });
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchResult(5);
  }, []);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  return (
    <div className='api-result'>
      <div className="left-section">
        {data ? <Bar data={data} /> : null}
      </div>
      <div className="right-section">
        <form className='filter-search'>
          <div>
            <label>Page</label>
            <input
              type='number'
              className='input-style'
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
          </div>
          <div>
            <label>Page Size</label>
            <input
              type='number'
              className='input-style'
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            />
          </div>
          <div>
            <label>From Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <label>To Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div>
            <div>
              <button
                type='button'
                className='primary'
                onClick={() => {
                  fetchResult(pageSize, page, startDate, endDate);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApiResult;
