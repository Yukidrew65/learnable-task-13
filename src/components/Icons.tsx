import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

type P = { size?: number } & SVGProps<SVGSVGElement>;
const merge = (size?: number) =>
  size ? { ...base, width: size, height: size } : base;

export const PersonIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const MailIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m3 6 9 6 9-6" />
  </svg>
);

export const MapPinIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const GlobeIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
  </svg>
);

export const BuildingIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
  </svg>
);

export const PencilIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const TrashIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const PlusIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChevronLeftIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const SearchIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const UsersIcon = ({ size, ...p }: P) => (
  <svg {...merge(size)} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11" />
  </svg>
);
