const DescriptionSection = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Description
      </h2>

      <textarea
        rows={4}
        name="shortDescription"
        value={
          formData.shortDescription
        }
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="Short Description"
      />

      <textarea
        rows={8}
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="Description"
      />
    </div>
  );
};

export default DescriptionSection;