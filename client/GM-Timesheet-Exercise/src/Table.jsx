import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

function Table({data}) {
  const [tableData, setTableData] = useState([])
  const [totalHours, setTotalHours] = useState(0)
  const [totalBillableAmount, setTotalBillableAmount] = useState(0)
  const currency = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
  })

  //Manipulate original data to consolidate timesheet objects with the same project codes
  const createNewData = () => {
    let consolidatedHours = 0
    if (data !== undefined)  { 
      const newDataArray = data.map(d => { 
        consolidatedHours += d.hours
        return { 
          billable: d.billable,
          billableRate: d.billable_rate,
          client: d.client,
          billableHours: d.billable.toUpperCase() === "YES" ? d.hours : 0,
          nonBillableHours: d.billable.toUpperCase() === "NO" ? d.hours : 0,
          project: d.project,
          projectCode: d.project_code
        }
      })

      setTotalHours(consolidatedHours)

      const consolidatedData = newDataArray.reduce((accumulator, currentObj) => {
        if (accumulator !== undefined) { 
          //If the accumulator already has an object with the same project code and billable status, set existing object
          const existingObj = accumulator.find(item => item.projectCode === currentObj.projectCode)
          //will give me the existing object in the accumulator 
          if (existingObj) {
            if (currentObj.billable.toUpperCase() === 'YES') {
              if (existingObj.billableRate === 0) existingObj.billableRate = currentObj.billableRate
              existingObj.billableHours += currentObj.billableHours
            }
            if (currentObj.billable.toUpperCase() === 'NO') {
              existingObj.nonBillableHours += currentObj.nonBillableHours
            }
          } else { 
            accumulator.push(currentObj)
          }
          return accumulator
        }
      }, [])
      return consolidatedData
    }
  }

  //Set Table Data only after the data has been set
  useEffect(() => {
    try { 
      setTableData(createNewData())
    } catch (error) { 
      throw error
    }
  }, [data])

  //Helper function to round data
  const roundNumber = (num) => { 
    return (Math.round(num * 100) / 100)
  }

  //Render the rows with the timesheet data
  const renderRows = () => { 
    return tableData.map((val, key) => {
      let percentage = roundNumber((val.billableHours / (val.billableHours + val.nonBillableHours)) * 100)
      let billableAmount = roundNumber(val.billableHours * val.billableRate)
      return (
        <tbody key={key} className="timesheet-row">
          <tr>
            <td id="project-name" className="right-aligned">{val.project}</td>
            <td id="client-name" className="right-aligned">{val.client}</td>
            <td id="total-hours" className="left-aligned">{roundNumber(val.billableHours + val.nonBillableHours)}</td>
            <td id ="billable-hours" className="left-aligned">{val.billableHours === 0 ? "0.0" : roundNumber(val.billableHours)}  <span>({percentage}%)</span></td>
            <td id ="billable-amount" className="left-aligned">{val.billableHours === 0 ? "-" : currency.format(billableAmount)}</td>
          </tr>
        </tbody>
      )
    })
  }

  const calculateTotalBillableAmount = () => {
    let total = 0;
    if (tableData) { 
      tableData.forEach(val => {
        let billableAmount = roundNumber(val.billableHours * val.billableRate)
        total += billableAmount;
      })
      setTotalBillableAmount(total)
    }
  }
  
  useEffect(() => {
    try { 
      calculateTotalBillableAmount()
    } catch (error) { 
      console.log(error)
    }

  }, [tableData])

  return (
    <div>
      <div id ="summary-div">
        <div className="summary-holder-div">
          <div className="summary-title-div">Hours Tracked</div>
          <div className="summary-amount-div">{roundNumber(totalHours).toLocaleString("en-US")}</div>
        </div>
        <div className="summary-holder-div">
          <div className="summary-title-div">Billable Amount</div>
          <div className="summary-amount-div">{currency.format(totalBillableAmount)}</div>
        </div>
      </div>
      <table>
        <thead className="timesheet-header">
          <tr>
            <th className="right-aligned">Name</th>
            <th className="right-aligned">Client</th>
            <th className="left-aligned">Hours</th>
            <th className="left-aligned">Billable Hours</th>
            <th className="left-aligned">Billable Amount</th>
          </tr>
        </thead>
        {tableData ? renderRows() : console.log('DO SOMETHING HERE!')}
      </table>
    </div>
  )
}

Table.propTypes = { 
  data: PropTypes.array,
}

export default Table;