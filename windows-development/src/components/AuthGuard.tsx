import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@hooks/api/useUser";
import { MainLayout } from "@layouts/MainLayout";

export const AuthGuard = (props: PropsWithChildren) => {
  const { data: user, isLoading } = useUser();
  const { push } = useRouter();

  const { children } = props;

  useEffect(() => {
    if (!isLoading && !user) {
      push("/signIn").then();
    }
  }, [user, isLoading]);

  if (user) {
    return <MainLayout>{children}</MainLayout>;
  } else {
    return null;
  }
};
