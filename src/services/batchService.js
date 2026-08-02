import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/batches`;

export const createBatch = async (batchData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API, batchData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};