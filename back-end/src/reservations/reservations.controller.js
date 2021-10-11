const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const { Validator } = require("../../../front-end/src/utils/validate");
//CRUD
async function list(req, res) {
  if (req.query.date) {
    const reservations = await service.listByDate(req.query.date);
    return res.json({
      data: [...reservations],
    });
  } else if (req.query.mobile_number) {
    const reservations = await service.search(req.query.mobile_number);
    return res.json({
      data: [...reservations],
    });
  }
}

//VALIDATION - most imported from FN validate.js
async function validate(req, res, next) {
  let message;
  function setError(err) {
    if (err) message = err.message;
  }
  if (!req.body.data) {
    return next({
      status: 400,
      message:
        "Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
    });
  }
  if (req.body.data.status !== `booked`) {
    if (!req.body.data.status) req.body.data.status = "booked";
    else {
      return next({
        status: 400,
        message: `Invalid data format provided. ${req.body.data.status} `,
      });
    }
  }
  if (
    !Validator(req.body.data, setError) ||
    typeof req.body.data.people != "number"
  ) {
    if (!message) {
      message = "people must be a number";
    }

    return next({ status: 400, message });
  } else {
    return next();
  }
}
// list / create/ update

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function read(req, res, next) {
  const reservation = await service.read(req.params.id);
  if (!reservation)
    return next({ status: 404, message: `${req.params.id} does not exist` });
  res.json({
    data: reservation,
  });
}
//VALIDATION UPDATE
async function validateUpdate(req, res, next) {
  const { id } = req.params;
  const { status } = req.body.data;
  const reservation = await service.read(id);
  if (req.body.data.status === "unknown")
    return next({
      status: 400,
      message: `${status} status does not exist.`,
    });
  if (!reservation) {
    return next({
      status: 404,
      message: `${req.params.id} does not exist.`,
    });
  }
  if (reservation.status === "finished") {
    return next({ status: 400, message: "it has already finished." });
  }
  next();
}

async function updateValidateRes(req, res, next) {
  const { id } = req.params;
  const checkObj = {
    first_name: null,
    last_name: null,
    mobile_number: null,
    reservation_date: null,
    reservation_time: null,
    people: 0,
    status: "",
  };
  let temp = {};
  for (let key in req.body.data) {
    if (Object.keys(checkObj).includes(key)) {
      temp[key] = req.body.data[key];
    }
  }
  req.body.data = temp;
  const reservation = await service.read(id);
  if (!reservation)
    return next({ status: 404, message: `${id} does not exist` });
  next();
}

async function update(req, res) {
  const { id } = req.params;
  const { status } = req.body.data;
  const updated = await service.update(id, status);
  res.status(200).json({ data: updated });
}

async function updateReservation(req, res) {
  const { id } = req.params;
  const reservation = req.body.data;

  const updated = await service.updateReservation(id, reservation);
  res.status(200).json({ data: updated });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
  read: asyncErrorBoundary(read),
  update: [asyncErrorBoundary(validateUpdate), asyncErrorBoundary(update)],
  updateReservation: [
    asyncErrorBoundary(updateValidateRes),
    asyncErrorBoundary(validate),
    asyncErrorBoundary(updateReservation),
  ],
};
