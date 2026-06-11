import ImageUploader from "../fields/ImageUploader";

const ImagesSection = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">
        Images
      </h2>

      <ImageUploader
        label="Destination Images"
        name="images"
        files={formData.images}
        setFormData={setFormData}
      />

      <ImageUploader
        label="Place Images"
        name="placeImages"
        files={formData.placeImages}
        setFormData={setFormData}
      />

    </div>
  );
};

export default ImagesSection;