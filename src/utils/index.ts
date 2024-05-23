import { TRPCError } from "@trpc/server";
import { format, formatDistanceToNowStrict, isToday } from "date-fns";
import { useEffect, useRef } from "react";
import slugify from "slugify";

import { slugSettings } from "./constant";

type Options = {
  smart: boolean;
};

export const formatTimeAgo = (date: Date, options?: Options) => {
  const dateToFormat = new Date(date);

  if (options?.smart === true)
    return format(
      dateToFormat,
      isToday(dateToFormat) ? "HH:mm" : "dd MMMM yyyy, HH:mm",
    );

  return formatDistanceToNowStrict(dateToFormat, {
    addSuffix: true,
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else {
    return text;
  }
};

export const sliceFileName = (fileName: string) => {
  const lastDot = fileName.lastIndexOf("."); // exactly what it says on the tin
  const name = fileName.slice(0, lastDot); // characters from the start to the last dot
  const extension = fileName.slice(lastDot + 1); // characters after the last dot

  return {
    fileName: name,
    fileType: extension,
  };
};

export const dataURLToBlob = async (dataURL: string): Promise<Blob> => {
  const res = await fetch(dataURL);
  const blob = await res.blob();
  return blob;
};

export const imageToBlobHandler = (file: File): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    if (!file) resolve(null);

    const reader = new FileReader();

    reader.onload = async function (event) {
      const dataURL = event.target?.result as string;
      const blob = await dataURLToBlob(dataURL);

      const { fileName, fileType } = sliceFileName(file.name);
      const imageFile = new File(
        [blob],
        `${slugify(fileName, slugSettings)}.${fileType}`,
        {
          type: file.type,
        },
      );
      resolve(imageFile);
    };

    reader.onerror = function (event) {
      reject(event.target?.error);
    };

    reader.readAsDataURL(file);
  });
};

export const useClickOutside = (
  callback: () => void,
  excludedRefs: React.RefObject<HTMLElement>[] = [],
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      const clickedElement = event.target as HTMLElement;
      const isExcluded = excludedRefs.some((ref) =>
        ref.current?.contains(clickedElement),
      );

      if (!isExcluded) {
        callbackRef.current();
      }
    }

    window.addEventListener("mouseup", handleClickOutside);
    window.addEventListener("touchend", handleClickOutside);

    // Clean up
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
      window.removeEventListener("touchend", handleClickOutside);
    };
  }, [excludedRefs]);
};

export const getFilterByInput = (filter?: string) => {
  const filters: Record<string, object> = {
    newest: {
      createdAt: "desc",
    },
    oldest: {
      createdAt: "asc",
    },
  };

  if (typeof filter === "string") {
    return filters[filter];
  }
};

export const handleDatabaseError = (error: any) => {
  console.error("Database Error:", error);
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occured",
  });
};
