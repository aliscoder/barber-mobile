import { AppStatusType, AppointmentInterface } from "@types";
import Api from ".";

const apptApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET ALL APPTS
    */

    getAppointments: builder.query<AppointmentInterface[], string>({
      query: (userId) => ({
        url: `/appointments/${userId}`,
        method: "GET",
      }),
      providesTags: ["Appointments"],
      keepUnusedDataFor: 30,
    }),

    /*
    GET PENDING APPTS
    */

    getPendingAppointments: builder.query<AppointmentInterface[], string>({
      query: (userId) => ({
        url: `/appointments/${userId}/pending`,
        method: "GET",
      }),
      providesTags: ["Pending"],
      keepUnusedDataFor: 30,
    }),

    /*
    GET SPECIFIC APPT
    */

    getAppointment: builder.query<AppointmentInterface, string>({
      query: (apptId) => ({
        url: `/appointments/appointment/${apptId}`,
        method: "GET",
        providesTags: ["Appointment"],
      }),
      keepUnusedDataFor: 0,
    }),

    /*
    REQUEST NEW APPT
    */

    requestAppointment: builder.mutation<AppointmentInterface, any>({
      query: (body) => ({
        url: `/appointments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments", "Schedule"],
    }),

    /*
    CHANGE APPT STATUS
    */

    changeAppointmentStatus: builder.mutation<
      AppointmentInterface,
      { apptId: string; status: AppStatusType }
    >({
      query: ({ apptId, ...body }) => ({
        url: `/appointments/appointment/${apptId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Pending", "Schedule"],
      async onQueryStarted({ apptId, status }, { dispatch, queryFulfilled }) {
        const updateApponitment = dispatch(
          apptApi.util.updateQueryData("getAppointment", apptId, (draft) => {
            Object.assign(draft, (draft.status = status));
          })
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apptApi.util.updateQueryData("getAppointments", data.barber._id!, (draft) => {
              draft.find((appt) => appt._id === data._id)!.status = data.status;
            })
          );
          dispatch(
            apptApi.util.updateQueryData("getAppointments", data.client?._id!, (draft) => {
              draft.find((appt) => appt._id === data._id)!.status = data.status;
            })
          );
        } catch {
          updateApponitment.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAppointmentQuery,
  useGetPendingAppointmentsQuery,
  useGetAppointmentsQuery,
  useChangeAppointmentStatusMutation,
  useRequestAppointmentMutation,
} = apptApi;

export default apptApi;
