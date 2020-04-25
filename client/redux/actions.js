export const authenticate = data => ({
  type: "AUTHENTICATE",
  payload: data
});

export const loadProfile = data => ({
  type: "LOAD_PROFILE",
  payload: data
});

export const updateProfile = data => ({
  type: "UPDATE_PROFILE",
  payload: data
});

export const loadHours = data => ({
  type: "LOAD_HOURS",
  payload: data
});

export const addHours = data => ({
  type: "ADD_HOURS",
  payload: data
});

export const updateHours = data => ({
  type: "UPDATE_HOURS",
  payload: data
});

export const deleteHours = data => ({
  type: "DELETE_HOURS",
  payload: data
});

export const loadReminders = data => ({
  type: "LOAD_REMINDERS",
  payload: data
});

export const addReminder = data => ({
  type: "ADD_REMINDER",
  payload: data
});

export const updateReminder = data => ({
  type: "UPDATE_REMINDER",
  payload: data
});

export const deleteReminder = data => ({
  type: "DELETE_REMINDER",
  payload: data
});

export const loadEvents = data => ({
  type: "LOAD_EVENTS",
  payload: data
});

export const addEvent = data => ({
  type: "ADD_EVENT",
  payload: data
});

export const updateEvent = data => ({
  type: "UPDATE_EVENT",
  payload: data
});

export const deleteEvent = data => ({
  type: "DELETE_EVENT",
  payload: data
});

export const loadMembers = data => ({
  type: "LOAD_MEMBERS",
  payload: data
});

export const updateMember = data => ({
  type: "UPDATE_MEMBER",
  payload: data
});

export const logout = () => ({
  type: "LOGOUT"
});
