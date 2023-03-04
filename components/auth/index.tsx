import { getToken } from "services";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store";
import { finishRendering } from "store/auth.slice";
import useUserInfo from "hooks/useUserInfo";

interface AuthProps {
  children: React.ReactElement;
}

export default function Auth({ children }: AuthProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUserInfo();

  const rendering = useAppSelector((state) => state.rendering);
  const dispatch = useAppDispatch();
  
  const url = ["/login", "/join"];

  useEffect(() => {
    if (getToken()) {
      queryClient.invalidateQueries(["user"]);
      if (url.includes(router.pathname))
        router.push("/");
      else
        dispatch(finishRendering());
    } else {
      if (url.includes(router.pathname))
        dispatch(finishRendering());
      else
        router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      {rendering.rendering ? <span>렌더링</span> : children}
    </>
  );
}
