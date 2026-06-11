import { Input } from "@/components/ui/input";

const TravelInfoSection = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Travel Information
      </h2>

      <Input
        name="bestTimeToVisit"
        placeholder="Best Time To Visit"
        value={
          formData.bestTimeToVisit
        }
        onChange={handleChange}
      />

      <Input
        name="entryFee"
        placeholder="Entry Fee"
        value={formData.entryFee}
        onChange={handleChange}
      />

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) =>
            handleChange({
              target: {
                name: "featured",
                value:
                  e.target.checked,
              },
            })
          }
        />

        Featured Destination
      </label>
    </div>
  );
};

export default TravelInfoSection;