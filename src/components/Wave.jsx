// src/components/Wave.jsx
import Wavify from "react-wavify";

const Wave = () => {
  return (
    <div className="absolute bottom-0 w-full overflow-hidden z-0">
      <Wavify
        fill="#0284c7" // bleu océan
        paused={false}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.2,
          points: 4,
        }}
        style={{ transform: 'rotate(360deg)' }} // pour vague vers le haut
      />
    </div>
  );
};

export default Wave;
