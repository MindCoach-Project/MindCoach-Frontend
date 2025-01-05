import React from 'react';
import { Navigate } from 'react-router-dom';
import { site_path } from "../utils"

function ProtectedRoute({ element, error }) {
   let token = localStorage.getItem('token');
   if (!token) {
      error();
      return <Navigate to={site_path.LOGIN} replace />;
   }
   return element;
}

export default ProtectedRoute;