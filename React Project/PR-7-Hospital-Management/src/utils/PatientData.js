
export const getStorageData = () => {
  return JSON.parse(localStorage.getItem("PatientList")) || [];
};

export const setStorageData = (data) => {
  localStorage.setItem("PatientList", JSON.stringify(data));
};
