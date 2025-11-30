import { useState, useEffect } from "react";

useEffect(() => {
  fetch("http://localhost:3000/api/me", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => setUser(data));
}, []);
