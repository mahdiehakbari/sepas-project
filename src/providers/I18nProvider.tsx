"use client";

import { ReactNode } from "react";
import "../i18n"; 

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

