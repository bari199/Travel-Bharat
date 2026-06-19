import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Upload, Trash2, ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

const ImagesSection = ({ formData, setFormData }) => {
  /* ==========================
     Destination Images
  ========================== */

  const {
    getRootProps: getDestinationRootProps,
    getInputProps: getDestinationInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...acceptedFiles],
      }));
    },
  });

  /* ==========================
     Place Images
  ========================== */

  const { getRootProps: getPlaceRootProps, getInputProps: getPlaceInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      multiple: true,
      onDrop: (acceptedFiles) => {
        setFormData((prev) => ({
          ...prev,
          placeImages: [...prev.placeImages, ...acceptedFiles],
        }));
      },
    });

  const removeDestinationImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removePlaceImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      placeImages: prev.placeImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Destination Images */}

      <Card>
        <CardContent className="p-6 space-y-5">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <ImageIcon className="h-5 w-5" />
             Hero Destination Images
            </h2>

            <p className="text-sm text-muted-foreground">
              Upload hero and cover images for the Hero destination.
            </p>
          </div>

          <div
            {...getDestinationRootProps()}
            className="cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition hover:bg-muted/50"
          >
            <input {...getDestinationInputProps()} />

            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">Drag & drop images here</p>

            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>

          {formData.images.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground">
                {formData.images.length} image(s) selected
              </p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                      className="h-32 w-full object-cover"
                    />

                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => removeDestinationImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Place Images */}

      <Card>
        <CardContent className="p-6 space-y-5">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <ImageIcon className="h-5 w-5" />
              Top Places Gallery
            </h2>

            <p className="text-sm text-muted-foreground">
              Upload Top places images of the location.
            </p>
          </div>

          <div
            {...getPlaceRootProps()}
            className="cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition hover:bg-muted/50"
          >
            <input {...getPlaceInputProps()} />

            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">Drag & drop images here</p>

            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>

          {formData.placeImages.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground">
                {formData.placeImages.length} image(s) selected
              </p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {formData.placeImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                      className="h-32 w-full object-cover"
                    />

                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => removePlaceImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagesSection;
