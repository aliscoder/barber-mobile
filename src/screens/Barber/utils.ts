import { AppointmentInterface } from "@types";

export type ShopStepType = {
  title: string;
  subtitle: string;
  screen: string;
};

export const ShopSteps: ShopStepType[] = [
  {
    title: "آدرس و مکانیابی",
    subtitle: "آدرس محل آرایشگاه را تکمیل کنید",
    screen: "Location",
  },
  {
    title: "برنامه کاری",
    subtitle: "برنامه کاری آرایشگاه را تکمیل کنید",
    screen: "Schedule",
  },
  { title: "خدمات", subtitle: "خدمات آرایشگاه را ویرایش کنید", screen: "Service" },
  {
    title: "درباره آرایشگاه",
    subtitle: "درباره خود و آرایشگاه چیزی بنویسید",
    screen: "About",
  },
  // {
  //   title: "دریافت لینک شخصی",
  //   subtitle: "لینک شخصی خود را بادیگران به اشتراک بگذارید",
  //   screen: "",
  // },
  {
    title: "هدیه به مشتریان",
    subtitle: "میتوانید مشتریان خود را از تخفیف ها آگاه کنید",
    screen: "Reward",
  },
  // {
  //   title: "دعوت از مشتری",
  //   subtitle: "میتواین به مشتریان خود در ازای دعوا از دوستانشان هدیه بدهید",
  //   screen: "Referral",
  // },
  {
    title: "مراقبت از نوبت",
    subtitle: "از نوبت های خود مراقبت کنید",
    screen: "Protect",
  },
];

export function apptClient(appt: AppointmentInterface) {
  if (appt.client) {
    return appt.client!;
  } else {
    return appt.guest!;
  }

  // return appt.client ?? appt.guest
}
