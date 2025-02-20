import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationDates } from "../assets/myFunctions";

import { makeRequest } from "../config/reducer";

export default function CarDetailPage() {
  const dispatch = useDispatch();
  const { id, ownerID } = useParams();
  const cars = useSelector((state) => state.auth.availableCars);
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const car = cars[ownerID].find((car) => Number(car.id) === Number(id));

  const [formData, setFormData] = useState({
    pickupDate: getReservationDates().pickupDate,
    returnDate: "",
    phoneNumber: "",
    minReturnDate: getReservationDates().minReturnDate,
    totalPrice: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!formData.returnDate) return;

    let currentDate = new Date();
    let returnDate = new Date(formData.returnDate);
    currentDate.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);

    let days = (returnDate - currentDate) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: 0,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: (Number(car.price) * days.toFixed()).toFixed(2),
      }));
    }
  }, [formData.returnDate, car.price]);

  const submit = (e) => {
    e.preventDefault();
    let data = {
      clientId: logedinUser.id,
      ownerId: ownerID,
      carId: id,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      totalPrice: formData.totalPrice,
      phoneNumber: formData.phoneNumber,
    };
    dispatch(makeRequest(data));
    setFormData({
      pickupDate: getReservationDates().pickupDate,
      returnDate: "",
      phoneNumber: "",
      minReturnDate: getReservationDates().minReturnDate,
      totalPrice: null,
    });
  };

  return (
    <div className="container py-3 px-2">
      <h1 style={{ fontSize: "100%" }} className="p-3 bg-red rounded">
        {car.mark} {car.model}
      </h1>
      <div className="">
        <img
          className="col-12 rounded"
          src={car.image}
          alt={car.mark + " " + car.model}
        />
        {car.description && (
          <div className="pt-3">
            <h5>Description: </h5>
            <p>{car.description}</p>
          </div>
        )}
        <div className="py-3">
          <p>
            <strong>Année de fabrication:</strong> {car.year}
          </p>
          <p>
            <strong>Kilométrage:</strong> {car.kilo} Km
          </p>
          <p>
            <strong>Type de carburant:</strong> {car.fuel}
          </p>
          <p>
            <strong>Couleur:</strong> {car.color}
          </p>
          <p>
            <strong>Prix par jour:</strong> {car.price} DH
          </p>
        </div>
      </div>

      <h2>Demander la location de ce véhicule:</h2>

      <form className="pb-5" onSubmit={submit}>
        <div className="d-flex flex-column gap-1 my-3">
          <label htmlFor="pickupDate">Date de Prise en Charge:</label>
          <input
            className="col-12 p-2"
            type="date"
            id="pickupDate"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="d-flex flex-column gap-1 my-3">
          <label htmlFor="returnDate">Date de retour:</label>
          <input
            className="col-12 p-2"
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
            min={formData.minReturnDate}
          />
        </div>

        <div className="d-flex flex-column gap-1 my-3">
          <label htmlFor="phoneNumber">Numéro de téléphone:</label>
          <input
            className="col-12 p-2"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="position-relative">
          <button type="submit" className="btn btn-red">
            envoyer la demande
          </button>
          {formData.totalPrice && (
            <strong
              style={{ right: "0px", width: "fit-content", height: "100%" }}
              className="position-absolute text-dark py-3"
            >
              Total à payer: {formData.totalPrice} DH
            </strong>
          )}
        </div>
      </form>
    </div>
  );
}
