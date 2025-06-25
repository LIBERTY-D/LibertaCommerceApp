import { DomSanitizer } from '@angular/platform-browser';

export function CreateFile(blob: Blob, sanitizer: DomSanitizer) {
  const type = blob.type;
  const isImage = type.startsWith('image');
  const objectUrl = URL.createObjectURL(blob);
  const fileUrl = sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

  return { type, isImage, fileUrl };
}
