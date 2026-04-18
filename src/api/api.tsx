import axios from "axios";

export const householdApi = axios.create({
  timeout: 10000,
});
export const api = axios.create({
  timeout: 10000,
});
