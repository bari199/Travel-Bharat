// ── EditProfileForm.jsx ──────────────────────────────────────────────────────

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  UserCircle,
  ImageIcon,
  Save,
  Upload,
} from "lucide-react";

export const EditProfileForm = ({
  user,
  onUpdate,
  loading,
}) => {

  const [preview, setPreview] = useState(
    user?.avatar || ""
  );

  const [formData, setFormData] = useState({
    username: user?.username || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onUpdate(formData);

  };

  useEffect(() => {

    setFormData({
      username: user?.username || "",
      avatar: null,
    });

    setPreview(user?.avatar || "");

  }, [user]);

  return (

    <Card
      className="
        rounded-2xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
      "
    >

      {/* Header */}

      <CardHeader className="border-b bg-muted/30 py-4">

        <CardTitle className="flex items-center gap-2.5">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">

            <UserCircle className="h-4 w-4 text-orange-500" />

          </div>

          <div>

            <h2 className="text-sm font-bold text-foreground">

              Edit Profile

            </h2>

            <p className="text-xs text-muted-foreground">

              Update your profile information

            </p>

          </div>

        </CardTitle>

      </CardHeader>

      <CardContent className="p-4">

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Avatar Preview */}

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  preview ||
                  "https://placehold.co/160x160/f97316/ffffff?text=User"
                }
                alt="Profile"
                className="
                  h-20
                  w-20
                  rounded-full
                  border-4
                  border-background
                  object-cover
                  shadow-lg
                "
              />

              <div
                className="
                  absolute
                  bottom-0.5
                  right-0.5
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-500
                  shadow-lg
                "
              >

                <Upload className="h-3.5 w-3.5 text-white" />

              </div>

            </div>

          </div>

          {/* Username */}

          <div className="space-y-1.5">

            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">

              Username

            </label>

            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="
                h-10
                rounded-xl
                border-border
                bg-background
                text-sm
                focus-visible:ring-orange-500
              "
            />

          </div>

          {/* Upload */}

          <div className="space-y-1.5">

            <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">

              <ImageIcon className="h-3.5 w-3.5" />

              Profile Photo

            </label>

            <Input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (!file) return;

                setFormData((prev) => ({
                  ...prev,
                  avatar: file,
                }));

                setPreview(
                  URL.createObjectURL(file)
                );

              }}
              className="
                h-10
                rounded-xl
                border-border
                text-sm
                file:mr-3
                file:rounded-lg
                file:border-0
                file:bg-orange-100
                file:px-2.5
                file:py-1.5
                file:text-xs
                file:text-orange-600
                hover:file:bg-orange-200
              "
            />

          </div>

          {/* Button */}

          <Button
            type="submit"
            disabled={loading}
            className="
              h-10
              w-full
              rounded-xl
              bg-gradient-to-r
              from-orange-500
              to-orange-400
              text-sm
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:from-orange-600
              hover:to-orange-500
            "
          >

            <Save className="mr-2 h-4 w-4" />

            {loading
              ? "Saving Changes..."
              : "Save Changes"}

          </Button>

        </form>

      </CardContent>

    </Card>

  );
};

export default EditProfileForm;