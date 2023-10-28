import { useAuth, useToast } from "@hooks";
import { LoginScreenRouteProp } from "@navigation/types";
import { useRoute } from "@react-navigation/core";
import { LoginFormInterface, useLoginMutation } from "@state/api/auth";
import { registerIndieID } from "native-notify";
import { useCallback, useEffect, useState } from "react";

const useLogin = (type: "barber" | "client") => {
  const isBarber = type === "barber";
  const { authenticate } = useAuth();
  const { params } = useRoute<LoginScreenRouteProp>();
  const { phone } = params;
  const [formData, setFormData] = useState<LoginFormInterface>({
    phone,
    enteredCode: "",
    password: "",
  });

  const { password, enteredCode } = formData;

  const { showError } = useToast();

  const [login, { isLoading, isError, isSuccess, data, error }] = useLoginMutation();

  const handleInputChange = useCallback((item: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }, []);

  async function handleLogin() {
    if (isBarber && (!formData.password || formData.password.length < 5)) {
      showError("کلمه عبور باید بیشتر از 5 حرف باشد", "bottom");
    } else {
      login(isBarber ? { phone, password, enteredCode } : { phone, enteredCode });
    }
  }

  useEffect(() => {
    if (isError && error) {
      //@ts-ignore
      showError(error.data.error, "bottom");
    }
    if (isSuccess && data) {
      registerIndieID(data.userId, 10431, "V8wgDzCPu2WtVabIlLPuuD");
      authenticate(data.token);
    }
  }, [isError, isSuccess]);

  return { handleLogin, formData, handleInputChange, token: data?.token, isLoading };
};

export default useLogin;
