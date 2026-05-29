import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MailCheck } from "lucide-react";

const VerifyEmail = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-2xl bg-white">

          <DialogHeader className="flex flex-col items-center text-center">

            <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <MailCheck className="h-10 w-10 text-orange-600" />
            </div>

            <DialogTitle className="text-2xl font-bold text-orange-600">
              Check Your Email
            </DialogTitle>

            <DialogDescription className="text-gray-500 text-sm leading-6 mt-2">
              We've sent a verification link to your email address.
              <br />
              Please check your inbox and click the link to verify your account.
            </DialogDescription>

          </DialogHeader>

          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => setOpen(false)}
              className="
                bg-orange-600
                hover:bg-orange-700
                transition-all
                duration-300
                text-white
                px-6
                py-2.5
                rounded-full
                font-medium
              "
            >
              Verify
            </button>
          </div>

        </DialogContent>
      </Dialog>

    </div>
  );
};

export default VerifyEmail;