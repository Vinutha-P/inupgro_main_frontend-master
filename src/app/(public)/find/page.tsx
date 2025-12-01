"use client"


import FindPage from "@/components/pages/FindPage";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

const page = () => {
  return (
    <Provider store={store}>
      <FindPage />
      
    </Provider>
  );
};

export default page;
