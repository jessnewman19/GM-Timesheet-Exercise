import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

function Table({ data, error }) {
  const [tableData, setTableData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalBillableAmount, setTotalBillableAmount] = useState(0);
  const currency = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
  });

  //Create new array of objects from data that will be used in the table. 
  const createNewData = () => {
    let consolidatedHours = 0;
    if (data !== undefined) {
      const newDataArray = data.map(d => {
        consolidatedHours += d.hours
        return {
          billable: d.billable,
          billableRate: d.billable_rate,
          client: d.client,
          billableHours: d.billable.toUpperCase() === "YES" ? d.hours : 0,
          nonBillableHours: d.billable.toUpperCase() === "NO" ? d.hours : 0,
          project: d.project,
          projectCode: d.project_code,
          billableAmount: d.billable.toUpperCase() === "YES" ? d.hours * d.billable_rate : 0,
        };
      });

      setTotalHours(consolidatedHours);

      //Consolidate objects with the same project code into new array
      const consolidatedData = newDataArray.reduce((accumulator, currentObj) => {
        if (accumulator !== undefined) {
          //If the accumulator already has an object with the same project code, set existing object
          const existingObj = accumulator.find(item => item.projectCode === currentObj.projectCode)
          //will provide the existing object in the accumulator 
          if (existingObj) {
            //If the current object has billable hours, increment billable hours & billable amount on existing object
            if (currentObj.billable.toUpperCase() === 'YES') {
              existingObj.billableAmount += currentObj.billableAmount
              existingObj.billableHours += currentObj.billableHours
            }
            if (currentObj.billable.toUpperCase() === 'NO') {
              //If the current object has non-billable hours, increment non-billable hours on existing object
              existingObj.nonBillableHours += currentObj.nonBillableHours
            }
          } else {
            accumulator.push(currentObj);
          }
          return accumulator;
        }
      }, [])
      return consolidatedData;
    }
  }

  //Set Table Data only after the data has been set
  useEffect(() => {
    try {
      setTableData(createNewData());
    } catch (err) {
      console.log(err);
    }
  }, [data])

  //Helper function to round data
  const roundNumber = (num) => {
    return (Math.round(num * 100) / 100);
  }

  //Render the rows with the timesheet data
  const renderRows = () => {
    if (tableData !== undefined) {
      //Sort data by project name
      tableData.sort((a, b) => {
        if (a.project < b.project) return -1;
        if (a.project > b.project) return 1;
        return 0;
      })
      //Display data in the table
      return tableData.map((val, key) => {
        let percentage = roundNumber((val.billableHours / (val.billableHours + val.nonBillableHours)) * 100);
        return (
          <tbody key={key} className="timesheet-row">
            <tr>
              <td id="project-name" className="left-aligned">{val.project}</td>
              <td id="client-name" className="left-aligned">{val.client}</td>
              <td id="total-hours" className="right-aligned">{roundNumber(val.billableHours + val.nonBillableHours)}</td>
              <td id="billable-hours" className="right-aligned">{val.billableHours === 0 ? "0.0" : roundNumber(val.billableHours)}  <span>({percentage}%)</span></td>
              <td id="billable-amount" className="right-aligned">{val.billableAmount === 0 ? "-" : currency.format(val.billableAmount)}</td>
            </tr>
          </tbody>
        )
      })
    }
  }

  //Calculate the total billable amount
  const calculateTotalBillableAmount = () => {
    let total = 0;
    if (tableData) {
      tableData.forEach(val => {
        total += val.billableAmount;
      })
      setTotalBillableAmount(total);
    }
  }

  //Calculate the total billable amount when the table data is set
  useEffect(() => {
    try {
      calculateTotalBillableAmount();
    } catch (err) {
      console.log(err);
    }
  }, [tableData])

  return (
    <div>
      <div id="summary-div">
        <div className="summary-holder-div">
          <div className="summary-title-div">Hours Tracked</div>
          <div className="summary-amount-div">{roundNumber(totalHours).toLocaleString("en-US")}</div>
        </div>
        <div className="summary-holder-div">
          <div className="summary-title-div">Billable Amount</div>
          <div className="summary-amount-div">{currency.format(totalBillableAmount)}</div>
        </div>
      </div>
      {error && <div className="error-div">{error}</div>}
      {data === undefined || data.length === 0 && <div className="error-div">No data available</div>}
      <table>
        <thead className="timesheet-header">
          <tr>
            <th className="left-aligned">Name</th>
            <th className="left-aligned">Client</th>
            <th className="right-aligned">Hours</th>
            <th className="right-aligned">Billable Hours</th>
            <th className="right-aligned">Billable Amount</th>
          </tr>
        </thead>
        {renderRows()}
      </table>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string
}

export default Table;