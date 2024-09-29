import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DatePicker from 'react-datepicker'

export default function OrderRoot(
  
) {
    const [startDate, setStartDate] = useState(Date.now())
  return (
    <div className="flex flex-col">
      <div className="navbar bg-base-100 p-5">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">All Orders</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}