import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
} from "date-fns";

export const formatTimeAgo = (timestamp: Date): string => {
  const now = new Date();
  const secondsDiff = differenceInSeconds(now, timestamp);
  const minutesDiff = differenceInMinutes(now, timestamp);
  const hoursDiff = differenceInHours(now, timestamp);
  const daysDiff = differenceInDays(now, timestamp);
  const weeksDiff = differenceInWeeks(now, timestamp);

  if (secondsDiff < 60) {
    return `${secondsDiff}s`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else if (daysDiff < 7) {
    return `${daysDiff}d`;
  } else {
    return `${weeksDiff}w`;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else {
    return text;
  }
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
      const imageFile = new File([blob], file.name, { type: file.type });
      resolve(imageFile);
    };

    reader.onerror = function (event) {
      reject(event.target?.error);
    };

    reader.readAsDataURL(file);
  });
};
