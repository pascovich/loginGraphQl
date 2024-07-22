import { Notify } from "quasar";
import axios from "axios";
import { computed } from "vue";

// export const resetFormFields = (formFields) => {
//   for (const key in formFields) {
//     // if (formFields.hasOwnProperty(key)) {
//       formFields[key] = typeof formFields[key] === "object" ? {} : "";
//     // }
//   }
// };
export const passwordIcon = computed((inputType) => {
  return inputType.value === "password" ? "visibility_off" : "visibility";
});
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
  var test = true;
  for (let key in formFields) {
    if (typeof formFields[key] === "object") {
      hasEmptyField(formFields[key]);
    } else {
      if (formFields[key] === "") {
        test = true;
        break;
      } else {
        test = false;
      }
    }
  }
  return test;
};

export const notificationFonction = (message, type, color, position, icon) => {
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
};
export const passwordVisibility = (inputType) => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

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
