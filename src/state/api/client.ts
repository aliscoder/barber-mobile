import { BarberInterface, FilterType, ReviewType, SearchType, ServiceType } from "@types";
import Api from ".";

const clientApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    FILTER BARBERS FROM CLIENT VIEW
    */

    filterBarbers: builder.mutation<BarberInterface[], FilterType>({
      query: ({ filter, location, gender }) => ({
        url: `/client/barbers/filter`,
        method: "POST",
        body: { filter, location, gender },
      }),
    }),

    /*
    SEARCH BARBERS FROM CLIENT VIEW
    */

    searchBarbers: builder.mutation<BarberInterface[], SearchType>({
      query: ({ search, gender, location }) => ({
        url: `/client/barbers/search`,
        method: "POST",
        body: { search, gender, location },
      }),
    }),

    /*
    GET SPECIFIC BARBER
    */

    getBarber: builder.query<BarberInterface, string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}`,
        method: "GET",
      }),
    }),

    /*
    ADD BARBER TO CLIENT BARBER LIST
    */

    addBarber: builder.mutation<
      { barber: Partial<BarberInterface>; removeMode: boolean },
      { barberId: string; clientId: string; removeMode: boolean }
    >({
      query: ({ barberId, clientId, removeMode }) => ({
        url: `/client/barbers/${barberId}/add`,
        method: "POST",
        body: { clientId, removeMode },
      }),
    }),

    /*
    GET BARBER INFO
    */

    getBarberInfo: builder.query<Partial<BarberInterface>, string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/info`,
        method: "GET",
      }),
    }),

    /*
    GET BARBER SERVICES
    */

    getBarberServices: builder.query<ServiceType[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/services`,
        method: "GET",
      }),
    }),

    /*
    GET BARBER REVIEWS
    */

    getBarberReviews: builder.query<ReviewType[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/reviews`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    /*
    REVIEW A BARBER
    */

    reviewBarber: builder.mutation<
      { comment: ReviewType },
      { barberId: string; review: ReviewType }
    >({
      query: ({ barberId, review }) => ({
        url: `/client/barbers/${barberId}/reviews`,
        method: "POST",
        body: { review },
      }),
      invalidatesTags: ["Reviews"],
    }),

    /*
    GET BARBER PHOTO SAMPLES
    */

    getBarberSamples: builder.query<string[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/samples`,
        method: "GET",
      }),
    }),

    /*
    UPDATE CLIENT PROFILE
    */

    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/client/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetBarberInfoQuery,
  useGetBarberReviewsQuery,
  useGetBarberQuery,
  useGetBarberSamplesQuery,
  useGetBarberServicesQuery,
  useReviewBarberMutation,
  useFilterBarbersMutation,
  useSearchBarbersMutation,
  useAddBarberMutation,
} = clientApi;

export default clientApi;
