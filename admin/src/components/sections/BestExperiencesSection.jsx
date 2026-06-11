import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BestExperiencesSection = ({
  formData,
  setFormData,
}) => {
  const addExperience = () => {
    setFormData({
      ...formData,
      bestExperiences: [
        ...formData.bestExperiences,
        {
          title: "",
          description: "",
          image: null,
          buttonLink: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = [...formData.bestExperiences];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      bestExperiences: updated,
    });
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...formData.bestExperiences];

    updated[index][field] = value;

    setFormData({
      ...formData,
      bestExperiences: updated,
    });
  };

  return (
    <div className="space-y-6 border rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">
          Best Experiences
        </h2>

        <Button
          type="button"
          onClick={addExperience}
        >
          + Add Experience
        </Button>
      </div>

      {formData.bestExperiences.map(
        (experience, index) => (
          <div
            key={index}
            className="space-y-3 border rounded-lg p-4"
          >
            <Input
              placeholder="Experience Title"
              value={experience.title}
              onChange={(e) =>
                handleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <textarea
              rows={3}
              className="w-full border rounded-md p-3"
              placeholder="Description"
              value={experience.description}
              onChange={(e) =>
                handleChange(
                  index,
                  "description",
                  e.target.value
                )
              }
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleChange(
                  index,
                  "image",
                  e.target.files[0]
                )
              }
            />

            <Input
              placeholder="Button Link"
              value={experience.buttonLink}
              onChange={(e) =>
                handleChange(
                  index,
                  "buttonLink",
                  e.target.value
                )
              }
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                removeExperience(index)
              }
            >
              Remove
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default BestExperiencesSection;