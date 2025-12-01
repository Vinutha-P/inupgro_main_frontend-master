'use client';

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import ValidateTokenWrapper from "@/components/ValidateTokenWrapper";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ValidateTokenWrapper>{children}</ValidateTokenWrapper>
    </Provider>
  );
}