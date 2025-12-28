import Image from "next/image";

interface Props {
  src?: string | null;
  name?: string;
}

const AVATAR_SIZE = 160;

export function ProfileAvatar({ src, name }: Props) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full
                 ring-4 ring-primary/30 bg-muted overflow-hidden"
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
    >
      {src ? (
        <Image
          src={src}
          alt={name ?? "Profile photo"}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="object-cover"
        />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
          Not Provided
        </span>
      )}
    </div>
  );
}