import axios from "axios";

const API = "http://localhost:5000/api/batches";

export const createBatch = async (batchData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API, batchData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};