export const publicRoutes = [
  "/",
  "/find",
  "/educational_news",
  "/inspiration",
  "/careers",
  "/careers/detail", // subpaths can be explicitly added
  "/careers/[slug]", // or handled via wildcard
  "/login",
  "/register",
  "/about-us",
  "/disclaimer",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions"
];

export const isPublicRoute = (pathname: string): boolean => {
  return publicRoutes.some((route) =>
    pathname.startsWith(route.replace(/\[.*?\]/, ""))
  );
};
