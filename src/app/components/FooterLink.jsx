"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function FooterLink({ which }) {
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  const numberRegex = /^(\d+)$/;

  // Parse path parts outside of conditionals
  const pathParts = path.split("/").filter(Boolean);
  const isNextPath = pathParts.length === 2 && pathParts[0] === "next" && numberRegex.test(pathParts[1]);
  const isPrevPath = pathParts.length === 2 && pathParts[0] === "prev" && numberRegex.test(pathParts[1]);
  const currentNumber = isNextPath || isPrevPath ? parseInt(pathParts[1], 10) : 0;
  const isNextOne = isNextPath && currentNumber === 1;
  const isPrevOne = isPrevPath && currentNumber === 1;


  let navigationRoute = "/";

  if (which === "next") {
    if (path === "/") navigationRoute = "/next/1";
    if (isNextPath) navigationRoute = `/next/${currentNumber + 1}`;
    if (isPrevPath) navigationRoute = `/prev/${currentNumber - 1}`;
    if (isPrevOne) navigationRoute = "/";
  }
  if (which === "prev") {
    if (path === "/") navigationRoute = "/prev/1";
    if (isPrevPath) navigationRoute = `/prev/${currentNumber + 1}`;
    if (isNextPath) navigationRoute = `/next/${currentNumber - 1}`;
    if (isNextOne) navigationRoute = "/";
  }


  let pathDisplay = ""
  if (path === "/") {
    pathDisplay = "0"
  } else {
    pathDisplay = `${pathParts[0] === "next" ? "+" : "-"}` + `${pathParts[1]}`;
  }

  return (
    which === "path" ? 
      <div className="path-display">{pathDisplay}</div>
     : 
      <Link href={navigationRoute} className={`footer-link ${which === "next" ? "footer-link-next" : "footer-link-prev"}`}>
        {which === "next" && <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />}
        {which === "prev" && <FontAwesomeIcon icon={faChevronLeft} className="footer-icon" />}
      </Link>
  );
}
