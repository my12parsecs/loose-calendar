

import "../../../stylesheets/page.css";

import RenderLeftLoad from "../../../components/RenderLeftLoad";
import RenderMemoLoad from "../../../components/RenderMemoLoad";


export default function Loading() {

    return (
        <div className="main">
            <div className="main-left">
            {Array.from({ length: 7 }).map((_, index) => (
                <RenderLeftLoad />
            ))}
            </div>
            <div className="main-right">
                <RenderMemoLoad />
            </div>
        </div>
  );
}
