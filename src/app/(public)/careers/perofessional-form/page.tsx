"use client";

import ProfessionalForm from "@/components/organism/careersData/PerofessionalForm";
import PublicPageTemplate from "@/components/templates/PublicPageTemplate";
import { store } from "@/lib/store";
import React, { Suspense, useState } from "react";
import { Provider } from "react-redux";

const Page = () => {
  const [isProfessionalInfoValid, setIsProfessionalInfoValid] =
    useState<boolean>(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <div className="lg:hidden">
          <PublicPageTemplate>
            <ProfessionalForm
              onValidationChange={setIsProfessionalInfoValid}
              onNext={() => {}}
            />
          </PublicPageTemplate>
        </div>
      </Provider>
    </Suspense>
  );
};

export default Page;
