"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";

function LiveAiForm({ params }) {
  const [record, setRecord] = useState(null);
  const [jsonForm, setJsonForm] = useState([]);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (params?.formid) {
      getFormData(params.formid);
    }
  }, [params?.formid]);

  const getFormData = async (formId) => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, Number(formId)));

      if (result && result[0]) {
        const formRecord = result[0];
        setRecord(formRecord);

        try {
          setJsonForm(JSON.parse(formRecord.jsonform || "[]"));
        } catch {
          console.warn("Invalid JSON in jsonform");
          setJsonForm([]);
        }

        try {
          setStyle(JSON.parse(formRecord.style || "{}"));
        } catch {
          console.warn("Invalid JSON in style");
          setStyle({});
        }
      }
    } catch (err) {
      console.error("Failed to fetch form data:", err);
    }
  };

  return (
    <div
      className="p-10 flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: record?.background || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {record ? (
        <FormUi
          jsonForm={jsonForm}
          selectedStyle={style}
          selectedTheme={record?.theme}
          editable={false}
          formId={record?.id}
          enabledSignIn={record?.enabledSignIn}
        />
      ) : (
        <p className="text-lg text-gray-500">Loading form...</p>
      )}

      <Link
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
        href="/"
      >
        <Image src="/logo.png" width={26} height={26} alt="logo" />
        Build your Own AI form
      </Link>
    </div>
  );
}

export default LiveAiForm;
