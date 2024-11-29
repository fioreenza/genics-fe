import localFont from "next/font/local";

export const kumbh = localFont({
  src: [
    {
      path: "../../public/fonts/KumbhSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/KumbhSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-kumbh",
});
