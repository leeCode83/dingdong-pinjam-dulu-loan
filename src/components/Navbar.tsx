
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DD</span>
          </div>
          <span className="font-bold text-xl text-foreground">Dingdong Loans</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Beranda
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/kyc" className="text-muted-foreground hover:text-foreground transition-colors">
            Verifikasi KYC
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Kontak
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Masuk
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" size="sm">
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
