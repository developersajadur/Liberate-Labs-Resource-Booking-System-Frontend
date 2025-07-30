/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createResource } from "@/services/ResourceService";
import { toast } from "sonner";

type FormData = {
  name: string;
};

const CreateResourceDialog = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createResource({ name: data.name });
      if (res.success) {
        toast.success("Resource created successfully");
        reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create resource");
      console.error("Error creating resource:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Create Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white" onInteractOutside={(e) => e.preventDefault()}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter resource name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResourceDialog;
