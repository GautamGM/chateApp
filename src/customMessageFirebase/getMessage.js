const firebaseAuthErrorMessages = {
    "auth/invalid-credential": "The email address is invalid. Please enter a valid email.",
    "auth/user-disabled": "This account has been disabled. Contact support for assistance.",
    "auth/user-not-found": "No user found with this email. Please check and try again.",
    "auth/wrong-password": "The password is incorrect. Please try again.",
    "auth/email-already-in-use": "The email address is already in use by another account.",
    "auth/weak-password": "The password is too weak. Please use a stronger password.",
    "auth/operation-not-allowed": "This operation is not allowed. Contact support for more details.",
    "auth/too-many-requests": "Too many login attempts. Please try again later.",
    "auth/requires-recent-login": "This action requires recent login. Please log in again.",
    "auth/network-request-failed": "Network error occurred. Please check your connection and try again.",
    "auth/popup-closed-by-user": "The sign-in popup was closed before completing the login. Try again.",
    "auth/cancelled-popup-request": "Another popup is already open. Please close it and try again.",
    "auth/account-exists-with-different-credential":
      "An account already exists with the same email address but different sign-in credentials.",
  };
  
  export const getReadableAuthErrorMessage = (firebaseErrorCode) => {
    return (
      firebaseAuthErrorMessages[firebaseErrorCode] ||
      "An unexpected error occurred. Please try again later."
    );
  };
  