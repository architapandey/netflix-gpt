export const getErrorMessage = (error) => {
  if (error.code === "auth/invalid-email")
    return "Please enter a valid email !";
  if (error.code === "auth/wrong-password") return "Incorrect Password !";
  return error.message;
};
