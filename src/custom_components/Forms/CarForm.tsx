"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { carDefaultValues, carFormSchema, loginDefaultValues, loginFormSchema } from "@/utils/formSchema";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormItems from "./FormItems";
import RadioButton from "./RadioButton";
import FileUploadComponent from "../FileUpload/FileUploadComponent";
import { createCar } from "@/app/client";

const CarForm = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [previews, setPreviews] = useState<any>([]);

  const handleChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  // Defining form.
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: carDefaultValues,
  });

  // submit handler.
  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    const { model, price, phone } = values
    const formDataWithFiles = new FormData();
    formDataWithFiles.append('model', model);
    formDataWithFiles.append('price', price.toString());
    formDataWithFiles.append('phone', phone);
    formDataWithFiles.append('city', selectedCity);
    files.forEach((file: any) => {

      formDataWithFiles.append('images', file);
    });
    const res = await createCar(formDataWithFiles);
    form.reset(carDefaultValues)
    setFiles([])
    setPreviews([])
    router.refresh()
  }


  return (
    <div className="py-8 flex justify-center items-center flex-col">
      <h1 className="text-center text-3xl font-bold">Car Form </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-2/4 mx-auto my-5 p-8  bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-xl"
        >
          <div className="sm:block md:flex justify-between items-center gap-4">
            <div className="w-full ">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItems
                    label="Car Model"
                    placeholder="Toyota Corolla"
                    field={field}
                  />
                )}
              />
            </div>
          </div>
          <div className="sm:block md:flex justify-between items-center gap-4">
            <div className="w-full ">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItems
                    label="Price"
                    placeholder="200,000"
                    field={{
                      ...field,
                      value: field.value || '',
                      onChange: (e: any) => field.onChange(Number(e.target.value)),
                    }}
                    type="number"
                  />
                )}
              />
            </div>
          </div>
          <div className="sm:block md:flex justify-between items-center gap-4">
            <div className="w-full ">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItems
                    label="Phone Number"
                    placeholder="0306-9824678"
                    field={field}
                  />
                )}
              />
            </div>
          </div>
          <div className="sm:block md:flex justify-between items-center gap-4">
            <div className="w-full ">
              <p className="mb-2 " >Cities</p>
              <RadioButton
                label="Karachi"
                value="karachi"
                checked={selectedCity === 'karachi'}
                onChange={handleChange}
              />
              <RadioButton
                label="Lahore"
                value="lahore"
                checked={selectedCity === 'lahore'}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:block md:flex justify-between items-center gap-4">
            <div className="w-full ">
              <FileUploadComponent files={files} setFiles={setFiles} previews={previews} setPreviews={setPreviews} />
            </div>
          </div>
          <Button type="submit">Submit</Button>

        </form>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default CarForm