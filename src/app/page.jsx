"use client";
import { observer } from "mobx-react";
import { vehicleMake } from "./stores/VehicleMake";
import { useRouter } from "next/navigation";
import EditButtonModal from "./components/EditButtonModal";
import { useState } from "react";
import CreateNewMakeModal from "./components/CreateNewMakeModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import {
  showErrorNotification,
  showSuccessNotification,
} from "./components/ToastNotification";
import dynamic from "next/dynamic";

const LazyTableComponent = dynamic(() => import("./components/TableComponent"));

const Home = observer(() => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVehicleForDelete, setSelectedVehicleForDelete] =
    useState(null);

  const handleDeleteButtonModal = (vehicle) => {
    setSelectedVehicleForDelete(vehicle);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteButton = async () => {
    try {
      await vehicleMake.deleteVehicleMake(selectedVehicleForDelete.id);
      showSuccessNotification("Vehicle make has been successfully deleted.");
      setSelectedVehicleForDelete(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      showErrorNotification("Error occured while deleting a vehicle make.");
    }
  };

  const router = useRouter();
  const handleViewButtonClick = (vehicleName) => {
    router.push(`/components/vehicle-models?make=${vehicleName}`);
  };

  const handleEditButton = async (id) => {
    try {
      const model = await vehicleMake.vehicleMakes.find(
        (make) => make.id === id
      );
      setSelectedModel(model);
      setIsEditModalOpen(true);
    } catch (error) {
      showErrorNotification("Error occured.");
    }
  };

  const openCreateModal = () => {
    vehicleMake.setAllAvailableCarMakes();
    setIsModalCreateOpen(true);
  };
  const clonedData = [...vehicleMake.vehicleMakes];

  return (
    <>
    
      <LazyTableComponent
        isAddNewButtonVisible={true}
        isSearchInputVisible={true}
        isViewButtonVisible={true}
        openModal={openCreateModal}
        data={clonedData}
        onViewButtonClick={handleViewButtonClick}
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

      {isEditModalOpen && (
        <EditButtonModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          model={selectedModel}
          store={vehicleMake}
        />
      )}
      {isModalCreateOpen && (
        <CreateNewMakeModal
          isOpen={isModalCreateOpen}
          carMakes={vehicleMake.setAllAvailableCarMakes()}
          closeModal={() => setIsModalCreateOpen(false)}
        />
      )}
    </>
  );
});

export default Home;
