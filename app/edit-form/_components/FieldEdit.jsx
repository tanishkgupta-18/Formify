import { Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';

function FieldEdit({ defaultValue, onUpdate, onDelete }) {
  const [labelName, setLabelName] = useState(defaultValue?.label || defaultValue?.name || "");
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder || "");
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    if (labelName.trim() === "") return;

    if (typeof onUpdate === "function") {
      const updatedField = { 
        ...defaultValue, 
        [defaultValue.name ? 'name' : 'label']: labelName 
      };
      
      if (placeholder.trim() !== "") {
        updatedField.placeholder = placeholder;
      }
      
      onUpdate(updatedField);
      setOpen(false);
    } else {
      console.error("onUpdate is not defined or is not a function!");
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(defaultValue);
    } else {
      console.error("onDelete is not defined or is not a function!");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button">
            <Edit className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-4 shadow-lg space-y-3">
          <h2 className="text-lg font-semibold">Edit Field</h2>
          <div>
            <Label className="text-sm">{defaultValue.name ? 'Field Name' : 'Label Name'}</Label>
            <Input
              type="text"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm">Placeholder</Label>
            <Input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button size="sm" onClick={handleUpdate}>Update</Button>
        </PopoverContent>
      </Popover>
      <button type="button" onClick={handleDelete}>
        <Trash2 className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700" />
      </button>
    </div>
  );
}

export default FieldEdit;