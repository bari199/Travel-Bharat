import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

const HighlightsSection = ({
  formData,
  setFormData,
}) => {
  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [
        ...formData.highlights,
        "",
      ],
    });
  };

  const removeHighlight = (index) => {
    const updated =
      formData.highlights.filter(
        (_, i) => i !== index
      );

    setFormData({
      ...formData,
      highlights: updated,
    });
  };

  const updateHighlight = (
    index,
    value
  ) => {
    const updated = [
      ...formData.highlights,
    ];

    updated[index] = value;

    setFormData({
      ...formData,
      highlights: updated,
    });
  };

  return (
    <div className="space-y-4 border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          Highlights
        </h2>

        <Button
          type="button"
          onClick={addHighlight}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Highlight
        </Button>
      </div>

      {formData.highlights.map(
        (highlight, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <Input
              placeholder={`Highlight ${
                index + 1
              }`}
              value={highlight}
              onChange={(e) =>
                updateHighlight(
                  index,
                  e.target.value
                )
              }
            />

            {formData.highlights.length >
              1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  removeHighlight(index)
                }
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default HighlightsSection;