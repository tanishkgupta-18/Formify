import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Themes from '@/app/_data/Themes';
import GradientBg from '@/app/_data/GradientBg'; // Make sure to import this

function Controller({ onThemeChange, selectedBackground, showMore = 6 }) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Select Theme</h2>

      <Select onValueChange={onThemeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem key={index} value={theme.value}>
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: theme.accent }}
                />
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: theme.neutral }}
                />
                <span>{theme.theme}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background Selection Controller - moved outside of Select */}
      <h2 className='mt-8 my-1'>Background</h2>
      <div className='grid grid-cols-3 gap-5'>
        {GradientBg.map((bg, index) => index < showMore && (
          <div 
            key={index}
            onClick={() => selectedBackground(bg.gradient)}
            className='w-full h-[70px] rounded-lg cursor-pointer hover:border-black hover:border-2 flex items-center justify-center'
            style={{ background: bg.gradient }}
          >
            {index === 0 && 'None'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Controller;