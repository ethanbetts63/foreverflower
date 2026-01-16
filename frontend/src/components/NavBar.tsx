import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-[var(--color4)] bg-[var(--color3)]">
      <div className="container flex h-20 items-center px-4">
        
        {/* Left Spacer */}
        <div className="flex-1"></div>

        {/* Center Title */}
        <div className="flex-1 text-center">
            <Link to="/" className="font-bold text-4xl italic text-black font-['Playfair_Display',_serif]">
                FOREVERFLOWER
            </Link>
        </div>

        {/* Right Section: Auth Buttons */}
        <div className="flex flex-1 items-center justify-end gap-2">
            <Link to="/login">
                <Button>Login</Button>
            </Link>
            <Link to="/event-gate">
                <Button>Create Event</Button>
            </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
