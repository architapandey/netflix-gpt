import React from "react";

export const ValidateData = (email, password) => {
  const isValidemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isValidpassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidemail) return "Email is not Vlaid";
  if (!isValidpassword) return "Password is not Valid";

  return null;
};

export default ValidateData;
