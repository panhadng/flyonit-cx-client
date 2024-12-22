"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Company {
  id: number;
  companyName: string;
  phone: string;
  webAddress: string | null;
  isActive: boolean;
  city: string;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companies`)
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">There is nothing to show</p>
      </div>
    );
  }

  const classic = true;

  if (classic) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-8">
              <Image
                src="/images/15-years.png"
                alt="15 Year Anniversary"
                width={96}
                height={96}
                className="w-auto"
              />
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Company Directory
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                  Browse through our list of registered companies
                </p>
              </div>
            </div>
            <Link
              href="/ticket/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Ticket
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/company/${company.id}/tickets`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {company.companyName}
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          company.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {company.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-400 flex-shrink-0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="ml-2 text-sm text-gray-600">
                          {company.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                {company.webAddress && (
                  <div className="px-6 pb-6">
                    <div className="flex items-center mt-2">
                      <svg
                        className="h-5 w-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a
                        href={company.webAddress}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>Hello</div>;
}
