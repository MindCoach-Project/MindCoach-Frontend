// src/utils/validation.js

export const validateEmail = (email) => {
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    return "";
  };
  
  export const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must have at least 8 characters, including letters, numbers, and special characters.";
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      return "Password must have at least 8 characters, including letters, numbers, and special characters.";
    }
    return "";
  };
  
  export const validateUsername = (username) => {
    if (!username.trim()) return "Username is required.";
    if (username.length < 2) return "Username must have at least 2 characters.";
    return "";
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "Confirm Password is required.";
    if (password !== confirmPassword) return "Confirm Password does not match.";
    return "";
  };
  
  export const validateLoginForm = ({ email, password }) => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
    };
  };
  
  export const validateRegisterForm = ({ username, email, password, confirmPassword }) => {
    return {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
  };


  