import { makeAutoObservable, runInAction } from "mobx";
import {
  fetchVehicleModelsServices,
  deleteVehicleModelServices,
  updateVehicleModelServices,
} from "../services/vehicleModelServices.api";

class VehicleModel {
  vehicleModels = [];

  constructor() {
    makeAutoObservable(this);
    this.loadVehicleModels();
  }

  async loadVehicleModels() {
    try {
      const data = await fetchVehicleModelsServices();
      runInAction(() => {
        this.vehicleModels = data;
      });
    } catch (error) {
      throw new Error("Error loading vehicle models.");
    }
  }

  async deleteVehicleModel(id) {
    try {
      await deleteVehicleModelServices(id);

      runInAction(() => {
        this.vehicleModels = this.vehicleModels.filter(
          (make) => make.id !== id
        );
      });
    } catch (error) {
      throw new Error("Error deleting vehicle make.", error);
    }
  }

  async updateVehicle(model) {
    try {
      await updateVehicleModelServices(model);
      const indexOfModel = this.vehicleModels.findIndex(
        (make) => make.id === model.id
      );

      if (indexOfModel !== -1) {
        runInAction(() => {
          this.vehicleModels[indexOfModel].name = model.name;
          this.vehicleModels[indexOfModel].abrv = model.abrv;
        });
      }
    } catch (error) {
      throw new Error("Error updating vehicle model: ", error);
    }
  }
}

export const vehicleModel = new VehicleModel();
