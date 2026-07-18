import { useTheme } from '@/hooks/component/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="fixed top-1/2 right-0 -translate-y-1/2 translate-x-[17px] z-50"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Light and Dark Theme"
        className={`relative w-[66px] h-[32px] rounded-full border transition-colors duration-300 flex items-center cursor-pointer outline-none focus:outline-none rotate-90 ${
          isDark
            ? 'bg-[#232E42] border-[#232E42]'
            : 'bg-[#1890FF] border-[#1890FF]'
        }`}
      >
        {/* Sliding Round Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full transition-all duration-300 ${
            isDark
              ? 'left-[calc(100%-24px)] bg-[#1890FF]'
              : 'left-[10px] bg-white'
          }`}
        />

        {/* Moon Icon (Light Mode) */}
        <div
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 -rotate-90 transition-opacity duration-300 ${
            isDark ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="16"
            fill="none"
            viewBox="0 0 11 16"
          >
            <path
              fill="#fff"
              d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z"
            />
          </svg>
        </div>

        {/* Sun Icon (Dark Mode) */}
        <div
          className={`absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 transition-opacity duration-300 ${
            isDark ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="4.389"
              stroke="#fff"
              transform="rotate(-90 12 12)"
            />
            <path
              stroke="#fff"
              strokeLinecap="round"
              d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
