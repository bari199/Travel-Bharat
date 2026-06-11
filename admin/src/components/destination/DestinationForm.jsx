import BasicInfoSection from "../sections/BasicInfoSection";
import DescriptionSection from "../sections/DescriptionSection";
import HighlightsSection from "../sections/HighlightsSection";
import TravelInfoSection from "../sections/TravelInfoSection";
import ImagesSection from "../sections/ImagesSection";
import BestExperiencesSection from "../sections/BestExperiencesSection";
import NearbyAttractionsSection from "../sections/NearbyAttractionsSection";
import { Button } from "@/components/ui/button";



const DestinationForm = ({ formData, setFormData, handleSubmit, loading }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <BasicInfoSection formData={formData} handleChange={handleChange} />

      <DescriptionSection formData={formData} handleChange={handleChange} />

      <TravelInfoSection formData={formData} handleChange={handleChange} />

      <ImagesSection formData={formData} setFormData={setFormData} />

      <HighlightsSection formData={formData} setFormData={setFormData} />

      <BestExperiencesSection formData={formData} setFormData={setFormData} />

      <NearbyAttractionsSection formData={formData} setFormData={setFormData} />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Destination"}
      </Button>
    </form>
  );
};

export default DestinationForm;
