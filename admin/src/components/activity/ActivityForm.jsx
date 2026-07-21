import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { createActivity, updateActivity } from "@/services/activityApi";

import initialActivityData from "./initialActivityData";

import ActivityBasicInfoSection from "../Acsections/ActivityBasicInfoSection";

import ActivityDescriptionSection from "../Acsections/ActivityDescriptionSection";

import ActivityImagesSection from "../Acsections/ActivityImagesSection";

import ActivityDetailsSection from "../Acsections/ActivityDetailsSection";

import ActivityVisitorInfoSection from "../Acsections/ActivityVisitorInfoSection";

import ActivityListsSection from "../Acsections/ActivityListsSection";

import { Button } from "@/components/ui/button";

/* ===========================================================
   Component
=========================================================== */

const ActivityForm = ({
  initialData = null,
  isEdit = false,
  activityId = null,
  onSuccess,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialActivityData);

  /* ============================================
      Edit Mode
  ============================================ */

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialActivityData,
        ...initialData,
        destination:
          typeof initialData.destination === "object"
            ? initialData.destination._id
            : initialData.destination,
      });
    }
  }, [isEdit, initialData]);

  /* ============================================
      Submit
  ============================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const id = activityId || initialData?._id;

      if (isEdit) {
        await updateActivity(id, formData);

        toast.success("Activity updated successfully.");
      } else {
        await createActivity(formData);

        toast.success("Activity created successfully.");

        setFormData(initialActivityData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/activities");
      }
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================
      Render
  ============================================ */

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
      "
    >
      {/* =====================================
          Basic Information
      ===================================== */}

      <ActivityBasicInfoSection formData={formData} setFormData={setFormData} />

      {/* =====================================
          Description
      ===================================== */}

      <ActivityDescriptionSection
        formData={formData}
        setFormData={setFormData}
      />

      {/* =====================================
          Images
      ===================================== */}

      <ActivityImagesSection formData={formData} setFormData={setFormData} />

      {/* =====================================
          Activity Details
      ===================================== */}

      <ActivityDetailsSection formData={formData} setFormData={setFormData} />

      {/* =====================================
          Visitor Information
      ===================================== */}

      <ActivityVisitorInfoSection
        formData={formData}
        setFormData={setFormData}
      />

      {/* =====================================
          Activity Lists
      ===================================== */}

      <ActivityListsSection formData={formData} setFormData={setFormData} />

      {/* =====================================
          Action Buttons
      ===================================== */}

      <div
        className="
          flex
          justify-end
          gap-4
          pt-6
        "
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => (onSuccess ? onSuccess() : navigate("/activities"))}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Activity"
              : "Create Activity"}
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
