// handleApiResponse.js
export const handleApiResponse = async apiCall => {
  try {
    const response = await apiCall;

    if (response.isSuccess) {
      return response;
    } else {
      // Handle error response (you can customize this behavior further)
      Alert.alert('Error', response.errorMessage || 'An error occurred');
      return null;
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to make the API call');
    console.error(error);
    return null;
  }
};
