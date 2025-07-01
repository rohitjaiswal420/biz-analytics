export const isRTL = () => document.documentElement.dir === "rtl";
export const isLTR = () => document.documentElement.dir !== "rtl";

export const handlePreloader = () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 200);
  }
};
