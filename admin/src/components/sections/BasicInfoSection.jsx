import { Input } from "@/components/ui/input";

const BasicInfoSection = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Basic Information
      </h2>

      <Input
        name="name"
        placeholder="Destination Name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <Input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />

      <Input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <Input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <Input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
    </div>
  );
};

export default BasicInfoSection;