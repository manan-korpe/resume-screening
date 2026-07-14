import { ReactNode } from "react";
import QueryProvider from "./QueryProviders";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}