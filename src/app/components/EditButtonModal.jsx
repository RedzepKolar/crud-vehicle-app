"use client";
import { observer } from "mobx-react";
import { useState } from "react";
import {
  showErrorNotification,
  showSuccessNotification,
} from "./ToastNotification";

const EditButtonModal = observer(({ isOpen, closeModal, model, store }) => {
  const [editedModel, setEditedModel] = useState({ ...model });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedModel((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await store.updateVehicle(editedModel);
      closeModal();
      showSuccessNotification("Item has been successfully updated.");
    } catch (error) {
      showErrorNotification("Error occured while updating.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit Vehicle Model
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">ID</label>
          <input
            type="text"
            value={editedModel.id}
            name="id"
            disabled
            className="mt-1 px-2 py-1 w-full bg-gray-100 text-gray-400 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Model</label>
          <input
            type="text"
            value={editedModel.name}
            name="name"
            onChange={handleChange}
            className="mt-1 px-2 py-1 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Abbreviation
          </label>
          <input
            type="text"
            value={editedModel.abrv}
            name="abrv"
            onChange={handleChange}
            className="mt-1 px-2 py-1 w-full border border-gray-300 rounded"
          />
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
export default EditButtonModal;
