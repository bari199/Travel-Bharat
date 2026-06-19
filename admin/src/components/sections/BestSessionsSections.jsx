import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BestSessionsSections = ({
  formData,
  setFormData,
}) => {
  const seasons = [
    "summer",
    "monsoon",
    "winter",
  ];

  const updateMonths = (season, value) => {
    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          months: value,
        },
      },
    }));
  };

  const addEssential = (season) => {
    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: [
            ...(prev.seasonGuide?.[season]?.essentials || []),
            "",
          ],
        },
      },
    }));
  };

  const updateEssential = (
    season,
    index,
    value
  ) => {
    const updated = [
      ...(formData.seasonGuide?.[season]?.essentials || []),
    ];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: updated,
        },
      },
    }));
  };

  const removeEssential = (
    season,
    index
  ) => {
    const updated = (
      formData.seasonGuide?.[season]
        ?.essentials || []
    ).filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      seasonGuide: {
        ...prev.seasonGuide,
        [season]: {
          ...prev.seasonGuide?.[season],
          essentials: updated,
        },
      },
    }));
  };

  return (
    <div className="space-y-6 border rounded-xl p-5">
      <h2 className="text-xl font-semibold">
        Season Guide
      </h2>

      {seasons.map((season) => (
        <div
          key={season}
          className="space-y-4 rounded-lg border p-4"
        >
          <h3 className="font-semibold capitalize">
            {season}
          </h3>

          <Input
            placeholder="Months (e.g. Mar - Jun)"
            value={
              formData.seasonGuide?.[season]
                ?.months || ""
            }
            onChange={(e) =>
              updateMonths(
                season,
                e.target.value
              )
            }
          />

          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              Essentials
            </h4>

            <Button
              type="button"
              onClick={() =>
                addEssential(season)
              }
            >
              + Add Essential
            </Button>
          </div>

          {(formData.seasonGuide?.[
            season
          ]?.essentials || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex gap-2"
              >
                <Input
                  value={item}
                  placeholder="Essential Item"
                  onChange={(e) =>
                    updateEssential(
                      season,
                      index,
                      e.target.value
                    )
                  }
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    removeEssential(
                      season,
                      index
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default BestSessionsSections;