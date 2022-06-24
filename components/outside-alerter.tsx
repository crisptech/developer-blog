import React, { useEffect, Dispatch, SetStateAction } from "react";

export function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  showSideBar: boolean,
  setShowSideBar: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (showSideBar) {
          setShowSideBar(!showSideBar);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showSideBar]);
}
