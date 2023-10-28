import {
  AppointmentInterface,
  BarberInterface,
  ClientInterface,
  DiscountType,
  GenderType,
  Message,
  ServiceType,
  WorkTimeType,
} from "@types";

import Api from ".";

const barberApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    COMPLETE SHOP DETAILS (ADDRESS , ...)
    */

    completeShopDetails: builder.mutation<BarberInterface, Partial<BarberInterface>>({
      query: (body) => ({
        url: `/barber/shop/details`,
        method: "POST",
        body,
      }),
    }),

    /*
    COMPLETE SHOP SCHEDULE
    */

    completeShopSchedule: builder.mutation<
      BarberInterface,
      {
        barberId: string;
        workTimes: WorkTimeType[];
      }
    >({
      query: (body) => ({
        url: `/barber/shop/schedule`,
        method: "POST",
        body,
      }),
    }),

    /*
    ADD SHOP SERVICE
    */

    addOrEditShopService: builder.mutation<
      BarberInterface,
      {
        barberId: string;
        service: ServiceType;
      }
    >({
      query: (body) => ({
        url: `/barber/shop/service`,
        method: "POST",
        body,
      }),
    }),

    /*
    DELETE SHOP SERVICE
    */

    deleteShopService: builder.mutation<BarberInterface, { barberId: string; serviceId: string }>({
      query: (body) => ({
        url: `/barber/shop/service`,
        method: "DELETE",
        body,
      }),
    }),

    /*
    UPDATE BIO
    */

    updateShopBio: builder.mutation<any, any>({
      query: (body) => ({
        url: "/barber/shop/bio",
        method: "POST",
        body,
      }),
    }),

    /*
    ADD DISCOUNT
    */

    addDiscount: builder.mutation<BarberInterface, { barberId: string; discount: DiscountType }>({
      query: (body) => ({
        url: `/barber/shop/discount`,
        method: "POST",
        body,
      }),
    }),

    /*
    TOGGLE DISCOUNT ACTIVITY
    */

    toggleDiscount: builder.mutation<BarberInterface, { barberId: string; discountId: string }>({
      query: (body) => ({
        url: `/barber/shop/discount`,
        method: "PUT",
        body,
      }),
    }),

    /*
    GET BARBER MESSAGES
    */

    getMessages: builder.query<Message[], string>({
      query: (barberId) => ({
        url: `barber/broadcast/${barberId}`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),

    /*
    SEND BARBER MESSAGE
    */

    broadcastMessage: builder.mutation<Message, { barber: string; body: string }>({
      query: (body) => ({
        url: "barber/broadcast",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),

    /*
    GET BARBER SCHEDULE FOR SPECIFIC DAY
    */

    getSchedule: builder.query<AppointmentInterface[], { barberId: string; day: number }>({
      query: ({ barberId, day }) => ({
        url: `/barber/get_schedule/${barberId}/${day}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
      keepUnusedDataFor: 0,
    }),

    /*
    ADD GUEST CLIENT
    */

    addClient: builder.mutation<
      Partial<ClientInterface>,
      { barberId: string; name: string; phone: string; gender: GenderType }
    >({
      query: (body) => ({
        url: `/barber/add_client`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCompleteShopDetailsMutation,
  useCompleteShopScheduleMutation,
  useAddOrEditShopServiceMutation,
  useDeleteShopServiceMutation,
  useUpdateShopBioMutation,
  useAddDiscountMutation,
  useToggleDiscountMutation,
  useBroadcastMessageMutation,
  useGetMessagesQuery,
  useGetScheduleQuery,
  useAddClientMutation,
} = barberApi;

export default barberApi;
