'use client';

import axiosInstance from '@/lib/axios';
import Auth from '@/views/AuthenticationViews/Auth';
import React, { useEffect } from 'react';

const Page = () => {
  console.log('before useeffect ');
  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await axiosInstance.get('/employee/4', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXIiOnsiaWQiOjEsImZpcnN0TmFtZSI6IlN1cGVyIiwibGFzdE5hbWUiOiJBZG1pbiIsImVtYWlsIjoiZGNfc3VwZXJhZG1pbkBpc2EuY29tIiwiYWN0aXZlIjp0cnVlLCJyb2xlSWQiOjIsInByb2ZpbGVQaWN0dXJlVXJsIjoiaHR0cHM6Ly93Yi11cGxvYWRzLnMzLmFtYXpvbmF3cy5jb20vcHVibGljLzE3Mzk5NDk2ODA3MTAtcGluay1sb2dvLnBuZyIsInJlc2V0UGFzc3dvcmRUb2tlbiI6IjkxN2RhNWNlZDhiODQwM2UzNzRmM2RhYmI2NmI1ZjEzZThjMDUzYTMiLCJyZXNldFBhc3N3b3JkRXhwaXJlcyI6IjIwMjQtMTEtMTRUMDY6MDY6NDYuMDAwWiIsImNvbmZpcm1BY2NvdW50VG9rZW4iOm51bGwsInNpY2tsZWF2ZUNvdW50ZXIiOm51bGwsIlZhY2F0aW9uQ291bnRlciI6bnVsbCwicm9sZSI6IlN1cGVyQWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJhbm5vdW5jZW1lbnQ6cmVhZCIsImFubm91bmNlbWVudDp3cml0ZSIsImFubm91bmNlbWVudDpkZWxldGUiLCJjYW5kaWRhdGU6cmVhZCIsImNhbmRpZGF0ZTp3cml0ZSIsImNhbmRpZGF0ZTpkZWxldGUiLCJjb21wYW55OnJlYWQiLCJjb21wYW55OndyaXRlIiwiY29tcGFueTpkZWxldGUiLCJjb3VudHJ5OnJlYWQiLCJjb3VudHJ5OndyaXRlIiwiY291bnRyeTpkZWxldGUiLCJkZXBhcnRtZW50OnJlYWQiLCJkZXBhcnRtZW50OndyaXRlIiwiZGVwYXJ0bWVudDpkZWxldGUiLCJlbWVyZ2VuY3ljb250YWN0OnJlYWQiLCJlbWVyZ2VuY3ljb250YWN0OndyaXRlIiwiZW1lcmdlbmN5Y29udGFjdDpkZWxldGUiLCJlbXBsb3llZTpyZWFkIiwiZW1wbG95ZWU6d3JpdGUiLCJlbXBsb3llZTpkZWxldGUiLCJmaWxlOnJlYWQiLCJmaWxlOndyaXRlIiwiZmlsZTpkZWxldGUiLCJmb2xkZXI6cmVhZCIsImZvbGRlcjp3cml0ZSIsImZvbGRlcjpkZWxldGUiLCJqb2JhcHBsaWNhdGlvbjpyZWFkIiwiam9iYXBwbGljYXRpb246d3JpdGUiLCJqb2JhcHBsaWNhdGlvbjpkZWxldGUiLCJqb2JhcHBsaWNhdGlvbnJldmlldzpyZWFkIiwiam9iYXBwbGljYXRpb25yZXZpZXc6d3JpdGUiLCJqb2JhcHBsaWNhdGlvbnJldmlldzpkZWxldGUiLCJsb2NhdGlvbjpyZWFkIiwibG9jYXRpb246d3JpdGUiLCJsb2NhdGlvbjpkZWxldGUiLCJub3RlOnJlYWQiLCJub3RlOndyaXRlIiwibm90ZTpkZWxldGUiLCJvZmZlcjpyZWFkIiwib2ZmZXI6d3JpdGUiLCJvZmZlcjpkZWxldGUiLCJvcGVucG9zaXRpb246cmVhZCIsIm9wZW5wb3NpdGlvbjp3cml0ZSIsIm9wZW5wb3NpdGlvbjpkZWxldGUiLCJwYXltZW50OnJlYWQiLCJwYXltZW50OndyaXRlIiwicGF5bWVudDpkZWxldGUiLCJyb2xlOnJlYWQiLCJyb2xlOndyaXRlIiwicm9sZTpkZWxldGUiLCJ0aW1lb2ZmcmVxdWVzdDpyZWFkIiwidGltZW9mZnJlcXVlc3Q6d3JpdGUiLCJ0aW1lb2ZmcmVxdWVzdDpkZWxldGUiLCJ1c2VyOnJlYWQiLCJ1c2VyOndyaXRlIiwidXNlcjpkZWxldGUiLCJzdXBlcmFkbWluIiwiYWRtaW4iLCJ2aWV3b25seSIsIm1hbmFnZXIiXSwiZW1wbG95ZWVJZCI6Mn0sInJvbGUiOiJTdXBlckFkbWluIiwicGVybWlzc2lvbnMiOlsiYW5ub3VuY2VtZW50OnJlYWQiLCJhbm5vdW5jZW1lbnQ6d3JpdGUiLCJhbm5vdW5jZW1lbnQ6ZGVsZXRlIiwiY2FuZGlkYXRlOnJlYWQiLCJjYW5kaWRhdGU6d3JpdGUiLCJjYW5kaWRhdGU6ZGVsZXRlIiwiY29tcGFueTpyZWFkIiwiY29tcGFueTp3cml0ZSIsImNvbXBhbnk6ZGVsZXRlIiwiY291bnRyeTpyZWFkIiwiY291bnRyeTp3cml0ZSIsImNvdW50cnk6ZGVsZXRlIiwiZGVwYXJ0bWVudDpyZWFkIiwiZGVwYXJ0bWVudDp3cml0ZSIsImRlcGFydG1lbnQ6ZGVsZXRlIiwiZW1lcmdlbmN5Y29udGFjdDpyZWFkIiwiZW1lcmdlbmN5Y29udGFjdDp3cml0ZSIsImVtZXJnZW5jeWNvbnRhY3Q6ZGVsZXRlIiwiZW1wbG95ZWU6cmVhZCIsImVtcGxveWVlOndyaXRlIiwiZW1wbG95ZWU6ZGVsZXRlIiwiZmlsZTpyZWFkIiwiZmlsZTp3cml0ZSIsImZpbGU6ZGVsZXRlIiwiZm9sZGVyOnJlYWQiLCJmb2xkZXI6d3JpdGUiLCJmb2xkZXI6ZGVsZXRlIiwiam9iYXBwbGljYXRpb246cmVhZCIsImpvYmFwcGxpY2F0aW9uOndyaXRlIiwiam9iYXBwbGljYXRpb246ZGVsZXRlIiwiam9iYXBwbGljYXRpb25yZXZpZXc6cmVhZCIsImpvYmFwcGxpY2F0aW9ucmV2aWV3OndyaXRlIiwiam9iYXBwbGljYXRpb25yZXZpZXc6ZGVsZXRlIiwibG9jYXRpb246cmVhZCIsImxvY2F0aW9uOndyaXRlIiwibG9jYXRpb246ZGVsZXRlIiwibm90ZTpyZWFkIiwibm90ZTp3cml0ZSIsIm5vdGU6ZGVsZXRlIiwib2ZmZXI6cmVhZCIsIm9mZmVyOndyaXRlIiwib2ZmZXI6ZGVsZXRlIiwib3BlbnBvc2l0aW9uOnJlYWQiLCJvcGVucG9zaXRpb246d3JpdGUiLCJvcGVucG9zaXRpb246ZGVsZXRlIiwicGF5bWVudDpyZWFkIiwicGF5bWVudDp3cml0ZSIsInBheW1lbnQ6ZGVsZXRlIiwicm9sZTpyZWFkIiwicm9sZTp3cml0ZSIsInJvbGU6ZGVsZXRlIiwidGltZW9mZnJlcXVlc3Q6cmVhZCIsInRpbWVvZmZyZXF1ZXN0OndyaXRlIiwidGltZW9mZnJlcXVlc3Q6ZGVsZXRlIiwidXNlcjpyZWFkIiwidXNlcjp3cml0ZSIsInVzZXI6ZGVsZXRlIiwic3VwZXJhZG1pbiIsImFkbWluIiwidmlld29ubHkiLCJtYW5hZ2VyIl0sImVtcGxveWVlSWQiOjIsImlhdCI6MTc0MDE0NTc4NywiZXhwIjoxNzQwMjMyMTg3LCJqdGkiOiIxNmJmNjVmNjU3ZmI5NDNlMTA0MjRmODdjODY1OGQwNSJ9.57HfXjkDDnUtQcoEy2oJhB0gDXDzydsSQzDy4q0ulVA',
          },
        });
        console.log('Employee data got for hardcoded token: ', response.data);
      } catch (error) {
        console.log('hardcoded toke error: ', error);
      }
    };
    getEmployeeData();
  }, []);
  console.log('after useeffect ');
  return (
    <div className="h-full flex flex-col item-start  justify-start  bg-gray-100">
      <Auth />
    </div>
  );
};

export default Page;
