import { makeAutoObservable, runInAction } from "mobx";
import {
  fetchVehicleMakes,
  deleteVehicleMakeServices,
  updateVehicleServices,
  createNewVehicleServices,
} from "../services/vehicleMakeServices.api";
import { carMakes } from "../helpers/carMakes";

class VehicleMake {
  vehicleMakes = [];

  constructor() {
    makeAutoObservable(this);
    this.loadVehicleMakes();
  }

  async loadVehicleMakes() {
    try {
      const data = await fetchVehicleMakes();
      runInAction(() => {
        this.vehicleMakes = data;
      });
    } catch (error) {
      throw new Error("Error loading vehicle makes", error);
    }
  }

  setAllAvailableCarMakes() {
    let carMakesList = carMakes;
    carMakesList = carMakesList.filter((item) => {
      const vehicleFound = this.vehicleMakes.find(
        (vehicle) => vehicle.name == item.name
      );
      if (!vehicleFound) return true;
    });
    return carMakesList;
  }

  async deleteVehicleMake(id) {
    try {
      await deleteVehicleMakeServices(id);

      runInAction(() => {
        this.vehicleMakes = this.vehicleMakes.filter((make) => make.id !== id);
      });
    } catch (error) {
      throw new Error("Error deleting vehicle make.");
    }
  }

  async updateVehicle(model) {
    try {
      await updateVehicleServices(model);

      const indexOfModel = this.vehicleMakes.findIndex(
        (make) => make.id === model.id
      );

      if (indexOfModel !== -1) {
        runInAction(() => {
          this.vehicleMakes[indexOfModel].name = model.name;
          this.vehicleMakes[indexOfModel].abrv = model.abrv;
        });
      }
    } catch (error) {
      throw new Error("Error updating vehicle make.");
    }
  }

  async createNewVehicle(model) {
    try {
      const maxId = Math.max(...this.vehicleMakes.map((vehicle) => vehicle.id));
      const newModel = {
        id: maxId + 1,
        name: model.name,
        abrv: model.abrv,
      };

      await createNewVehicleServices(newModel);
      runInAction(() => {
        this.vehicleMakes.push(newModel);
      });
    } catch (error) {
      throw new Error("Error creating a new vehicle.");
    }
  }
}

export const vehicleMake = new VehicleMake();
