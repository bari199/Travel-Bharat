import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BestExperiencesSection = ({ formData, setFormData }) => {
  const addExperience = () => {
    setFormData({
      ...formData,
      bestExperiences: [
        ...formData.bestExperiences,
        {
          title: "",
          subtitle: "",
          description: "",
          location: "",
          distance: "",
          bestTime: "",
          duration: "",
          offer: "",
          highlights: [],
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

  const handleChange = (index, field, value) => {
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
        <h2 className="font-semibold text-xl">Best Experiences</h2>

        <Button type="button" onClick={addExperience}>
          + Add Experience
        </Button>
      </div>

      {formData.bestExperiences.map((experience, index) => (
        <div key={index} className="space-y-3 border rounded-lg p-4">
          <Input
            placeholder="Subtitle"
            value={experience.subtitle}
            onChange={(e) => handleChange(index, "subtitle", e.target.value)}
          />

          <Input
            placeholder="Location"
            value={experience.location}
            onChange={(e) => handleChange(index, "location", e.target.value)}
          />

          <Input
            placeholder="Distance"
            value={experience.distance}
            onChange={(e) => handleChange(index, "distance", e.target.value)}
          />

          <Input
            placeholder="Best Time"
            value={experience.bestTime}
            onChange={(e) => handleChange(index, "bestTime", e.target.value)}
          />

          <Input
            placeholder="Duration"
            value={experience.duration}
            onChange={(e) => handleChange(index, "duration", e.target.value)}
          />

          <Input
            placeholder="Offer Badge"
            value={experience.offer}
            onChange={(e) => handleChange(index, "offer", e.target.value)}
          />

          <Input
            placeholder="Experience Title"
            value={experience.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
          />

          <textarea
            rows={3}
            className="w-full border rounded-md p-3"
            placeholder="Description"
            value={experience.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Highlights best"
            value={experience.highlights?.join(", ")}
            onChange={(e) =>
              handleChange(
                index,
                "highlights",
                e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(index, "image", e.target.files[0])}
          />

          <Input
            placeholder="Button Link"
            value={experience.buttonLink}
            onChange={(e) => handleChange(index, "buttonLink", e.target.value)}
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => removeExperience(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BestExperiencesSection;
