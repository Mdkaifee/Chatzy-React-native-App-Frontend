// /services/Api.js
const Api = {
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  GET_USER: '/api/auth/users',
  FORGOT_PASSWORD: '/api/auth/forgotPassword',
  RESET_PASSWORD: '/api/auth/resetPassword',
  RESEND_OTP: '/api/auth/resendOtp',
  SEND_MESSAGE: '/api/auth/send', // API to send a message
  GET_MESSAGES: '/api/auth/get', // API to get all messages for a user
  MARK_MESSAGE_READ: '/api/auth/messages/markRead', // API to mark message as read
  GET_UNREAD_MESSAGES_COUNT: '/api/auth/messages/unreadCount', // API to get unread messages count
};

export default Api;
