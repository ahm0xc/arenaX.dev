import { icons as lucideIcons, LucideProps } from "lucide-react";

import { cn } from "~/lib/utils";

export const Icons = {
  ...lucideIcons,
  logo: ({ className, ...props }: LucideProps) => (
    <svg
      width="547"
      height="426"
      viewBox="0 0 547 426"
      fill="none"
      className={cn("w-6 h-6 text-white", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 157V263.5C-1.5 285.1 10 301.167 16 306.5C36.1667 327.667 81.7 375.3 102.5 396.5C118.9 417.7 141 425 150 426H315C283.167 392.833 216.7 323.2 205.5 310C198.3 295.6 208.5 291 214.5 290.5H348C365.2 290.5 386.833 278.167 395.5 272L547 153.5H383C364.2 152.7 344.5 165.833 337 172.5C295.333 205.5 209.4 273.3 199 280.5C193.4 287.7 178.667 290.167 172 290.5H32.5C18.5 285.7 23 273.5 27 268L370.5 1.00002H172C156.8 -1.39998 135.667 12 127 19C116 27.8334 84.6 53 47 83C4.2 109.4 -1.83333 143.333 0.5 157Z"
        fill="currentColor"
      />
    </svg>
  ),
  Html: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={100}
      height={100}
      viewBox="0 0 48 48"
      {...props}
    >
      <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z" />
      <path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z" />
      <path
        fill="#FFF"
        d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"
      />
      <path
        fill="#EEE"
        d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"
      />
    </svg>
  ),
  Python: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 256 255"
      preserveAspectRatio="xMinYMin meet"
      {...props}
    >
      <defs>
        <linearGradient
          x1="12.959%"
          y1="12.039%"
          x2="79.639%"
          y2="78.201%"
          id="a"
        >
          <stop stopColor="#387EB8" offset="0%" />
          <stop stopColor="#366994" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="19.128%"
          y1="20.579%"
          x2="90.742%"
          y2="88.429%"
          id="b"
        >
          <stop stopColor="#FFE052" offset="0%" />
          <stop stopColor="#FFC331" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
        fill="url(#a)"
      />
      <path
        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
        fill="url(#b)"
      />
    </svg>
  ),
};
