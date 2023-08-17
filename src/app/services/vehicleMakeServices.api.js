import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

export async function fetchVehicleMakes() {
  try {
    const response = await axios.get(`${BASE_URL}/vehicleMakes`);

    return response.data;
  } catch (error) {
    throw new Error("Error loading vehicle makes");
  }
}

export async function deleteVehicleMakeServices(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/vehicleMakes?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting vehicle make.");
  }
}

export async function updateVehicleServices(model) {
  try {
    const response = await axios.put(`${BASE_URL}/vehicleMakes/${model.id}`, {
      name: model.name,
      abrv: model.abrv,
    });

    return response.data;
  } catch (error) {
    throw new Error("Error updating vehicle model.");
  }
}

export async function createNewVehicleServices(model) {
  try {
    const response = await axios.post(`${BASE_URL}/vehicleMakes`, model);
    return response.data;
  } catch (error) {
    throw new Error("Error creating a new vehicle.");
  }
}
