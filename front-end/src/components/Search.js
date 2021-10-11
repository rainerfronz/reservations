import React, { useState } from "react";
import { searchReservation } from "../utils/api";
import { mobileValidate } from "../utils/validate";

import Reservation from "./Reservation";
//search by phone state User Story #7
export default function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [submit, setSubmit] = useState(false);
  const phoneNumberChange = (event) => {
    let numberValidation = event.target.value;
    numberValidation = mobileValidate(
      numberValidation,
      numberValidation.length
    );
    event.target.value = numberValidation;
    setPhoneNumber(numberValidation);
  };

  const Submit = (event) => {
    event.preventDefault();
    searchReservation(phoneNumber)
      .then((data) => {
        setReservations(data);
      })
      .then(setSubmit(true));
  };

  return (
    <div>
      <h2>Search</h2>
      <form name="reservation" onSubmit={Submit}>
        <input
          className="form-control col-sm-6 col-md-5 col-lg-3"
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={phoneNumberChange}
          value={phoneNumber}
        ></input>
        <button type="submit" className="btn btn-primary mt-2">
          Find
        </button>
      </form>
      {submit ? (
        reservations.length ? (
          <div>
            {reservations.map((reservation) =>
              reservation.status === " finished" ? null : (
                <Reservation data={reservation} />
              )
            )}
          </div>
        ) : (
          <div> No reservations found</div>
        )
      ) : null}
    </div>
  );
}