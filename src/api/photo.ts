export const mockAnalyzePhoto = async (imageBase64: string) => {
  return {
    injection_detected: true,
    confidence: 0.82,
    bbox: [21, 54, 122, 96],
    suggested_tag: "braço",
  };
};
