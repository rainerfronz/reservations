import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import Reservation from "./Reservation";
import Table from "./Table";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
//state lifted - reservations, tables User Story 1.2 User 2
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const theDate = query.get("date");
  const history = useHistory();
//useEffect doc call load date on dashboard
  useEffect(() => {
    if (!theDate) history.push(`/dashboard?date=${date}`);
  }, [query, history, theDate, date]);
  useEffect(loadDashboard, [date, history, theDate]);
  //api call reservation
  useEffect(() => {
    const abortController = new AbortController();
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
  }, [tables]);

  function loadDashboard() {
    if (theDate !== date) {
      history.push(`/dashboard?date=${date}`);
    }
    const abortController = new AbortController();
    const abortController2 = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController2.signal).then(setTables);
    return () => abortController.abort();
  }
//date change function
  function changeDateUrl(scalar) {
    const temp = date.split("-");
    const newDate = new Date(
      Number(temp[0]),
      Number(temp[1]) - 1,
      Number(temp[2]) + scalar
    )
      .toISOString()
      .split("T")[0];
    history.push(`/dashboard?date=${newDate}`);
  }
  
  return (
    <main>
        <div className="center">
      <h1>Dashboard</h1>
      <div className="ml-2">
      <button
          onClick={() => {
            changeDateUrl(-1);
          }}
          className="btn btn-secondary mr-2"
        >
          Previous
        </button>
      <button
          onClick={() => {
            history.push(`/dashboard`);
          }}
          className="btn btn-info mr-2"
        >
          Today
        </button>
        <button
          onClick={() => {
            changeDateUrl(1);
          }}
          className="btn btn-primary mr-2"
        >
          Next
        </button>
        </div>
        
      </div>
      <div className="d-md-flex mb-3"></div>
      <ErrorAlert error={reservationsError} />
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <h4 className="mb-0">Reservations for date: {date}</h4>
          {reservations.map((reservation) =>
            reservation.status === "finished" ||
            reservation.status === "cancelled" ? null : (
              <Reservation
                data={reservation}
                setReservations={setReservations}
                date={date}
              />
            )
          )}
        </div>
        <div className="col-md-6 col-sm-12">
          <h4>Tables</h4>
          {tables.map((table) => (
              
            <Table data={table} setTables={setTables} />
            
          ))}
          
        </div>
      </div>
     
    </main>
  );
}

export default Dashboard;