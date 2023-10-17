import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { getClient } from "../queryClient";
import Gnb from "../components/gnb";
import { worker } from '../mocks/browser';
import { RecoilRoot } from "recoil";

const Layout: React.FC = () => {
  const queryClient = getClient();
  if (import.meta.env.DEV) {
    worker.start()
  }
  
  return (
    <RecoilRoot> 
      <QueryClientProvider client={queryClient} >
        <Gnb />
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  ); 
};

export default Layout;