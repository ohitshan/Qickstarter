import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { authUserAsync } from "../../Slices/userSlice";

export default function Auth(
  SpecificComponent: React.FC,
  option: boolean | null,
  admin = null
) {
  function AuthenticationCheck() {
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
      dispatch(authUserAsync()).then((res: any) => {
        if (!res.payload.isAuth) {
          if (option) {
            Navigate("/login");
          }
        } else {
          if (admin && !res.payload.isAdmin) {
            Navigate("/");
          } else {
            if (option === false) {
              Navigate("/");
            }
          }
        }
      });
    }, [Navigate, dispatch]);

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
