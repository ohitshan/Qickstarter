import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { onSuccessBackingAsync } from "../../../Slices/userSlice";
import Paypal from "../../utils/Paypal";
function PaymentCreditCard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userSummary, setUserSummary] = useState<any>();
  const Summary = useAppSelector((state: any) => {
    if (state?.user?.authUser?.isAuth || state?.user?.authUser?._id) {
      return state?.user?.authUser?.summary?.[0];
    }
  });
  useEffect(() => {
    setUserSummary(Summary);
  }, [userSummary, Summary]);
  console.log(userSummary);

  const transactionSuccess = useCallback(
    (data) => {
      let body = {
        paymentData: data,
        backingSummary: userSummary,
      };
      dispatch(onSuccessBackingAsync(body)).then((res: any) => {
        if (res.payload.success) {
          navigate("/");
        }
      });
    },
    [userSummary, dispatch, navigate]
  );
  return (
    <div>
      <Paypal total={userSummary?.total} onSuccess={transactionSuccess} />
    </div>
  );
}

export default PaymentCreditCard;
