// ── EditProfileForm.jsx ──────────────────────────────────────────────────────
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, ImageIcon, Save } from "lucide-react";

export const EditProfileForm = ({ user, onUpdate, loading }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-800">
          <UserCircle className="h-4 w-4 text-orange-500" />
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Username
            </label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" /> Avatar URL
            </label>
            <Input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://..."
              className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-100"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 shadow-sm shadow-orange-200 transition-all"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
