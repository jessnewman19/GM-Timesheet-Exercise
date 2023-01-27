import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

function Table({data}) {
  const [tableData, setTableData] = useState([])

  const createNewData = () => {
    if (data !== undefined)  { 
      const newDataArray = data.map(d => { 
        console.log(d.billable_rate)
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

  useEffect(() => {
    try { 
      setTableData(createNewData())
    } catch (error) { 
      throw error
    }
  }, [data])

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Client</th>
          <th>Hours</th>
          <th>Billable Hours</th>
          <th>Billable Amount</th>
        </tr>
        {tableData ? tableData.map((val, key) => {
          console.log(val)
          let percentage = Math.round(((val.billableHours / (val.billableHours + val.nonBillableHours)) * 100) * 100) / 100
          let billableAmount = Math.round((val.billableHours * val.billableRate) * 100) / 100
          let currency = new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
          })
          return (
            <tr key={key}>
              <td>{val.project}</td>
              <td>{val.client}</td>
              <td>{Math.round((val.billableHours + val.nonBillableHours) * 100) / 100}</td>
              <td>{Math.round(val.billableHours * 100) / 100} {percentage}%</td>
              <td>{val.billableHours === 0 ? "-" : currency.format(billableAmount)}</td>
            </tr>
          )
        }) : console.log('Data not set')}
      </table>
    </div>
  )
}

Table.propTypes = { 
  data: PropTypes.array,
}

export default Table;