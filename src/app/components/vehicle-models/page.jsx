"use client";
import { observer } from "mobx-react";
import { useSearchParams } from "next/navigation";
import { vehicleModel } from "@/app/stores/VehicleModel";
import { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import EditButtonModal from "../EditButtonModal";
import LoaderSpinner from "../LoaderSpinner";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../ToastNotification";

const VehicleModels = observer(() => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedModelState, setSelectedModelState] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVehicleForDelete, setSelectedVehicleForDelete] =
    useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const params = useSearchParams().get("make");

  let selectedModel = [];
  selectedModel = vehicleModel.vehicleModels.filter(
    (model) => model.makeId === params
  );
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <LoaderSpinner />;
  }

  const handleDeleteButtonModal = (vehicle) => {
    setSelectedVehicleForDelete(vehicle);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteButton = async () => {
    try {
      await vehicleModel.deleteVehicleModel(selectedVehicleForDelete.id);
      setSelectedVehicleForDelete(null);
      setIsDeleteModalOpen(false);
      showSuccessNotification("Model has been successfully deleted.");
    } catch (error) {
      showErrorNotification("An error occured while deleting a model.");
    }
  };

  if (!selectedModel || selectedModel.length === 0) {
    return (
      <div className="flex items-start justify-center h-screen mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            No model found for the selected vehicle make.
          </h1>
          <p className="text-center text-gray-600">
            Please select a valid vehicle make or try again later.
          </p>
        </div>
      </div>
    );
  }

  const handleEditButton = (id) => {
    const model = vehicleModel.vehicleModels.find((make) => make.id === id);
    setSelectedModelState(model);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="p-10">
        <h2 className="flex items-center justify-center text-xl font-semibold">
          {params} car model(s){" "}
        </h2>
        <TableComponent
          data={selectedModel}
          onEditButtonClick={handleEditButton}
          onDeleteButtonClick={handleDeleteButtonModal}
        />
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            vehicle={selectedVehicleForDelete}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleDeleteButton()}
          />
        )}
      </div>
      {isEditModalOpen && (
        <EditButtonModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          model={selectedModelState}
          store={vehicleModel}
        />
      )}
    </>
  );
});

export default VehicleModels;
