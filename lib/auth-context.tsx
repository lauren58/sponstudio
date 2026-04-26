"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<{
  session: Session | null;
  isLoggedIn: boolean;
  isBrand: boolean;
  isPodcaster: boolean;
  loading: boolean;
}>({
  session: null,
  isLoggedIn: false,
  isBrand: false,
  isPodcaster: false,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const role = session?.user?.user_metadata?.role;

  return (
    <AuthContext.Provider value={{
      session,
      isLoggedIn: !!session,
      isBrand: role === "brand",
      isPodcaster: role === "podcaster",
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
