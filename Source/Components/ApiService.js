import BASE_URL from "./ApiConfig";

export const getData = async (ApiEndPoint) => {
  try {
    const response = await fetch(`${BASE_URL}${ApiEndPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const postData = async (ApiEndPoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${ApiEndPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw error;
  }
};
