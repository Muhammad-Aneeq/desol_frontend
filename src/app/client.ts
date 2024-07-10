import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const loginUser = async (userData: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(userData),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error>>>>", error);
  }
};

export const createCar = async (formData: any) => {
  try {
    const accessToken = Cookies.get("access_token");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/create`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      body: formData,
    });
    if (res.status === 201) {
      toast.success("Car Created Sucessfully!");
    } else {
      toast.error(res.statusText);
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.log("error>>>>", error);
  }
};
