// app/page.tsx or src/pages/index.tsx


import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Springfield College</h1>
      </header>

      {/* Main content */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: College Image */}
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden shadow-lg">
         
        </div>

        {/* Right Column: 3 Clickable Tiles */}
        
      </main>
    </div>
  );
}
