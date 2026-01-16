import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export const CtaCard: React.FC = () => {
  const [bouquetBudget, setBouquetBudget] = useState(75);
  const [deliveriesPerYear, setDeliveriesPerYear] = useState(1);
  const [years, setYears] = useState(5);

  const [upfrontPrice, setUpfrontPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setIsLoading(true);
    setError(null);
    setUpfrontPrice(null);

    try {
      const response = await fetch('/api/events/calculate-price/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bouquet_budget: bouquetBudget,
          deliveries_per_year: deliveriesPerYear,
          years: years,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setUpfrontPrice(data.upfront_price);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white text-gray-900 rounded-none sm:rounded-xl border-0">
      <CardContent className="p-6 text-black">
        <h2 className="text-xl font-bold mb-4 text-center">Price Calculator</h2>
        
        <div className="space-y-6">
          {/* Bouquet Budget Slider */}
          <div className="grid gap-2">
            <Label htmlFor="budget-slider" className="text-sm">Bouquet Budget: ${bouquetBudget}</Label>
            <Slider
              id="budget-slider"
              min={75}
              max={500}
              step={5}
              value={[bouquetBudget]}
              onValueChange={(value) => setBouquetBudget(value[0])}
            />
          </div>

          {/* Deliveries Per Year Slider */}
          <div className="grid gap-2">
            <Label htmlFor="deliveries-slider" className="text-sm">Deliveries Per Year: {deliveriesPerYear}</Label>
            <Slider
              id="deliveries-slider"
              min={1}
              max={12}
              step={1}
              value={[deliveriesPerYear]}
              onValueChange={(value) => setDeliveriesPerYear(value[0])}
            />
          </div>

          {/* Years Slider */}
          <div className="grid gap-2">
            <Label htmlFor="years-slider" className="text-sm">Years: {years}</Label>
            <Slider
              id="years-slider"
              min={1}
              max={25}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={handleCalculate} disabled={isLoading} className="w-full">
            {isLoading ? 'Calculating...' : 'Calculate Upfront Cost'}
          </Button>
        </div>

        <div className="mt-4 text-center h-12 flex items-center justify-center">
          {upfrontPrice !== null && (
            <div className="text-2xl font-bold">
              ${upfrontPrice.toLocaleString()}
            </div>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </CardContent>
    </Card>
  );
};