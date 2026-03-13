// SVG Icons as React Components for PayPact

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const AddIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <circle
      cx="12"
      cy="7"
      r="5"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12.0009 15C12.4472 15 12.8918 15.0265 13.331 15.0771C12.3125 15.3097 11.4925 16.0592 11.1611 17.0361C9.86613 17.1494 8.64431 17.5227 7.6298 18.1064C6.39773 18.8155 5.57605 19.7721 5.21477 20.7832L5.1757 20.8779C4.95786 21.3355 4.42492 21.5627 3.93742 21.3887C3.41743 21.2028 3.14619 20.6304 3.33195 20.1104L3.4423 19.8242C4.03199 18.4093 5.16752 17.2158 6.63176 16.373C8.19442 15.4737 10.0815 15 12.0009 15Z"
      fill="#C3FF00"
    />
    <path
      d="M18 14L18 22"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 18L14 18"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M6 12L11 7L16 12"
      stroke="#ACACAA"
      strokeOpacity="0.5"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowRightIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <g opacity="0.8">
      <path
        d="M5.00195 11.998L17.502 12.002"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17L18 12L13 7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const BackIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M19.9995 11.8394L3.68017 11.8394"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5937 19.7566L3.68028 11.8432L11.5938 3.92969"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckedIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="11"
    height="9"
    viewBox="0 0 11 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.41498 8.27126L1.20862 5.0939C0.818511 4.70733 0.819075 4.07663 1.20987 3.69075C1.59449 3.31097 2.21307 3.31128 2.59731 3.69145L4.41498 5.48988L9.26043 0.690746C9.6465 0.308372 10.2687 0.308885 10.6541 0.691895C11.044 1.07932 11.0434 1.71026 10.6527 2.09693L4.41498 8.27126Z"
      fill="black"
    />
  </svg>
);

export const CloseIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M18 5.99219L5.99894 17.9932"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 18.0078L5.99894 6.00675"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CopyIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M13 6V6C13 5.06812 13 4.60218 12.8478 4.23463C12.6448 3.74458 12.2554 3.35523 11.7654 3.15224C11.3978 3 10.9319 3 10 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V10C3 10.9319 3 11.3978 3.15224 11.7654C3.35523 12.2554 3.74458 12.6448 4.23463 12.8478C4.60218 13 5.06812 13 6 13V13"
      stroke="#C3FF00"
      strokeWidth="2"
    />
    <rect
      x="9"
      y="9"
      width="10"
      height="10"
      rx="2"
      stroke="#C3FF00"
      strokeWidth="2"
    />
  </svg>
);

export const DeleteIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="#C43B00"
      stroke="#C43B00"
      strokeWidth="2"
    />
    <path
      d="M9 9L15 15"
      stroke="#272727"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M15 9L9 15"
      stroke="#272727"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const FileIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="13"
    height="18"
    viewBox="0 0 13 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M6.50064 18C10.0107 18 12.8008 15.2099 12.8008 11.6999L12.8008 4.49971C12.8008 1.97965 10.8207 -0.00039118 8.30069 -0.0003914C5.78063 -0.00039162 3.80059 1.97965 3.80059 4.49971L3.80059 11.6999C3.80059 13.2299 4.97061 14.3999 6.50064 14.3999C8.03068 14.3999 9.2007 13.2299 9.2007 11.6999L9.2007 4.49971C9.2007 3.95969 8.8407 3.59969 8.30068 3.59969C7.76067 3.59969 7.40067 3.95969 7.40067 4.49971L7.40066 11.6999C7.40066 12.2399 7.04066 12.5999 6.50064 12.5999C5.96063 12.5999 5.60063 12.2399 5.60063 11.6999L5.60063 4.49971C5.60063 2.96967 6.77065 1.79965 8.30068 1.79965C9.83072 1.79965 11.0007 2.96967 11.0007 4.49971L11.0007 11.6999C11.0007 14.2199 9.0207 16.2 6.50064 16.2C3.98059 16.2 2.00055 14.2199 2.00055 11.6999L2.00055 4.49971C2.00055 3.95969 1.64054 3.59969 1.10053 3.59969C0.560517 3.59969 0.200508 3.95969 0.200508 4.49971L0.200508 11.6999C0.200507 15.2099 2.99057 18 6.50064 18Z"
      fill="#C4FF00"
    />
  </svg>
);

