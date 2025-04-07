import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FieldEdit from './FieldEdit';

function FormUi({ jsonForm, onFieldUpdate }) {
  const [formState, setFormState] = useState(jsonForm || null);

  useEffect(() => {
    setFormState(jsonForm);  // Sync external changes
  }, [jsonForm]);

  const handleUpdate = (updatedField, sectionIndex, fieldIndex, type) => {
    setFormState((prevForm) => {
      if (!prevForm) return prevForm;
      const newForm = { ...prevForm };

      if (type === "subheading") {
        newForm.form.sections[sectionIndex].subheadings[fieldIndex] = updatedField;
      } else if (type === "field") {
        newForm.form.sections[sectionIndex].fields[fieldIndex] = updatedField;
      }

      if (onFieldUpdate) {
        onFieldUpdate(newForm);
      }

      return { ...newForm };
    });
  };

  const handleDelete = (sectionIndex, fieldIndex, type) => {
    setFormState((prevForm) => {
      if (!prevForm) return prevForm;
      const newForm = JSON.parse(JSON.stringify(prevForm)); // Deep clone
      
      if (type === "subheading") {
        newForm.form.sections[sectionIndex].subheadings.splice(fieldIndex, 1);
      } else if (type === "field") {
        newForm.form.sections[sectionIndex].fields.splice(fieldIndex, 1);
      }
      
      if (onFieldUpdate) {
        onFieldUpdate(newForm);
      }
      
      return newForm;
    });
  };

  if (!formState) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">{formState.form.title}</h1>
      {formState.form.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-secondary">{section.heading}</h2>
            <div className="divider"></div>

            {section.subheadings.map((subheading, subIndex) => (
              <div key={subIndex} className="form-control mb-4">
                <Label className="label">
                  <span className="label-text text-lg font-medium">{subheading.label}</span>
                </Label>
                {subheading.type === 'radio' ? (
                  <div className="flex flex-wrap gap-4">
                    {subheading.options?.map((option, optIndex) => (
                      <label key={optIndex} className="label cursor-pointer">
                        <input 
                          type="radio" 
                          name={subheading.label} 
                          value={option} 
                          required={subheading.required} 
                          className="radio radio-primary"
                        />
                        <span className="label-text ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="join w-full">
                    <Input 
                      type={subheading.type} 
                      required={subheading.required} 
                      className="input input-bordered join-item flex-1" 
                      placeholder={subheading.placeholder || "Enter value..."}
                    />
                    <div className="join-item flex">
                      <FieldEdit 
                        defaultValue={subheading} 
                        onUpdate={(updatedField) => handleUpdate(updatedField, sectionIndex, subIndex, "subheading")} 
                        onDelete={() => handleDelete(sectionIndex, subIndex, "subheading")}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="form-control">
                  <Label className="label">
                    <span className="label-text font-medium">{field.name}</span>
                  </Label>
                  <div className="join w-full">
                    <Input 
                      type={field.type} 
                      name={field.name} 
                      className="input input-bordered join-item flex-1" 
                      placeholder={field.placeholder || "Enter value..."}
                    />
                    <div className="join-item flex">
                      <FieldEdit 
                        defaultValue={field} 
                        onUpdate={(updatedField) => handleUpdate(updatedField, sectionIndex, fieldIndex, "field")} 
                        onDelete={() => handleDelete(sectionIndex, fieldIndex, "field")}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <Button className="btn btn-primary">Submit</Button>
      </div>
    </div>
  );
}

export default FormUi;