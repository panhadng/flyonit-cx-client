"use client";

import React, { useState } from "react";
import Image from "next/image";

const Ticket = () => {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
  });
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setNotification({
          type: "success",
          message: "Ticket submitted successfully!",
        });
        setFormData({
          email: "",
          title: "",
          description: "",
        });
        setTimeout(() => {
          setNotification({ type: null, message: "" });
        }, 5000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setNotification({
          type: "error",
          message: "Error submitting ticket. Please try again.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      {notification.type && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md animate-fade-in ${
            notification.type === "success"
              ? "bg-green-100 border-l-4 border-green-500 text-green-700"
              : "bg-red-100 border-l-4 border-red-500 text-red-700"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="w-full h-auto max-w-full max-h-screen lg:w-[700px] lg:h-[700px] mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Company Logo"
            width={256}
            height={256}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Ticket
          </h1>
          <p className="text-gray-600 mt-2">
            Please fill out the form below to submit your ticket
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md h-32 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ticket;
