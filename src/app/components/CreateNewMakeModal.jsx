"use client";
import { observer } from "mobx-react";
import { useState } from "react";
import { vehicleMake } from "../stores/VehicleMake";
import {
  showErrorNotification,
  showSuccessNotification,
} from "./ToastNotification";

const CreateNewMakeModal = observer(({ carMakes, isOpen, closeModal }) => {
  const [selectedMake, setSelectedMake] = useState("");

  const handleMakeChange = (event) => {
    const selectedValue = carMakes.find((item) => {
      return item.name === event.target.value;
    });
    setSelectedMake(selectedValue);
  };

  const handleSave = async () => {
    const newVehicle = {
      name: selectedMake.name,
      abrv: selectedMake.abrv,
    };
    try {
      await vehicleMake.createNewVehicle(newVehicle);
      showSuccessNotification(
        "You have successfully added a new vehicle make."
      );
    } catch (error) {
      showErrorNotification(
        "An error occured while creating a new vehicle make."
      );
    }
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-10 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Create Vehicle Model</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium">
            Name of car make:
          </label>
          <select
            id="carMakeDropdown"
            value={selectedMake.name}
            onChange={handleMakeChange}
            className="border border-gray-300 mt-2 p-1 w-full"
          >
            <option>Select car make</option>
            {carMakes.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleSave}
          >
            Okay
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
export default CreateNewMakeModal;
