import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CSV Manager</h1>
      <p className="text-xl mb-8">Easily manage your CSV files with our powerful tool.</p>
      <Button asChild>
        <Link to="/csv-manager">Go to CSV Manager</Link>
      </Button>
    </div>
  );
};

export default Index;