import { useState } from 'react';
import Home from './Home'; // Adjust the path according to your project structure

export default function IndexPage() {
  const [useTestAadhaar, setUseTestAadhaar] = useState(false);

  const switchAadhaar = () => {
    setUseTestAadhaar((prev) => !prev);
  };

  return <Home setUseTestAadhaar={setUseTestAadhaar} useTestAadhaar={useTestAadhaar} switchAadhaar={switchAadhaar} />;
}
