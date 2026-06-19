import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NearbyAttractionsSection = ({ formData, setFormData }) => {
  const addAttraction = () => {
    setFormData({
      ...formData,
      nearbyAttractions: [
        ...formData.nearbyAttractions,
        {
          title: "",
          description: "",
          distance: "",
          bestTime: "",
          highlights: [],
          image: null,
          mapLink: "",
        },
      ],
    });
  };

  const removeAttraction = (index) => {
    const updated = [...formData.nearbyAttractions];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      nearbyAttractions: updated,
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.nearbyAttractions];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      nearbyAttractions: updated,
    });
  };

  return (
    <div className="space-y-6 border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Nearby Attractions
        </h2>

        <Button type="button" onClick={addAttraction}>
          + Add Attraction
        </Button>
      </div>

      {formData.nearbyAttractions.map((attraction, index) => (
        <div
          key={index}
          className="space-y-4 border rounded-lg p-4 bg-white"
        >
          <Input
            placeholder="Attraction Title"
            value={attraction.title}
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
            value={attraction.description}
            onChange={(e) =>
              handleChange(
                index,
                "description",
                e.target.value
              )
            }
          />

          <Input
            placeholder="Distance (Example: 5 km)"
            value={attraction.distance || ""}
            onChange={(e) =>
              handleChange(
                index,
                "distance",
                e.target.value
              )
            }
          />

          <Input
            placeholder="Best Time (Example: Oct - Mar)"
            value={attraction.bestTime || ""}
            onChange={(e) =>
              handleChange(
                index,
                "bestTime",
                e.target.value
              )
            }
          />

          <textarea
            rows={3}
            className="w-full border rounded-md p-3"
            placeholder="Highlights (comma separated)"
            value={
              attraction.highlights?.join(", ") || ""
            }
            onChange={(e) =>
              handleChange(
                index,
                "highlights",
                e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              )
            }
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Attraction Image
            </label>

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
          </div>

          {attraction.image &&
            attraction.image instanceof File && (
              <p className="text-sm text-green-600">
                Selected: {attraction.image.name}
              </p>
            )}

          <Input
            placeholder="Google Map Link"
            value={attraction.mapLink}
            onChange={(e) =>
              handleChange(
                index,
                "mapLink",
                e.target.value
              )
            }
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              removeAttraction(index)
            }
          >
            Remove Attraction
          </Button>
        </div>
      ))}
    </div>
  );
};

export default NearbyAttractionsSection;