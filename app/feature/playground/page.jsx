import React from "react";

import FontPairContainer from "@/components/FontPairContainer";

const Playground = ({
  fontsRef,
  colorsRef,
  gradientsRef,
  layoutsRef,
}) => {
  const fontFeatureType="Manual";
   // Default value for fontFeatureType

  return (
    <div className="space-y-8 px-4  bg-[#fff]">
      {/* Fonts Section */}
      <section
        ref={fontsRef}
        className="h-screen p-5 bg-white rounded-2xl">
        <FontPairContainer/>
      </section>

      {/* Colors Section */}
      <section
        ref={colorsRef}
        className="h-screen p-10 border border-gray-200 rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-4">Colors Section</h2>
        {/* Color Pair Generator */}
      </section>

      {/* Gradients Section */}
      <section
        ref={gradientsRef}
        className="h-screen p-10 border border-gray-200 rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-4">Gradients Section</h2>
        <p>Create beautiful gradients for your designs.</p>
      </section>

      {/* Layouts Section */}
      <section
        ref={layoutsRef}
        className="h-screen p-10 border border-gray-200 rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-4">Layouts Section</h2>
        <p>Understand and implement effective layout structures.</p>
      </section>
    </div>
  );
};

export default Playground;
