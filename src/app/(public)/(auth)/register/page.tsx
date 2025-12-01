"use client";

import RegistrationFormPage from "@/components/auth-pages/RegistrationFormPage";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../../../../lib/store";

// const page = ({params}:{params:any}) => {
// const page = ({params}:{params:any}) => {
const page = () => {
  // const { id } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <div>
          <RegistrationFormPage />
          {/* id={{id}} */}
          {/* {id} */}
        </div>
      </Provider>
    </Suspense>
  );
};

export default page;
