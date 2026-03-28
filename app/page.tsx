"use client";

import axios from "axios";

export default function TestProfileUpdate() {
  const handleClick = async () => {
    try {
      const res = await axios.put("/api/user/profileUpdate", {
        username: "PPS!",
        bio: "full stack dev and DevOps engineer",
      });

    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmitLink = async () => {
    try {
      const res = await axios.post("/api/links", {
        title: "Instagram",
        url: "http://instagram.com"
      });


    } catch (err) {
      console.error(err);
    }
  };
  const handleGetLinks = async () => {
    try {
      const res = await axios.get("/api/links")

      console.log(res.data);

    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteLink = async () => {
    try {
      const res = await axios.delete("/api/links/69c7ac4de4fb41faed31a29b")
      console.log(res.data);

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <button
        onClick={handleClick}
      >Update Profile</button >
      <button
        onClick={handleSubmitLink}
      >Submit Link</button>
      <button
        onClick={handleGetLinks}
      >
        Get All Links
      </button>
      <button
        onClick={handleDeleteLink}
      >
        Delete Link
      </button>
    </>
  )
}