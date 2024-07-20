import { Notify } from "quasar";
import axios from "axios";

// export const resetFormFields = (formFields) => {
//   for (const key in formFields) {
//     // if (formFields.hasOwnProperty(key)) {
//       formFields[key] = typeof formFields[key] === "object" ? {} : "";
//     // }
//   }
// };
export const resetFormFields = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      emptyObject(obj[key]);
    } else {
      obj[key] = "";
    }
  }
};
export const hasEmptyField = (formFields) => {
  for (let key in formFields) {
    if (typeof formFields[key] === "object") {
      hasEmptyField(formFields[key]);
    } else {
      if (formFields[key] === "") {
        return true;
      }
      return false;
    }
  }
};

export function notificationFonction(message, type, color, position, icon) {
  Notify.create({
    message,
    color,
    position,
    type,
    icon,
    progress: true,
    textColor: "white",
    timeout: 3000,
    actions: [{ icon: "close", color: "white" }],
  });
}
// export function passwordVisibility(inputType) {
//   inputType.value = inputType.value === "password" ? "text" : "password";
// }

export const insertQuery = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const LoadingLife = async (loading, timeout) => {
  await setTimeout(() => {
    loading = false;
  }, timeout);
};
