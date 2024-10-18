export default function ModalContent() {
    return (
        <div className="modal">
            <div style={{color: 'black'}}>I'm a modal dialog</div>
            <button onClick={() => {        window.location.reload();}}>Close</button>
        </div>
    );
}
