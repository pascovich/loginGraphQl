import { Notify } from "quasar";

export const resetFormFields = (formFields) => {
  for (const key in formFields) {
    if (formFields.hasOwnProperty(key)) {
      formFields[key] = typeof formFields[key] === "object" ? {} : "";
    }
  }
};

export const hasEmptyField = (formFields) => {
  for (const key in formFields) {
    if (formFields.hasOwnProperty(key) && formFields[key] === "") {
      return true;
    }
  }
  return false;
};
export function notificationFonction(message, type, color, position, icon) {
  Notify.create({
    message: message,
    color: color, // optional, default is 'primary',
    position: position,
    type: type,
    icon: icon,
    progress: true,
    textColor: "white",
    timeout: 3000,
    actions: [{ icon: "close", color: "white" }],
  });
}
export function passwordVisibility(inputType) {
  inputType.value = inputType.value === "password" ? "text" : "password";
}
