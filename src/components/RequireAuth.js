import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { supabase } from './supabaseClient'

export function RequireAuth({ children }) {
    //let auth = useAuth();
    let location = useLocation();
    let auth = supabase.auth.user()
    console.log(auth)
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }