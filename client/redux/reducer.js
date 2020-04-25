import { combineReducers } from "redux";

export const INITIAL_STATE = {
  authenticated: null,
  profile: {
    _id: "",
    email: "",
    password: "",
    name: "",
    thumbnail: "",
    position: -1
  },
  hours: null,
  reminders: null,
  events: null,
  members: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      // console.log("Authenticating: " + JSON.stringify(action.payload));
      return { ...state, authenticated: action.payload };

    case "LOAD_PROFILE":
      // console.log("Loading Profile: " + JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    case "UPDATE_PROFILE":
      // console.log("Updating Profile: " + JSON.stringify(action.payload));
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case "LOAD_HOURS":
      // console.log(
      //   "Loading Hours: " +
      //     JSON.stringify(
      //       JSON.parse(JSON.stringify(action.payload)).map(hour => {
      //         hour.attachments = hour.attachments.length;
      //         return hour;
      //       })
      //     )
      // );
      return { ...state, hours: action.payload };
    case "ADD_HOURS":
      // console.log("Adding Hours: " + JSON.stringify(action.payload));
      return { ...state, hours: [...state.hours, action.payload] };
    case "DELETE_HOURS":
      // console.log("Deleting Hours: " + JSON.stringify(action.payload));
      return {
        ...state,
        hours: state.hours.filter(hour => hour._id !== action.payload)
      };
    case "UPDATE_HOURS":
      // console.log("Updating Hours: " + JSON.stringify(action.payload));
      return {
        ...state,
        hours: state.hours.map(hour =>
          hour._id === action.payload._id
            ? { ...hour, ...action.payload }
            : hour
        )
      };

    case "LOAD_REMINDERS":
      // console.log("Loading Reminders: " + JSON.stringify(action.payload));
      return { ...state, reminders: action.payload };
    case "ADD_REMINDER":
      // console.log("Adding Reminder: " + JSON.stringify(action.payload));
      return { ...state, reminders: [...state.reminders, action.payload] };
    case "DELETE_REMINDER":
      // console.log("Deleting Reminder: " + JSON.stringify(action.payload));
      return {
        ...state,
        reminders: state.reminders.filter(
          reminder => reminder._id !== action.payload
        )
      };
    case "UPDATE_REMINDER":
      // console.log("Updating Reminder: " + JSON.stringify(action.payload));
      return {
        ...state,
        reminders: state.reminders.map(reminder =>
          reminder._id === action.payload._id
            ? { ...reminder, ...action.payload }
            : reminder
        )
      };

    case "LOAD_EVENTS":
      // console.log(
      //   "Loading Events: " +
      //     JSON.stringify(
      //       JSON.parse(JSON.stringify(action.payload)).map(event => {
      //         event.attachments = event.attachments.length;
      //         return event;
      //       })
      //     )
      // );
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      // console.log("Adding Event: " + JSON.stringify(action.payload));
      return { ...state, events: [...state.events, action.payload] };
    case "DELETE_EVENT":
      // console.log("Deleting Event: " + JSON.stringify(action.payload));
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      };
    case "UPDATE_EVENT":
      // console.log("Updating Event: " + JSON.stringify(action.payload));
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id
            ? { ...event, ...action.payload }
            : event
        )
      };

    case "LOAD_MEMBERS":
      // console.log("Loading Members: " + JSON.stringify(action.payload));
      return { ...state, members: action.payload };
    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map(member => {
          if (member._id === action.payload._id)
            member.position = action.payload.position;
          return member;
        })
      };

    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer
});
