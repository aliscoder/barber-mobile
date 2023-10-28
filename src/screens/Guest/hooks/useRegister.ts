import { useAuth, useToast } from "@hooks";
import { RegisterScreenRouteProp } from "@navigation/types";
import { useRoute } from "@react-navigation/core";
import { RegisterFormInterface, useRegisterMutation } from "@state/api/auth";
import { registerIndieID } from "native-notify";
import { useCallback, useEffect, useState } from "react";

const useRegister = (type: "barber" | "client") => {
  const isBarber = type === "barber";
  const { authenticate } = useAuth();
  const { params } = useRoute<RegisterScreenRouteProp>();
  const { phone } = params;
  const { showError } = useToast();

  const [formData, setFormData] = useState<RegisterFormInterface>({
    phone,
    shopName: isBarber ? "" : undefined,
    name: !isBarber ? "" : undefined,
    gender: "male",
    enteredCode: "",
    password: "",
    repassword: "",
  });

  const { shopName, password, repassword, enteredCode, gender, name } = formData;

  const [register, { isLoading, isError, isSuccess, data, error }] = useRegisterMutation();

  const handleInputChange = useCallback((item: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }, []);

  async function handleRegister() {
    if (isBarber && shopName && (shopName.length < 3 || shopName.length > 20)) {
      showError("نام آزایشگاه وارد شده نامعتبر است", "bottom");
    } else if (!isBarber && name && (name.length < 3 || name.length > 20)) {
      showError("نام وارد شده نامعتبر است", "bottom");
    } else {
      if (isBarber) {
        if (password!.length < 6) {
          showError("کلمه عبور وارد شده ضعیف است", "bottom");
        } else if (password !== repassword) {
          showError("کلمه عبور با تکرار مطابقت ندارد", "bottom");
        } else {
          register({ phone, shopName, name, password, gender, enteredCode });
        }
      } else {
        register({ phone, shopName, name, gender, enteredCode });
      }
    }
  }

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      showError(error.data.error, "bottom");
    }
    if (isSuccess && data) {
      registerIndieID(data.userId, 10431, "V8wgDzCPu2WtVabIlLPuuD");
      authenticate(data.token);
    }
  }, [isError, isSuccess]);

  return { handleRegister, handleInputChange, formData, token: data?.token, isLoading };
};

export default useRegister;
