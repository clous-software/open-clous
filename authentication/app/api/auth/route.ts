import axios, { AxiosResponse } from 'axios';

export const createPostRequest = async (userMessage: any) => {
  const response = await axios.post(`${process.env.API_URL}/api/auth/`, {
    user_message: userMessage
  });
  return response.data.response;
};

export default createPostRequest;

export const createUser = async (userMessage: any) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/api/users/`, { user_message: userMessage });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear un usuario a través de la API.');
  }
};


export const getUserById = async (userId: any) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/users/${userId}/`);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error al obtener el usuario con ID ${userId}:`, error);
    throw new Error(`Error al obtener el usuario con ID ${userId}`);
  }
};

export const updateUser = async (userId: any, updatedData: any) => {
  try {
    // Asumimos que updatedData ya contiene el campo 'status' correcto
    const dataToSend = {
      ...updatedData
    };

    const response = await axios.put(`${process.env.API_URL}/api/users/${userId}/`, dataToSend);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el trabajo con ID ${userId}:`, error);
    throw new Error(`Error al actualizar el trabajo con ID ${userId}`);
  }
};


{/*export const getAllUsers = async (): Promise<any> => {
/*   console.log(`Making request to: ${process.env.API_URL}/job_list/`);
   try {
    const response: AxiosResponse<any> = await axios.get(`${process.env.API_URL}/api/job_list/`);
    const usersData = response.data; // Accede a la propiedad data de la respuesta
    return usersData;
  } catch (error) {
    console.error('Error al obtener detalles del listado de trabajos:', error);
    throw new Error('Error al obtener detalles del listado de trabajos');
  }
};*/}


export const handleDeleteUser = async (userId: string) => {
  try {
    // Make an API call to delete the job
    await axios.delete(`${process.env.API_URL}/api/users/${userId}/`);

    console.log(`User with ID ${userId} deleted successfully.`);

    // Here, you might want to update your state or trigger a re-fetch
    // to reflect the changes in the UI.
  } catch (error) {
    console.error(`Error deleting job with ID ${userId}:`, error);
    // Handle error as needed
  }
};