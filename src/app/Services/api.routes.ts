const baseURL = "https://hospital-myn-be.herokuapp.com";
const apis = {
  login: `${baseURL}/api/auth/login`,
  getLoggedAccount: `${baseURL}/api/auth/user`,
  getLoggedUserPermissions: `${baseURL}/api/auth/user/permissions`,

  // Users
  getUser: `${baseURL}/api/auth/users/{id}`,
  getAllUsers: `${baseURL}/api/auth/users`,
  saveUser: `${baseURL}/api/auth/users`,
  updateUser: `${baseURL}/api/auth/users/{id}`,

  //Media
  saveMedia: `${baseURL}/api/auth/media`,
  delete: `${baseURL}/api/auth/media/{id}`,

  //Examination
  getAllExamination: `${baseURL}/api/auth/examResults`,
  saveExamination: `${baseURL}/api/auth/examResults`,
  updateExamination: `${baseURL}/api/auth/examResults/{id}`,
  getExamination: `${baseURL}/api/auth/examResults/{id}`,

  //Appointments
  getAppointments: `${baseURL}/api/auth/appointments`,
  saveAppointment: `${baseURL}/api/auth/appointments`,
  getAppointment: `${baseURL}/api/auth/appointments/{id}`,
  updateAppointment: `${baseURL}/api/auth/appointments/{id}`,

  //Medicines
  getMedicines: `${baseURL}/api/auth/medicines`,
  saveMedicines: `${baseURL}/api/auth/medicines`,
};
export default apis;
