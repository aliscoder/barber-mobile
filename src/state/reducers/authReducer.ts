import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import barberApi from "@state/api/barber";
import clientApi from "@state/api/client";
import sharedApi from "@state/api/shared";
import { AuthUserInterface, CoordType, DecodedTokenType } from "@types";
import { theme } from "@utils";
import { LocationObject } from "expo-location";
import { ITheme } from "native-base";

export interface AuthProps {
  user: AuthUserInterface;
  theme: ITheme;
  isBarber: boolean;
}
const initialState: AuthProps = {
  user: null,
  theme: theme,
  isBarber: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<DecodedTokenType | null>) => {
      state.user = payload ? payload.user : null;
      state.theme = theme;
      state.isBarber = payload ? payload.user.isBarber : false;
    },
    updateUser: (state, { payload }: PayloadAction<DecodedTokenType>) => {
      state.user = payload.user;
    },

    logoutUser: (state) => {
      state.user = null;
      state.theme = theme;
    },
  },

  extraReducers: (builder) => {
    /*
    ADD BARBER MATCHER
    */

    builder.addMatcher(clientApi.endpoints.addBarber.matchFulfilled, (state, { payload }) => {
      if (payload.removeMode) {
        //@ts-ignore
        state.user.barbers = state.user?.barbers.filter(
          (barber) => barber._id !== payload.barber._id
        );
      } else {
        state.user?.barbers.push(payload.barber);
      }
    });

    /*
    UPDATE CLIENT PROFILE MATCHER
    */

    builder.addMatcher(clientApi.endpoints.updateProfile.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });

    /*
    ADD SAMPLE 
    */

    builder.addMatcher(sharedApi.endpoints.addSample.matchFulfilled, (state, { payload }) => {
      state.user?.samples.unshift(payload);
    });

    /*
    REMOVE SAMPLE 
    */

    builder.addMatcher(sharedApi.endpoints.deleteSample.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user.samples = state.user?.samples.filter((sample) => sample !== payload);
    });

    builder.addMatcher(
      barberApi.endpoints.completeShopDetails.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(
      barberApi.endpoints.completeShopSchedule.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(
      barberApi.endpoints.addOrEditShopService.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(
      barberApi.endpoints.deleteShopService.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(barberApi.endpoints.addClient.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user.clients.push(payload);
    });

    builder.addMatcher(barberApi.endpoints.updateShopBio.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });

    builder.addMatcher(barberApi.endpoints.addDiscount.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });
    builder.addMatcher(barberApi.endpoints.toggleDiscount.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });
  },
});

export const { loginUser, logoutUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
