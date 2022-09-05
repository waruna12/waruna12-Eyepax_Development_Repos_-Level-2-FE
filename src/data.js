import clients from "./images/clients.jpg";
import resavation from "./images/resavation.jpg";
import calender from "./images/calander.jpg";

export const data = [
  {
    name: "Makeup",
    value: 10000,
  },
  {
    name: "Facial",
    value: 25000,
  },
  {
    name: "HairCut",
    value: 15000,
  },
];

export const section = [
  {
    id: 1,
    title: "Clients_Section",
    des: "Lorem ipsum dolor sit amet, conse adipiscing elit, sed do eiusmod tempor incididunt ut.",
    linkedImg: clients,
  },
  {
    id: 2,
    title: "Reservations_Section",
    des: "Lorem ipsum dolor sit amet, conse adipiscing elit, sed do eiusmod tempor incididunt ut.",
    linkedImg: resavation,
  },
  {
    id: 3,
    title: "Calendar_Section",
    des: "Lorem ipsum dolor sit amet, conse adipiscing elit, sed do eiusmod tempor incididunt ut.",
    linkedImg: calender,
  },
];

export const service_type = [
  { id: 1, title: "HairCut" },
  { id: 2, title: "MakeUp" },
  { id: 3, title: "Facial" },
];

export const timeArray = [
  {
    id: 1,
    time: "08.00 AM",
  },
  {
    id: 2,
    time: "09.00 AM",
  },
  {
    id: 3,
    time: "10.00 AM",
  },
  {
    id: 4,
    time: "11.00 AM",
  },
  {
    id: 5,
    time: "12.00 PM",
  },
  {
    id: 6,
    time: "13.00 PM",
  },
  {
    id: 7,
    time: "14.00 PM",
  },
  {
    id: 8,
    time: "15.00 PM",
  },
  {
    id: 9,
    time: "16.00 PM",
  },
];

export const event = [
  {
    title: "Big Meeting",
    // allDay: true,
    // start: new Date(2022, 8, 8),
    end: new Date(2022, 8, 8),
  },
  // {
  //   title: "Vacation",
  //   allDay: true,
  //   start: new Date(2022, 8, 10),
  //   end: new Date(2022, 8, 10),
  // },
  // {
  //   title: "Conference",
  //   allDay: true,
  //   start: new Date(2022, 11, 10),
  //   end: new Date(2022, 11, 10),
  // },
];

export const status = [
  { id: 1, title: "Todo" },
  { id: 2, title: "Complete" },
  { id: 3, title: "InProgress" },
  { id: 3, title: "Canceled" },
];

export const user_type = [
  { id: 1, user: "Super Admin" },
  { id: 2, user: "Admin" },
];