export const LogoIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="148"
    height="226"
    viewBox="0 0 148 226"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M135.398 224.938V207.641H129.461V202.391H147.961V207.641H142.023V224.938H135.398Z"
      fill="white"
    />
    <path
      d="M116.992 225.344C114.69 225.344 112.701 224.885 111.023 223.969C109.357 223.052 108.07 221.724 107.164 219.984C106.268 218.245 105.82 216.135 105.82 213.656V213.641C105.82 211.161 106.273 209.057 107.18 207.328C108.086 205.589 109.372 204.266 111.039 203.359C112.716 202.443 114.701 201.984 116.992 201.984C119.086 201.984 120.914 202.396 122.477 203.219C124.049 204.042 125.273 205.161 126.148 206.578C127.023 207.984 127.461 209.573 127.461 211.344V211.484H121.117L121.102 211.297C121.039 210.547 120.836 209.88 120.492 209.297C120.159 208.703 119.695 208.24 119.102 207.906C118.518 207.562 117.815 207.391 116.992 207.391C116.086 207.391 115.299 207.635 114.633 208.125C113.977 208.615 113.466 209.323 113.102 210.25C112.747 211.177 112.57 212.302 112.57 213.625V213.641C112.57 214.974 112.747 216.115 113.102 217.062C113.466 218 113.982 218.714 114.648 219.203C115.315 219.693 116.102 219.938 117.008 219.938C117.768 219.938 118.445 219.776 119.039 219.453C119.633 219.13 120.112 218.677 120.477 218.094C120.841 217.5 121.06 216.807 121.133 216.016L121.148 215.844H127.492V216.016C127.492 217.776 127.044 219.359 126.148 220.766C125.263 222.172 124.034 223.286 122.461 224.109C120.888 224.932 119.065 225.344 116.992 225.344Z"
      fill="white"
    />
    <path
      d="M82.2266 224.938L89.5859 202.391H95.8359V207.766H93.6797L89.1953 224.938H82.2266ZM86.8516 220.453L88.2266 215.781H99.2578L100.633 220.453H86.8516ZM98.2891 224.938L93.8047 207.766V202.391H97.8984L105.258 224.938H98.2891Z"
      fill="white"
    />
    <path
      d="M67.4766 218.781V213.891H72.6484C73.7422 213.891 74.5964 213.62 75.2109 213.078C75.8359 212.526 76.1484 211.714 76.1484 210.641V210.609C76.1484 209.526 75.8359 208.719 75.2109 208.188C74.5964 207.646 73.7422 207.375 72.6484 207.375H67.4766V202.391H74.2266C75.987 202.391 77.5078 202.729 78.7891 203.406C80.0807 204.083 81.0755 205.036 81.7734 206.266C82.4818 207.495 82.8359 208.943 82.8359 210.609V210.641C82.8359 212.307 82.4818 213.75 81.7734 214.969C81.0755 216.188 80.0807 217.13 78.7891 217.797C77.5078 218.453 75.987 218.781 74.2266 218.781H67.4766ZM64.1484 224.938V202.391H70.7734V224.938H64.1484Z"
      fill="white"
    />
    <path
      d="M47.1484 224.938V217.797L39.4453 202.391H46.4453L50.3984 211.531H50.5234L54.4766 202.391H61.4766L53.7734 217.797V224.938H47.1484Z"
      fill="#C3FF00"
    />
    <path
      d="M18.2734 224.938L25.6328 202.391H31.8828V207.766H29.7266L25.2422 224.938H18.2734ZM22.8984 220.453L24.2734 215.781H35.3047L36.6797 220.453H22.8984ZM34.3359 224.938L29.8516 207.766V202.391H33.9453L41.3047 224.938H34.3359Z"
      fill="#C3FF00"
    />
    <path
      d="M3.52344 218.781V213.891H8.69531C9.78906 213.891 10.6432 213.62 11.2578 213.078C11.8828 212.526 12.1953 211.714 12.1953 210.641V210.609C12.1953 209.526 11.8828 208.719 11.2578 208.188C10.6432 207.646 9.78906 207.375 8.69531 207.375H3.52344V202.391H10.2734C12.0339 202.391 13.5547 202.729 14.8359 203.406C16.1276 204.083 17.1224 205.036 17.8203 206.266C18.5286 207.495 18.8828 208.943 18.8828 210.609V210.641C18.8828 212.307 18.5286 213.75 17.8203 214.969C17.1224 216.188 16.1276 217.13 14.8359 217.797C13.5547 218.453 12.0339 218.781 10.2734 218.781H3.52344ZM0.195312 224.938V202.391H6.82031V224.938H0.195312Z"
      fill="#C3FF00"
    />
    <path
      d="M139.3 79.2344C139.3 39.7499 106.891 8.49194 68.3643 8.00586L67.4531 8H8V176.94H0V0H67.4531L68.4639 0.00683594C111.212 0.545815 147.3 35.2131 147.3 79.2344C147.3 106.435 135.738 126.527 120.61 139.83C106.924 151.865 90.2587 158.402 76.4883 159.697V176.839H68.4883V152.014L72.4023 151.93C84.8394 151.662 101.649 145.85 115.327 133.822C128.888 121.897 139.3 103.93 139.3 79.2344Z"
      fill="#C3FF00"
    />
    <path
      d="M93.5605 79.2354C93.5605 64.4984 80.5059 54.0079 67.4521 54.0078H53.9375V105.508H67.4521C82.1717 105.508 93.5604 94.3227 93.5605 79.2354ZM116.661 79.2354C116.661 62.683 109.373 50.7187 99.7109 42.8066C90.2362 35.0482 78.537 31.2485 69.3672 31.0186L68.4873 31.0078H30.9375V169.008H45.9375V46.0078H67.4521C84.1794 46.0079 101.561 59.3705 101.561 79.2354C101.56 98.7495 86.5815 113.508 67.4521 113.508H53.9375V177.008H22.9375V23.0078H68.4873L69.542 23.0205C80.5182 23.2898 93.9363 27.7384 104.779 36.6172C116.09 45.8791 124.661 60.0292 124.661 79.2354C124.661 117.753 91.8908 136.557 68.4873 136.557V128.557C88.6604 128.557 116.661 112.234 116.661 79.2354Z"
      fill="white"
    />
  </svg>
);

