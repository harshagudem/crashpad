import axios from "axios";
import authHeader from './auth-header';

const API_URL = window.location.origin+"/api/users/";

class User {
    
    getUserProfile(userId : number) {
        return axios.post(API_URL + 'profile/get', { userId }, { headers: authHeader() });
    }
    updateUserProfile(userId:string | null , profileData:any, file: File | null) {
        const formData = new FormData();
        formData.append('userProfile', new Blob([JSON.stringify(profileData)], { type: 'application/json' }));
        if (file) {
          formData.append('profileImage', file);
        }

        return axios.post(API_URL + `${userId}/updateProfile`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        });
    }
        
    saveTravelerAndRvDetails(userId: number, travelerFormData: any, rvFormData: any) {
        const formData = new FormData();
        formData.append('travelerFormData', new Blob([JSON.stringify(travelerFormData)], { type: 'application/json' }));
        formData.append('rvFormData', new Blob([JSON.stringify(rvFormData)], { type: 'application/json' }));
        
        if (travelerFormData.travelerImage) {
          formData.append('travelerImage', travelerFormData.travelerImage);
        }
    
        if (rvFormData.rvImages && rvFormData.rvImages.length > 0) {
          rvFormData.rvImages.forEach((image: File) => {
            formData.append(`rvImages`, image);
          });
        }
    
        return axios.post( API_URL + `${userId}/saveTravelerAndRvDetails`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log("Response from server:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error("Error saving traveler and RV details:", error);
          throw error;
        });
    }
    getUserAccommodation(userId: number) {
      return axios.post(API_URL + 'accommodation/get', { userId }, { headers: authHeader() });
  }


  
  // Add more user-related methods as needed
}

export default new User();
