import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-slate-900/50 backdrop-blur-sm border-t border-slate-800 text-slate-400 text-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; {new Date().getFullYear()} BC-studios. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="mailto:core@bc-studios.org"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail size={16} /> core@bc-studios.org
            </a>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
