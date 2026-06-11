import { useMemo } from "react";

const ImageUploader = ({
  label,
  name,
  files,
  setFormData,
  multiple = true,
}) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    );

    setFormData((prev) => ({
      ...prev,
      [name]: selectedFiles,
    }));
  };

  const previews = useMemo(() => {
    return files?.map((file) =>
      typeof file === "string"
        ? file
        : URL.createObjectURL(file)
    );
  }, [files]);

  return (
    <div className="space-y-4">
      <label className="font-medium">
        {label}
      </label>

      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full border rounded-lg p-2"
      />

      {previews?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map(
            (preview, index) => (
              <img
                key={index}
                src={preview}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;