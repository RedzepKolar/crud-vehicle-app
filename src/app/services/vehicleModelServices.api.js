import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

export async function fetchVehicleModelsServices() {
  try {
    const response = await axios.get(`${BASE_URL}/vehicleModels`);
    return response.data;
  } catch (error) {
    throw new Error("Error loading vehicle models.");
  }
}

export async function deleteVehicleModelServices(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/vehicleModels?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting vehicle make.");
  }
}

export async function updateVehicleModelServices(model) {
  try {
    const response = await axios.put(`${BASE_URL}/vehicleModels/${model.id}`, {
      name: model.name,
      abrv: model.abrv,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating vehicle model.");
  }
}