export const PlusIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M11 4L11 18"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 11L4 11"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SettleIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M15 2C15.8278 2 16.4716 2.00157 16.9961 2.02832C14.748 2.27884 13 4.18508 13 6.5V10L12.9014 19.9668L10 19L7 20L4 19L1 20V6C1 4.11438 1.00015 3.17172 1.58594 2.58594C2.17172 2.00015 3.11438 2 5 2H15ZM4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H8C8.55228 15 9 14.5523 9 14C9 13.4477 8.55228 13 8 13H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H6L6.10254 10.9951C6.60667 10.9438 7 10.5177 7 10C7 9.48232 6.60667 9.05621 6.10254 9.00488L6 9H4ZM17.5 4C18.8807 4 20 5.11929 20 6.5V10H15V6.5C15 5.11929 16.1193 4 17.5 4ZM4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H10C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5H4Z"
      fill="black"
    />
  </svg>
);

export const ShareIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="23"
    height="22"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M17.5335 7.66863C19.3721 7.66863 20.8679 6.17289 20.8679 4.3343C20.8679 2.49574 19.3721 1 17.5335 1C15.695 1 14.1992 2.49574 14.1992 4.3343C14.1993 6.17281 15.695 7.66863 17.5335 7.66863Z"
      fill="black"
    />
    <path
      d="M17.5335 14.3281C15.695 14.3281 14.1992 15.8239 14.1992 17.6625C14.1992 19.501 15.695 20.9968 17.5335 20.9968C19.3721 20.9968 20.8679 19.501 20.8679 17.6625C20.8679 15.8239 19.3721 14.3281 17.5335 14.3281Z"
      fill="black"
    />
    <path
      d="M13.388 7.1393C13.2924 6.99864 13.2038 6.85289 13.1227 6.70254C12.9723 6.42387 12.6168 6.33106 12.3459 6.49516L9.78164 8.04793C7.08672 5.07571 2.12891 6.99231 2.12891 10.9979C2.12891 14.9998 7.08496 16.9221 9.78164 13.9479L12.3459 15.5007C12.6168 15.6647 12.9723 15.572 13.1227 15.2933C13.2038 15.143 13.2925 14.9972 13.388 14.8566C13.5665 14.5938 13.485 14.2347 13.2132 14.0701L10.6502 12.518C11.0118 11.5399 11.012 10.4567 10.6502 9.47789L13.2133 7.92578C13.4849 7.76121 13.5664 7.402 13.388 7.1393Z"
      fill="black"
    />
  </svg>
);

export const ZoomIcon = ({ className, style, onClick }: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M9.5 2C13.6421 2 17 5.35786 17 9.5C17 13.6421 13.6421 17 9.5 17C5.35786 17 2 13.6421 2 9.5C2 5.35786 5.35786 2 9.5 2Z"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 19L15 15"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 6.5V12.5"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12.5 9.5L6.5 9.5"
      stroke="#C3FF00"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
