import { useEffect } from "react";

export function useAccordion() {
  useEffect(() => {
    const accordions = document.querySelectorAll(".accordion .acc-btn");

    accordions.forEach((acc) => {
      acc.addEventListener("click", function () {
        const parent = this.parentElement;
        const content = parent.querySelector(".acc-content");

        if (parent.classList.contains("active-block")) {
          parent.classList.remove("active-block");
          content.style.display = "none";
        } else {
          document.querySelectorAll(".accordion .acc-content").forEach((el) => (el.style.display = "none"));
          document.querySelectorAll(".accordion .block").forEach((el) => el.classList.remove("active-block"));

          parent.classList.add("active-block");
          content.style.display = "block";
        }
      });
    });
  }, []);
}