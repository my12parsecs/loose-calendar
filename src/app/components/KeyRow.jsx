


export default function KeyRow({action, keys}) {

    return (
        <div className="key-row">
            <div className="key-action">{action}</div>
            <div className="key-middle">
                <div className="key-line"></div>
                <div className="key-space"></div>
            </div>
            <div className="key-key">{keys}</div>
        </div>
    )
}