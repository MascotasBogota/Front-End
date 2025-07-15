import reportApi from "./httpClients/reportApi";

export const imageService = {
  uploadImage: (imageData) => reportApi.post("/images/upload", imageData),
};
