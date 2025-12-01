let maxSizeMB = 2;
export const uploadImageToS3 = async (
  file: File,
  folder = "uploads"
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      return { url: null, error: `Image must be less than ${maxSizeMB}MB` };
    }
    const fileName = encodeURIComponent(file?.name);
    // Always prefix with Inupgro-prod
    const key = `${fileName}`;
    const bucketName = "inupgro-prod"
    // const key = `Inupgro-prod/${folder}/${fileName}`;
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseURL}/v1/s3?bucketName=${bucketName}&key=${key}`);

    if (!res.ok) throw new Error("Failed to get pre-signed URL");

    const presignedUrl = await res.text();

    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) throw new Error("Upload to S3 failed");

    return { url: presignedUrl.split("?")[0], error: null }; // Return the clean image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    return { url: null, error: "Image upload failed" };
  }
};
