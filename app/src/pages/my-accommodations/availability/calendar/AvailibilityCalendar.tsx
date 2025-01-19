// // import { CardContent, Typography } from "@mui/material";
// // import moment from "moment";
// // import React from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // // import Events from "./EventData";
// // import "react-big-calendar/lib/css/react-big-calendar.css";

// // import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
// // import PageContainer from "@ui/container/PageContainer";
// // import BlankCard from "@ui/shared/BlankCard";
// // import "./Calendar.css";
// // moment.locale("en-GB");
// // const localizer = momentLocalizer(moment);

// // type EvType = {
// //   title: string;
// //   allDay?: boolean;
// //   start?: Date;
// //   end?: Date;
// //   color?: string;
// // };

// const availibilities = [
//   {
//     id: "uuid1",
//     date: "2024-12-01",
//     isAvailable: true,
//     isReserved: false,
//     pricePerGuest: 50.0,
//     pricePerUnit: 100.0,
//   },
//   {
//     id: "uuid2",
//     date: "2024-12-02",
//     isAvailable: false,
//     isReserved: true,
//     pricePerGuest: 60.0,
//     pricePerUnit: 120.0,
//   },
// ];

// // const AvailabilityCalendar = () => {
// //   const processedEvents = events.map((event) => {
// //     const startDate = new Date(event.date);
// //     const endDate = new Date(event.date);
// //     endDate.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

// //     return {
// //       title: "", // Empty title if you don't want text on the event
// //       start: startDate,
// //       end: endDate,
// //       allDay: true,
// //       color: event.isAvailable ? "green" : event.isReserved ? "red" : "grey",
// //     };
// //   });

// //   const eventColors = (event: EvType) => ({
// //     style: {
// //       backgroundColor:
// //         event.color === "green"
// //           ? "#39b69a"
// //           : event.color === "red"
// //           ? "#fc4b6c"
// //           : "#d3d3d3",
// //       color: "white",
// //       borderRadius: "0px", // Ensure it spans the whole day without rounded corners
// //       border: "none",
// //     },
// //   });

// //   return (
// //     <div>
// //       <Typography variant="h4" gutterBottom>
// //         Availability Planner
// //       </Typography>
// //       <CardContent>
// //         <Calendar
// //           localizer={localizer}
// //           events={processedEvents}
// //           defaultView="month"
// //           views={["month"]} // Disable hourly views by restricting to 'month'
// //           style={{ height: 600 }}
// //           eventPropGetter={eventColors}
// //           allDayAccessor={(event) => event.allDay}
// //         />
// //       </CardContent>
// //     </div>
// //   );
// // };

// // export default AvailabilityCalendar;

// import { ChangeSet, EditingState, ViewState } from "@devexpress/dx-react-scheduler";
// import {
//   AppointmentForm,
//   Appointments,
//   AppointmentTooltip,
//   DateNavigator,
//   MonthView,
//   Scheduler,
//   Toolbar,
// } from "@devexpress/dx-react-scheduler-material-ui";
// import { Button, CardContent, styled } from "@mui/material";
// import PageContainer from "@ui/container/PageContainer";
// import BlankCard from "@ui/shared/BlankCard";
// import { useState } from "react";

// import classNames from "clsx";
// import { useAvailabilityModalStore } from "@stores/availabilityStore";
// import {
//   createAvailability,
//   InputAvailability,
// } from "@api/accommodations/availability";

// const PREFIX = "Demo";
// const classes = {
//   appointment: `${PREFIX}-appointment`,
//   greenAppointment: `${PREFIX}-greenAppointment`,
//   redAppointment: `${PREFIX}-redAppointment`,
//   greyAppointment: `${PREFIX}-greyAppointment`,
// };

// const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
//   [`&.${classes.appointment}`]: {
//     borderRadius: "8px",
//   },
//   [`&.${classes.greenAppointment}`]: {
//     backgroundColor: "#39b69a",
//     "&:hover": {
//       backgroundColor: "#32a18b",
//     },
//   },
//   [`&.${classes.redAppointment}`]: {
//     backgroundColor: "#fc4b6c",
//     "&:hover": {
//       backgroundColor: "#e44260",
//     },
//   },
//   [`&.${classes.greyAppointment}`]: {
//     backgroundColor: "#d3d3d3",
//     "&:hover": {
//       backgroundColor: "#bfbfbf",
//     },
//   },
// }));

// const Appointment = ({ data, ...restProps }) => {
//   const isAvailable = data?.isAvailable;
//   const isReserved = data?.isReserved;
//   const appointmentClass = classNames(classes.appointment, {
//     [classes.greenAppointment]: isAvailable,
//     [classes.redAppointment]: isReserved,
//     [classes.greyAppointment]: !isAvailable && !isReserved,
//   });

//   return (
//     <StyledAppointmentsAppointment
//       className={appointmentClass}
//       {...restProps}
//     />
//   );
// };

// const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(() => ({
//   height: "20px", // Adjust to your desired height
// }));

// const BigCalendar = ({ events }) => {
//   const openAvailibilityModal = useAvailabilityModalStore(
//     (state) => state.openModal
//   );
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [appointments, setAppointments] = useState([]);
//   const [editingAppointment, setEditingAppointment] = useState(null);
//   const [addedAppointment, setAddedAppointment] = useState({});
//   const [isEditing, setIsEditing] = useState(false);

//   const schedulerData = availibilities.map((event) => {
//     const startDate = new Date(event.date);
//     const endDate = new Date(event.date);
//     endDate.setHours(23, 59, 59, 999);

//     return {
//       startDate,
//       endDate,
//       title: "", // No title for visual clarity
//       isAvailable: event.isAvailable,
//       isReserved: event.isReserved,
//     };
//   });

//   const handleAddAvailability = () =>
//     openAvailibilityModal({} as InputAvailability, createAvailability, true);

//   return (
//     <PageContainer
//       title="Availability Calendar"
//       description="Manage event availability"
//     >
//       <BlankCard>
//         <CardContent>
//           <Scheduler data={schedulerData} height="auto">
//             <ViewState
//               currentDate={currentDate}
//               onCurrentDateChange={(newDate) => setCurrentDate(newDate)}
//             />
//             <MonthView timeTableCellComponent={StyledMonthViewTimeTableCell} 
              
//              />
//              <EditingState 
//              on
//                     />
//             <Toolbar />
//             <DateNavigator />
//             <Appointments appointmentComponent={Appointment}  />
//             <AppointmentTooltip showCloseButton />
//             <Button onClick={handleAddAvailability}>Add Availability</Button>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-evenly",
//                 marginTop: "10px",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div
//                   style={{
//                     width: "15px",
//                     height: "15px",
//                     backgroundColor: "#39b69a",
//                     marginRight: "5px",
//                     borderRadius: "50%",
//                   }}
//                 ></div>
//                 Available
//               </div>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div
//                   style={{
//                     width: "15px",
//                     height: "15px",
//                     backgroundColor: "#fc4b6c",
//                     marginRight: "5px",
//                     borderRadius: "50%",
//                   }}
//                 ></div>
//                 Reserved
//               </div>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div
//                   style={{
//                     width: "15px",
//                     height: "15px",
//                     backgroundColor: "#d3d3d3",
//                     marginRight: "5px",
//                     borderRadius: "50%",
//                   }}
//                 ></div>
//                 Unspecified
//               </div>
//             </div>
//           </Scheduler>
//         </CardContent>
//       </BlankCard>
//     </PageContainer>
//   );
// };

// export default BigCalendar;
